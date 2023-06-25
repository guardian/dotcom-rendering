import { ArticlePillar, ArticleSpecial } from '@guardian/libs';

export const themeToPillar = (
	theme?: ArticleTheme,
): ArticlePillar | undefined => {
	switch (theme) {
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
		case ArticlePillar.News:
			return ArticlePillar.News;
		case ArticlePillar.Sport:
			return ArticlePillar.Sport;
		case ArticlePillar.Opinion:
			return ArticlePillar.Opinion;
		case ArticlePillar.Culture:
			return ArticlePillar.Culture;
		case ArticlePillar.Lifestyle:
			return ArticlePillar.Lifestyle;
		default:
			return undefined;
	}
};
