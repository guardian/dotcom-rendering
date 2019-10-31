import { palette } from '@guardian/src-foundations';

type colour = string;

interface PillarColours {
    dark: colour;
    main: colour;
    bright: colour;
    pastel: colour;
    faded: colour;
}

export const pillarNames: Pillar[] = [
    'news',
    'opinion',
    'sport',
    'culture',
    'lifestyle',
    'labs',
];

export const augmentedLabs: PillarColours = {
    dark: palette.labs.dark,
    main: palette.labs.main,
    bright: '#69d1ca', // bright teal
    pastel: '', // TODO
    faded: '#65a897', // dark teal
};

export const pillarPalette: Record<Pillar, PillarColours> = {
    news: palette.news,
    opinion: palette.opinion,
    sport: palette.sport,
    culture: palette.culture,
    lifestyle: palette.lifestyle,
    labs: augmentedLabs,
};

/*
This takes a function, f, and applies it to all pillars.
It returns an object with each pillar as the keys and f('pillar') as the value
*/
export const pillarMap: <T>(
    f: (name: Pillar) => T,
) => { [K in Pillar]: T } = f => ({
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
      a key for each Pillar and values of type T.
 */

export const getPillar = (pillar: Pillar, designType: DesignType): Pillar => {
    if (designType === 'Comment' && pillar === 'news') {
        return 'opinion';
    }

    return pillar;
};

export const neutralBorder = (pillar: Pillar): colour => {
    switch (pillar) {
        case 'labs':
            return palette.neutral[60]; // 'dark' theme
        default:
            return palette.neutral[86];
    }
};
