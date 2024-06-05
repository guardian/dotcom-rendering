import { log } from '@guardian/libs';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Output } from 'valibot';
import { number, object, safeParse, string } from 'valibot';
import { getEmotionCache } from '../client/islands/emotion';
import { initHydration } from '../client/islands/initHydration';
import { useApi } from '../lib/useApi';
import { useIsInView } from '../lib/useIsInView';
import { Toast } from './Toast';

type Props = {
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	filterKeyEvents: boolean;
	format: ArticleFormat;
	enhanceTweetsSwitch: boolean;
	onFirstPage: boolean;
	webURL: string;
	mostRecentBlockId: string;
	hasPinnedPost: boolean;
	selectedTopics?: Topic[];
};

const liveUpdate = object({
	numNewBlocks: number(),
	html: string(),
	mostRecentBlockId: string(),
});

export type LiveUpdateType = Output<typeof liveUpdate>;

/**
 * insert
 *
 * Takes html, parses and hydrates it, inserts the resulting blocks
 * at the top of the liveblog, and then enhances any tweets
 *
 * @param {string} html The block html to be inserted
 * @returns void
 */
function insert(
	html: string,
	enhanceTweetsSwitch: boolean,
	topOfBlog: Element,
) {
	// Create
	// ------
	const template = document.createElement('template');
	template.innerHTML =
		html + `<!-- inserted at ${new Date().toUTCString()} -->`;
	const fragment = template.content;

	// Remove duplicates
	// -----------------
	for (const article of template.querySelectorAll('article')) {
		if (document.getElementById(article.id)) article.remove();
	}

	// Hydrate
	// -------
	const islands = fragment.querySelectorAll<HTMLElement>('gu-island');
	void Promise.all(
		[...islands].map((island) => initHydration(island, getEmotionCache())),
	);

	// Insert
	// ------
	// Shouldn't we sanitise this html?
	// We're being sent this string by our own backend, not reader input, so we
	// trust that the tags and attributes it contains are safe and intentional
	const blogBody = document.querySelector<HTMLElement>('#liveblog-body');
	if (!blogBody) return;
	// nextSibling? See: https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore#example_2
	blogBody.insertBefore(fragment, topOfBlog.nextSibling);

	// Enhance
	// -----------
	if (enhanceTweetsSwitch) {
		const pendingBlocks =
			blogBody.querySelectorAll<HTMLElement>('.pending.block');
		// https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/scripting-loading-and-initialization
		if (typeof twttr !== 'undefined') {
			twttr.ready((twitter) => {
				twitter.widgets.load(Array.from(pendingBlocks));
			});
		}
	}
}

/**
 * reveal any blocks that have been inserted but are still hidden
 */
function revealPendingBlocks() {
	const blogBody = document.querySelector<HTMLElement>('#liveblog-body');
	const pendingBlocks =
		blogBody?.querySelectorAll<HTMLElement>('.pending.block');
	if (pendingBlocks) {
		for (const block of pendingBlocks) {
			block.classList.add('reveal-slowly');
			block.classList.remove('pending');
		}
	}

	if (pendingBlocks !== undefined && pendingBlocks.length > 0) {
		// Notify commercial that new blocks are available and they can re-run spacefinder
		document.dispatchEvent(new CustomEvent('liveblog:blocks-updated'));
	}
}

/**
 * This abstracts the code to construct the url we use for polling. Of note is the fact
 * we have put `latestBlockId` in react state; by doing this we are able to change the url
 * that SWR uses for the request whilst still benefitting from the polling logic
 *
 * @returns string
 */
function getKey(
	pageId: string,
	ajaxUrl: string,
	latestBlockId: string,
	filterKeyEvents: boolean,
	selectedTopics?: Topic[],
): string | undefined {
	try {
		// Construct the url to poll
		const url = new URL(`${pageId}.json`, ajaxUrl);
		url.searchParams.set('lastUpdate', latestBlockId);
		url.searchParams.set('isLivePage', 'true');
		url.searchParams.set('dcr', 'true');
		url.searchParams.set(
			'filterKeyEvents',
			filterKeyEvents ? 'true' : 'false',
		);
		const [topic] = selectedTopics ?? [];
		if (topic) {
			url.searchParams.set('topics', `${topic.type}:${topic.value}`);
		}

		return url.href;
	} catch {
		window.guardian.modules.sentry.reportError(
			new Error(
				`An error was thrown trying to construct a URL using pageId: ${pageId} and ajaxUrl: ${ajaxUrl}`,
			),
			'liveness-getkey',
		);
		// Returning undefined here means the request is never made
		// See: https://swr.vercel.app/docs/conditional-fetching#conditional
		return undefined;
	}
}

/**
 * This sets up a listener for when the page is backgrounded or restored.
 * We do this so that any new blocks that were fetched while the blog was in the
 * background are animated in at the point when focus is restored
 */
const useVisibilityState = () => {
	const [visibilityState, setVisibilityState] =
		useState<DocumentVisibilityState>('visible');

	useEffect(() => {
		const listener = () => {
			setVisibilityState(document.visibilityState);
		};

		window.addEventListener('visibilitychange', listener);

		return () => window.removeEventListener('visibilitychange', listener);
	}, [setVisibilityState]);

	return visibilityState;
};

