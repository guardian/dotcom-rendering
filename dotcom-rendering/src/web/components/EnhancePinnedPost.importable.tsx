import { useEffect, useRef, useState } from 'react';
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

export const EnhancePinnedPost = () => {
	const [hasBeenSeen, setHasBeenSeen] = useState(false);
	const [isInView] = useIsInView({
		threshold: 0.1,
		repeat: true,
		node: pinnedPost ?? undefined,
	});

	const pinnedPostTiming = useRef<ReturnType<typeof initPerf>>();

	const checkContentHeight = () => {
		const contentFitsContainer =
			pinnedPostContent &&
			pinnedPostContent.scrollHeight <= pinnedPostContent.clientHeight;
		if (contentFitsContainer) hideShowMore();
	};

	/**
	 * Checks for dom updates (embeds loading etc) and updates content height
	 */
	useEffect(() => {
		if (!pinnedPost) return;

		const observer = new MutationObserver(checkContentHeight);
		const config = { childList: true };

		observer.observe(pinnedPost, config);

		return () => observer.disconnect();
	}, []);

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
		pinnedPostTiming.current = initPerf('pinned-post-view-duration');
	}, []);

	// calculate duration when user is viewing pinned post
	// and emit ophan events when the pinned post goes out of view
	useEffect(() => {
		if (!pinnedPost) return;

		if (isInView) {
			setHasBeenSeen(true);
			pinnedPostTiming.current?.clear();
			pinnedPostTiming.current?.start();
		} else if (hasBeenSeen && !isInView) {
			const timeTaken = pinnedPostTiming.current?.end();
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
	}, [isInView, hasBeenSeen]);
	return null;
};
