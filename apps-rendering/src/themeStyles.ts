// ----- Imports ----- //

import type { ArticleTheme } from '@guardian/libs';
import { ArticlePillar, ArticleSpecial } from '@guardian/libs';
import * as palette from '@guardian/src-foundations/palette';

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
	[theme in ArticleTheme]: ThemeStyles;
};

export const themeColours: ThemeColours = {
	[ArticlePillar.News]: {
		kicker: palette.news[400],
		inverted: palette.news[500],
		liveblogKicker: palette.news[600],
		liveblogBackground: palette.news[200],
		liveblogDarkBackground: palette.news[100],
		link: palette.news[300],
		cameraIcon: palette.news[800],
		cameraIconBackground: palette.news[400],
	},
	[ArticlePillar.Opinion]: {
		kicker: palette.opinion[400],
		inverted: palette.opinion[500],
		liveblogKicker: palette.opinion[600],
		liveblogBackground: palette.opinion[200],
		liveblogDarkBackground: palette.opinion[100],
		link: palette.opinion[300],
		cameraIcon: palette.opinion[800],
		cameraIconBackground: palette.opinion[400],
	},
	[ArticlePillar.Sport]: {
		kicker: palette.sport[400],
		inverted: palette.sport[500],
		liveblogKicker: palette.sport[600],
		liveblogBackground: palette.sport[200],
		liveblogDarkBackground: palette.sport[100],
		link: palette.sport[300],
		cameraIcon: palette.sport[800],
		cameraIconBackground: palette.sport[400],
	},
	[ArticlePillar.Culture]: {
		kicker: palette.culture[400],
		inverted: palette.culture[500],
		liveblogKicker: palette.culture[600],
		liveblogBackground: palette.culture[200],
		liveblogDarkBackground: palette.culture[100],
		link: palette.culture[300],
		cameraIcon: palette.culture[800],
		cameraIconBackground: palette.culture[400],
	},
	[ArticlePillar.Lifestyle]: {
		kicker: palette.lifestyle[400],
		inverted: palette.lifestyle[500],
		liveblogKicker: palette.lifestyle[500],
		liveblogBackground: palette.lifestyle[200],
		liveblogDarkBackground: palette.lifestyle[100],
		link: palette.lifestyle[300],
		cameraIcon: palette.lifestyle[800],
		cameraIconBackground: palette.lifestyle[400],
	},
	[ArticleSpecial.SpecialReport]: {
		kicker: palette.specialReport[400],
		inverted: palette.specialReport[500],
		liveblogKicker: palette.specialReport[500],
		liveblogBackground: palette.specialReport[200],
		liveblogDarkBackground: palette.specialReport[100],
		link: palette.specialReport[300],
		cameraIcon: palette.specialReport[800],
		cameraIconBackground: palette.specialReport[400],
	},
	[ArticleSpecial.Labs]: {
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

const getThemeStyles = (theme: ArticleTheme): ThemeStyles =>
	themeColours[theme];

function themeFromString(theme: string | undefined): ArticlePillar {
	switch (theme) {
		case 'pillar/opinion':
			return ArticlePillar.Opinion;
		case 'pillar/sport':
			return ArticlePillar.Sport;
		case 'pillar/arts':
			return ArticlePillar.Culture;
		case 'pillar/lifestyle':
			return ArticlePillar.Lifestyle;
		case 'pillar/news':
		default:
			return ArticlePillar.News;
	}
}

function themeToPillarString(theme: ArticleTheme): string {
	switch (theme) {
		case ArticlePillar.Opinion:
			return 'opinion';
		case ArticlePillar.Sport:
			return 'sport';
		case ArticlePillar.Culture:
			return 'culture';
		case ArticlePillar.Lifestyle:
			return 'lifestyle';
		case ArticlePillar.News:
		default:
			return 'news';
	}
}

function themeToPillar(theme: ArticleTheme): ArticlePillar {
	switch (theme) {
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.Labs:
			return ArticlePillar.News;
		default:
			return theme;
	}
}
const stringToPillar = (pillar: string): ArticlePillar => {
	switch (pillar) {
		case 'news':
			return ArticlePillar.News;
		case 'opinion':
			return ArticlePillar.Opinion;
		case 'culture':
			return ArticlePillar.Culture;
		case 'sport':
			return ArticlePillar.Sport;
		case 'lifestyle':
			return ArticlePillar.Lifestyle;
		default:
			return ArticlePillar.News;
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
