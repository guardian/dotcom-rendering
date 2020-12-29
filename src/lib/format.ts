import { Pillar as TypesPillar } from '@guardian/types/Format';

export const toTypesPillar = (p: Pillar): TypesPillar => {
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
