import { isBoolean, storage } from '@guardian/libs';
import { isServer } from './isServer';

const shouldAllowFlashingElements = () => {
	const key = 'gu.prefs.accessibility.flashing-elements';
	const storedPreference = storage.local.get(key);
	const prefersReducedMotion = matchMedia(
		'(prefers-reduced-motion: reduce)',
	).matches;

	if (storedPreference === null) {
		storage.local.set(key, !prefersReducedMotion);
	}

	return isBoolean(storedPreference)
		? storedPreference
		: !prefersReducedMotion;
};

/**
 * The [user’s preference for flashing elements][accessibility-help].
 *
 * If they have not specified it or it cannot be retrieved,
 * falls back to the [prefers-reduced-motion][] media query.
 *
 * **N.B.** this is always `true` on the server.
 *
 * [accessibility-help]: https://www.theguardian.com/help/accessibility-help
 * [prefers-reduced-motion]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
 */
export const allowFlashingElements = isServer
	? true
	: shouldAllowFlashingElements();
