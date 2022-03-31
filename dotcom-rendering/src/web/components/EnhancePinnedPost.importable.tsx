import { useEffect, useRef } from 'react';
import { initPerf } from '../browser/initPerf';
import { submitComponentEvent } from '../browser/ophan/ophan';

const isServer = typeof window === 'undefined';

const pinnedPost: Element | null = !isServer
	? window.document.querySelector('[data-gu-marker=pinned-post]')
	: null;

const pinnedPostCheckBox: HTMLElement | null = !isServer
	? window.document.querySelector('input[name=pinned-post-checkbox]')
	: null;

const pinnedPostContent: Element | null = !isServer
	? window.document.querySelector('#collapsible-body')
	: null;

const pinnedPostButton: HTMLElement | null = !isServer
	? window.document.querySelector('#pinned-post-button')
	: null;

function keyListener(e: KeyboardEvent) {
	if (e.key === 'Enter') {
		e.preventDefault();
		pinnedPostCheckBox?.click();
	}
}
/**
 * hide show more button and overlay on pinned post
 */
function hideShowMore() {
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
	const contentFitsContainer =
		pinnedPostContent &&
		pinnedPostContent.scrollHeight <= pinnedPostContent.clientHeight;

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

	useEffect(() => {
		pinnedPostButton?.addEventListener('keydown', keyListener);

		return () => {
			pinnedPostButton?.removeEventListener('keydown', keyListener);
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
