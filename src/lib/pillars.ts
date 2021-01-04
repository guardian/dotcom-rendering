import {
    news as _news,
    opinion as _opinion,
    sport as _sport,
    culture as _culture,
    lifestyle as _lifestyle,
    labs,
    border,
} from '@guardian/src-foundations/palette';

type colour = string;

const [news, opinion, sport, culture, lifestyle] = [
    _news,
    _opinion,
    _sport,
    _culture,
    _lifestyle,
].map((p) => ({
    // maps legacy colour names to new names in Source
    dark: p[300],
    main: p[400],
    bright: p[500],
    pastel: p[600],
    faded: p[800],

    // continue to expose the new names too!
    300: p[300],
    400: p[400],
    500: p[500],
    600: p[600],
    800: p[800],
}));

interface PillarColours {
    dark: colour;
    main: colour;
    bright: colour;
    pastel: colour;
    faded: colour;
    300: colour;
    400: colour;
    500: colour;
    600: colour;
    800: colour;
}

export const pillarNames: CAPIPillar[] = [
    'news',
    'opinion',
    'sport',
    'culture',
    'lifestyle',
    'labs',
];

export const augmentedLabs: PillarColours = {
    dark: labs[300],
    main: labs[400],
    bright: '#69d1ca', // bright teal
    pastel: '', // TODO
    faded: '#65a897', // dark teal
    300: labs[300],
    400: labs[400],
    500: '#69d1ca', // bright teal
    600: '', // TODO
    800: '#65a897', // dark teal
};

export const pillarPalette: Record<CAPIPillar, PillarColours> = {
    news,
    opinion,
    sport,
    culture,
    lifestyle,
    labs: augmentedLabs,
};

/*
This takes a function, f, and applies it to all pillars.
It returns an object with each pillar as the keys and f('pillar') as the value
*/
export const pillarMap: <T>(
    f: (name: CAPIPillar) => T,
) => { [K in CAPIPillar]: T } = (f) => ({
    news: f('news'),
    opinion: f('opinion'),
    sport: f('sport'),
    culture: f('culture'),
    lifestyle: f('lifestyle'),
    labs: f('labs'),
});
/*
Further notes on this function:
    - It maps by hand because it's easy to lose track of types when you use Object.assign()
    - Where the function parameter f returns type T, pillarMap will return an object with
      a key for each pillar and values of type T.
 */

export const neutralBorder = (pillar: CAPIPillar): colour => {
    switch (pillar) {
        case 'labs':
            return border.primary; // 'dark' theme
        default:
            return border.secondary;
    }
};
