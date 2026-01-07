// We need to test the buildSDCUrl function indirectly since it's not exported.
// We can test it by mocking fetch and checking the URL that's passed to it.

describe('sdcUrl', () => {
	const originalFetch = global.fetch;
	const originalPlatform = navigator.platform;
	const originalMaxTouchPoints = navigator.maxTouchPoints;

	beforeEach(() => {
		global.fetch = jest.fn().mockResolvedValue({
			json: () => Promise.resolve({ data: null }),
		});
	});

	afterEach(() => {
		Object.defineProperty(navigator, 'platform', {
			value: originalPlatform,
			configurable: true,
		});
		Object.defineProperty(navigator, 'maxTouchPoints', {
			value: originalMaxTouchPoints,
			configurable: true,
		});
		global.fetch = originalFetch;
	});

	describe('getEpicWithDeviceClass', () => {
		it('appends deviceClass query param when device is iPad', async () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 1,
				configurable: true,
			});

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
		it('appends deviceClass query param when device is iPad', async () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 1,
				configurable: true,
			});

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
		it('appends deviceClass query param when device is iPad', async () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 1,
				configurable: true,
			});

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
