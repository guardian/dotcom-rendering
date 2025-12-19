import { storage } from '@guardian/libs';
import { appendDeviceClassParam } from './sdcUrl';

const DEVICE_CLASS_STORAGE_KEY = 'gu.deviceClass';

describe('appendDeviceClassParam', () => {
	afterEach(() => {
		storage.local.remove(DEVICE_CLASS_STORAGE_KEY);
	});

	it('appends deviceClass query param when device class is set', () => {
		storage.local.set(DEVICE_CLASS_STORAGE_KEY, 'tablet');

		const result = appendDeviceClassParam(
			'https://contributions.guardianapis.com',
		);

		expect(result).toBe(
			'https://contributions.guardianapis.com?deviceClass=tablet',
		);
	});

	it('appends with & when URL already has query params', () => {
		storage.local.set(DEVICE_CLASS_STORAGE_KEY, 'tablet');

		const result = appendDeviceClassParam(
			'https://contributions.guardianapis.com?foo=bar',
		);

		expect(result).toBe(
			'https://contributions.guardianapis.com?foo=bar&deviceClass=tablet',
		);
	});

	it('returns original URL when device class is not set', () => {
		const result = appendDeviceClassParam(
			'https://contributions.guardianapis.com',
		);

		expect(result).toBe('https://contributions.guardianapis.com');
	});
});
