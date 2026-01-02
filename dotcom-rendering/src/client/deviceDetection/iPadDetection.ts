import { getCookie, setCookie } from '@guardian/libs';

const DEVICE_CLASS_COOKIE = 'device_class';

/**
 * Detects iPad devices using feature detection.
 *
 * - Older iPads (iOS 12 and earlier) report 'iPad' in navigator.platform
 * - Newer iPads (iPadOS 13+) report as 'MacIntel' but have touch support
 *   (navigator.maxTouchPoints > 1, while Macs have 0)
 *
 * @see https://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885
 */
export const isIPad = (): boolean => {
	const isOlderIPad = navigator.platform.includes('iPad');

	const isNewerIPad =
		navigator.platform === 'MacIntel' &&
		typeof navigator.maxTouchPoints === 'number' &&
		navigator.maxTouchPoints > 1;

	return isOlderIPad || isNewerIPad;
};

/**
 * Sets the device_class cookie if the device is detected as iPadOS.
 * This cookie will be sent to the backend (SDC) for proper targeting.
 */
export const setDeviceClassCookie = (): void => {
	const existingCookie = getCookie({ name: DEVICE_CLASS_COOKIE });

	if (isIPad() && existingCookie !== 'tablet') {
		setCookie({
			name: DEVICE_CLASS_COOKIE,
			value: 'tablet',
			daysToLive: 365,
		});
	}
};
