import { ArticlePillar } from '@guardian/libs';

export const decideNavPillar = (
	pillar: LegacyPillar,
): ArticlePillar | undefined => {
	switch (pillar) {
		case 'news':
			return ArticlePillar.News;
		case 'opinion':
			return ArticlePillar.Opinion;
		case 'sport':
			return ArticlePillar.Sport;
		case 'culture':
			return ArticlePillar.Culture;
		case 'lifestyle':
			return ArticlePillar.Lifestyle;
		default:
			return undefined;
	}
};
