import { decidePublicPath } from './decidePublicPath';

const mockFrontendAssetsFullURL = (frontendAssetsFullURL: string) => {
	Object.defineProperty(window, 'guardian', {
		value: {
			config: {
				frontendAssetsFullURL,
			},
		},
		writable: true,
	});
};

describe('decidePublicPath', () => {
	beforeEach(() => {
		jest.resetModules();

		mockFrontendAssetsFullURL('https://assets.guim.co.uk/');

		process.env = { USE_LOCAL_ASSETS: undefined };
	});

	it('with USE_LOCAL_ASSETS flag', () => {
		process.env.USE_LOCAL_ASSETS = 'true';
		expect(decidePublicPath()).toEqual('/assets/');
	});

	it('with no flag', () => {
		expect(decidePublicPath()).toEqual('https://assets.guim.co.uk/assets/');
	});
});
