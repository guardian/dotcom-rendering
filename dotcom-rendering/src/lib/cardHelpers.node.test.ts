import assert from 'node:assert/strict';
import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import type { DCRContainerPalette } from '../types/front';
import { cardHasDarkBackground } from './cardHelpers';

void nodeDescribe('cardHasDarkBackground', () => {
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
		void nodeIt(
			`returns ${expectedResult} for $format format, ${containerPalette} containerPalette`,
			() => {
				assert.equal(
					cardHasDarkBackground(containerPalette),
					expectedResult,
				);
			},
		);
	}
});
