import type { ArticleTheme } from '@guardian/libs';
import { ArticleSpecial, Pillar } from '@guardian/libs';
import { palette } from '@guardian/source-foundations';

const {
	culture,
	labs,
	lifestyle,
	news,
	opinion,
	specialReport,
	sport,
	neutral,
	specialReportAlt,
} = palette;

type ColourType = string;

type PillarPalette = {
	dark: ColourType;
	main: ColourType;
	bright: ColourType;
	pastel: ColourType;
	faded: ColourType;
	300: ColourType;
	400: ColourType;
	500: ColourType;
	600: ColourType;
	800: ColourType;
};

type SpecialPalette = {
	dark: ColourType;
	main: ColourType;
	bright: ColourType;
	faded: ColourType;
	300: ColourType;
	400: ColourType;
	500: ColourType;
	800: ColourType;
};

type LabsPalette = {
	dark: ColourType;
	main: ColourType;
	bright: ColourType;
	faded: ColourType;
	300: ColourType;
	400: ColourType;
};

type SpecialAltPalette = {
	dark: ColourType;
	main: ColourType;
	bright: ColourType;
	pastel: ColourType;
	faded: ColourType;
	100: ColourType;
	200: ColourType;
	300: ColourType;
	700: ColourType;
	800: ColourType;
};

// pillarPalette_DO_NOT_USE should no longer be used. Use palette from  decidePalette instead

export const pillarPalette_DO_NOT_USE: Record<
	ArticleTheme,
	PillarPalette | SpecialPalette | LabsPalette | SpecialAltPalette
> = {
	[Pillar.News]: {
		dark: news[300],
		main: news[400],
		bright: news[500],
		pastel: news[600],
		faded: news[800],
		300: news[300],
		400: news[400],
		500: news[500],
		600: news[600],
		800: news[800],
	},
	[Pillar.Opinion]: {
		dark: opinion[300],
		main: opinion[300],
		bright: opinion[500],
		pastel: opinion[600],
		faded: opinion[800],
		300: opinion[300],
		400: opinion[400],
		500: opinion[500],
		600: opinion[600],
		800: opinion[800],
	},
	[Pillar.Sport]: {
		dark: sport[300],
		main: sport[400],
		bright: sport[500],
		pastel: sport[600],
		faded: sport[800],
		300: sport[300],
		400: sport[400],
		500: sport[500],
		600: sport[600],
		800: sport[800],
	},
	[Pillar.Culture]: {
		dark: culture[300],
		main: culture[400],
		bright: culture[500],
		pastel: culture[600],
		faded: culture[800],
		300: culture[300],
		400: culture[400],
		500: culture[500],
		600: culture[600],
		800: culture[800],
	},
	[Pillar.Lifestyle]: {
		dark: lifestyle[300],
		main: lifestyle[400],
		bright: lifestyle[500],
		pastel: lifestyle[600],
		faded: lifestyle[800],
		300: lifestyle[300],
		400: lifestyle[400],
		500: lifestyle[500],
		600: lifestyle[600],
		800: lifestyle[800],
	},
	[ArticleSpecial.Labs]: {
		dark: labs[300],
		main: labs[400],
		bright: labs[400], // bright teal
		faded: labs[300], // dark teal
		300: labs[300],
		400: labs[400],
	},
	[ArticleSpecial.SpecialReport]: {
		dark: specialReport[300],
		main: specialReport[400],
		bright: specialReport[500],
		faded: specialReport[800],
		300: specialReport[300],
		400: specialReport[400],
		500: specialReport[500],
		800: specialReport[800],
	},
	[ArticleSpecial.SpecialReportAlt]: {
		dark: specialReportAlt[100],
		main: specialReportAlt[200],
		bright: specialReportAlt[300],
		pastel: specialReportAlt[700],
		faded: specialReportAlt[800],
		100: specialReportAlt[100],
		200: specialReportAlt[200],
		300: specialReportAlt[300],
		700: specialReportAlt[700],
		800: specialReportAlt[800],
	},
};

/*
This takes a function, f, and applies it to all pillars.
It returns an object with each pillar as the keys and f('pillar') as the value
*/
export const pillarMap: <T>(f: (name: ArticleTheme) => T) => {
	[K in ArticleTheme]: T;
} = (f) => ({
	[Pillar.News]: f(Pillar.News),
	[Pillar.Opinion]: f(Pillar.Opinion),
	[Pillar.Sport]: f(Pillar.Sport),
	[Pillar.Culture]: f(Pillar.Culture),
	[Pillar.Lifestyle]: f(Pillar.Lifestyle),
	[ArticleSpecial.Labs]: f(ArticleSpecial.Labs),
	[ArticleSpecial.SpecialReport]: f(ArticleSpecial.SpecialReport),
	[ArticleSpecial.SpecialReportAlt]: f(ArticleSpecial.SpecialReportAlt),
});
/*
Further notes on this function:
	- It maps by hand because it's easy to lose track of types when you use Object.assign()
	- Where the function parameter f returns type T, pillarMap will return an object with
	  a key for each pillar and values of type T.
 */

export const neutralBorder = (pillar: ArticleTheme): ColourType => {
	switch (pillar) {
		case ArticleSpecial.Labs:
			return neutral[60]; // 'dark' theme
		default:
			return neutral[86];
	}
};
