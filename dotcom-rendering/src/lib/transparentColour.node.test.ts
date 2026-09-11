import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import { transparentColour } from './transparentColour';

void nodeDescribe('transparentColour', () => {
	const validHexColours = [
		['#000000', 'rgba(0, 0, 0, 0.5)'],
		['#C70000', 'rgba(199, 0, 0, 0.5)'],
		['#aabbcc', 'rgba(170, 187, 204, 0.5)'],
		['#ffffff', 'rgba(255, 255, 255, 0.5)'],
	] as const;

	for (const [hex, output] of validHexColours) {
		void nodeIt(`For valid hex ${hex}, return ${output}`, () => {
			assert.equal(transparentColour(hex), output);
		});
	}

	const shortHexColours = [
		['#000', 'rgba(0, 0, 0, 0.5)'],
		['#c00', 'rgba(204, 0, 0, 0.5)'],
		['#abc', 'rgba(170, 187, 204, 0.5)'],
		['#fff', 'rgba(255, 255, 255, 0.5)'],
	] as const;

	for (const [hex, output] of shortHexColours) {
		void nodeIt(`For short hex ${hex}, return ${output}`, () => {
			assert.equal(transparentColour(hex), output);
		});
	}

	const invalidHexColours = [
		'---',
		'#ab',
		'#abcd',
		'#gggggg',
		'-ffffff',
		'rgb(0,0,0)',
	];

	for (const hex of invalidHexColours) {
		void nodeIt(
			`For invalid hex ${hex}, return rgba(127, 127, 127, 0.5)`,
			() => {
				assert.equal(
					transparentColour(hex),
					'rgba(127, 127, 127, 0.5)',
				);
			},
		);
	}
});
