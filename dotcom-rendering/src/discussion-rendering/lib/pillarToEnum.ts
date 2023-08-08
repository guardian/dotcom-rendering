import type { ArticleTheme } from '@guardian/libs';
import { ArticleSpecial, Pillar } from '@guardian/libs';
import type { CAPIPillar } from '../discussionTypes';

export const pillarToEnum = (pillar: CAPIPillar): ArticleTheme => {
	switch (pillar) {
		case 'opinion':
			return Pillar.Opinion;
		case 'culture':
			return Pillar.Culture;
		case 'sport':
			return Pillar.Sport;
		case 'lifestyle':
			return Pillar.Lifestyle;
		case 'labs':
			return ArticleSpecial.Labs;
		case 'news':
		default:
			return Pillar.News;
	}
};
