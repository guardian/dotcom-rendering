import type { Pillar } from '@guardian/libs';
import type { ArticleDeprecated } from '../types/article';
import type { LegacyPillar } from '../types/frontend';
import { decideNavPillar } from './decideNavPillar';

export const getCurrentPillar = (
	article: ArticleDeprecated,
): Pillar | undefined => {
	const currentPillar =
		(article.nav.currentPillarTitle?.toLowerCase() as
			| LegacyPillar
			| undefined) ?? article.pillar;
	return decideNavPillar(currentPillar);
};
