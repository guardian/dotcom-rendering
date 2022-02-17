import { useEffect, useState } from 'react';
import { initHydration } from '../browser/islands/initHydration';
import { useApi } from '../lib/useApi';
import { Toast } from './Toast';

type Props = {
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
	filterKeyEvents: boolean;
	format: ArticleFormat;
};

const isServer = typeof window === 'undefined';

/**
 * insert
 *
 * Takes html, parses and hydrates it, and then inserts the resulting blocks
 * at the top of the liveblog
 *
 * @param {string} html The block html to be inserted
 * @returns void
 */
function insert(html: string) {
	// Create
	// ------
	const template = document.createElement('template');
	template.innerHTML = html;
	const fragment = template.content;

	// Hydrate
	// -------
	const islands = fragment.querySelectorAll('gu-island');
	initHydration(islands);

	// Insert
	// ------
	// Shouldn't we snaitise this html?
	// We're being sent this string by our own backend, not reader input, so we
	// trust that the tags and attributes it contains are safe and intentional
	const maincontent = document.querySelector('#maincontent');
	const latestBlock = document.querySelector('#maincontent :first-child');
	if (!latestBlock || !maincontent) return;
	maincontent.insertBefore(fragment, latestBlock);
}

/**
 * revealNewBlocks - style any blocks that have been inserted but are hidden such that
 * they are revealed
 */
function revealNewBlocks() {
	console.log('revealNewBlocks');
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

const topOfBlog: Element | null = !isServer
	? window.document.querySelector('[data-gu-marker=top-of-blog]')
	: null;

/**
 * This allows us to make decisions in javascript based on if the reader
 * has the top of the blog in view or not
 *
 * @returns boolean
 */
function topOfBlogVisible(): boolean {
	return topOfBlog ? topOfBlog.classList.contains('in-viewport') : false;
}

export const Liveness = ({
	pageId,
	webTitle,
	ajaxUrl,
	filterKeyEvents,
	format,
}: Props) => {
	const [showToast, setShowToast] = useState(false);
	const [numHiddenBlocks, setNumHiddenBlocks] = useState(0);
	const [latestBlockId, setLatestBlockId] = useState(
		// By default we use the first (latest) block id on the page
		document.querySelector('#maincontent :first-child')?.id || '',
	);

	// useApi returns { data, loading, error } but we're not using them here
	useApi(getKey(pageId, ajaxUrl, latestBlockId, filterKeyEvents), {
		refreshInterval: 15000,
		refreshWhenHidden: true,
		// onSuccess runs (once) after every successful api call. This is useful because it
		// allows us to avoid the problems of imperative code being executed multiple times
		// inside react's declarative structure (things get re-rendered when any state changes)
		onSuccess: (data: {
			numNewBlocks: number;
			html: string;
			mostRecentBlockId: string;
		}) => {
			if (data && data.numNewBlocks && data.numNewBlocks > 0) {
				// Always insert the new blocks in the dom (but hidden)
				insert(data.html);

				if (topOfBlogVisible() && document.hasFocus()) {
					revealNewBlocks();
					setNumHiddenBlocks(0);
				} else {
					setShowToast(true);
					// Increment the count of new posts
					setNumHiddenBlocks(numHiddenBlocks + data.numNewBlocks);
				}

				// Update the block id we use for polling
				if (data.mostRecentBlockId) {
					setLatestBlockId(data.mostRecentBlockId);
				}
			}
		},
	});

	useEffect(() => {
		document.title =
			numHiddenBlocks > 0 ? `(${numHiddenBlocks}) ${webTitle}` : webTitle;
	}, [numHiddenBlocks, webTitle]);

	if (topOfBlog) {
		const observer = new window.IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('in-viewport');
					revealNewBlocks();
					setNumHiddenBlocks(0);
					setShowToast(false);
					return;
				}
				entry.target.classList.remove('in-viewport');
			},
			{
				root: null,
				// A margin makes more sense because the element we're
				// observing (topOfBlog) has no height
				rootMargin: '100px',
			},
		);

		observer.observe(topOfBlog);
	}

	/**
	 * This useEffect sets up a listener for when the page is backgrounded or restored. We
	 * do this so that any new blocks that were fetched while the blog was in the
	 * background are animated in at the point when focus is restored
	 */
	useEffect(() => {
		const handleVisibilityChange = () => {
			// The blog was either hidden or has become visible
			if (
				// If we're returning to a blog that has pending blocks and the reader
				// is at the top of the page then...
				document.visibilityState === 'visible' &&
				numHiddenBlocks > 0 &&
				topOfBlogVisible()
			) {
				revealNewBlocks();
				setNumHiddenBlocks(0);
				setShowToast(false);
			}
		};

		window.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			window.removeEventListener(
				'visibilitychange',
				handleVisibilityChange,
			);
		};
	}, [numHiddenBlocks]);

	const handleToastClick = () => {
		setShowToast(false);
		document.getElementById('maincontent')?.scrollIntoView({
			behavior: 'smooth',
		});
		window.location.href = '#maincontent';
		revealNewBlocks();
		setNumHiddenBlocks(0);
	};

	if (showToast) {
		return (
			<Toast
				onClick={handleToastClick}
				count={numHiddenBlocks}
				format={format}
			/>
		);
	}

	return null;
};
