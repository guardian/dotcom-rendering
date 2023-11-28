import { Pillar } from '@guardian/libs';
import type { DCRArticle } from '../types/frontend';
import { decideNavPillar } from './decideNavPillar';

export const getCurrentPillar = (article: DCRArticle): Pillar | undefined => {
	const currentPillar =
		(article.nav.currentPillarTitle &&
			(article.nav.currentPillarTitle.toLowerCase() as LegacyPillar)) ||
		article.pillar;
	return decideNavPillar(currentPillar);
};

// TO DO - import into fronts layout (was copied from there)
export const pillarFromCurrentLink = (
	currentNavLink: string,
): Pillar | undefined => {
	switch (currentNavLink) {
		// The pillar name is "arts" in CAPI, but "culture" everywhere else
		case 'Arts':
		case 'Culture':
			return Pillar.Culture;
		case 'Opinion':
			return Pillar.Opinion;
		case 'News':
			return Pillar.News;
		case 'Sport':
			return Pillar.Sport;
		case 'Lifestyle':
			return Pillar.Lifestyle;
		default:
			return undefined;
	}
};
