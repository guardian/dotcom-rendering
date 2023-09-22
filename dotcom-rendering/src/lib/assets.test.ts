import { jest } from '@jest/globals';
import { BUILD_VARIANT } from '../../scripts/webpack/bundles';

const readFileSync = jest.fn();

jest.unstable_mockModule('node:fs', () => ({
	readFileSync,
}));

const {
	APPS_SCRIPT,
	decideAssetOrigin,
	getModulesBuild,
	getPathFromManifest,
	WEB,
	WEB_LEGACY_SCRIPT,
	WEB_SCHEDULED_SCRIPT,
	WEB_VARIANT_SCRIPT,
} = await import('./assets');

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
		expect('/assets/ophan.web.eb74205c979f58659ed7.js').toMatch(WEB);
	});

	it('should handle DEV environment', () => {
		expect('/assets/ophan.web.variant.js').toMatch(WEB_VARIANT_SCRIPT);
	});

	it('should handle PROD environment', () => {
		expect(
			'https://assets.guim.co.uk/assets/ophan.web.abcdefghijklmnopqrst.js',
		).toMatch(WEB);
		expect(
			'https://assets.guim.co.uk/assets/ophan.web.variant.abcdefghijklmnopqrst.js',
		).toMatch(WEB_VARIANT_SCRIPT);
		expect(
			'https://assets.guim.co.uk/assets/ophan.web.scheduled.abcdefghijklmnopqrst.js',
		).toMatch(WEB_SCHEDULED_SCRIPT);
		expect(
			'https://assets.guim.co.uk/assets/ophan.web.legacy.eb74205c979f58659ed7.js',
		).toMatch(WEB_LEGACY_SCRIPT);
		expect(
			'https://assets.guim.co.uk/assets/ophan.apps.eb74205c979f58659ed7.js',
		).toMatch(APPS_SCRIPT);
	});

	it('should handle http3 query param', () => {
		expect(
			'https://assets.guim.co.uk/assets/ophan.web.eb74205c979f58659ed7.js?http3=true',
		).toMatch(WEB);
	});
});

describe('getPathFromManifest', () => {
	beforeEach(() => {
		const assetHash = `{
			"7305.web.js": "7305.web.8cdc05567d98ebd9f67e.js",
			"356.web.js": "356.web.0a1bbdf8c7a5e5826b7c.js"
		}`;
		readFileSync.mockReturnValue(assetHash);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('returns correct hashed asset (1)', () => {
		expect(getPathFromManifest('web', '7305.web.js')).toBe(
			'/assets/7305.web.8cdc05567d98ebd9f67e.js',
		);
	});

	it('returns correct hashed asset (2)', () => {
		expect(getPathFromManifest('web', '356.web.js')).toBe(
			'/assets/356.web.0a1bbdf8c7a5e5826b7c.js',
		);
	});

	it('throws an error when the hashed asset cant be found', () => {
		expect(() => getPathFromManifest('web', 'foo.bar.js')).toThrow(
			'Missing manifest for foo.bar.js',
		);
	});
});

describe('getModulesBuild', () => {
	it('should default to web', () => {
		const build = getModulesBuild({ tests: {}, switches: {} });
		expect(build).toBe('web');
	});

	it('should support variant build when in test, if enabled', () => {
		const build = getModulesBuild({
			tests: { dcrJavascriptBundleVariant: 'variant' },
			switches: {},
		});
		const expected = BUILD_VARIANT ? 'web.variant' : 'web';
		expect(build).toBe(expected);
	});

	it('should support Ophan ESM build when in test', () => {
		const build = getModulesBuild({
			tests: { ophanEsmVariant: 'variant' },
			switches: {},
		});
		expect(build).toBe('web.ophan-esm');
	});

	it('should serve the scheduled build when in adaptive test', () => {
		const build = getModulesBuild({
			tests: { adaptiveSiteVariant: 'variant' },
			switches: {},
		});
		expect(build).toBe('web.scheduled');
	});

	it('should serve the scheduled build when switched on', () => {
		const build = getModulesBuild({
			tests: {},
			switches: { scheduler: true },
		});
		expect(build).toBe('web.scheduled');
	});
});
