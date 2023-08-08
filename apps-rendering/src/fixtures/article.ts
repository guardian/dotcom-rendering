// ----- Imports ----- //

import type {
	ArticleDesign,
	ArticleDisplay,
	ArticleFormat,
} from '@guardian/libs';
import { ArticlePillar, ArticleSpecial } from '@guardian/libs';
import { themeToString } from 'articleFormat';

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
		{ ...format, theme: ArticleSpecial.SpecialReportAlt },
	];
};

const getThemeNameAsString = (format: ArticleFormat): string =>
	themeToString(format.theme);

// ----- Exports ----- //

export { getAllThemes, getThemeNameAsString };
