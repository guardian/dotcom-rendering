// We need to test the SDC request functions to ensure they properly append deviceClass and force parameters.

describe('sdcRequests', () => {
	const originalFetch = global.fetch;
	const originalPlatform = navigator.platform;
	const originalMaxTouchPoints = navigator.maxTouchPoints;

	beforeEach(() => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ data: null }),
		});
		// Mock window.location.search
		Object.defineProperty(window, 'location', {
			value: {
				search: '',
			},
			writable: true,
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

	describe('getEpic', () => {
		it('appends deviceClass query param when device is iPad', async () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 1,
				configurable: true,
			});

			const { getEpic } = await import('./sdcRequests');
			await getEpic('https://contributions.guardianapis.com', {
				targeting: {},
			} as never);

			expect(global.fetch).toHaveBeenCalledWith(
				'https://contributions.guardianapis.com/epic?deviceClass=tablet',
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: '{"targeting":{}}',
				},
			);
		});

		it('does not append deviceClass when not iPad', async () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 0,
				configurable: true,
			});

			const { getEpic } = await import('./sdcRequests');
			await getEpic('https://contributions.guardianapis.com', {
				targeting: {},
			} as never);

			expect(global.fetch).toHaveBeenCalledWith(
				'https://contributions.guardianapis.com/epic',
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: '{"targeting":{}}',
				},
			);
		});

		it('appends force parameter when present in URL', async () => {
			Object.defineProperty(window, 'location', {
				value: {
					search: '?force-epic=control',
				},
				writable: true,
			});

			const { getEpic } = await import('./sdcRequests');
			await getEpic('https://contributions.guardianapis.com', {
				targeting: {},
			} as never);

			expect(global.fetch).toHaveBeenCalledWith(
				'https://contributions.guardianapis.com/epic?force=control',
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: '{"targeting":{}}',
				},
			);
		});

		it('appends both deviceClass and force parameters when both are present', async () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 1,
				configurable: true,
			});
			Object.defineProperty(window, 'location', {
				value: {
					search: '?force-epic=variant',
				},
				writable: true,
			});

			const { getEpic } = await import('./sdcRequests');
			await getEpic('https://contributions.guardianapis.com', {
				targeting: {},
			} as never);

			expect(global.fetch).toHaveBeenCalledWith(
				'https://contributions.guardianapis.com/epic?deviceClass=tablet&force=variant',
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: '{"targeting":{}}',
				},
			);
		});
	});

	describe('getBanner', () => {
		it('appends deviceClass query param when device is iPad', async () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 1,
				configurable: true,
			});

			const { getBanner } = await import('./sdcRequests');
			await getBanner('https://contributions.guardianapis.com', {
				targeting: {},
			} as never);

			expect(global.fetch).toHaveBeenCalledWith(
				'https://contributions.guardianapis.com/banner?deviceClass=tablet',
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: '{"targeting":{}}',
				},
			);
		});
	});

	describe('getLiveblogEpic', () => {
		it('appends deviceClass query param when device is iPad', async () => {
			Object.defineProperty(navigator, 'platform', {
				value: 'MacIntel',
				configurable: true,
			});
			Object.defineProperty(navigator, 'maxTouchPoints', {
				value: 1,
				configurable: true,
			});

			const { getLiveblogEpic } = await import('./sdcRequests');
			await getLiveblogEpic('https://contributions.guardianapis.com', {
				targeting: {},
			} as never);

			expect(global.fetch).toHaveBeenCalledWith(
				'https://contributions.guardianapis.com/liveblog-epic?deviceClass=tablet',
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: '{"targeting":{}}',
				},
			);
		});
	});
});
