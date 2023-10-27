// ----- Imports ----- //

import {
	ArticleDesign,
	type ArticleFormat,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { palette as sourcePalette } from '@guardian/source-foundations';
import { buttonThemeDefault } from '@guardian/source-react-components';
import { decidePalette } from './lib/decidePalette';

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

const avatarLight = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[800];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.specialReportAlt[300];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.News:
					return sourcePalette.news[500];
			}
		default:
			switch (theme) {
				case ArticleSpecial.SpecialReport:
					return sourcePalette.specialReport[800];
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.news[500];
				case ArticleSpecial.Labs:
					return sourcePalette.labs[400];
				case Pillar.Opinion:
					return sourcePalette.opinion[300];
				case Pillar.Culture:
					return sourcePalette.culture[500];
				case Pillar.Lifestyle:
					return sourcePalette.lifestyle[500];
				case Pillar.Sport:
					return sourcePalette.sport[500];
				case Pillar.News:
					return sourcePalette.news[500];
			}
	}
};

const avatarDark = ({ design, theme }: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.Standard:
		case ArticleDesign.Review:
		case ArticleDesign.Explainer:
		case ArticleDesign.Feature:
		case ArticleDesign.Interview:
		case ArticleDesign.Interactive:
		case ArticleDesign.PhotoEssay:
		case ArticleDesign.FullPageInteractive:
		case ArticleDesign.NewsletterSignup:
		case ArticleDesign.Comment:
		case ArticleDesign.Letter:
		case ArticleDesign.Editorial:
		case ArticleDesign.Analysis:
			switch (theme) {
				case ArticleSpecial.SpecialReportAlt:
					return sourcePalette.neutral[46];
				default:
					return sourcePalette.neutral[20];
			}
		default:
			return sourcePalette.neutral[20];
	}
};

const starRatingFillColourLight = (): string => sourcePalette.neutral[7];
const starRatingFillColourDark = (): string => sourcePalette.neutral[0];
const starRatingBackgroundColourLight = (): string =>
	sourcePalette.brandAlt[400];
const starRatingBackgroundColourDark = (): string =>
	sourcePalette.brandAlt[200];

const blockQuoteFillLight = (format: ArticleFormat): string => {
	return decidePalette(format).fill.blockquoteIcon;
};
const blockQuoteFillDark = ({
	design,
	display,
	theme,
}: ArticleFormat): string => {
	switch (design) {
		case ArticleDesign.DeadBlog:
		case ArticleDesign.LiveBlog:
			return sourcePalette.neutral[60];
		default:
			return decidePalette({ design, display, theme }).fill
				.blockquoteIcon;
	}
};
const quotedBlockquoteStylesLight = (format: ArticleFormat): string => {
	return decidePalette(format).text.blockquote;
};
const quotedBlockquoteStylesDark = (): string => sourcePalette.neutral[100];

const accordionTitleRowFillLight = (): string => sourcePalette.neutral[46];
const accordionTitleRowFillDark = (): string => sourcePalette.neutral[60];
const accordionTitleRowBackgroundLight = (): string =>
	sourcePalette.neutral[100];
const accordionTitleRowBackgroundDark = (): string => sourcePalette.neutral[10];
const accordionTitleRowBorderTopLight = (): string => sourcePalette.neutral[86];
const accordionTitleRowBorderTopDark = (): string => sourcePalette.neutral[20];
const accordionTitleLight = (): string => sourcePalette.neutral[7];
const accordionTitleDark = (): string => sourcePalette.neutral[86];
const accordionKeyEventsBackgroundLight = (): string =>
	sourcePalette.neutral[100];
const accordionBackgroundDark = (): string => sourcePalette.neutral[10];
const accordionLiveFeedBackgroundLight = (): string =>
	sourcePalette.neutral[97];

const tableOfContentsLight = (): string => sourcePalette.neutral[7];
const tableOfContentsDark = (): string => sourcePalette.neutral[86];
const tableOfContentsBorderLight = (): string => sourcePalette.neutral[86];
const tableOfContentsBorderDark = (): string => sourcePalette.neutral[20];

const adLabelsTextLight = (): string => {
	return sourcePalette.neutral[20];
};
const adLabelsTextDark = (): string => {
	return sourcePalette.neutral[100];
};
const adBackgroundLight = (): string => {
	return sourcePalette.neutral[97];
};
const adBackgroundDark = (): string => {
	return sourcePalette.neutral[20];
};
const adSupportBannerBackgroundLight = (): string => {
	return sourcePalette.neutral[93];
};
const adSupportBannerBackgroundDark = (): string => {
	return sourcePalette.neutral[46];
};
const adSupportBannerButtonBackgroundLight = (): string => {
	return sourcePalette.brand[400];
};
const adSupportBannerButtonBackgroundDark = (): string => {
	return sourcePalette.neutral[100];
};
const adSupportBannerButtonTextLight = (): string => {
	return sourcePalette.neutral[100];
};
const adSupportBannerButtonTextDark = (): string => {
	return sourcePalette.neutral[0];
};
const adSupportBannerTextLight = (): string => {
	return sourcePalette.brand[400];
};
const adSupportBannerTextDark = (): string => {
	return sourcePalette.neutral[100];
};

