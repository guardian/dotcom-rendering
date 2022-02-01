import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useApi } from '../lib/useApi';

type Props = {
	pageId: string;
	webTitle: string;
	ajaxUrl: string;
};

const Toast = ({
	onClick,
	noOfNewPosts,
}: {
	onClick: () => void;
	noOfNewPosts: number;
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
			<button onClick={onClick}>{`${noOfNewPosts} blah`}</button>
		</nav>
	);
};

function hydrateBlocks() {
	console.log('hydrateBlocks');
	// TODO Call existing hydration solution targetted to these elements
	// Maybe we can make doHydration work for all gu-islands things
	// where the gu-hydrated data attribute isn't set?
}

/**
 * insertNewBlocks takes html and inserts it at the top of the liveblog
 *
 * @param html The block html to be inserted
 * @returns void
 */
function insertNewBlocks(html: string) {
	/**
	 * TODO: We need to make the call to get new posts idempotent. As such, this
	 * action needs to first remove any existing posts with ids the same as the
	 * batch beforing inserting
	 */
	const latestBlock = document.querySelector('#maincontent :first-child');

	if (!latestBlock) return;

	latestBlock.insertAdjacentHTML('beforebegin', `<article>${html}</article>`);
}

/**
 * revealNewBlocks - style any blocks that have been inserted but are hidden such that
 * they are revealed
 */
function revealNewBlocks() {
	console.log('revealNewBlocks');
}

const isServer = typeof window === 'undefined';

const topOfBlog: Element | null | false =
	!isServer && window.document.querySelector('[data-gu-marker=top-of-blog]');

function topOfBlogVisible() {
	return topOfBlog && topOfBlog.classList.contains('in-viewport');
}

function getKey(
	pageId: string,
	ajaxUrl: string,
	filterKeyEvents: boolean,
	latestBlockId: string,
) {
	// Construct the url to poll
	const url = new URL(`${pageId}.json`, ajaxUrl);
	url.searchParams.set('lastUpdate', latestBlockId);
	url.searchParams.set('isLivePage', 'true');
	url.searchParams.set('filterKeyEvents', filterKeyEvents ? 'true' : 'false');
	return url.href;
}

if (topOfBlog) {
	const observer = new window.IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-viewport');
				return;
			}
			entry.target.classList.remove('in-viewport');
		},
		{
			root: null,
			threshold: 0.1,
		},
	);

	observer.observe(topOfBlog);
}

export const Liveness = ({ pageId, webTitle, ajaxUrl }: Props) => {
	const [showToast, setShowToast] = useState(false);
	const [noOfNewPosts, setNoOfNewPosts] = useState(0);
	const [latestBlockId, setLatestBlockId] = useState(
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
		refreshInterval: 10000,
		refreshWhenHidden: true,
		// onSuccess runs (once) after every successful api call. This is useful because it
		// allows us to avoid the problems of imperative code being executed multiple times
		// inside react's declarative structure (things get re-rendered when any state changes)
		onSuccess: (data: {
			numNewBlocks: number;
			html: string;
			latestBlockId: string;
		}) => {
			if (data && data.numNewBlocks && data.numNewBlocks > 0) {
				// Always insert the new blocks in the dom (but hidden)
				insertNewBlocks(data.html);
				hydrateBlocks();

				if (topOfBlogVisible()) {
					revealNewBlocks();
					setNoOfNewPosts(0);
				} else {
					setShowToast(true);
					// Increment the count of new posts
					setNoOfNewPosts(noOfNewPosts + data.numNewBlocks);
				}

				// Update the block id we use for polling
				if (data.latestBlockId) setLatestBlockId(data.latestBlockId);
			}
		},
	});

	useEffect(() => {
		document.title =
			noOfNewPosts > 0 ? `(${noOfNewPosts}) ${webTitle}` : webTitle;
	}, [noOfNewPosts, webTitle]);

	const handleToastClick = () => {
		setShowToast(false);
		if (topOfBlog) topOfBlog.scrollIntoView();
		revealNewBlocks();
		setNoOfNewPosts(0);
	};

	if (showToast) {
		return <Toast onClick={handleToastClick} noOfNewPosts={noOfNewPosts} />;
	}

	return null;
};
