// ----- Imports ----- //

import * as palette from '@guardian/src-foundations/palette';
import { Pillar, Special, Theme } from '@guardian/types/Format';


// ----- Types ----- //

interface ThemeStyles {
    kicker: string;
    inverted: string;
    liveblogBackground: string;
    liveblogDarkBackground: string;
}

type ThemeColours = {
    [ theme in Theme ]: ThemeStyles;
};

export const themeColours: ThemeColours = {
    [Pillar.News]: {
        kicker: palette.news[400],
        inverted: palette.news[500],
        liveblogBackground: palette.news[300],
        liveblogDarkBackground: palette.news[200]
    },
    [Pillar.Opinion]: {
        kicker: palette.opinion[400],
        inverted: palette.opinion[500],
        liveblogBackground: palette.opinion[300],
        liveblogDarkBackground: palette.opinion[200]
    },
    [Pillar.Sport]: {
        kicker: palette.sport[400],
        inverted: palette.sport[500],
        liveblogBackground: palette.sport[300],
        liveblogDarkBackground: palette.sport[200]
    },
    [Pillar.Culture]: {
        kicker: palette.culture[400],
        inverted: palette.culture[500],
        liveblogBackground: palette.culture[300],
        liveblogDarkBackground: palette.culture[200]
    },
    [Pillar.Lifestyle]: {
        kicker: palette.lifestyle[400],
        inverted: palette.lifestyle[500],
        liveblogBackground: palette.lifestyle[300],
        liveblogDarkBackground: palette.lifestyle[200]
    },
    [Special.SpecialReport]: {
        kicker: palette.specialReport[400],
        inverted: palette.specialReport[500],
        liveblogBackground: palette.specialReport[300],
        liveblogDarkBackground: palette.specialReport[200]
    }
}

const getThemeStyles = (theme: Theme): ThemeStyles => themeColours[theme];

function themeFromString(theme: string | undefined): Pillar {
    switch (theme) {
        case 'pillar/opinion':
            return Pillar.Opinion;
        case 'pillar/sport':
            return Pillar.Sport;
        case 'pillar/arts':
            return Pillar.Culture;
        case 'pillar/lifestyle':
            return Pillar.Lifestyle;
        case 'pillar/news':
        default:
            return Pillar.News;
    }
}

function themeToPillar(theme: Theme): string {
    switch (theme) {
        case Pillar.Opinion:
            return 'opinion';
        case Pillar.Sport:
            return 'sport';
        case Pillar.Culture:
            return 'arts';
        case Pillar.Lifestyle:
            return 'lifestyle';
        case Pillar.News:
        default:
            return 'news';
    }
}

// ----- Exports ----- //

export {
    ThemeStyles,
    getThemeStyles,
    themeFromString,
    themeToPillar
};
