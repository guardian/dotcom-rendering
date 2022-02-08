import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useApi } from '../lib/useApi';

type Props = {
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
};

// TODO: Break this out into its own component
const Toast = ({
	onClick,
	numHiddenBlocks,
}: {
	onClick: () => void;
	numHiddenBlocks: number;
}) => {
	// TODO: Style and absolute position this component
	return (
		<nav
			css={css`
				position: fixed;
				top: 20px;
				left: 50px;
				display: flex;
				width: 100%;
				align-items: center;
			`}
		>
			<button onClick={onClick}>{`${numHiddenBlocks} blah`}</button>
		</nav>
	);
};

const isServer = typeof window === 'undefined';

function hydrateBlocks() {
	console.log('hydrateBlocks');
	// TODO Call existing hydration solution targetted to these elements
	// Maybe we can make doHydration work for all gu-islands things
	// where the gu-hydrated data attribute isn't set?
}

/**
 * insertNewBlocks takes html and inserts it at the top of the liveblog
 *
 * @param {string} html The block html to be inserted
 * @returns void
 */
function insertNewBlocks(html: string) {
	const latestBlock = document.querySelector('#maincontent :first-child');
	if (!latestBlock) return;
	latestBlock.insertAdjacentHTML('beforebegin', html);
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
	filterKeyEvents: boolean,
	latestBlockId: string,
): string {
	// Construct the url to poll
	const url = new URL(`${pageId}.json`, ajaxUrl);
	url.searchParams.set('lastUpdate', latestBlockId);
	url.searchParams.set('isLivePage', 'true');
	url.searchParams.set('filterKeyEvents', filterKeyEvents ? 'true' : 'false');
	return url.href;
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

export const Liveness = ({ pageId, webTitle, ajaxUrl }: Props) => {
	const [showToast, setShowToast] = useState(false);
	const [numHiddenBlocks, setNumHiddenBlocks] = useState(0);
	const [latestBlockId, setLatestBlockId] = useState(
		// By default we use the first (latest) block id on the page
		document.querySelector('#maincontent :first-child')?.id || '',
	);

	// Read current url to get filterKeyEvents
	const params = new URLSearchParams(window.location.search);
	const filterKeyEvents = !!params.get('filterKeyEvents');

	// useApi returns { data, loading, error } but we're not using them here
	useApi<{
		numNewBlocks: number;
		html: string;
	}>(getKey(pageId, ajaxUrl, filterKeyEvents, latestBlockId), {
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
				insertNewBlocks(data.html);
				hydrateBlocks();

				if (topOfBlogVisible()) {
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

	const handleToastClick = () => {
		setShowToast(false);
		topOfBlog?.scrollIntoView();
		revealNewBlocks();
		setNumHiddenBlocks(0);
	};

	if (showToast) {
		return (
			<Toast
				onClick={handleToastClick}
				numHiddenBlocks={numHiddenBlocks}
			/>
		);
	}

	return null;
};
