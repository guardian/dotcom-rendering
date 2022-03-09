import { useEffect } from 'react';

const isServer = typeof window === 'undefined';

const pinnedPost: Element | null = !isServer
	? window.document.querySelector('[data-gu-marker=pinned-post]')
	: null;

const pinnedPostCheckBox: Element | null = !isServer
	? window.document.querySelector('input[name=pinned-post-checkbox]')
	: null;

/**
 * hide show more button on pinned post
 */
function hideShowMore() {
	const pinnedPostButton = document.querySelector<HTMLElement>(
		'#pinned-block-button',
	);
	if (pinnedPostButton) pinnedPostButton.style.display = 'none';
}

export const PinnedPostLiveness = ({}) => {
	const contentFitsContainer =
		pinnedPost && pinnedPost.scrollHeight <= pinnedPost.clientHeight;
	if (contentFitsContainer) hideShowMore();

	useEffect(() => {
		const handleClickTracking = () => {
			// TODO: ADD OPHAN CLICK TRACKING
		};
		pinnedPostCheckBox?.addEventListener('change', handleClickTracking);

		return () => {
			pinnedPostCheckBox?.removeEventListener(
				'change',
				handleClickTracking,
			);
		};
	}, []);
	return null;
};
