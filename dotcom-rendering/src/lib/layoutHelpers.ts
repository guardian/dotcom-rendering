import type { Pillar } from '@guardian/libs';
import type { DCRArticle } from '../types/frontend';
import type { LegacyPillar } from '../types/types';
import { decideNavPillar } from './decideNavPillar';

export const getCurrentPillar = (article: DCRArticle): Pillar | undefined => {
	const currentPillar =
		(article.nav.currentPillarTitle?.toLowerCase() as
			| LegacyPillar
			| undefined) ?? article.pillar;
	return decideNavPillar(currentPillar);
};
