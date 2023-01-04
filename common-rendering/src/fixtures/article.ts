import {
	ArticlePillar,
	ArticleSpecial,
	ArticleDisplay,
	ArticleDesign,
	ArticleFormat,
} from '@guardian/libs';

export const getAllThemes = (format: {
	display: ArticleDisplay;
	design: ArticleDesign;
}): Array<ArticleFormat> => {
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

export const getThemeNameAsString = (format: ArticleFormat): string => {
	const themeName =
		ArticlePillar[format.theme] ?? ArticleSpecial[format.theme];
	if (!themeName) throw new Error('Unknown theme');
	return themeName;
};
