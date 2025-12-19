import { storage } from '@guardian/libs';
import { getDeviceClass, isIPad, setDeviceClass } from './iPadDetection';

const DEVICE_CLASS_STORAGE_KEY = 'gu.deviceClass';

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
		storage.local.remove(DEVICE_CLASS_STORAGE_KEY);
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

	describe('setDeviceClass', () => {
		it('sets device class to tablet in localStorage on iPad', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 5,
				configurable: true,
			});

			setDeviceClass();

			expect(getDeviceClass()).toBe('tablet');
		});

		it('does not set device class on Mac desktop', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 0,
				configurable: true,
			});

			setDeviceClass();

			expect(getDeviceClass()).toBeUndefined();
		});

		it('does not overwrite existing tablet value', () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 5,
				configurable: true,
			});

			setDeviceClass();
			const firstValue = getDeviceClass();

			setDeviceClass();
			const secondValue = getDeviceClass();

			expect(firstValue).toBe('tablet');
			expect(secondValue).toBe('tablet');
		});
	});

	describe('getDeviceClass', () => {
		it('returns tablet when device class is set', () => {
			storage.local.set(DEVICE_CLASS_STORAGE_KEY, 'tablet');
			expect(getDeviceClass()).toBe('tablet');
		});

		it('returns undefined when device class is not set', () => {
			expect(getDeviceClass()).toBeUndefined();
		});
	});
});
