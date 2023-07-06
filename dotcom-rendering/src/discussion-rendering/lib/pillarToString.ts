import type { ArticleTheme } from '@guardian/libs';
import { ArticlePillar, ArticleSpecial } from '@guardian/libs';
import type { CAPIPillar } from '../discussionTypes';

export const pillarToString = (pillar: ArticleTheme): CAPIPillar => {
	switch (pillar) {
		case ArticlePillar.News:
			return 'news';
		case ArticlePillar.Opinion:
			return 'opinion';
		case ArticlePillar.Culture:
			return 'culture';
		case ArticlePillar.Sport:
			return 'sport';
		case ArticlePillar.Lifestyle:
			return 'lifestyle';
		case ArticleSpecial.Labs:
			return 'labs';
		default:
			return 'news';
	}
};
