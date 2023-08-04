import type { Pillar } from '@guardian/libs';
import type { FEArticleType } from '../types/frontend.ts';
import { decideNavPillar } from './decideNavPillar.ts';

export const getCurrentPillar = (
	article: FEArticleType,
): Pillar | undefined => {
	const currentPillar =
		(article.nav.currentPillarTitle &&
			(article.nav.currentPillarTitle.toLowerCase() as LegacyPillar)) ||
		article.pillar;
	return decideNavPillar(currentPillar);
};
