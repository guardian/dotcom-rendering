import type { Pillar } from '@guardian/libs';
import type { DCRArticle } from '../types/frontend';
import { decideNavPillar } from './decideNavPillar';

export const getCurrentPillar = (article: DCRArticle): Pillar | undefined => {
	const currentPillar =
		(article.nav.currentPillarTitle &&
			(article.nav.currentPillarTitle.toLowerCase() as LegacyPillar)) ||
		article.pillar;
	return decideNavPillar(currentPillar);
};
