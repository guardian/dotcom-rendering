import type { Pillar } from '@guardian/libs';
import type { FEArticleType } from '../types/frontend';
import { decideNavPillar } from './decideNavPillar';

export const getCurrentPillar = (
	article: FEArticleType,
): Pillar | undefined => {
	const currentPillar =
		(article.nav.currentPillarTitle &&
			(article.nav.currentPillarTitle.toLowerCase() as LegacyPillar)) ||
		article.pillar;
	return decideNavPillar(currentPillar);
};
