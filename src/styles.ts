import { palette } from '@guardian/src-foundations'

const BASE_PADDING = 8;

const baseMultiply = (value: number) : number => value * BASE_PADDING;

export const colours = {
    black: palette.neutral[7],
    white: palette.neutral[100],
    yellow: palette.yellow.main
}

export const basePx = (...values: Array<number>): string => values.map(baseMultiply).join("px ") + "px"

export const sideMargins = {
    margin: basePx(0, 1)
};

export type PillarId = 'pillar/news'|'pillar/opinion'|'pillar/sport'|'pillar/arts'|'pillar/lifestyle';

interface PillarStyles {
    kicker: string;
    featureHeadline: string;
    soft: string;
    inverted: string;
    liveblogBackground: string;
}

interface PillarColours {
    [pillar: string]: PillarStyles;
}

export function getPillarStyles(pillarId: PillarId): PillarStyles {
    const pillar = pillarId.replace('pillar/', '');
    return pillarColours[pillar];
}

export const pillarColours: PillarColours = {
    news: {
        kicker: palette.news.main,
        featureHeadline: palette.news.dark,
        soft: palette.neutral[97],
        inverted: palette.news.bright,
        liveblogBackground: palette.news.dark
    },
    opinion: {
        kicker: palette.opinion.main,
        featureHeadline: palette.opinion.dark,
        soft: palette.opinion.faded,
        inverted: palette.opinion.bright,
        liveblogBackground: palette.opinion.dark
    },
    sport: {
        kicker: palette.sport.main,
        featureHeadline: palette.sport.dark,
        soft: palette.sport.faded,
        inverted: palette.sport.bright,
        liveblogBackground: palette.sport.dark
    },
    arts: {
        kicker: palette.culture.main,
        featureHeadline: palette.culture.dark,
        soft: palette.culture.faded,
        inverted: palette.culture.bright,
        liveblogBackground: palette.culture.dark
    },
    lifestyle: {
        kicker: palette.lifestyle.main,
        featureHeadline: palette.lifestyle.dark,
        soft: palette.lifestyle.faded,
        inverted: palette.lifestyle.bright,
        liveblogBackground: palette.lifestyle.dark
    }
};

export const textSans = "font-family: 'Guardian Text Sans Web';"

export const headlineLight = "font-family: 'Guardian Headline Light';"

export const icons = "font-family: 'Guardian Icons';"
