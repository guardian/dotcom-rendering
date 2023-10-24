// ----- Imports ----- //

import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { palette as sourcePalette } from '@guardian/source-foundations';

// ----- Constants and helpers ----- //

const WHITE = sourcePalette.neutral[100];
const BLACK = sourcePalette.neutral[7];

const colourMapping = {
	dark: 300,
	main: 400,
	bright: 500,
	pastel: 600,
	faded: 800,
} as const;

type ColourMapping = typeof colourMapping;
type ColourVariation = keyof ColourMapping | ColourMapping[keyof ColourMapping];

/** Curried function to fetch pillar colours */
const getPillarColour =
	(colour: ColourVariation) =>
	(theme: ArticleTheme): string => {
		const c = typeof colour === 'string' ? colourMapping[colour] : colour;

		switch (theme) {
			case Pillar.News:
				return sourcePalette.news[c];
			case Pillar.Opinion:
				return sourcePalette.opinion[c];
			case Pillar.Sport:
				return sourcePalette.sport[c];
			case Pillar.Culture:
				return sourcePalette.culture[c];
			case Pillar.Lifestyle:
				return sourcePalette.lifestyle[c];
			default:
				return sourcePalette.news[c];
		}
	};

/** Used in Live Blogs and Dead Blogs */
const blogsGrayBackgroundPalette = (theme: ArticleTheme): string => {
	switch (theme) {
		case Pillar.News:
			return sourcePalette.news[400];
		case Pillar.Opinion:
		case Pillar.Sport:
		case Pillar.Culture:
		case Pillar.Lifestyle:
			return getPillarColour(300)(theme);
		case ArticleSpecial.SpecialReport:
			return sourcePalette.specialReport[300];
		case ArticleSpecial.SpecialReportAlt:
			return sourcePalette.news[400];
		case ArticleSpecial.Labs:
			return sourcePalette.labs[300];
	}
};

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

const starRatingFillColourLight = (): string => sourcePalette.neutral[7];
const starRatingFillColourDark = (): string => sourcePalette.neutral[0];
const starRatingBackgroundColourLight = (): string =>
	sourcePalette.brandAlt[400];
const starRatingBackgroundColourDark = (): string =>
	sourcePalette.brandAlt[200];

const bylineTextLight = ({ theme, design, display }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return blogsGrayBackgroundPalette(theme);

		default:
			switch (theme) {
				case ArticleSpecial.Labs:
					return BLACK;
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[300];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[100];

				default:
					switch (display) {
						case ArticleDisplay.Immersive:
							return WHITE;
						case ArticleDisplay.Showcase:
						case ArticleDisplay.NumberedList:
						case ArticleDisplay.Standard:
							switch (design) {
								case ArticleDesign.Analysis: {
									switch (theme) {
										case Pillar.News:
											return sourcePalette.news[300];
										default:
											return getPillarColour('main')(
												theme,
											);
									}
								}
								case ArticleDesign.Gallery: {
									switch (theme) {
										case Pillar.Culture:
											return getPillarColour('bright')(
												theme,
											);
										default:
											return getPillarColour('main')(
												theme,
											);
									}
								}
								case ArticleDesign.Interview:
									return BLACK;
								case ArticleDesign.Picture:
									return sourcePalette.neutral[86];
								default:
									return getPillarColour('main')(theme);
							}
						default:
							return getPillarColour('main')(theme);
					}
			}
	}
};

const bylineTextDark = (format: ArticleFormat): string => {
	if (format.theme === ArticleSpecial.Labs) {
		return sourcePalette.labs[400];
	}

	switch (format.design) {
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[93];
		case ArticleDesign.DeadBlog:
		default:
			return sourcePalette.neutral[86];
	}
};

// TODO
const bylineCardTextLight = (format: ArticleFormat): string => {
	return BLACK;
};
const bylineCardTextDark = (format: ArticleFormat): string => {
	return BLACK;
};

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
	'--headline-colour': {
		light: headlineColourLight,
		dark: headlineColourDark,
	},
	'--headline-background-colour': {
		light: headlineBackgroundColourLight,
		dark: headlineBackgroundColourDark,
	},
	'--star-rating-fill': {
		light: starRatingFillColourLight,
		dark: starRatingFillColourDark,
	},
	'--star-rating-background': {
		light: starRatingBackgroundColourLight,
		dark: starRatingBackgroundColourDark,
	},
	'--byline-colour': {
		light: bylineTextLight,
		dark: bylineTextDark,
	},
	'--byline-card-colour': {
		light: bylineCardTextLight,
		dark: bylineCardTextDark,
	},
} satisfies PaletteColours;

/**
 * A union of all the keys of the palette object. In other words, all the
 * possible colours that can be chosen.
 */
type ColourName = keyof typeof paletteColours;

/**
 * Looks up a palette colour by name. Retrieves a CSS value for the specified
 * colour, for use in CSS declarations. See the examples for how this is
 * commonly used with our Emotion-based styles.
 *
 * @param a The name of a palette colour; for example `--headline-colour`.
 * @returns A CSS `var` function call; for example `var(--headline-colour)`.
 * @example
 * const styles = css`
 *   color: ${palette('--headline-colour')};
 *   background-color: ${palette('--headline-background-colour')};
 * `;
 */
const palette = (colour: ColourName): string => `var(${colour})`;

/**
 * Builds a list of CSS custom property declarations representing colours. These
 * can be used to set up the palette on any element, and then retrieved to apply
 * styles via the {@linkcode palette} function. See the examples for ways the
 * palette could be set up.
 *
 * @param format The `ArticleFormat` of the current article.
 * @param colourScheme Get declarations for either `light` or `dark` mode.
 * @returns A set of CSS custom property declarations for palette colours,
 * in string format. For example:
 * ```
 * [ '--headline-colour: #1a1a1a;', '--headline-background-colour: #ffffff;' ]
 * ```
 * @example
 * <caption>Create a single stylesheet to handle both colour schemes.</caption>
 * const paletteStyles = css`
 *   :root {
 *     ${paletteDeclarations(format, 'light').join('\n')}
 *   }
 *
 *   (@)media (prefers-color-scheme: dark) {
 *     :root {
 *       ${paletteDeclarations(format, 'dark').join('\n')}
 *     }
 *   }
 * `;
 * @example
 * <caption>Load separate stylesheets based on user preference.</caption>
 * // Use to build a file called 'light.css'.
 * const lightPalette = css`
 *   :root {
 *     ${paletteDeclarations(format, 'light').join('\n')}
 *   }
 * `;
 * // Use to build a file called 'dark.css'.
 * const darkPalette = css`
 *   :root {
 *     ${paletteDeclarations(format, 'dark').join('\n')}
 *   }
 * `;
 *
 * const stylesheets = (
 *   <>
 *     <link
 *       media="(prefers-color-scheme: light)"
 *       rel="stylesheet"
 *       href="light.css"
 *     />
 *     <link
 *       media="(prefers-color-scheme: dark)"
 *       rel="stylesheet"
 *       href="dark.css"
 *     />
 *   </>
 * );
 */
const paletteDeclarations = (
	format: ArticleFormat,
	colourScheme: 'light' | 'dark',
): string[] =>
	Object.entries(paletteColours).map(
		([colourName, colour]) =>
			`${colourName}: ${colour[colourScheme](format)};`,
	);

// ----- Exports ----- //

export { palette, paletteDeclarations };
