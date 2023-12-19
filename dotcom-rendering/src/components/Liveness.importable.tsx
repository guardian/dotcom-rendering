import { log } from '@guardian/libs';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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

/**
 * insert
 *
 * Takes html, parses and hydrates it, inserts the resulting blocks
 * at the top of the liveblog, and then enhances any tweets
 *
 * @param {Object} options
 * @param {string} options.html The block html to be inserted
 */
function insert({
	html,
	enhanceTweetsSwitch,
	topOfBlog,
	blogBody,
}: {
	html: string;
	enhanceTweetsSwitch: boolean;
	topOfBlog: HTMLElement;
	blogBody: HTMLElement;
}): void {
	// Create
	// ------
	const template = document.createElement('template');
	template.innerHTML = html;
	const fragment = template.content;

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
function revealPendingBlocks(blogBody: HTMLElement) {
	const pendingBlocks =
		blogBody.querySelectorAll<HTMLElement>('.pending.block');

	if (pendingBlocks.length === 0) return;

	for (const block of pendingBlocks) {
		block.classList.add('reveal-slowly');
		block.classList.remove('pending');
	}

	// Notify commercial that new blocks are available and they can re-run spacefinder
	document.dispatchEvent(new CustomEvent('liveblog:blocks-updated'));
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

const useVisibilityState = () => {
	const [visibilityState, setVisibilityState] =
		useState<DocumentVisibilityState>('visible');

	useEffect(() => {
		const handleVisibilityChange = () => {
			setVisibilityState(document.visibilityState);
		};

		window.addEventListener('visibilitychange', handleVisibilityChange);

		return () =>
			window.removeEventListener(
				'visibilitychange',
				handleVisibilityChange,
			);
	}, []);

	return visibilityState;
};

const useElementById = (id: string) => {
	const [element, setElement] = useState<HTMLElement>();

	useEffect(() => {
		setElement(window.document.getElementById(id) ?? undefined);
	}, [id]);

	return element;
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
	const topOfBlog = useElementById('top-of-blog');
	const blogBody = useElementById('liveblog-body');
	const toastRoot = useElementById('toast-root');

	const [topOfBlogVisible] = useIsInView({ node: topOfBlog, repeat: true });
	const visibilityState = useVisibilityState();

	const [numHiddenBlocks, setNumHiddenBlocks] = useState(0);
	const [latestBlockId, setLatestBlockId] = useState(mostRecentBlockId);
	const [key, setKey] = useState<string>();

	/**
	 * This function runs (once) after every successful useApi call. This is useful because it
	 * allows us to avoid the problems of imperative code being executed multiple times
	 * inside react's declarative structure (things get re-rendered when any state changes)
	 */
	const onSuccess = useCallback(
		(data: LiveUpdateType) => {
			if (data.numNewBlocks && data.numNewBlocks > 0) {
				// Insert the new blocks in the dom (but hidden)
				if (onFirstPage && topOfBlog && blogBody) {
					try {
						insert({
							html: data.html,
							enhanceTweetsSwitch,
							topOfBlog,
							blogBody,
						});
					} catch (error) {
						log('dotcom', 'Failed to update blocks', error);
					}
				}

				// Increment the count of new posts
				setNumHiddenBlocks(numHiddenBlocks + data.numNewBlocks);
			}

			// Update the block id we use for polling
			if (data.mostRecentBlockId) {
				setLatestBlockId(data.mostRecentBlockId);
			}
		},
		[
			onFirstPage,
			topOfBlog,
			enhanceTweetsSwitch,
			blogBody,
			numHiddenBlocks,
		],
	);

	useEffect(() => {
		/**
		 * This is a utility used by our Cypress end to end tests
		 *
		 * Rather than expect these scripts to depend on polling, we
		 * expose this function to allow Cypress to manually trigger
		 * updates with whatever html and properties it wants
		 *
		 */
		window.mockLiveUpdate = onSuccess;
	}, [onSuccess]);

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
	useApi<LiveUpdateType>(key, {
		refreshInterval: 10_000,
		refreshWhenHidden: true,
		onSuccess,
	});

	useEffect(() => {
		document.title =
			numHiddenBlocks > 0 ? `(${numHiddenBlocks}) ${webTitle}` : webTitle;
	}, [numHiddenBlocks, webTitle]);

	useEffect(() => {
		if (!onFirstPage) return;
		if (numHiddenBlocks <= 0) return;
		if (visibilityState !== 'visible') return;
		if (!topOfBlogVisible) return;
		if (!blogBody) return;

		revealPendingBlocks(blogBody);
		setNumHiddenBlocks(0);
	}, [
		blogBody,
		numHiddenBlocks,
		onFirstPage,
		topOfBlogVisible,
		visibilityState,
	]);

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

	if (toastRoot && numHiddenBlocks > 0 && !topOfBlogVisible) {
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