const appsFooterLinksTextLight = (): string => sourcePalette.neutral[7];
const appsFooterLinksTextDark = (): string => sourcePalette.neutral[60];
const appsFooterLinksBackgroundLight = (): string => sourcePalette.neutral[97];
const appsFooterLinksBackgroundDark = (format: ArticleFormat): string => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return sourcePalette.neutral[10];
		default:
			return sourcePalette.neutral[0];
	}
};
const clickToViewBackgroundLight = (): string => sourcePalette.neutral[97];
const clickToViewBackgroundDark = (): string => sourcePalette.neutral[20];
const clickToViewBorderLight = (): string => sourcePalette.neutral[86];
const clickToViewBorderDark = (): string => sourcePalette.neutral[46];
const clickToViewButtonLight = (): string => sourcePalette.brand[400];
const clickToViewButtonDark = (): string => sourcePalette.neutral[97];
const clickToViewButtonTextLight = (): string =>
	buttonThemeDefault.button.textPrimary;
const clickToViewButtonTextDark = (): string => sourcePalette.neutral[7];
const clickToViewButtonHoverLight = (): string =>
	buttonThemeDefault.button.backgroundPrimaryHover;
const clickToViewButtonHoverDark = (): string => sourcePalette.neutral[86];

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
	'--block-quote-fill': {
		light: blockQuoteFillLight,
		dark: blockQuoteFillDark,
	},
	'--quoted-block-quote-styles': {
		light: quotedBlockquoteStylesLight,
		dark: quotedBlockquoteStylesDark,
	},
	'--accordion-title-row-fill': {
		light: accordionTitleRowFillLight,
		dark: accordionTitleRowFillDark,
	},
	'--accordion-title-row-background': {
		light: accordionTitleRowBackgroundLight,
		dark: accordionTitleRowBackgroundDark,
	},
	'--accordion-title-row-border-top': {
		light: accordionTitleRowBorderTopLight,
		dark: accordionTitleRowBorderTopDark,
	},
	'--accordion-title': {
		light: accordionTitleLight,
		dark: accordionTitleDark,
	},
	'--accordion-key-events-background': {
		light: accordionKeyEventsBackgroundLight,
		dark: accordionBackgroundDark,
	},
	'--accordion-live-feed-background': {
		light: accordionLiveFeedBackgroundLight,
		dark: accordionBackgroundDark,
	},
	'--table-of-contents': {
		light: tableOfContentsLight,
		dark: tableOfContentsDark,
	},
	'--table-of-contents-border': {
		light: tableOfContentsBorderLight,
		dark: tableOfContentsBorderDark,
	},
	'--ad-background': {
		light: adBackgroundLight,
		dark: adBackgroundDark,
	},
	'--ad-labels-text': {
		light: adLabelsTextLight,
		dark: adLabelsTextDark,
	},
	'--ad-support-banner-button-background': {
		light: adSupportBannerButtonBackgroundLight,
		dark: adSupportBannerButtonBackgroundDark,
	},
	'--ad-support-banner-background': {
		light: adSupportBannerBackgroundLight,
		dark: adSupportBannerBackgroundDark,
	},
	'--ad-support-banner-button-text': {
		light: adSupportBannerButtonTextLight,
		dark: adSupportBannerButtonTextDark,
	},
	'--ad-support-banner-text': {
		light: adSupportBannerTextLight,
		dark: adSupportBannerTextDark,
	},
	'--apps-footer-links-text': {
		light: appsFooterLinksTextLight,
		dark: appsFooterLinksTextDark,
	},
	'--apps-footer-links-background': {
		light: appsFooterLinksBackgroundLight,
		dark: appsFooterLinksBackgroundDark,
	},
	'--click-to-view-background': {
		light: clickToViewBackgroundLight,
		dark: clickToViewBackgroundDark,
	},
	'--click-to-view-border': {
		light: clickToViewBorderLight,
		dark: clickToViewBorderDark,
	},
	'--click-to-view-button': {
		light: clickToViewButtonLight,
		dark: clickToViewButtonDark,
	},
	'--click-to-view-button-text': {
		light: clickToViewButtonTextLight,
		dark: clickToViewButtonTextDark,
	},
	'--click-to-view-button-hover': {
		light: clickToViewButtonHoverLight,
		dark: clickToViewButtonHoverDark,
	},
	'--avatar-background': {
		light: avatarLight,
		dark: avatarDark,
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
