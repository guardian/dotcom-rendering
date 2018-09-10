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

type pillarMapType = <T>(f: (name: Pillar) => T) => { [K in Pillar]: T };

export const pillarMap: pillarMapType = f => ({
    news: f('news'),
    opinion: f('opinion'),
    sport: f('sport'),
    culture: f('culture'),
    lifestyle: f('lifestyle'),
}); // If you can think of a better way to do this that keeps they types, please help.
