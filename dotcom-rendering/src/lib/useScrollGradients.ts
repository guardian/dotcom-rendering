import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

/** How far from either end the element must be scrolled before its gradient shows */
const EDGE_THRESHOLD_PX = 16;

/**
 * Tracks whether a scrollable element has more content above and below the
 * visible area, so that a fade can hint that it can be scrolled either way.
 *
 * It updates on every scroll and resize event. Re-rendering only happens when
 * one of the flags changes, so there is no need to debounce.
 */
export const useScrollGradients = (
	ref: RefObject<HTMLElement | null>,
): { showTopGradient: boolean; showBottomGradient: boolean } => {
	const [showTopGradient, setShowTopGradient] = useState(false);
	const [showBottomGradient, setShowBottomGradient] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) {
			return;
		}

		const update = () => {
			const maxScroll = element.scrollHeight - element.clientHeight;
			setShowTopGradient(element.scrollTop > EDGE_THRESHOLD_PX);
			setShowBottomGradient(
				element.scrollTop < maxScroll - EDGE_THRESHOLD_PX,
			);
		};

		update();

		element.addEventListener('scroll', update);
		window.addEventListener('resize', update);

		return () => {
			element.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}, [ref]);

	return { showTopGradient, showBottomGradient };
};
