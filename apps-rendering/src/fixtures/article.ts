// ----- Imports ----- //

import {
	type ArticleDesign,
	type ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '../articleFormat';
import { themeToString } from 'articleFormat';

// ----- Functions ----- //

const getAllThemes = (format: {
	display: ArticleDisplay;
	design: ArticleDesign;
}): ArticleFormat[] => {
	return [
		{ ...format, theme: Pillar.News },
		{ ...format, theme: Pillar.Sport },
		{ ...format, theme: Pillar.Culture },
		{ ...format, theme: Pillar.Lifestyle },
		{ ...format, theme: Pillar.Opinion },
		{ ...format, theme: ArticleSpecial.SpecialReport },
		{ ...format, theme: ArticleSpecial.Labs },
		{ ...format, theme: ArticleSpecial.SpecialReportAlt },
	];
};

const getThemeNameAsString = (format: ArticleFormat): string =>
	themeToString(format.theme);

// ----- Exports ----- //

export { getAllThemes, getThemeNameAsString };
