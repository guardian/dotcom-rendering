import type { ArticleTheme } from '@guardian/libs';
import { ArticleSpecial, Pillar } from '@guardian/libs';
import { palette } from '@guardian/source-foundations';

const { culture, labs, lifestyle, news, opinion, specialReport, sport } =
	palette;

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
		dark: palette.news[300],
		main: palette.news[400],
		bright: palette.news[500],
		pastel: palette.news[600],
		faded: palette.news[800],
		300: palette.news[300],
		400: palette.news[400],
		500: palette.news[500],
		600: palette.news[600],
		800: palette.news[800],
	},
	[Pillar.Opinion]: {
		dark: palette.opinion[300],
		main: palette.opinion[300],
		bright: palette.opinion[500],
		pastel: palette.opinion[600],
		faded: palette.opinion[800],
		300: palette.opinion[300],
		400: palette.opinion[400],
		500: palette.opinion[500],
		600: palette.opinion[600],
		800: palette.opinion[800],
	},
	[Pillar.Sport]: {
		dark: palette.sport[300],
		main: palette.sport[400],
		bright: palette.sport[500],
		pastel: palette.sport[600],
		faded: palette.sport[800],
		300: palette.sport[300],
		400: palette.sport[400],
		500: palette.sport[500],
		600: palette.sport[600],
		800: palette.sport[800],
	},
	[Pillar.Culture]: {
		dark: palette.culture[300],
		main: palette.culture[400],
		bright: palette.culture[500],
		pastel: palette.culture[600],
		faded: palette.culture[800],
		300: palette.culture[300],
		400: palette.culture[400],
		500: palette.culture[500],
		600: palette.culture[600],
		800: palette.culture[800],
	},
	[Pillar.Lifestyle]: {
		dark: palette.lifestyle[300],
		main: palette.lifestyle[400],
		bright: palette.lifestyle[500],
		pastel: palette.lifestyle[600],
		faded: palette.lifestyle[800],
		300: palette.lifestyle[300],
		400: palette.lifestyle[400],
		500: palette.lifestyle[500],
		600: palette.lifestyle[600],
		800: palette.lifestyle[800],
	},
	[ArticleSpecial.Labs]: {
		dark: palette.labs[300],
		main: palette.labs[400],
		bright: palette.labs[400], // bright teal
		faded: palette.labs[300], // dark teal
		300: palette.labs[300],
		400: palette.labs[400],
	},
	[ArticleSpecial.SpecialReport]: {
		dark: palette.specialReport[300],
		main: palette.specialReport[400],
		bright: palette.specialReport[500],
		faded: palette.specialReport[800],
		300: palette.specialReport[300],
		400: palette.specialReport[400],
		500: palette.specialReport[500],
		800: palette.specialReport[800],
	},
	[ArticleSpecial.SpecialReportAlt]: {
		dark: palette.specialReportAlt[100],
		main: palette.specialReportAlt[200],
		bright: palette.specialReportAlt[300],
		pastel: palette.specialReportAlt[700],
		faded: palette.specialReportAlt[800],
		100: palette.specialReportAlt[100],
		200: palette.specialReportAlt[200],
		300: palette.specialReportAlt[300],
		700: palette.specialReportAlt[700],
		800: palette.specialReportAlt[800],
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
			return palette.neutral[60]; // 'dark' theme
		default:
			return palette.neutral[86];
	}
};
