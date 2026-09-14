import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { DCRContainerPalette } from '../types/front';
import { cardHasDarkBackground } from './cardHelpers';

void describe('cardHasDarkBackground', () => {
	const testCases = [
		{
			containerPalette: undefined,
			expectedResult: false,
		},
		{
			containerPalette: undefined,
			expectedResult: false,
		},
		{
			containerPalette: 'Branded',
			expectedResult: false,
		},
		{
			containerPalette: 'Branded',
			expectedResult: false,
		},
		{
			containerPalette: 'SombrePalette',
			expectedResult: true,
		},
		{
			containerPalette: 'SombrePalette',
			expectedResult: true,
		},
	] satisfies {
		containerPalette?: DCRContainerPalette;
		expectedResult: boolean;
	}[];

	for (const { containerPalette, expectedResult } of testCases) {
		void it(`returns ${expectedResult} for $format format, ${containerPalette} containerPalette`, () => {
			assert.equal(
				cardHasDarkBackground(containerPalette),
				expectedResult,
			);
		});
	}
});
