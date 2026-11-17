import type { DCRContainerPalette } from '../types/front';
import { cardHasDarkBackground, isMiniNavSupported } from './cardHelpers';

describe('isMiniNavSupported', () => {
	it.each(['boost', 'megaboost', 'gigaboost'] as const)(
		'supports %s cards',
		(boostLevel) => {
			expect(isMiniNavSupported(boostLevel)).toBe(true);
		},
	);

	it.each([undefined, 'default'] as const)(
		'does not support boost level %s',
		(boostLevel) => {
			expect(isMiniNavSupported(boostLevel)).toBe(false);
		},
	);
});

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
