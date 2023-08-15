/**
 * Helpers for working with the `Format` type from `@guardian/libs`
 */

// ----- Imports ----- //

import type { ArticleFormat, ArticleTheme, Pillar } from '@guardian/libs';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { Optional } from 'optional';

// ----- Functions ----- //

/**
 * Attempts to parse a pillar expressed as a `string` into an
 * {@linkcode ArticlePillar}. Uses the pillar id format provided by CAPI; for
 * example `"pillar/news"`. Note that CAPI uses `"pillar/arts"` for
 * the culture pillar.
 *
 * @param pillarId A pillar expressed as a `string`, e.g. `"pillar/news"`.
 * @returns An `Optional`, with a `Some` corresponding to an
 * {@linkcode ArticlePillar} if the id is valid, otherwise `None`.
 *
 * @example
 * const maybePillar = getPillarFromId("pillar/arts") // Some<ArticlePillar.Culture>
 */
const getPillarFromId = (pillarId: string): Optional<Pillar> => {
	switch (pillarId) {
		case 'pillar/opinion':
			return Optional.some(ArticlePillar.Opinion);
		case 'pillar/sport':
			return Optional.some(ArticlePillar.Sport);
		case 'pillar/arts':
			return Optional.some(ArticlePillar.Culture);
		case 'pillar/lifestyle':
			return Optional.some(ArticlePillar.Lifestyle);
		case 'pillar/news':
			return Optional.some(ArticlePillar.News);
		default:
			return Optional.none();
	}
};

/**
 * Does the same as {@linkcode getPillarFromId}, but falls back to
 * {@linkcode ArticlePillar.News} if parsing fails, instead of returning an
 * `Optional`.
 *
 * @param pillarId A pillar expressed as a `string`, e.g. `"pillar/news"`.
 * @returns An {@linkcode ArticlePillar} if the id is valid, otherwise
 * {@linkcode ArticlePillar.News}.
 *
 * @example
 * const pillar = getPillarOrElseNews("pillar/arts") // ArticlePillar.Culture
 * const pillar = getPillarOrElseNews("invalid id") // ArticlePillar.News
 */
const getPillarOrElseNews = (pillarId: string): Pillar =>
	getPillarFromId(pillarId).withDefault(ArticlePillar.News);

/**
 * Converts an {@linkcode ArticlePillar} into a `string`. The `string` will be
 * in the pillar id format used by CAPI; for example `"pillar/news"`. Note that
 * CAPI uses `"pillar/arts"` for the culture pillar.
 *
 * @param pillar An {@linkcode ArticlePillar}
 * @returns A pillar in `string` form, using the pillar id CAPI format
 *
 * @example
 * const pillarString = pillarToId(ArticlePillar.Culture) // "pillar/arts"
 */
const pillarToId = (pillar: Pillar): string => {
	switch (pillar) {
		case ArticlePillar.Opinion:
			return 'pillar/opinion';
		case ArticlePillar.Sport:
			return 'pillar/sport';
		case ArticlePillar.Culture:
			return 'pillar/arts';
		case ArticlePillar.Lifestyle:
			return 'pillar/lifestyle';
		case ArticlePillar.News:
			return 'pillar/news';
	}
};

/**
 * Converts an {@linkcode ArticleTheme} into the {@linkcode ArticlePillar}
 * subset. For any `ArticleTheme` that isn't already an `ArticlePillar`, such
 * as {@linkcode ArticleSpecial.SpecialReport}, will fall back to
 * {@linkcode ArticlePillar.News}.
 *
 * @param theme An {@linkcode ArticleTheme}
 * @returns An {@linkcode ArticlePillar}
 *
 * @example
 * const themeOne: ArticleTheme = ArticlePillar.Lifestyle
 * const pillar: ArticlePillar = themeToPillar(themeOne) // ArticlePillar.Lifestyle
 *
 * const themeTwo: ArticleTheme = ArticleSpecial.SpecialReport
 * const pillar: ArticlePillar = themeToPillar(themeTwo) // ArticlePillar.News
 */
const themeToPillar = (theme: ArticleTheme): Pillar => {
	switch (theme) {
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
		case ArticleSpecial.Labs:
			return ArticlePillar.News;
		default:
			return theme;
	}
};

