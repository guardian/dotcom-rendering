import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	Pillar,
} from '@guardian/libs';
import type { DCRContainerPalette } from '../types/front';
import { cardHasDarkBackground } from './cardHelpers';

describe('cardHasDarkBackground', () => {
	const standardArticleFormat = {
		design: ArticleDesign.Standard,
		display: ArticleDisplay.Standard,
		theme: Pillar.News,
	};

	const photoEssayFormat = {
		...standardArticleFormat,
		design: ArticleDesign.PhotoEssay,
	};

	const galleryFormat = {
		...standardArticleFormat,
		design: ArticleDesign.Gallery,
	};

	const testCases = [
		{
			format: photoEssayFormat,
			containerPalette: undefined,
			expectedResult: false,
		},
		{
			format: galleryFormat,
			containerPalette: undefined,
			expectedResult: true,
		},
		{
			format: photoEssayFormat,
			containerPalette: 'Branded',
			expectedResult: false,
		},
		{
			format: galleryFormat,
			containerPalette: 'Branded',
			expectedResult: false,
		},
		{
			format: photoEssayFormat,
			containerPalette: 'SombrePalette',
			expectedResult: true,
		},
		{
			format: galleryFormat,
			containerPalette: 'SombrePalette',
			expectedResult: true,
		},
	] satisfies {
		format: ArticleFormat;
		containerPalette?: DCRContainerPalette;
		expectedResult: boolean;
	}[];

	it.each(testCases)(
		'returns $expectedResult for $format format, $containerPalette containerPalette',
		({ format, containerPalette, expectedResult }) => {
			expect(cardHasDarkBackground(format, containerPalette)).toBe(
				expectedResult,
			);
		},
	);
});
