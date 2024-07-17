import type { Pillar } from '@guardian/libs';
import type { DCRArticle, LegacyPillar } from '../types/frontend';
import { decideNavPillar } from './decideNavPillar';

export const getCurrentPillar = (article: DCRArticle): Pillar | undefined => {
	const currentPillar =
		(article.nav.currentPillarTitle?.toLowerCase() as
			| LegacyPillar
			| undefined) ?? article.pillar;
	return decideNavPillar(currentPillar);
};
