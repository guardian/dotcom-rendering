import type { Pillar } from '@guardian/libs';
import type { Article } from '../article';
import type { LegacyPillar } from '../types/frontend';
import { decideNavPillar } from './decideNavPillar';

export const getCurrentPillar = (article: Article): Pillar | undefined => {
	const currentPillar =
		(article.nav.currentPillarTitle?.toLowerCase() as
			| LegacyPillar
			| undefined) ?? article.pillar;
	return decideNavPillar(currentPillar);
};
