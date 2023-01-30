// ----- Imports ----- //

import type {
	ArticleDesign,
	ArticleDisplay,
	ArticleFormat,
} from '@guardian/libs';
import { ArticlePillar, ArticleSpecial } from '@guardian/libs';

// ----- Functions ----- //

const getAllThemes = (format: {
	display: ArticleDisplay;
	design: ArticleDesign;
}): ArticleFormat[] => {
	return [
		{ ...format, theme: ArticlePillar.News },
		{ ...format, theme: ArticlePillar.Sport },
		{ ...format, theme: ArticlePillar.Culture },
		{ ...format, theme: ArticlePillar.Lifestyle },
		{ ...format, theme: ArticlePillar.Opinion },
		{ ...format, theme: ArticleSpecial.SpecialReport },
		{ ...format, theme: ArticleSpecial.Labs },
	];
};

const getThemeNameAsString = (format: ArticleFormat): string => {
	const themeName =
		ArticlePillar[format.theme] ?? ArticleSpecial[format.theme];
	if (!themeName) throw new Error('Unknown theme');
	return themeName;
};

// ----- Exports ----- //

export { getAllThemes, getThemeNameAsString };
