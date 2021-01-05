import { Pillar } from '@guardian/types/Format';

export const pillarToTypesEnum = (pillar: CAPIPillar): Pillar => {
	switch (pillar) {
		case 'news':
			return Pillar.News;
		case 'opinion':
			return Pillar.Opinion;
		case 'culture':
			return Pillar.Culture;
		case 'sport':
			return Pillar.Sport;
		case 'lifestyle':
			return Pillar.Lifestyle;
		case 'labs':
			return Pillar.News; // TODO: Remove this when we remove the labs pillar
	}
};
