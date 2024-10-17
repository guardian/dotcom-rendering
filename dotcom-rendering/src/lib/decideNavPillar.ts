import type { LegacyPillar } from '../types/frontend';
import { Pillar } from './articleFormat';

export const decideNavPillar = (pillar: LegacyPillar): Pillar | undefined => {
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
		default:
			return undefined;
	}
};
