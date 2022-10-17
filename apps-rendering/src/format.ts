/**
 * Helpers for working with the `Format` type from `@guardian/libs`
 */

// ----- Imports ----- //

import type { ArticleTheme } from '@guardian/libs';
import { ArticlePillar, ArticleSpecial } from '@guardian/libs';
import { none, some, withDefault } from '@guardian/types';
import type { Option } from '@guardian/types';
import { pipe } from 'lib';

// ----- Functions ----- //

/**
 * Attempts to parse a pillar expressed as a `string` into an
 * {@linkcode ArticlePillar}. Uses the pillar id format provided by CAPI; for
 * example `"pillar/news"`. Note that CAPI uses `"pillar/arts"` for
 * the culture pillar.
 *
 * @param pillarId A pillar expressed as a `string`, e.g. `"pillar/news"`.
 * @returns An `Option`, with a `Some` corresponding to an
 * {@linkcode ArticlePillar} if the id is valid, otherwise `None`.
 *
 * @example
 * const maybePillar = getPillarFromId("pillar/arts") // Some<ArticlePillar.Culture>
 */
const getPillarFromId = (pillarId: string): Option<ArticlePillar> => {
	switch (pillarId) {
		case 'pillar/opinion':
			return some(ArticlePillar.Opinion);
		case 'pillar/sport':
			return some(ArticlePillar.Sport);
		case 'pillar/arts':
			return some(ArticlePillar.Culture);
		case 'pillar/lifestyle':
			return some(ArticlePillar.Lifestyle);
		case 'pillar/news':
			return some(ArticlePillar.News);
		default:
			return none;
	}
};

/**
 * Does the same as {@linkcode getPillarFromId}, but falls back to
 * {@linkcode ArticlePillar.News} if parsing fails, instead of returning an
 * `Option`.
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
	pipe(
		pillarId,
		getPillarFromId,
		withDefault<ArticlePillar>(ArticlePillar.News),
	);

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
