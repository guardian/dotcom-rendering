import { PillarColours, palette } from '@guardian/pasteup/palette';

export const pillarNames: Pillar[] = [
    'news',
    'opinion',
    'sport',
    'culture',
    'lifestyle',
];

export const pillarPalette: { [K in Pillar]: PillarColours } = {
    news: palette.news,
    opinion: palette.opinion,
    sport: palette.sport,
    culture: palette.culture,
    lifestyle: palette.lifestyle,
};

type pillarMapType = <T>(
    f: (name: Pillar, colours: PillarColours) => T,
) => { [K in Pillar]: T };

export const pillarMap: pillarMapType = f => ({
    news: f('news', pillarPalette.news),
    opinion: f('opinion', pillarPalette.opinion),
    sport: f('sport', pillarPalette.sport),
    culture: f('culture', pillarPalette.culture),
    lifestyle: f('lifestyle', pillarPalette.lifestyle),
}); // If you can think of a better way to do this that keeps they types, please help.
