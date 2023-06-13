import { ArticlePillar, ArticleSpecial } from '@guardian/libs';

export const decideNavTheme = (pillar: LegacyPillar): ArticleTheme => {
	switch (pillar) {
		case 'news':
			return ArticlePillar.News;
		case 'opinion':
			return ArticlePillar.Opinion;
		case 'sport':
			return ArticlePillar.Sport;
		case 'culture':
			return ArticlePillar.Culture;
		case 'lifestyle':
			return ArticlePillar.Lifestyle;
		case 'labs':
			return ArticleSpecial.Labs;
		default:
			return ArticlePillar.News;
	}
};
