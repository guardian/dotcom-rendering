// ----- Imports ----- //
import {
	culture,
	lifestyle,
	news,
	opinion,
	specialReport,
	sport,
} from '@guardian/source-foundations';
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
		kicker: news[400],
		inverted: news[500],
		liveblogKicker: news[600],
		liveblogBackground: news[200],
		liveblogDarkBackground: news[100],
		link: news[300],
		cameraIcon: news[800],
		cameraIconBackground: news[400],
	},
	[Pillar.Opinion]: {
		kicker: opinion[400],
		inverted: opinion[500],
		liveblogKicker: opinion[600],
		liveblogBackground: opinion[200],
		liveblogDarkBackground: opinion[100],
		link: opinion[300],
		cameraIcon: opinion[800],
		cameraIconBackground: opinion[400],
	},
	[Pillar.Sport]: {
		kicker: sport[400],
		inverted: sport[500],
		liveblogKicker: sport[600],
		liveblogBackground: sport[200],
		liveblogDarkBackground: sport[100],
		link: sport[300],
		cameraIcon: sport[800],
		cameraIconBackground: sport[400],
	},
	[Pillar.Culture]: {
		kicker: culture[400],
		inverted: culture[500],
		liveblogKicker: culture[600],
		liveblogBackground: culture[200],
		liveblogDarkBackground: culture[100],
		link: culture[300],
		cameraIcon: culture[800],
		cameraIconBackground: culture[400],
	},
	[Pillar.Lifestyle]: {
		kicker: lifestyle[400],
		inverted: lifestyle[500],
		liveblogKicker: lifestyle[500],
		liveblogBackground: lifestyle[200],
		liveblogDarkBackground: lifestyle[100],
		link: lifestyle[300],
		cameraIcon: lifestyle[800],
		cameraIconBackground: lifestyle[400],
	},
	[Special.SpecialReport]: {
		kicker: specialReport[400],
		inverted: specialReport[500],
		liveblogKicker: specialReport[500],
		liveblogBackground: specialReport[200],
		liveblogDarkBackground: specialReport[100],
		link: specialReport[300],
		cameraIcon: specialReport[800],
		cameraIconBackground: specialReport[400],
	},
	[Special.Labs]: {
		kicker: specialReport[400],
		inverted: specialReport[500],
		liveblogKicker: specialReport[500],
		liveblogBackground: specialReport[200],
		liveblogDarkBackground: specialReport[100],
		link: specialReport[300],
		cameraIcon: specialReport[800],
		cameraIconBackground: specialReport[400],
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
