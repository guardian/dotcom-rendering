const BASE_PADDING = 8;

const baseMultiply = (value: number) : number => value * BASE_PADDING;

// should these come from mapi?
// We should try to standardise these with Design, Android and iOS
export const colours = {
    black: '#121212',
    white: '#ffffff',
    yellow: '#ffe500'
}

export const basePx = (...values: Array<number>): string => values.map(baseMultiply).join("px ") + "px"

export const sideMargins = {
    margin: basePx(0, 1)
};

type PillarId = 'pillar/news'|'pillar/opinion'|'pillar/sport'|'pillar/arts'|'pillar/lifestyle';

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
        kicker: '#c70000',
        featureHeadline: '#880105',
        soft: '#f6f6f6',
        inverted: '#ff4e36',
        liveblogBackground: '#ae0000'
    },
    opinion: {
        kicker: '#e05e00',
        featureHeadline: '#bd5318',
        soft: '#fef9f5',
        inverted: '#ff7f0f',
        liveblogBackground: '#bd5318'
    },
    sport: {
        kicker: '#0084c6',
        featureHeadline: '#005689',
        soft: '#e6f5ff',
        inverted: '#00b2ff',
        liveblogBackground: '#005689'
    },
    arts: {
        kicker: '#a1845c',
        featureHeadline: '#6b5840',
        soft: '#f2ebdc',
        inverted: '#eacca0',
        liveblogBackground: '#6b5840'
    },
    lifestyle: {
        kicker: '#bb3b80',
        featureHeadline: '#7d0068',
        soft: '#ffe6ec',
        inverted: '#ffabdb',
        liveblogBackground: '#7d0068'
    }
};

export const textSans = "font-family: 'Guardian Text Sans Web';"

export const headlineLight = "font-family: 'Guardian Headline Light';"

export const icons = "font-family: 'Guardian Icons';"
