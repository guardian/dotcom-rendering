import { jest } from '@jest/globals';
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

		// Ensures we always set a hostname in the test
		// and the default hostname isn't accidentally used
		mockHostname(undefined);

		mockFrontendAssetsFullURL('https://assets.guim.co.uk/');

		process.env = { NODE_ENV: undefined, HOSTNAME: undefined };
	});

	it('localhost with development flag', () => {
		process.env.NODE_ENV = 'development';
		mockHostname('localhost');
		expect(decidePublicPath()).toEqual('http://localhost:3030/assets/');
	});

	it('localhost with production flag', () => {
		process.env.NODE_ENV = 'production';
		mockHostname('localhost');
		expect(decidePublicPath()).toEqual('/assets/');
	});

	it('localhost with no flag', () => {
		mockHostname('localhost');
		expect(decidePublicPath()).toEqual('/assets/');
	});

	it('hostname set with development flag', () => {
		process.env.NODE_ENV = 'development';
		process.env.HOSTNAME = 'some-other-hostname.com';
		mockHostname('some-other-hostname.com');
		expect(decidePublicPath()).toEqual('/assets/');
	});

	it('hostname set with production flag', () => {
		process.env.NODE_ENV = 'production';
		process.env.HOSTNAME = 'some-other-hostname.com';
		mockHostname('some-other-hostname.com');
		expect(decidePublicPath()).toEqual('/assets/');
	});

	it('hostname set with no flag', () => {
		process.env.HOSTNAME = 'some-other-hostname.com';
		mockHostname('some-other-hostname.com');
		expect(decidePublicPath()).toEqual('/assets/');
	});

	it('no hostname env or flag set', () => {
		mockHostname('theguardian.com');
		expect(decidePublicPath()).toEqual('https://assets.guim.co.uk/assets/');
	});
});
