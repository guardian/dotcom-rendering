// ----- Imports ----- //

import * as palette from '@guardian/src-foundations/palette';

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

export const pillarColours: PillarColours = {
    [Pillar.news]: {
        kicker: palette.news[400],
        featureHeadline: palette.news[300],
        soft: palette.neutral[97],
        inverted: palette.news[500],
        liveblogBackground: palette.news[300],
    },
    [Pillar.opinion]: {
        kicker: palette.opinion[400],
        featureHeadline: palette.opinion[300],
        soft: palette.opinion[800],
        inverted: palette.opinion[500],
        liveblogBackground: palette.opinion[300],
    },
    [Pillar.sport]: {
        kicker: palette.sport[400],
        featureHeadline: palette.sport[300],
        soft: palette.sport[800],
        inverted: palette.sport[500],
        liveblogBackground: palette.sport[300],
    },
    [Pillar.arts]: {
        kicker: palette.culture[400],
        featureHeadline: palette.culture[300],
        soft: palette.culture[800],
        inverted: palette.culture[500],
        liveblogBackground: palette.culture[300],
    },
    [Pillar.lifestyle]: {
        kicker: palette.lifestyle[400],
        featureHeadline: palette.lifestyle[300],
        soft: palette.lifestyle[800],
        inverted: palette.lifestyle[500],
        liveblogBackground: palette.lifestyle[300],
    }
}

const getPillarStyles = (pillar: Pillar): PillarStyles => pillarColours[pillar];

function pillarFromString(pillar: string | undefined): Pillar {
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
