import type { ArticleTheme } from '@guardian/libs';
import { ArticleSpecial, Pillar } from '@guardian/libs';
import type { CAPIPillar } from '../types/discussion';

export const pillarToString = (pillar: ArticleTheme): CAPIPillar => {
	switch (pillar) {
		case Pillar.News:
			return 'news';
		case Pillar.Opinion:
			return 'opinion';
		case Pillar.Culture:
			return 'culture';
		case Pillar.Sport:
			return 'sport';
		case Pillar.Lifestyle:
			return 'lifestyle';
		case ArticleSpecial.Labs:
			return 'labs';
		default:
			return 'news';
	}
};
