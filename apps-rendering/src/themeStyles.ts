// ----- Imports ----- //

import * as palette from '@guardian/src-foundations/palette';
import type { Theme } from '@guardian/types';
import { Pillar, Special } from '@guardian/types';

// ----- Types ----- //

interface ThemeStyles {
	kicker: string;
	inverted: string;
	liveblogKicker: string;
	liveblogBackground: string;
	liveblogDarkBackground: string;
	link: string;
	cameraIcon: string;
	cameraIconBackground: string;
}

type ThemeColours = {
	[theme in Theme]: ThemeStyles;
};

export const themeColours: ThemeColours = {
	[Pillar.News]: {
		kicker: palette.news[400],
		inverted: palette.news[500],
		liveblogKicker: palette.news[600],
		liveblogBackground: palette.news[200],
		liveblogDarkBackground: palette.news[100],
		link: palette.news[300],
		cameraIcon: palette.news[800],
		cameraIconBackground: palette.news[400],
	},
	[Pillar.Opinion]: {
		kicker: palette.opinion[400],
		inverted: palette.opinion[500],
		liveblogKicker: palette.opinion[600],
		liveblogBackground: palette.opinion[200],
		liveblogDarkBackground: palette.opinion[100],
		link: palette.opinion[300],
		cameraIcon: palette.opinion[800],
		cameraIconBackground: palette.opinion[400],
	},
	[Pillar.Sport]: {
		kicker: palette.sport[400],
		inverted: palette.sport[500],
		liveblogKicker: palette.sport[600],
		liveblogBackground: palette.sport[200],
		liveblogDarkBackground: palette.sport[100],
		link: palette.sport[300],
		cameraIcon: palette.sport[800],
		cameraIconBackground: palette.sport[400],
	},
	[Pillar.Culture]: {
		kicker: palette.culture[400],
		inverted: palette.culture[500],
		liveblogKicker: palette.culture[600],
		liveblogBackground: palette.culture[200],
		liveblogDarkBackground: palette.culture[100],
		link: palette.culture[300],
		cameraIcon: palette.culture[800],
		cameraIconBackground: palette.culture[400],
	},
	[Pillar.Lifestyle]: {
		kicker: palette.lifestyle[400],
		inverted: palette.lifestyle[500],
		liveblogKicker: palette.lifestyle[500],
		liveblogBackground: palette.lifestyle[200],
		liveblogDarkBackground: palette.lifestyle[100],
		link: palette.lifestyle[300],
		cameraIcon: palette.lifestyle[800],
		cameraIconBackground: palette.lifestyle[400],
	},
	[Special.SpecialReport]: {
		kicker: palette.specialReport[400],
		inverted: palette.specialReport[500],
		liveblogKicker: palette.specialReport[500],
		liveblogBackground: palette.specialReport[200],
		liveblogDarkBackground: palette.specialReport[100],
		link: palette.specialReport[300],
		cameraIcon: palette.specialReport[800],
		cameraIconBackground: palette.specialReport[400],
	},
	[Special.Labs]: {
		kicker: palette.specialReport[400],
		inverted: palette.specialReport[500],
		liveblogKicker: palette.specialReport[500],
		liveblogBackground: palette.specialReport[200],
		liveblogDarkBackground: palette.specialReport[100],
		link: palette.specialReport[300],
		cameraIcon: palette.specialReport[800],
		cameraIconBackground: palette.specialReport[400],
	},
};

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

function themeToPillarString(theme: Theme): string {
	switch (theme) {
		case Pillar.Opinion:
			return 'opinion';
		case Pillar.Sport:
			return 'sport';
		case Pillar.Culture:
			return 'culture';
		case Pillar.Lifestyle:
			return 'lifestyle';
		case Pillar.News:
		default:
			return 'news';
	}
}

function themeToPillar(theme: Theme): Pillar {
	switch (theme) {
		case Special.SpecialReport:
		case Special.Labs:
			return Pillar.News;
		default:
			return theme;
	}
}
const stringToPillar = (pillar: string): Pillar => {
	switch (pillar) {
		case 'news':
			return Pillar.News;
		case 'opinion':
			return Pillar.Opinion;
		case 'culture':
			return Pillar.Culture;
		case 'sport':
			return Pillar.Sport;
		case 'lifestyle':
			return Pillar.Lifestyle;
		default:
			return Pillar.News;
	}
};

// ----- Exports ----- //

export {
	ThemeStyles,
	getThemeStyles,
	themeFromString,
	themeToPillarString,
	themeToPillar,
	stringToPillar,
};
