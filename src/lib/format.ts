import { Pillar } from '@guardian/types/Format';

export const toTypesPillar = (p: CAPIPillar): Pillar => {
	switch (p) {
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
		default:
			return Pillar.News;
	}
};
