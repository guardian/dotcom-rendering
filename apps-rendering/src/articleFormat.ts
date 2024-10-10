/**
 * Type definitions and helpers for `ArticleFormat`
 */

// ----- Imports ----- //

import { Optional } from 'optional';

// ----- Types ----- //

enum ArticleDesign {
	Standard,
	Picture,
	Gallery,
	Audio,
	Video,
	Review,
	Analysis,
	Explainer,
	Comment,
	Letter,
	Feature,
	LiveBlog,
	DeadBlog,
	Recipe,
	MatchReport,
	Interview,
	Editorial,
	Quiz,
	Interactive,
	PhotoEssay,
	PrintShop,
	Obituary,
	Correction,
	FullPageInteractive,
	NewsletterSignup,
	Timeline,
	Profile,
}

enum ArticleDisplay {
	Standard,
	Immersive,
	Showcase,
	NumberedList,
}

enum Pillar {
	News = 0,
	Opinion = 1,
	Sport = 2,
	Culture = 3,
	Lifestyle = 4,
}

enum ArticleSpecial {
	SpecialReport = 5,
	Labs = 6,
	SpecialReportAlt = 7,
}

type ArticleTheme = Pillar | ArticleSpecial;

interface ArticleFormat {
	theme: ArticleTheme;
	design: ArticleDesign;
	display: ArticleDisplay;
}

// ----- Functions ----- //

/**
 * Attempts to parse a pillar expressed as a `string` into an
 * {@linkcode Pillar}. Uses the pillar id format provided by CAPI; for
 * example `"pillar/news"`. Note that CAPI uses `"pillar/arts"` for
 * the culture pillar.
 *
 * @param pillarId A pillar expressed as a `string`, e.g. `"pillar/news"`.
 * @returns An `Optional`, with a `Some` corresponding to an
 * {@linkcode Pillar} if the id is valid, otherwise `None`.
 *
 * @example
 * const maybePillar = getPillarFromId("pillar/arts") // Some<Pillar.Culture>
 */
const getPillarFromId = (pillarId: string): Optional<Pillar> => {
	switch (pillarId) {
		case 'pillar/opinion':
			return Optional.some(Pillar.Opinion);
		case 'pillar/sport':
			return Optional.some(Pillar.Sport);
		case 'pillar/arts':
			return Optional.some(Pillar.Culture);
		case 'pillar/lifestyle':
			return Optional.some(Pillar.Lifestyle);
		case 'pillar/news':
			return Optional.some(Pillar.News);
		default:
			return Optional.none();
	}
};

/**
 * Does the same as {@linkcode getPillarFromId}, but falls back to
 * {@linkcode Pillar.News} if parsing fails, instead of returning an
 * `Optional`.
 *
 * @param pillarId A pillar expressed as a `string`, e.g. `"pillar/news"`.
 * @returns An {@linkcode Pillar} if the id is valid, otherwise
 * {@linkcode Pillar.News}.
 *
 * @example
 * const pillar = getPillarOrElseNews("pillar/arts") // Pillar.Culture
 * const pillar = getPillarOrElseNews("invalid id") // Pillar.News
 */
const getPillarOrElseNews = (pillarId: string): Pillar =>
	getPillarFromId(pillarId).withDefault(Pillar.News);

/**
 * Converts an {@linkcode Pillar} into a `string`. The `string` will be
 * in the pillar id format used by CAPI; for example `"pillar/news"`. Note that
 * CAPI uses `"pillar/arts"` for the culture pillar.
 *
 * @param pillar An {@linkcode Pillar}
 * @returns A pillar in `string` form, using the pillar id CAPI format
 *
 * @example
 * const pillarString = pillarToId(Pillar.Culture) // "pillar/arts"
 */
const pillarToId = (pillar: Pillar): string => {
	switch (pillar) {
		case Pillar.Opinion:
			return 'pillar/opinion';
		case Pillar.Sport:
			return 'pillar/sport';
		case Pillar.Culture:
			return 'pillar/arts';
		case Pillar.Lifestyle:
			return 'pillar/lifestyle';
		case Pillar.News:
			return 'pillar/news';
	}
};

/**
 * Converts an {@linkcode ArticleTheme} into the {@linkcode Pillar}
 * subset. For any `ArticleTheme` that isn't already an `Pillar`, such
 * as {@linkcode ArticleSpecial.SpecialReport}, will fall back to
 * {@linkcode Pillar.News}.
 *
 * @param theme An {@linkcode ArticleTheme}
 * @returns An {@linkcode Pillar}
 *
 * @example
 * const themeOne: ArticleTheme = Pillar.Lifestyle
 * const pillar: Pillar = themeToPillar(themeOne) // Pillar.Lifestyle
 *
 * const themeTwo: ArticleTheme = ArticleSpecial.SpecialReport
 * const pillar: Pillar = themeToPillar(themeTwo) // Pillar.News
 */
const themeToPillar = (theme: ArticleTheme): Pillar => {
	switch (theme) {
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
		case ArticleSpecial.Labs:
			return Pillar.News;
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
		case Pillar.News:
			return 'News';
		case Pillar.Opinion:
			return 'Opinion';
		case Pillar.Sport:
			return 'Sport';
		case Pillar.Culture:
			return 'Culture';
		case Pillar.Lifestyle:
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
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	ArticleTheme,
	ArticleFormat,
	Pillar,
	formatToString,
	getPillarFromId,
	getPillarOrElseNews,
	pillarToId,
	themeToPillar,
	themeToString,
};
