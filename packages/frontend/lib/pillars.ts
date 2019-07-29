import { PillarColours, palette } from '@guardian/pasteup/palette';

// Pillars are used for styling
// RealPillars have Pillar palette colours
// FakePillars allow us to make modifications to style based on rules outside of the pillar of an article
export const realpillarNames = [
    'news',
    'opinion',
    'sport',
    'culture',
    'lifestyle',
] as const;

export const fakes = ['labs'] as const;
// export const pillarNames = realpillarNames.concat(fakes);
// export type RealPillar = typeof realpillarNames[number];
// export type FakePillar = typeof fakes[number];
// export type Pillar = RealPillar | FakePillar;

export const allPillars = [...realpillarNames, ...fakes];

export const pillarPalette: Record<Pillar, PillarColours> = {
    news: palette.news,
    opinion: palette.opinion,
    sport: palette.sport,
    culture: palette.culture,
    lifestyle: palette.lifestyle,
    labs: palette.labs,
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
