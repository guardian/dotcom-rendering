import { startPerformanceMeasure } from '@guardian/libs';
import { useEffect, useRef, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { isServer } from '../lib/isServer';
import { useIsInView } from '../lib/useIsInView';

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
 * toggle show more button and overlay on pinned post
 */
function toggleShowMore(show: boolean) {
	const pinnedPostButton = document.querySelector<HTMLElement>(
		'#pinned-post-button',
	);
	const pinnedPostOverlay = document.querySelector<HTMLElement>(
		'#pinned-post-overlay',
	);

	if (pinnedPostButton) {
		if (show) {
			pinnedPostButton.style.removeProperty('display');
		} else {
			pinnedPostButton.style.display = 'none';
		}
	}

	if (pinnedPostOverlay) {
		if (show) {
			pinnedPostOverlay.style.removeProperty('display');
		} else {
			pinnedPostOverlay.style.display = 'none';
		}
	}
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
			void submitComponentEvent({
				component: {
					componentType: 'LIVE_BLOG_PINNED_POST',
					id: pinnedPost?.id,
				},
				action: 'CLICK',
				value: 'show-more',
			});
		} else {
			void submitComponentEvent({
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

	const pinnedPostTiming =
		useRef<ReturnType<typeof startPerformanceMeasure>>();

	const checkContentHeight = () => {
		if (pinnedPostContent) {
			const contentFitsContainer =
				pinnedPostContent.scrollHeight <=
				pinnedPostContent.clientHeight;
			if (contentFitsContainer) toggleShowMore(false);
			else toggleShowMore(true);
		}
	};

	/**
	 * Checks for dom updates (embeds loading etc) and updates content height
	 */
	useEffect(() => {
		if (!pinnedPost) return;

		checkContentHeight();

		const observer = new MutationObserver(checkContentHeight);
		const config = {
			childList: true,
			subtree: true,
		};

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

	// calculate duration when user is viewing pinned post
	// and emit ophan events when the pinned post goes out of view
	useEffect(() => {
		if (!pinnedPost) return;

		if (isInView) {
			setHasBeenSeen(true);
			pinnedPostTiming.current = startPerformanceMeasure(
				'dotcom',
				'pinned-post-view-duration',
			);
		} else if (hasBeenSeen) {
			const timeTaken = pinnedPostTiming.current?.endPerformanceMeasure();
			if (timeTaken !== undefined) {
				const timeTakenInSeconds = timeTaken / 1000;
				void submitComponentEvent({
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
