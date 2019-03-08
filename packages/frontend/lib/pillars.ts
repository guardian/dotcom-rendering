import { PillarColours, palette } from '@guardian/pasteup/palette';

export const toneNames: tone[] = ['opinion', 'paid', 'default'];

export const pillarNames: Pillar[] = [
    'news',
    'opinion',
    'sport',
    'culture',
    'lifestyle',
];

export const tonePalette: { [K in tone]: string } = {
    default: palette.neutral[100],
    opinion: palette.opinion.faded,
    paid: palette.neutral[86], // this is dcdcdc instead of d9d9d9 (will need approval)
};

export const pillarPalette: { [K in Pillar]: PillarColours } = {
    news: palette.news,
    opinion: palette.opinion,
    sport: palette.sport,
    culture: palette.culture,
    lifestyle: palette.lifestyle,
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
});
/*
Further notes on this function:
    - It maps by hand because it's easy to lose track of types when you use Object.assign()
    - Where the function parameter f returns type T, pillarMap will return an object with
      a key for each Pillar and values of type T.
 */