/**
 * Allow new blocks on live blogs to be added without page reload.
 * Polls the content API inserts news blocks if the user
 * is at the top of the article.
 * If they have scrolled down, show them a toast to scroll back up.
 *
 * This component insert HTML directly, which is generated from @see LiveBlock
 * and received from the `blocksToHtml` handler.
 */
export const Liveness = ({
	pageId,
	webTitle,
	ajaxUrl,
	filterKeyEvents,
	format,
	enhanceTweetsSwitch,
	onFirstPage,
	webURL,
	mostRecentBlockId,
	hasPinnedPost,
	selectedTopics,
}: Props) => {
	const [showToast, setShowToast] = useState(false);
	const [numHiddenBlocks, setNumHiddenBlocks] = useState(0);
	const [latestBlockId, setLatestBlockId] = useState(mostRecentBlockId);
	const [key, setKey] = useState<string>();

	const [topOfBlog, setTopOfBlog] = useState<HTMLElement>();
	const [toastRoot, setToastRoot] = useState<Element>();

	const [topOfBlogVisible] = useIsInView({ node: topOfBlog });

	const visibilityState = useVisibilityState();

	useEffect(() => {
		setTopOfBlog(document.getElementById('top-of-blog') ?? undefined);
		setToastRoot(document.getElementById('toast-root') ?? undefined);
	}, []);

	/**
	 * This function runs (once) after every successful useApi call. This is useful because it
	 * allows us to avoid the problems of imperative code being executed multiple times
	 * inside react's declarative structure (things get re-rendered when any state changes)
	 */

	useEffect(() => {
		setKey(
			getKey(
				pageId,
				ajaxUrl,
				latestBlockId,
				filterKeyEvents,
				selectedTopics,
			),
		);
	}, [pageId, ajaxUrl, latestBlockId, filterKeyEvents, selectedTopics]);

	// useApi returns { data, loading, error } but we're not using them here
	const { data, mutate } = useApi(key, {
		refreshInterval: 10_000,
		refreshWhenHidden: true,
	});

	useEffect(() => {
		const result = safeParse(liveUpdate, data);
		log('dotcom', 'Liveness', result.success, data);
		if (!result.success) return;
		// Update the block id we use for polling
		setLatestBlockId(result.output.mostRecentBlockId);

		if (result.output.numNewBlocks > 0) {
			// Insert the new blocks in the dom (but hidden)
			if (onFirstPage && topOfBlog) {
				try {
					insert(result.output.html, enhanceTweetsSwitch, topOfBlog);
				} catch (error) {
					// eslint-disable-next-line no-console -- this is something we want to know about
					console.error('Failed to insert new blocks', error);
					error instanceof Error &&
						window.guardian.modules.sentry.reportError(
							error,
							'liveblog',
						);
				}
			}

			setShowToast(true);
			// Increment the count of new posts
			setNumHiddenBlocks((count) => count + result.output.numNewBlocks);
		}
	}, [data, enhanceTweetsSwitch, onFirstPage, topOfBlog]);

	useEffect(() => {
		/**
		 * This is a utility used by our e2e tests
		 *
		 * Rather than expect these scripts to depend on polling, we
		 * expose this function to allow tests to manually trigger
		 * updates with whatever html and properties it wants
		 *
		 */
		window.mockLiveUpdate = (mockData) => void mutate(mockData);
	}, [mutate]);

	useEffect(() => {
		document.title =
			numHiddenBlocks > 0 ? `(${numHiddenBlocks}) ${webTitle}` : webTitle;
	}, [numHiddenBlocks, webTitle]);

	const handleToastClick = useCallback(() => {
		// We adjust the position we scroll readers to based on if there is a pinned
		// post or not. If there is we want to scroll them to a position below it, if
		// there is then we want to scroll them to a position that ensures they still
		// see the key events filter
		const placeToScrollTo = hasPinnedPost ? 'top-of-blog' : 'maincontent';
		if (onFirstPage) {
			document.getElementById(placeToScrollTo)?.scrollIntoView({
				behavior: 'smooth',
			});
			window.history.replaceState({}, '', `#${placeToScrollTo}`);
		} else {
			window.location.href = `${webURL}#${placeToScrollTo}`;
		}
	}, [hasPinnedPost, onFirstPage, webURL]);

	useEffect(() => {
		if (!topOfBlogVisible) return;
		if (visibilityState !== 'visible') return;
		if (!onFirstPage) return;
		log('dotcom', 'Ready to insert new blocks:', numHiddenBlocks);
		setShowToast(false);
		revealPendingBlocks();
		setNumHiddenBlocks(0);
	}, [visibilityState, topOfBlogVisible, onFirstPage, numHiddenBlocks]);

	if (toastRoot && showToast) {
		/**
		 * Why `createPortal`?
		 *
		 * We use a Portal because of a the way different browsers implement `position: sticky`.
		 * A [stickily positioned element][] depends on its [containing block][] to determine
		 * when to become stuck.
		 *
		 * In Safari the containing block is set to the immediate parent
		 * whereas Chrome, Firefox and other browser are more forgiving.
		 *
		 * By using a Portal we can insert the Toast as a sibling to the Island, which works around
		 * Safari's behaviour.
		 *
		 * [stickily positioned element]: https://developer.mozilla.org/en-US/docs/Web/CSS/position#types_of_positioning
		 * [containing block]: https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
		 */
		return createPortal(
			<Toast
				onClick={handleToastClick}
				count={numHiddenBlocks}
				format={format}
			/>,
			toastRoot,
		);
	}

	return null;
};
