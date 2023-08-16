import { allowFlashingElements } from '../lib/allowFlashingElements';
import { useOnce } from '../lib/useOnce';

const animatePulsingDots = () => {
	// Get all the elements that aren't hydrated
	const elements = document.querySelectorAll(
		`[data-flashing-dot-hydrated="false"]`,
	);

	for (const element of elements) {
		element.setAttribute('data-flashing-dot-hydrated', 'true');
		// In PulsingDot.tsx, we set the animation only to run
		// if this data attribute is set
		element.setAttribute('data-animate', 'true');
	}
};

/**
 * Island for animating pulsing dots which aren't already hydrated
 * See PulsingDot.tsx for more info
 *
 * - We use this for fronts, where we add pulsing dots to the page which aren't wrapped in islands
 */
export const AnimatePulsingDots = () => {
	useOnce(() => {
		if (allowFlashingElements) {
			animatePulsingDots();
		}
	}, []);

	return null;
};
