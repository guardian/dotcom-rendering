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
	// @ts-expect-error -- ArticleFormat.theme is a union of ArticlePillar and ArticleSpecial, one of these lookups will return a valid name
	return ArticlePillar[format.theme] ?? ArticleSpecial[format.theme];
};
