import type { DCRContainerPalette } from '../types/front';
import { cardHasDarkBackground } from './cardHelpers';

describe('cardHasDarkBackground', () => {
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

	it.each(testCases)(
		'returns $expectedResult for $format format, $containerPalette containerPalette',
		({ containerPalette, expectedResult }) => {
			expect(cardHasDarkBackground(containerPalette)).toBe(
				expectedResult,
			);
		},
	);
});
