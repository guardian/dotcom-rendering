import { getCookie, removeCookie } from '@guardian/libs';
import { isIPad, setDeviceClassCookie } from './iPadDetection';

const DEVICE_CLASS_COOKIE = 'device_class';

describe('iPadDetection', () => {
	const originalPlatform = navigator.platform;
	const originalMaxTouchPoints = navigator.maxTouchPoints;

	afterEach(() => {
		Object.defineProperty(navigator, 'platform', {
			value: originalPlatform,
			configurable: true,
		});
		Object.defineProperty(navigator, 'maxTouchPoints', {
			value: originalMaxTouchPoints,
			configurable: true,
		});
		removeCookie({ name: DEVICE_CLASS_COOKIE });
	});

	describe('isIPad', () => {
		it('returns true for newer iPad (iPadOS 13+, MacIntel with touch support)', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 5,
				configurable: true,
			});
			expect(isIPad()).toBe(true);
		});

		it('returns true for older iPad (iOS 12 and earlier)', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'iPad',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 5,
				configurable: true,
			});
			expect(isIPad()).toBe(true);
		});

		it('returns false for Mac desktop (MacIntel without touch)', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 0,
				configurable: true,
			});
			expect(isIPad()).toBe(false);
		});

		it('returns false for iPhone', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'iPhone',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 5,
				configurable: true,
			});
			expect(isIPad()).toBe(false);
		});

		it('returns false for Windows', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'Win32',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 0,
				configurable: true,
			});
			expect(isIPad()).toBe(false);
		});

		it('returns false for Android tablet', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'Linux armv8l',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 5,
				configurable: true,
			});
			expect(isIPad()).toBe(false);
		});
	});

	describe('setDeviceClassCookie', () => {
		it('sets device_class cookie to tablet on iPadOS', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 5,
				configurable: true,
			});

			setDeviceClassCookie();

			expect(getCookie({ name: DEVICE_CLASS_COOKIE })).toBe('tablet');
		});

		it('does not set cookie on Mac desktop', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 0,
				configurable: true,
			});

			setDeviceClassCookie();

			expect(getCookie({ name: DEVICE_CLASS_COOKIE })).toBeNull();
		});

		it('does not overwrite existing tablet cookie', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 5,
				configurable: true,
			});

			setDeviceClassCookie();
			const firstCookieValue = getCookie({ name: DEVICE_CLASS_COOKIE });

			setDeviceClassCookie();
			const secondCookieValue = getCookie({ name: DEVICE_CLASS_COOKIE });

			expect(firstCookieValue).toBe('tablet');
			expect(secondCookieValue).toBe('tablet');
		});
	});
});
