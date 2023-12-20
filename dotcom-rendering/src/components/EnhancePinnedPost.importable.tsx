import { startPerformanceMeasure } from '@guardian/libs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { submitComponentEvent } from '../client/ophan/ophan';
import { useIsInView } from '../lib/useIsInView';
import type { RenderingTarget } from '../types/renderingTarget';
import { useConfig } from './ConfigContext';

/**
 * toggle show more button and overlay on pinned post
 */
function toggleShowMore(show: boolean, checked: boolean) {
	const pinnedPostButton = document.querySelector<HTMLElement>(
		'#pinned-post-button',
	);
	const pinnedPostOverlay = document.querySelector<HTMLElement>(
		'#pinned-post-overlay',
	);

	if (pinnedPostButton) {
		if (show) {
			pinnedPostButton.style.removeProperty('display');
		} else if (!checked) {
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
const scrollOnCollapse = (pinnedPost: HTMLElement) => {
	const position = pinnedPost.getBoundingClientRect();
	if (position.top < 0) {
		pinnedPost.scrollIntoView({
			behavior: 'smooth',
		});
	}
};

const handleClickTracking = (
	checked: boolean,
	pinnedPost: HTMLElement,
	renderingTarget: RenderingTarget,
) => {
	if (checked) {
		void submitComponentEvent(
			{
				component: {
					componentType: 'LIVE_BLOG_PINNED_POST',
					id: pinnedPost.id,
				},
				action: 'CLICK',
				value: 'show-more',
			},
			renderingTarget,
		);
	} else {
		void submitComponentEvent(
			{
				component: {
					componentType: 'LIVE_BLOG_PINNED_POST',
					id: pinnedPost.id,
				},
				action: 'CLICK',
				value: 'show-less',
			},
			renderingTarget,
		);
		scrollOnCollapse(pinnedPost);
	}
};

/**
 * Observes the pinned post element on live blogs.
 *
 * ## Why does this need to be an Island?
 *
 * We want to record how long this element was in view
 *
 * ---
 *
 * No visual output
 */
export const EnhancePinnedPost = () => {
	const [pinnedPost, setPinnedPost] = useState<HTMLElement | null>(null);
	const [pinnedPostCheckBox, setPinnedPostCheckBox] =
		useState<HTMLInputElement | null>(null);
	const [pinnedPostContent, setPinnedPostContent] =
		useState<HTMLElement | null>(null);

	useEffect(() => {
		setPinnedPost(
			document.querySelector<HTMLElement>('[data-gu-marker=pinned-post]'),
		);
		setPinnedPostCheckBox(
			document.querySelector<HTMLInputElement>(
				'input[name=pinned-post-checkbox]',
			),
		);
		setPinnedPostContent(
			document.querySelector<HTMLElement>('#collapsible-body'),
		);
	}, []);

	const [hasBeenSeen, setHasBeenSeen] = useState(false);
	const [isInView] = useIsInView({
		threshold: 0.1,
		repeat: true,
		node: pinnedPost ?? undefined,
	});

	const { renderingTarget } = useConfig();

	const pinnedPostTiming =
		useRef<ReturnType<typeof startPerformanceMeasure>>();

	const checkContentHeight = useCallback(() => {
		if (!pinnedPostContent) return;
		if (!pinnedPostCheckBox) return;

		const { checked } = pinnedPostCheckBox;

		const contentFitsContainer =
			pinnedPostContent.scrollHeight <= pinnedPostContent.clientHeight;
		if (contentFitsContainer) toggleShowMore(false, checked);
		else toggleShowMore(true, checked);
	}, [pinnedPostCheckBox, pinnedPostContent]);

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
		} satisfies MutationObserverInit;

		observer.observe(pinnedPost, config);

		return () => observer.disconnect();
	}, [checkContentHeight, pinnedPost]);

	useEffect(() => {
		if (!pinnedPost) return;
		if (!pinnedPostCheckBox) return;

		const listener = () =>
			handleClickTracking(
				pinnedPostCheckBox.checked,
				pinnedPost,
				renderingTarget,
			);

		pinnedPostCheckBox.addEventListener('change', listener);

		return () => pinnedPostCheckBox.removeEventListener('change', listener);
	}, [pinnedPost, pinnedPostCheckBox, renderingTarget]);

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
				void submitComponentEvent(
					{
						component: {
							componentType: 'LIVE_BLOG_PINNED_POST',
							id: pinnedPost.id,
						},
						action: 'VIEW',
						value: timeTakenInSeconds.toString(),
					},
					renderingTarget,
				);
			}
		}
	}, [isInView, hasBeenSeen, renderingTarget, pinnedPost]);

	// render nothing
	return null;
};
