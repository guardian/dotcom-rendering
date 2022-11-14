import type { FEArticleType } from '../../types/frontend';
import { decideNavTheme } from './decideNavTheme';

export const getCurrentPillar = (CAPIArticle: FEArticleType): ArticleTheme => {
	const currentPillar =
		(CAPIArticle.nav.currentPillarTitle &&
			(CAPIArticle.nav.currentPillarTitle.toLowerCase() as LegacyPillar)) ||
		CAPIArticle.pillar;
	return decideNavTheme(currentPillar);
};
