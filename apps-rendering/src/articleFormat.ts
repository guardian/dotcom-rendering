/**
 * Helpers for working with the `Format` type from `@guardian/libs`
 */

// ----- Imports ----- //

import type { ArticleTheme } from '@guardian/libs';
import { ArticlePillar, ArticleSpecial } from '@guardian/libs';
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
const getPillarFromId = (pillarId: string): Optional<ArticlePillar> => {
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
const getPillarOrElseNews = (pillarId: string): ArticlePillar =>
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
const pillarToId = (pillar: ArticlePillar): string => {
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
const themeToPillar = (theme: ArticleTheme): ArticlePillar => {
	switch (theme) {
		case ArticleSpecial.SpecialReport:
		case ArticleSpecial.SpecialReportAlt:
		case ArticleSpecial.Labs:
			return ArticlePillar.News;
		default:
			return theme;
	}
};

// ----- Exports ----- //

export { getPillarFromId, getPillarOrElseNews, pillarToId, themeToPillar };
