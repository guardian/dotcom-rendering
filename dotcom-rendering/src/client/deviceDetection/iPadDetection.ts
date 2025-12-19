import { storage } from '@guardian/libs';

const DEVICE_CLASS_STORAGE_KEY = 'gu.deviceClass';

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
 * Sets the device class in localStorage if the device is detected as iPad.
 * This value will be read and appended as a query parameter to SDC requests.
 */
export const setDeviceClass = (): void => {
	const existingValue = storage.local.get(DEVICE_CLASS_STORAGE_KEY);

	if (isIPad() && existingValue !== 'tablet') {
		storage.local.set(DEVICE_CLASS_STORAGE_KEY, 'tablet');
	}
};

/**
 * Gets the device class from localStorage.
 * Returns 'tablet' for iPads, undefined otherwise.
 */
export const getDeviceClass = (): string | undefined => {
	const value = storage.local.get(DEVICE_CLASS_STORAGE_KEY);
	return typeof value === 'string' ? value : undefined;
};
