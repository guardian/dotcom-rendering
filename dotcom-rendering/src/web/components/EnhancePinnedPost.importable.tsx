import { useEffect, useRef } from 'react';
import { initPerf } from '../browser/initPerf';
import { submitComponentEvent } from '../browser/ophan/ophan';

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
		'#pinned-post-button',
	);
	if (pinnedPostButton) pinnedPostButton.style.display = 'none';
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
	const contentFitsContainer =
		pinnedPost && pinnedPost.scrollHeight <= pinnedPost.clientHeight;
	if (contentFitsContainer) hideShowMore();

	const hasBeenSeen = useRef(false);

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
		if (!pinnedPost) return;

		const pinnedPostTiming = initPerf('pinned-post-view-duration');

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					hasBeenSeen.current = true;
					pinnedPostTiming.clear();
					pinnedPostTiming.start();
				} else if (hasBeenSeen.current) {
					const timeTaken = pinnedPostTiming.end();
					if (timeTaken) {
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
			},
			{
				threshold: 0.1,
			},
		);

		observer.observe(pinnedPost);

		return () => {
			observer.disconnect();
		};
	}, []);
	return null;
};
