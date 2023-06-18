import { ArticlePillar, ArticleSpecial } from '@guardian/libs';

export const themeToPillar = (
	theme: ArticleTheme = ArticlePillar.News,
): ArticlePillar => {
	switch (theme) {
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
		case ArticleSpecial.Labs:
			return ArticlePillar.News;
		default:
			return theme;
	}
};
