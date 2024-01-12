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
		expect(decideAssetOrigin('PROD')).toEqual('https://assets.guim.co.uk/');
		expect(decideAssetOrigin('PROD')).toEqual('https://assets.guim.co.uk/');
		expect(decideAssetOrigin('prod')).toEqual('https://assets.guim.co.uk/');
	});
	it('CODE', () => {
		expect(decideAssetOrigin('CODE')).toEqual(
			'https://assets-code.guim.co.uk/',
		);
		expect(decideAssetOrigin('CODE')).toEqual(
			'https://assets-code.guim.co.uk/',
		);
		expect(decideAssetOrigin('code')).toEqual(
			'https://assets-code.guim.co.uk/',
		);
	});
	it('DEV', () => {
		expect(decideAssetOrigin('DEV')).toEqual('/');
		expect(decideAssetOrigin(undefined)).toEqual('/');
	});
});

describe('regular expression to match files', () => {
	it('should handle CI environment', () => {
		expect('/assets/ophan.client.web.eb74205c979f58659ed7.js').toMatch(WEB);
	});

	it('should handle DEV environment', () => {
		expect('/assets/ophan.client.web.variant.js').toMatch(
			WEB_VARIANT_SCRIPT,
		);
	});

	it('should handle PROD environment', () => {
		expect(
			'https://assets.guim.co.uk/assets/ophan.client.web.abcdefghijklmnopqrst.js',
		).toMatch(WEB);
		expect(
			'https://assets.guim.co.uk/assets/ophan.client.web.variant.abcdefghijklmnopqrst.js',
		).toMatch(WEB_VARIANT_SCRIPT);
		expect(
			'https://assets.guim.co.uk/assets/ophan.client.web.legacy.eb74205c979f58659ed7.js',
		).toMatch(WEB_LEGACY_SCRIPT);
		expect(
			'https://assets.guim.co.uk/assets/ophan.client.apps.eb74205c979f58659ed7.js',
		).toMatch(APPS_SCRIPT);
	});

	it('should handle http3 query param', () => {
		expect(
			'https://assets.guim.co.uk/assets/ophan.client.web.eb74205c979f58659ed7.js?http3=true',
		).toMatch(WEB);
	});
});

describe('getPathFromManifest', () => {
	beforeEach(() => {
		const assetHash = `{
			"7305.client.web.js": "7305.client.web.8cdc05567d98ebd9f67e.js",
			"356.client.web.js": "356.client.web.0a1bbdf8c7a5e5826b7c.js"
		}`;
		(readFileSync as jest.Mock).mockReturnValue(assetHash);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('returns correct hashed asset (1)', () => {
		expect(getPathFromManifest('client.web', '7305.client.web.js')).toBe(
			'/assets/7305.client.web.8cdc05567d98ebd9f67e.js',
		);
	});

	it('returns correct hashed asset (2)', () => {
		expect(getPathFromManifest('client.web', '356.client.web.js')).toBe(
			'/assets/356.client.web.0a1bbdf8c7a5e5826b7c.js',
		);
	});

	it('throws an error when the hashed asset cant be found', () => {
		expect(() => getPathFromManifest('client.web', 'foo.bar.js')).toThrow(
			'Missing manifest for foo.bar.js',
		);
	});
});

describe('getModulesBuild', () => {
	it('should default to web', () => {
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
