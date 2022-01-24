import { css } from '@emotion/react';
import { joinUrl } from '@guardian/libs';
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

function insertNewBlocks() {
	console.log('insertNewBlocks');
	// TODO: This is a pure javascript action to insert the content into the dom
	// We give it a classname causing it to be hidden by default. Unhiding it is
	// how we achieve animation but it's dependent on scroll position

	/**
	 * TODO: We need to make the call to get new posts idempotent. As such, this
	 * action needs to first remove any existing posts with ids the same as the
	 * batch beforing inserting
	 */
}

function revealNewBlocks() {
	console.log('revealNewBlocks');
	// TODO: Search for and style any hidden blocks such that they become visible, fading in
}

const isServer = typeof window === 'undefined';

const topOfBlog: Element | null | false =
	!isServer && window.document.querySelector('[data-gu-marker=top-of-blog]');

function topOfBlogVisible() {
	return topOfBlog && topOfBlog.classList.contains('in-viewport');
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

// TODO: Should we dismiss the toast on escape key press?

export const Liveness = ({ pageId, webTitle, ajaxUrl }: Props) => {
	const [showToast, setShowToast] = useState(false);
	const [noOfNewPosts, setNoOfNewPosts] = useState(0);

	const latestBlockId: string =
		(!isServer &&
			document
				.getElementById('maincontent')
				?.querySelectorAll('article')[0]?.id) ||
		'';

	// TODO: Read `filterKeyEvents` from the url
	// TODO: Do we need `filterKeyEvents` and `isLivePage` here?
	const url = `${joinUrl(
		ajaxUrl,
		pageId,
	)}.json?lastUpdate=${latestBlockId}&isLivePage=true&filterKeyEvents=false`;

	// useApi returns { data, loading, error } but we're not using them here
	useApi<{
		numNewBlocks: number;
		html: string;
	}>(url, {
		refreshInterval: 10000,
		refreshWhenHidden: true,
		// onSuccess runs (once) after every successful api call. This is useful because it
		// allows us to avoid the problems of imperative code being executed multiple times
		// inside react's declarative structure (things get re-rendered when any state changes)
		onSuccess: (data: { numNewBlocks: number }) => {
			// TODO: What if we've made the same call previously?
			if (data && data.numNewBlocks && data.numNewBlocks > 0) {
				// Always insert the new blocks in the dom (but hidden)
				insertNewBlocks();
				hydrateBlocks();

				if (topOfBlogVisible()) {
					revealNewBlocks();
					setNoOfNewPosts(0);
				} else {
					setShowToast(true);
					// Increment the count of new posts
					setNoOfNewPosts(noOfNewPosts + data.numNewBlocks);
				}
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
