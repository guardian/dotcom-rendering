import { Pillar, Special } from '@guardian/types';

export const decideNavTheme = (pillar: LegacyPillar): Theme => {
	switch (pillar) {
		case 'news':
			return Pillar.News;
		case 'opinion':
			return Pillar.Opinion;
		case 'sport':
			return Pillar.Sport;
		case 'culture':
			return Pillar.Culture;
		case 'lifestyle':
			return Pillar.Lifestyle;
		case 'labs':
			return Special.Labs;
		default:
			return Pillar.News;
	}
};
