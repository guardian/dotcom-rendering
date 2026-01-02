import { storage } from '@guardian/libs';

const DEVICE_CLASS_STORAGE_KEY = 'gu.deviceClass';

// We need to test the buildSDCUrl function indirectly since it's not exported.
// We can test it by mocking fetch and checking the URL that's passed to it.

describe('sdcUrl', () => {
	const originalFetch = global.fetch;

	beforeEach(() => {
		global.fetch = jest.fn().mockResolvedValue({
			json: () => Promise.resolve({ data: null }),
		});
	});

	afterEach(() => {
		storage.local.remove(DEVICE_CLASS_STORAGE_KEY);
		global.fetch = originalFetch;
	});

	describe('getEpicWithDeviceClass', () => {
		it('appends deviceClass query param when device class is set', async () => {
			storage.local.set(DEVICE_CLASS_STORAGE_KEY, 'tablet');

			const { getEpicWithDeviceClass } = await import('./sdcUrl');
			await getEpicWithDeviceClass(
				'https://contributions.guardianapis.com',
				{ targeting: {} } as never,
			);

			expect(global.fetch).toHaveBeenCalledWith(
				'https://contributions.guardianapis.com/epic?deviceClass=tablet',
				expect.any(Object),
			);
		});

		it('does not append deviceClass when not set', async () => {
			const { getEpicWithDeviceClass } = await import('./sdcUrl');
			await getEpicWithDeviceClass(
				'https://contributions.guardianapis.com',
				{ targeting: {} } as never,
			);

			expect(global.fetch).toHaveBeenCalledWith(
				'https://contributions.guardianapis.com/epic',
				expect.any(Object),
			);
		});
	});

	describe('getBannerWithDeviceClass', () => {
		it('appends deviceClass query param when device class is set', async () => {
			storage.local.set(DEVICE_CLASS_STORAGE_KEY, 'tablet');

			const { getBannerWithDeviceClass } = await import('./sdcUrl');
			await getBannerWithDeviceClass(
				'https://contributions.guardianapis.com',
				{ targeting: {} } as never,
			);

			expect(global.fetch).toHaveBeenCalledWith(
				'https://contributions.guardianapis.com/banner?deviceClass=tablet',
				expect.any(Object),
			);
		});
	});

	describe('getLiveblogEpicWithDeviceClass', () => {
		it('appends deviceClass query param when device class is set', async () => {
			storage.local.set(DEVICE_CLASS_STORAGE_KEY, 'tablet');

			const { getLiveblogEpicWithDeviceClass } = await import('./sdcUrl');
			await getLiveblogEpicWithDeviceClass(
				'https://contributions.guardianapis.com',
				{ targeting: {} } as never,
			);

			expect(global.fetch).toHaveBeenCalledWith(
				'https://contributions.guardianapis.com/liveblog-epic?deviceClass=tablet',
				expect.any(Object),
			);
		});
	});
});
