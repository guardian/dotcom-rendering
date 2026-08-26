// We need to test the SDC request functions to ensure they properly append deviceClass and force parameters.

describe('sdcRequests', () => {
	const originalFetch = global.fetch;
	const originalPlatform = navigator.platform;
	const originalMaxTouchPoints = navigator.maxTouchPoints;
	const originalSearch = window.location.search;
	const setLocationSearch = (search: string) => {
		window.history.replaceState(
			{},
			'',
			`${window.location.pathname}${search}`,
		);
	};

	beforeEach(() => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve({ data: null }),
		});
		setLocationSearch('');
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
		setLocationSearch(originalSearch);
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
			setLocationSearch('?force-epic=control');

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
			setLocationSearch('?force-epic=variant');

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

		it('appends preview parameter when present in URL', async () => {
			setLocationSearch('?preview-epic=control');

			const { getEpic } = await import('./sdcRequests');
			await getEpic('https://contributions.guardianapis.com', {
				targeting: {},
			} as never);

			expect(global.fetch).toHaveBeenCalledWith(
				'https://contributions.guardianapis.com/epic?preview=control',
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
					},
					body: '{"targeting":{}}',
				},
			);
		});

		it('does not append force when neither is present', async () => {
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
