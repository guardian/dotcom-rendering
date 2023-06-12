import type { FEArticleType } from '../types/frontend';
import { decideNavTheme } from './decideNavTheme';

export const getCurrentPillar = (article: FEArticleType): ArticleTheme => {
	const currentPillar =
		(article.nav.currentPillarTitle &&
			(article.nav.currentPillarTitle.toLowerCase() as LegacyPillar)) ||
		article.pillar;
	return decideNavTheme(currentPillar);
};
