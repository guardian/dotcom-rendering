import { readFileSync } from 'node:fs';
import { BUILD_VARIANT } from '../../webpack/bundles';
import {
	APPS_SCRIPT,
	decideAssetOrigin,
	getModulesBuild,
	getPathFromManifest,
	WEB,
	WEB_LEGACY_SCRIPT,
	WEB_VARIANT_SCRIPT,
} from './assets';

jest.mock('node:fs');
jest.mock('node:path');

describe('decideAssetOrigin for stage', () => {
	it('PROD', () => {
		expect(decideAssetOrigin('PROD', false)).toEqual(
			'https://assets.guim.co.uk/',
		);
		expect(decideAssetOrigin('PROD', true)).toEqual(
			'https://assets.guim.co.uk/',
		);
		expect(decideAssetOrigin('prod', true)).toEqual(
			'https://assets.guim.co.uk/',
		);
	});
	it('CODE', () => {
		expect(decideAssetOrigin('CODE', false)).toEqual(
			'https://assets-code.guim.co.uk/',
		);
		expect(decideAssetOrigin('CODE', true)).toEqual(
			'https://assets-code.guim.co.uk/',
		);
		expect(decideAssetOrigin('code', true)).toEqual(
			'https://assets-code.guim.co.uk/',
		);
	});
	it('DEV', () => {
		expect(decideAssetOrigin('DEV', false)).toEqual('/');
		expect(decideAssetOrigin(undefined, false)).toEqual('/');
		expect(decideAssetOrigin('DEV', true)).toEqual(
			'http://localhost:3030/',
		);
		expect(decideAssetOrigin('dev', true)).toEqual(
			'http://localhost:3030/',
		);
		expect(decideAssetOrigin(undefined, true)).toEqual(
			'http://localhost:3030/',
		);
	});
});

describe('regular expression to match files', () => {
	it('should handle CI environment', () => {
		expect('/assets/client.web/ophan.eb74205c979f58659ed7.js').toMatch(WEB);
	});

	it('should handle DEV environment', () => {
		expect('/assets/client.web.variant/ophan.js').toMatch(
			WEB_VARIANT_SCRIPT,
		);
	});

	it('should handle PROD environment', () => {
		expect(
			'https://assets.guim.co.uk/assets/client.web/ophan.abcdefghijklmnopqrst.js',
		).toMatch(WEB);
		expect(
			'https://assets.guim.co.uk/assets/client.web.variant/ophan.abcdefghijklmnopqrst.js',
		).toMatch(WEB_VARIANT_SCRIPT);
		expect(
			'https://assets.guim.co.uk/assets/client.web.legacy/ophan.eb74205c979f58659ed7.js',
		).toMatch(WEB_LEGACY_SCRIPT);
		expect(
			'https://assets.guim.co.uk/assets/client.apps/ophan.eb74205c979f58659ed7.js',
		).toMatch(APPS_SCRIPT);
	});

	it('should handle http3 query param', () => {
		expect(
			'https://assets.guim.co.uk/assets/client.web/ophan.eb74205c979f58659ed7.js?http3=true',
		).toMatch(WEB);
	});
});

describe('getPathFromManifest', () => {
	beforeEach(() => {
		const assetHash = `{
			"7305.js": "7305.8cdc05567d98ebd9f67e.js",
			"356.js": "356.0a1bbdf8c7a5e5826b7c.js"
		}`;
		(readFileSync as jest.Mock).mockReturnValue(assetHash);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('returns correct hashed asset (1)', () => {
		expect(getPathFromManifest('client.web', '7305.js')).toBe(
			'/assets/client.web/7305.8cdc05567d98ebd9f67e.js',
		);
	});

	it('returns correct hashed asset (2)', () => {
		expect(getPathFromManifest('client.web', '356.js')).toBe(
			'/assets/client.web/356.0a1bbdf8c7a5e5826b7c.js',
		);
	});

	it('throws an error when the hashed asset cant be found', () => {
		expect(() => getPathFromManifest('client.web', 'foo.bar.js')).toThrow(
			'Missing manifest for foo.bar.js',
		);
	});
});

describe('getModulesBuild', () => {
	it('should default to client.web', () => {
		const build = getModulesBuild({ tests: {}, switches: {} });
		expect(build).toBe('client.web');
	});

	it('should support variant build when in test, if enabled', () => {
		const build = getModulesBuild({
			tests: { dcrJavascriptBundleVariant: 'variant' },
			switches: {},
		});
		const expected = BUILD_VARIANT ? 'client.web.variant' : 'client.web';
		expect(build).toBe(expected);
	});
});
