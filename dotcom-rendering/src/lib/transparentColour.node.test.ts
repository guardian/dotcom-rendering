import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { transparentColour } from './transparentColour';

void describe('transparentColour', () => {
	const validHexColours = [
		['#000000', 'rgba(0, 0, 0, 0.5)'],
		['#C70000', 'rgba(199, 0, 0, 0.5)'],
		['#aabbcc', 'rgba(170, 187, 204, 0.5)'],
		['#ffffff', 'rgba(255, 255, 255, 0.5)'],
	] as const;

	for (const [hex, output] of validHexColours) {
		void it(`For valid hex ${hex}, return ${output}`, () => {
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
		void it(`For short hex ${hex}, return ${output}`, () => {
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
		void it(`For invalid hex ${hex}, return rgba(127, 127, 127, 0.5)`, () => {
			assert.equal(transparentColour(hex), 'rgba(127, 127, 127, 0.5)');
		});
	}
});
