// ----- Imports ----- //

import { ArticleDesign, type ArticleFormat } from '@guardian/libs';
import { palette as sourcePalette } from '@guardian/source-foundations';

// ----- Palette Functions ----- //

const headlineColourLight = ({ design }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Feature:
			return sourcePalette.news[300];
		default:
			return sourcePalette.neutral[10];
	}
};

const headlineColourDark = ({ design }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Feature:
			return sourcePalette.news[600];
		default:
			return sourcePalette.neutral[97];
	}
};

const headlineBackgroundColourLight = ({ design }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.news[400];
		default:
			return sourcePalette.neutral[100];
	}
};

const headlineBackgroundColourDark = ({ design }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.news[200];
		default:
			return sourcePalette.neutral[7];
	}
};

const StarRatingLight = (): string => sourcePalette.neutral[7];
const StarRatingDark = (): string => sourcePalette.neutral[97];

// ----- Palette ----- //

/**
 * A template literal type used to make sure the keys of the palette use the
 * correct CSS custom property syntax.
 */
type CSSCustomProperty = `--${string}`;
/**
 * Ensures that all palette functions provide the same API, deriving a palette
 * colour from an {@linkcode ArticleFormat}.
 */
type PaletteFunction = (f: ArticleFormat) => string;
/**
 * Used to validate that the palette object always has the correct shape,
 * without changing its type.
 */
type PaletteColours = Record<
	CSSCustomProperty,
	{
		light: PaletteFunction;
		dark: PaletteFunction;
	}
>;

/**
 * Maps palette colour names (which are also CSS custom property names) to
 * a pair of palette functions, which can be used to derive both light and dark
 * mode colours from an {@linkcode ArticleFormat}.
 *
 * This is not accessed directly in components; the {@linkcode palette} function
 * is used instead.
 */
const paletteColours = {
	'--headline': {
		light: headlineColourLight,
		dark: headlineColourDark,
	},
	'--headline-background': {
		light: headlineBackgroundColourLight,
		dark: headlineBackgroundColourDark,
	},
	'--star-rating': {
		light: StarRatingLight,
		dark: StarRatingDark,
	},
} satisfies PaletteColours;

export { paletteColours };
