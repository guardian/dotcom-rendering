import { PillarColours, palette } from '@guardian/pasteup/palette';

export const pillarNames: Pillar[] = [
    'news',
    'opinion',
    'sport',
    'culture',
    'lifestyle',
    'more',
];

export const pillarPalette: { [K in Pillar]: PillarColours } = {
    news: palette.news,
    opinion: palette.opinion,
    sport: palette.sport,
    culture: palette.culture,
    lifestyle: palette.lifestyle,
    more: {
        main: 'pink',
        dark: 'green',
        pastel: 'red',
        bright: 'purple',
        faded: 'white',
    },
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
    more: f('more'),
});
/*
Further notes on this function:
    - It maps by hand because it's easy to lose track of types when you use Object.assign()
    - Where the function parameter f returns type T, pillarMap will return an object with
      a key for each Pillar and values of type T.
 */
