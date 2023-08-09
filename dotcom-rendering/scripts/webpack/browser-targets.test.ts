import {
	getBrowserTargets,
	rawTargets,
	upgradeTargets,
} from './browser-targets';

describe('Browser targets are as expected', () => {
	test('raw targets from browserslist', () => {
		expect(rawTargets).toEqual({
			chrome: '70.0.0',
			edge: '99.0.0',
			firefox: '78.0.0',
			ios: '10.3.0',
			opera: '73.0.0',
			safari: '11.1.0',
			samsung: '16.0.0',
		});
	});
	test('upgrade targets from browserslist', () => {
		expect(getBrowserTargets()).toEqual({
			chrome: '70.0.0',
			edge: '99.0.0',
			firefox: '78.0.0',
			ios: '11', // upgraded
			opera: '73.0.0',
			safari: '11.1.0', // upgraded
			samsung: '16.0.0',
		});
	});
});

describe('Upgrade browser targets', () => {
	test('upgrade targets for unsupported earlier versions', () => {
		// ios < 11
		expect(upgradeTargets({ ios: '9.11.0' })).toEqual({ ios: '11' });
		expect(upgradeTargets({ ios: '10' })).toEqual({ ios: '11' });
		expect(upgradeTargets({ ios: '10.3' })).toEqual({ ios: '11' });
		expect(upgradeTargets({ ios: '10.9.9' })).toEqual({ ios: '11' });
		// safari < 11.1
		expect(upgradeTargets({ safari: '10.11' })).toEqual({
			safari: '11.1.0',
		});
		expect(upgradeTargets({ safari: '11' })).toEqual({ safari: '11.1.0' });
		expect(upgradeTargets({ safari: '11.0' })).toEqual({
			safari: '11.1.0',
		});
		expect(upgradeTargets({ safari: '11.0.11' })).toEqual({
			safari: '11.1.0',
		});
		expect(upgradeTargets({ safari: '11.0.11' })).toEqual({
			safari: '11.1.0',
		});
	});
	test('do not modify targets for supported later versions', () => {
		// ios >= 11
		expect(upgradeTargets({ ios: '11' })).toEqual({ ios: '11' });
		expect(upgradeTargets({ ios: '11.0' })).toEqual({ ios: '11.0' });
		expect(upgradeTargets({ ios: '11.0.0' })).toEqual({ ios: '11.0.0' });
		expect(upgradeTargets({ ios: '12' })).toEqual({ ios: '12' });
		expect(upgradeTargets({ ios: '14.10.1' })).toEqual({ ios: '14.10.1' });
		// safari >= 11.1
		expect(upgradeTargets({ safari: '11.1' })).toEqual({ safari: '11.1' });
		expect(upgradeTargets({ safari: '11.1.0' })).toEqual({
			safari: '11.1.0',
		});
		expect(upgradeTargets({ safari: '12.10.0' })).toEqual({
			safari: '12.10.0',
		});
	});
});
