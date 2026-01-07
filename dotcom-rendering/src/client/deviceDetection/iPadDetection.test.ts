import { getDeviceClass, isIPad } from './iPadDetection';

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

	describe('getDeviceClass', () => {
		it('returns tablet when device is iPad', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 1,
				configurable: true,
			});

			expect(getDeviceClass()).toBe('tablet');
		});

		it('returns undefined when device is not iPad', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 0,
				configurable: true,
			});

			expect(getDeviceClass()).toBeUndefined();
		});
	});
});
