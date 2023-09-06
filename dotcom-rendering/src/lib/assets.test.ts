import { BUILD_VARIANT } from '../../scripts/webpack/bundles';
import {
	APPS_SCRIPT,
	decideAssetOrigin,
	getModulesBuild,
	WEB,
	WEB_LEGACY_SCRIPT,
	WEB_SCHEDULED_SCRIPT,
	WEB_VARIANT_SCRIPT,
} from './assets';

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
		expect('/assets/web/ophan.eb74205c979f58659ed7.js').toMatch(WEB);
	});

	it('should handle DEV environment', () => {
		expect('/assets/web.variant/ophan.js').toMatch(WEB_VARIANT_SCRIPT);
	});

	it('should handle PROD environment', () => {
		expect(
			'https://assets.guim.co.uk/assets/web/ophan.abcdefghijklmnopqrst.js',
		).toMatch(WEB);
		expect(
			'https://assets.guim.co.uk/assets/web.variant/ophan.abcdefghijklmnopqrst.js',
		).toMatch(WEB_VARIANT_SCRIPT);
		expect(
			'https://assets.guim.co.uk/assets/web.scheduled/ophan.abcdefghijklmnopqrst.js',
		).toMatch(WEB_SCHEDULED_SCRIPT);
		expect(
			'https://assets.guim.co.uk/assets/web.legacy/ophan.eb74205c979f58659ed7.js',
		).toMatch(WEB_LEGACY_SCRIPT);
		expect(
			'https://assets.guim.co.uk/assets/apps/ophan.eb74205c979f58659ed7.js',
		).toMatch(APPS_SCRIPT);
	});

	it('should handle http3 query param', () => {
		expect(
			'https://assets.guim.co.uk/assets/web/ophan.eb74205c979f58659ed7.js?http3=true',
		).toMatch(WEB);
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
