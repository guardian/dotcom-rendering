import { Pillar as TypesPillar } from '@guardian/types';

export const toTypesPillar = (p: CAPIPillar): TypesPillar => {
	switch (p) {
		case 'news':
			return TypesPillar.News;
		case 'opinion':
			return TypesPillar.Opinion;
		case 'sport':
			return TypesPillar.Sport;
		case 'culture':
			return TypesPillar.Culture;
		case 'lifestyle':
			return TypesPillar.Lifestyle;
		case 'labs': // unsupported
		default:
			return TypesPillar.News;
	}
};
