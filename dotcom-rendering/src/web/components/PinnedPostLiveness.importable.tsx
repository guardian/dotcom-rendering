import { useEffect, useRef } from 'react';
import { initPerf } from '../browser/initPerf';

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

export const PinnedPostLiveness = ({}) => {
	const contentFitsContainer =
		pinnedPost && pinnedPost.scrollHeight <= pinnedPost.clientHeight;
	if (contentFitsContainer) hideShowMore();

	const hasBeenSeen = useRef(false);

	useEffect(() => {
		const handleClickTracking = () => {
			// TODO: ADD OPHAN CLICK TRACKING
			if (pinnedPostCheckBox instanceof HTMLInputElement) {
				if (pinnedPostCheckBox.checked) {
					console.log('checked');
				} else {
					console.log('un-checked');
				}
			}
		};
		pinnedPostCheckBox?.addEventListener('change', handleClickTracking);

		return () => {
			pinnedPostCheckBox?.removeEventListener(
				'change',
				handleClickTracking,
			);
		};
	}, []);

	useEffect(() => {
		if (!pinnedPost) return () => {};

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
						console.log(
							`duration ${timeTakenInSeconds} was emitted`,
						);
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
