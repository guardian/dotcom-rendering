import { decidePublicPath } from './decidePublicPath';

const mockHostname = (hostname: string | undefined) => {
	Object.defineProperty(window, 'location', {
		value: {
			hostname,
		},
		writable: true,
	});
};

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

		mockHostname(undefined);

		mockFrontendAssetsFullURL('https://assets.guim.co.uk/');

		process.env = { NODE_ENV: undefined, HOSTNAME: undefined };
	});

	it('with development flag', () => {
		process.env.NODE_ENV = 'development';
		expect(decidePublicPath()).toEqual('/assets/');
	});

	it('with production flag', () => {
		process.env.NODE_ENV = 'production';
		expect(decidePublicPath()).toEqual('https://assets.guim.co.uk/assets/');
	});

	it('with production flag and localhost', () => {
		process.env.NODE_ENV = 'production';
		mockHostname('localhost');
		expect(decidePublicPath()).toEqual('/assets/');
	});

	it('with no flag', () => {
		expect(decidePublicPath()).toEqual('https://assets.guim.co.uk/assets/');
	});
});
