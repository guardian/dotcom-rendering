/**
 * @deprecated Use the `editorialPalette` module from `common-rendering` instead
 */
// ----- Imports ----- //

import type { ArticleTheme } from '@guardian/libs';
import { ArticlePillar, ArticleSpecial } from '@guardian/libs';
import {
	culture,
	lifestyle,
	news,
	opinion,
	specialReport,
	sport,
} from '@guardian/source-foundations';

// ----- Types ----- //

/**
 * @deprecated Use the `editorialPalette` module from `common-rendering` instead
 */
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

/**
 * @deprecated Use the `editorialPalette` module from `common-rendering` instead
 */
export const themeColours: ThemeColours = {
	[ArticlePillar.News]: {
		kicker: news[400],
		inverted: news[500],
		liveblogKicker: news[600],
		liveblogBackground: news[200],
		liveblogDarkBackground: news[100],
		link: news[300],
		cameraIcon: news[800],
		cameraIconBackground: news[400],
	},
	[ArticlePillar.Opinion]: {
		kicker: opinion[400],
		inverted: opinion[500],
		liveblogKicker: opinion[600],
		liveblogBackground: opinion[200],
		liveblogDarkBackground: opinion[100],
		link: opinion[300],
		cameraIcon: opinion[800],
		cameraIconBackground: opinion[400],
	},
	[ArticlePillar.Sport]: {
		kicker: sport[400],
		inverted: sport[500],
		liveblogKicker: sport[600],
		liveblogBackground: sport[200],
		liveblogDarkBackground: sport[100],
		link: sport[300],
		cameraIcon: sport[800],
		cameraIconBackground: sport[400],
	},
	[ArticlePillar.Culture]: {
		kicker: culture[400],
		inverted: culture[500],
		liveblogKicker: culture[600],
		liveblogBackground: culture[200],
		liveblogDarkBackground: culture[100],
		link: culture[300],
		cameraIcon: culture[800],
		cameraIconBackground: culture[400],
	},
	[ArticlePillar.Lifestyle]: {
		kicker: lifestyle[400],
		inverted: lifestyle[500],
		liveblogKicker: lifestyle[500],
		liveblogBackground: lifestyle[200],
		liveblogDarkBackground: lifestyle[100],
		link: lifestyle[300],
		cameraIcon: lifestyle[800],
		cameraIconBackground: lifestyle[400],
	},
	[ArticleSpecial.SpecialReport]: {
		kicker: specialReport[400],
		inverted: specialReport[500],
		liveblogKicker: specialReport[500],
		liveblogBackground: specialReport[200],
		liveblogDarkBackground: specialReport[100],
		link: specialReport[300],
		cameraIcon: specialReport[800],
		cameraIconBackground: specialReport[400],
	},
	[ArticleSpecial.Labs]: {
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

/**
 * @deprecated Use the `editorialPalette` module from `common-rendering` instead
 */
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
	getThemeStyles,
	themeFromString,
	themeToPillarString,
	themeToPillar,
	stringToPillar,
};
