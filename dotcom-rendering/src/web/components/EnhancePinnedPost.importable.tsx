import { useEffect, useState } from 'react';
import { initPerf } from '../browser/initPerf';
import { submitComponentEvent } from '../browser/ophan/ophan';
import { useIsInView } from '../lib/useIsInView';

const isServer = typeof window === 'undefined';

const pinnedPost: HTMLElement | null = !isServer
	? window.document.querySelector('[data-gu-marker=pinned-post]')
	: null;

const pinnedPostCheckBox: HTMLElement | null = !isServer
	? window.document.querySelector('input[name=pinned-post-checkbox]')
	: null;

const pinnedPostContent: HTMLElement | null = !isServer
	? window.document.querySelector('#collapsible-body')
	: null;

/**
 * hide show more button and overlay on pinned post
 */
function hideShowMore() {
	const pinnedPostButton = document.querySelector<HTMLElement>(
		'#pinned-post-button',
	);
	const pinnedPostOverlay = document.querySelector<HTMLElement>(
		'#pinned-post-overlay',
	);
	if (pinnedPostButton) pinnedPostButton.style.display = 'none';
	if (pinnedPostOverlay) pinnedPostOverlay.style.display = 'none';
}

/**
 * Scroll to the top of the main content when the pinned post is collapsed if the top of the post is out of view
 */
function scrollOnCollapse() {
	const position = pinnedPost?.getBoundingClientRect();
	if (position && position.top < 0) {
		pinnedPost?.scrollIntoView({
			behavior: 'smooth',
		});
	}
}

export const EnhancePinnedPost = () => {
	console.log('new rendering happened');
	const [isInView, setNode] = useIsInView({ threshold: 0.1, repeat: true });
	setNode(pinnedPost);

	const contentFitsContainer =
		pinnedPostContent &&
		pinnedPostContent.scrollHeight <= pinnedPostContent.clientHeight;

	if (contentFitsContainer) hideShowMore();

	const [hasBeenSeen, setHasBeenSeen] = useState(false);

	const handleClickTracking = () => {
		if (pinnedPostCheckBox instanceof HTMLInputElement) {
			if (pinnedPostCheckBox.checked) {
				submitComponentEvent({
					component: {
						componentType: 'LIVE_BLOG_PINNED_POST',
						id: pinnedPost?.id,
					},
					action: 'CLICK',
					value: 'show-more',
				});
			} else {
				submitComponentEvent({
					component: {
						componentType: 'LIVE_BLOG_PINNED_POST',
						id: pinnedPost?.id,
					},
					action: 'CLICK',
					value: 'show-less',
				});
				scrollOnCollapse();
			}
		}
	};

	useEffect(() => {
		pinnedPostCheckBox?.addEventListener('change', handleClickTracking);

		return () => {
			pinnedPostCheckBox?.removeEventListener(
				'change',
				handleClickTracking,
			);
		};
	}, []);

	// calculate duration when user is viewing pinned post
	// and emit ophan events when the pinned post goes out of view
	useEffect(() => {
		console.log(`use effect called`);
		console.log(`hasBeenSeen.current: ${hasBeenSeen}`);
		console.log(`isInView: ${isInView}`);
		if (!pinnedPost) return;
		const pinnedPostTiming = initPerf('pinned-post-view-duration');

		if (isInView) {
			console.log('starting timing');
			setHasBeenSeen(true);
			pinnedPostTiming.clear(); // I think this will no longer be necessary
			pinnedPostTiming.start();
		} else if (hasBeenSeen && !isInView) {
			console.log('ending timing');
			const timeTaken = pinnedPostTiming.end();
			if (timeTaken) {
				console.log(`timeTaken: ${timeTaken}`);
				const timeTakenInSeconds = timeTaken / 1000;
				submitComponentEvent({
					component: {
						componentType: 'LIVE_BLOG_PINNED_POST',
						id: pinnedPost.id,
					},
					action: 'VIEW',
					value: timeTakenInSeconds.toString(),
				});
			}
		}
	}, [isInView, hasBeenSeen]);
	return null;
};
