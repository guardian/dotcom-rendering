// ----- Imports ----- //

import { palette } from '@guardian/src-foundations';

import { compose } from 'lib';


// ----- Types ----- //

const enum Pillar {
    news,
    opinion,
    sport,
    arts,
    lifestyle,
}

interface PillarStyles {
    kicker: string;
    featureHeadline: string;
    soft: string;
    inverted: string;
    liveblogBackground: string;
}

type PillarColours = {
    [ pillar in Pillar ]: PillarStyles;
};

const pillarColours: PillarColours = {
    [Pillar.news]: {
        kicker: palette.news.main,
        featureHeadline: palette.news.dark,
        soft: palette.neutral[97],
        inverted: palette.news.bright,
        liveblogBackground: palette.news.dark,
    },
    [Pillar.opinion]: {
        kicker: palette.opinion.main,
        featureHeadline: palette.opinion.dark,
        soft: palette.opinion.faded,
        inverted: palette.opinion.bright,
        liveblogBackground: palette.opinion.dark,
    },
    [Pillar.sport]: {
        kicker: palette.sport.main,
        featureHeadline: palette.sport.dark,
        soft: palette.sport.faded,
        inverted: palette.sport.bright,
        liveblogBackground: palette.sport.dark,
    },
    [Pillar.arts]: {
        kicker: palette.culture.main,
        featureHeadline: palette.culture.dark,
        soft: palette.culture.faded,
        inverted: palette.culture.bright,
        liveblogBackground: palette.culture.dark,
    },
    [Pillar.lifestyle]: {
        kicker: palette.lifestyle.main,
        featureHeadline: palette.lifestyle.dark,
        soft: palette.lifestyle.faded,
        inverted: palette.lifestyle.bright,
        liveblogBackground: palette.lifestyle.dark,
    }
}

const getPillarStyles = (pillar: Pillar): PillarStyles => pillarColours[pillar];

function pillarFromString(pillar: string): Pillar {
    switch (pillar) {
        case 'pillar/opinion':
            return Pillar.opinion;
        case 'pillar/sport':
            return Pillar.sport;
        case 'pillar/arts':
            return Pillar.arts;
        case 'pillar/lifestyle':
            return Pillar.lifestyle;
        case 'pillar/news':
        default:
            return Pillar.news;
    }
}

const pillarStylesFromString = compose(getPillarStyles, pillarFromString);


// ----- Exports ----- //

export {
    Pillar,
    PillarStyles,
    getPillarStyles,
    pillarFromString,
    pillarStylesFromString,
};
