import { readFileSync } from 'node:fs';
import { BUILD_VARIANT } from '../../webpack/bundles';
import {
	APPS_SCRIPT,
	BASE_URL_DEV,
	decideAssetOrigin,
	getModulesBuild,
	getPathFromManifest,
	WEB,
	WEB_VARIANT_SCRIPT,
} from './assets';

jest.mock('node:fs');
jest.mock('node:path');

describe('decideAssetOrigin for stage', () => {
	it('PROD', () => {
		expect(decideAssetOrigin('PROD')).toEqual('https://assets.guim.co.uk/');
		expect(decideAssetOrigin('prod')).toEqual('https://assets.guim.co.uk/');
	});
	it('CODE', () => {
		expect(decideAssetOrigin('CODE')).toEqual(
			'https://assets-code.guim.co.uk/',
		);
		expect(decideAssetOrigin('code')).toEqual(
			'https://assets-code.guim.co.uk/',
		);
	});
	it('DEV', () => {
		expect(decideAssetOrigin('DEV', true)).toEqual(BASE_URL_DEV);
		expect(decideAssetOrigin('dev', true)).toEqual(BASE_URL_DEV);
		expect(decideAssetOrigin(undefined, false)).toEqual('/');
	});
});

describe('regular expression to match files', () => {
	it('should handle CI environment', () => {
		expect('/assets/index.client.web.DKLwwO4p.js').toMatch(WEB);
	});

	it('should handle DEV environment', () => {
		expect('/assets/index.client.web.variant.js').toMatch(
			WEB_VARIANT_SCRIPT,
		);
	});

	it('should match dev source paths', () => {
		expect('http://localhost:3030/assets/src/client/main.web.ts').toMatch(
			WEB,
		);
		expect('http://localhost:3030/assets/src/client/main.apps.ts').toMatch(
			APPS_SCRIPT,
		);
	});

	it('should handle PROD environment', () => {
		expect(
			'https://assets.guim.co.uk/assets/index.client.web.DKLwwO4p.js',
		).toMatch(WEB);
		expect(
			'https://assets.guim.co.uk/assets/index.client.web.variant.abcdefgh.js',
		).toMatch(WEB_VARIANT_SCRIPT);
		expect(
			'https://assets.guim.co.uk/assets/index.client.apps.DKLwwO4p.js',
		).toMatch(APPS_SCRIPT);
	});

	it('should handle http3 query param', () => {
		expect(
			'https://assets.guim.co.uk/assets/index.client.web.DKLwwO4p.js?http3=true',
		).toMatch(WEB);
	});
});

describe('getPathFromManifest', () => {
	beforeEach(() => {
		// Vite manifest format: keyed by source path with nested entry objects
		const viteManifest = JSON.stringify({
			'src/client/main.web.ts': {
				file: 'index.client.web.DKLwwO4p.js',
				name: 'index',
				src: 'src/client/main.web.ts',
				isEntry: true,
			},
		});
		(readFileSync as jest.Mock).mockReturnValue(viteManifest);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('returns correct hashed asset for entry point', () => {
		expect(getPathFromManifest('client.web', 'index.js')).toBe(
			'/assets/index.client.web.DKLwwO4p.js',
		);
	});

	it('throws an error when the manifest entry is missing', () => {
		// Use client.apps (not cached by previous test) with an empty manifest
		(readFileSync as jest.Mock).mockReturnValue(JSON.stringify({}));
		expect(() => getPathFromManifest('client.apps', 'index.js')).toThrow(
			'Missing manifest for index.js',
		);
	});
});

describe('getModulesBuild', () => {
	it('should default to web', () => {
		const build = getModulesBuild();
		const expected = BUILD_VARIANT ? 'client.web.variant' : 'client.web';
		expect(build).toBe(expected);
	});
});