/**
 * Creates a string representation of {@linkcode ArticleDesign}. Useful for
 * logging, storybook UI etc.
 *
 * @param design An {@linkcode ArticleDesign}
 * @returns A string representation of `ArticleDesign`
 */
const designToString = (design: ArticleDesign): string => {
	switch (design) {
		case ArticleDesign.Standard:
			return 'Standard';
		case ArticleDesign.Gallery:
			return 'Gallery';
		case ArticleDesign.Audio:
			return 'Audio';
		case ArticleDesign.Video:
			return 'Video';
		case ArticleDesign.Review:
			return 'Review';
		case ArticleDesign.Analysis:
			return 'Analysis';
		case ArticleDesign.Explainer:
			return 'Explainer';
		case ArticleDesign.Comment:
			return 'Comment';
		case ArticleDesign.Letter:
			return 'Letter';
		case ArticleDesign.Feature:
			return 'Feature';
		case ArticleDesign.LiveBlog:
			return 'Liveblog';
		case ArticleDesign.DeadBlog:
			return 'Deadblog';
		case ArticleDesign.Recipe:
			return 'Recipe';
		case ArticleDesign.MatchReport:
			return 'Match Report';
		case ArticleDesign.Interview:
			return 'Interview';
		case ArticleDesign.Editorial:
			return 'Editorial';
		case ArticleDesign.Quiz:
			return 'Quiz';
		case ArticleDesign.Interactive:
			return 'Interactive';
		case ArticleDesign.PhotoEssay:
			return 'Photo Essay';
		case ArticleDesign.PrintShop:
			return 'Print Shop';
		case ArticleDesign.Obituary:
			return 'Obituary';
		case ArticleDesign.Correction:
			return 'Correction';
		case ArticleDesign.FullPageInteractive:
			return 'Full Page Interactive';
		case ArticleDesign.NewsletterSignup:
			return 'Newsletter Signup';
		case ArticleDesign.Timeline:
			return 'Timeline';
		case ArticleDesign.Profile:
			return 'Profile';
		case ArticleDesign.Picture:
			return 'Picture';
	}
};

/**
 * Creates a string representation of {@linkcode ArticleDisplay}. Useful for
 * logging, storybook UI etc.
 *
 * @param display An {@linkcode ArticleDisplay}
 * @returns A string representation of `ArticleDisplay`
 */
const displayToString = (display: ArticleDisplay): string => {
	switch (display) {
		case ArticleDisplay.Standard:
			return 'Standard';
		case ArticleDisplay.Immersive:
			return 'Immersive';
		case ArticleDisplay.Showcase:
			return 'Showcase';
		case ArticleDisplay.NumberedList:
			return 'Numbered List';
	}
};

/**
 * Creates a string representation of {@linkcode ArticleTheme}. Useful for
 * logging, storybook UI etc.
 *
 * @param theme An {@linkcode ArticleTheme}
 * @returns A string representation of `ArticleTheme`
 */
const themeToString = (theme: ArticleTheme): string => {
	switch (theme) {
		case ArticlePillar.News:
			return 'News';
		case ArticlePillar.Opinion:
			return 'Opinion';
		case ArticlePillar.Sport:
			return 'Sport';
		case ArticlePillar.Culture:
			return 'Culture';
		case ArticlePillar.Lifestyle:
			return 'Lifestyle';
		case ArticleSpecial.Labs:
			return 'Labs';
		case ArticleSpecial.SpecialReport:
			return 'Special Report';
		case ArticleSpecial.SpecialReportAlt:
			return 'Special Report Alt';
	}
};

/**
 * Creates a string representation of {@linkcode ArticleFormat}. Useful for
 * logging, storybook UI etc.
 *
 * @param format An {@linkcode ArticleFormat}
 * @returns A string representation of `ArticleFormat`
 */
const formatToString = ({ design, display, theme }: ArticleFormat): string =>
	[
		`Design: ${designToString(design)}`,
		`Display: ${displayToString(display)}`,
		`Theme: ${themeToString(theme)}`,
	].join(', ');

// ----- Exports ----- //

export {
	formatToString,
	getPillarFromId,
	getPillarOrElseNews,
	pillarToId,
	themeToPillar,
	themeToString,
};
