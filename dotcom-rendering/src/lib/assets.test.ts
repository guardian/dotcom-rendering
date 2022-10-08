import {
	decideAssetOrigin,
	LEGACY_SCRIPT,
	MODERN_SCRIPT,
	VARIANT_SCRIPT,
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
		expect('/assets/ophan.modern.eb74205c979f58659ed7.js').toMatch(
			MODERN_SCRIPT,
		);
	});

	it('should handle DEV environment', () => {
		expect('/assets/ophan.variant.js').toMatch(VARIANT_SCRIPT);
	});

	it('should handle PROD environment', () => {
		expect(
			'https://assets.guim.co.uk/assets/ophan.legacy.eb74205c979f58659ed7.js',
		).toMatch(LEGACY_SCRIPT);
	});

	it('should handle http3 query param', () => {
		expect(
			'https://assets.guim.co.uk/assets/ophan.modern.eb74205c979f58659ed7.js?http3=true',
		).toMatch(MODERN_SCRIPT);
	});
});
