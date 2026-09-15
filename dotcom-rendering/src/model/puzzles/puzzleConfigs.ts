import { formatPuzzleDateShort } from '../../lib/puzzleDate';

/**
 * DCR's single source of truth for the structural/rendering behaviour of
 * each supported Puzzle Page slug.
 *
 * Puzzle Page is scoped to iframe-based puzzles only, crosswords remain on
 * their existing, separate `/crosswords/*` flow
 * (`ArticleDesign.Crossword` / `src/layouts/CrosswordLayout.tsx`), which is
 * unrelated to this registry and is not unified into Puzzle Page. See
 * `docs/puzzle-page.md` for the full picture.
 *
 * This registry currently only contains the V0 puzzle set (per PR #16700
 * review feedback): sudoku (4 difficulties), word wheel, and wordiply.
 * Codeword, futoshiki, suguru, and the trivia/quizzes puzzles
 * (on-the-ball, film-reveal) were removed for V0 and may return later once
 * the team is ready to support them.
 *
 * This registry is deliberately data-driven: all AmuseLabs-hosted puzzles
 * (the sudoku variants, and word-wheel) share the exact same iframe URL
 * template and differ only by the `{slug}` substitution, so they are
 * modelled as data rather than near-duplicate code paths.
 */

export const puzzleGroups = ['logic-puzzles', 'word-games'] as const;

export type PuzzleGroup = (typeof puzzleGroups)[number];

export interface PuzzleIframeConfig {
	provider: string;
	/**
	 * The iframe src URL. May contain a `{slug}` placeholder token, which is
	 * substituted with the puzzle's `slug` at render time.
	 */
	urlTemplate: string;
}

export interface PuzzleConfig {
	slug: string;
	puzzleGroup: PuzzleGroup;
	iframe: PuzzleIframeConfig;
	shareEnabled: boolean;
	printEnabled: boolean;
	hasArchive: boolean;
	/**
	 * The SEO title template for this puzzle, sourced verbatim from the
	 * product team's SEO spreadsheet (confirmed against a 60-character
	 * budget, date included). May contain a `{date}` placeholder token,
	 * substituted at render time (via `resolvePuzzleTitle`) with the
	 * puzzle's `instance.puzzleDate` formatted as a short "d MMM yy" date
	 * (e.g. `"15 Sep 26"`, see `formatPuzzleDateShort`). Used for the
	 * `<title>` tag and `og:title`/`twitter:title` in
	 * `render.puzzlePage.web.tsx`, deliberately *not* `webTitle` (the plain
	 * string `frontend` sends, e.g. "Sudoku (easy)", which is still used
	 * for other purposes such as the share button's pre-filled text, see
	 * `docs/puzzle-page.md`).
	 */
	title: string;
	/**
	 * The SEO meta description template for this puzzle, sourced verbatim
	 * from the product team's SEO spreadsheet (confirmed against a
	 * 157-character budget, date included). May contain a `{date}`
	 * placeholder token, substituted at render time (via
	 * `resolvePuzzleDescription`) the same way as `title` above. Used as
	 * the page's `<meta name="description">` (and, derived from it, its
	 * Open Graph/Twitter card description) - see `render.puzzlePage.web.tsx`.
	 * This exists specifically so every Puzzle Page has a clean, distinct
	 * description rather than falling back to DCR's generic, site-wide
	 * description (which risks Google/social previews auto-generating a
	 * snippet from page content instead - see "SEO risks to revisit..." in
	 * docs/puzzle-page.md for a concrete example of that failure mode
	 * elsewhere on the site).
	 */
	description: string;
	/**
	 * An optional, full preview/share image URL for this puzzle, used to
	 * populate `og:image`/`twitter:image` in `render.puzzlePage.web.tsx`.
	 * Deliberately optional and unset on every current registry entry - DCR
	 * has no site-wide default/fallback share image for pages without one
	 * (confirmed by investigation; see docs/puzzle-page.md), so an unset
	 * `image` simply omits `og:image`/`twitter:image` entirely, matching
	 * existing sitewide behaviour rather than needing a placeholder. Leave
	 * unset until a real, licensed preview image is provided for a given
	 * puzzle - do not invent a placeholder URL here.
	 */
	image?: string;
}

const amuseLabsUrlTemplate =
	'https://tg.amuselabs.com/guardian/date-picker?set=guardian-{slug}&embed=1&idx=1';

const amuseLabsPuzzle = (
	slug: string,
	puzzleGroup: PuzzleGroup,
	title: string,
	description: string,
): PuzzleConfig => ({
	slug,
	puzzleGroup,
	iframe: { provider: 'amuselabs', urlTemplate: amuseLabsUrlTemplate },
	shareEnabled: true,
	printEnabled: true,
	hasArchive: true,
	title,
	description,
});

/**
 * The full set of supported Puzzle Page slugs. Keys match each entry's
 * `slug` field (validated at load time by `validatePuzzleConfigs` below).
 *
 * The `title`/`description` copy on every entry below is sourced verbatim
 * from the product team's SEO spreadsheet, do not paraphrase or "improve"
 * it, the wording and character counts have already been confirmed against
 * the spreadsheet's per-page budgets. Each entry's "target search terms"
 * comment is likewise from that spreadsheet's "Search terms" column: it is
 * reference-only context for future copy/content work, not implemented as
 * a `<meta name="keywords">` tag (major search engines ignore that tag
 * entirely, so it provides no real SEO benefit today, see
 * docs/puzzle-page.md).
 */
export const puzzleConfigs: Record<string, PuzzleConfig> = {
	// Target search terms (reference only, not implemented as a meta tag):
	// easy online sudoku, free online sudoku, guardian sudoku
	'sudoku-easy': amuseLabsPuzzle(
		'sudoku-easy',
		'logic-puzzles',
		'Easy sudoku {date} - logic puzzle | The Guardian',
		'Easy sudoku {date}. Ease yourself in with this easy sudoku. Fill the grid with the numbers 1 to 9, appearing only once in every column, row and 3x3 box.',
	),
	// Target search terms (reference only, not implemented as a meta tag):
	// medium sudoku
	'sudoku-medium': amuseLabsPuzzle(
		'sudoku-medium',
		'logic-puzzles',
		'Medium sudoku {date} - logic puzzle | The Guardian',
		'Medium sudoku {date}. Ready to master the medium sudoku? Fill the grid with the numbers 1 to 9, appearing only once in every column, row and 3x3 box.',
	),
	// Target search terms (reference only, not implemented as a meta tag):
	// hard sudoku
	'sudoku-hard': amuseLabsPuzzle(
		'sudoku-hard',
		'logic-puzzles',
		'Hard sudoku {date} - logic puzzle | The Guardian',
		'Hard sudoku {date}. Ready to take on the hard sudoku? Fill the grid with the numbers 1 to 9, appearing only once in every column, row and 3x3 box.',
	),
	// Target search terms (reference only, not implemented as a meta tag):
	// killer sudoku
	'sudoku-killer': amuseLabsPuzzle(
		'sudoku-killer',
		'logic-puzzles',
		'Killer sudoku {date} - logic puzzle | The Guardian',
		'Killer sudoku {date}. Killer sudoku adds a twist. Fill the grid with the numbers 1 to 9, appearing only once in every column, row and 3x3 box.',
	),
	// Target search terms (reference only, not implemented as a meta tag):
	// daily word wheel, word wheel puzzle, word wheel online, word wheel
	// game, guardian word wheel, word wheel for today, guardian word wheel
	// today
	'word-wheel': amuseLabsPuzzle(
		'word-wheel',
		'word-games',
		'Word wheel {date} - word game | The Guardian',
		'Word wheel {date}. See how many words you can make out of the nine-letter daily word wheel, including the panagram.',
	),
	// Target search terms (reference only, not implemented as a meta tag):
	// guardian wordiply, wordiply today
	wordiply: {
		slug: 'wordiply',
		puzzleGroup: 'word-games',
		iframe: {
			provider: 'wordiply',
			urlTemplate: 'https://www.wordiply.com/',
		},
		shareEnabled: true,
		printEnabled: true,
		hasArchive: true,
		title: 'Wordiply {date} - word game | The Guardian',
		description:
			'Wordiply {date}. Guess the longest word in five guesses that includes the starter word. The closer you are, the higher your length score.',
	},
};

/**
 * Look up a puzzle's structural config by slug. Returns `undefined` for an
 * unknown slug so callers (e.g. the `/PuzzlePage` handler) can decide how to
 * respond (404).
 */
export const getPuzzleConfig = (slug: string): PuzzleConfig | undefined =>
	puzzleConfigs[slug];

/**
 * Resolve the final iframe src URL for a puzzle, expanding the `{slug}`
 * placeholder token in `PuzzleIframeConfig.urlTemplate`.
 */
export const resolveIframeUrl = (config: PuzzleConfig): string =>
	config.iframe.urlTemplate.replaceAll('{slug}', config.slug);

/**
 * Substitutes `{date}` in a `title`/`description` template with the given
 * `puzzleDate` (formatted short, via `formatPuzzleDateShort`), tidying up
 * the surrounding punctuation/whitespace if `puzzleDate` is absent (e.g.
 * `"Word wheel {date} - word game"` becomes `"Word wheel - word game"`,
 * not `"Word wheel  - word game"`, if there's no date to interpolate).
 */
const resolveDateTemplate = (
	template: string,
	puzzleDate: string | undefined,
): string => {
	const shortDate = formatPuzzleDateShort(puzzleDate) ?? '';
	return template
		.replace('{date}', shortDate)
		.replace(/\s{2,}/g, ' ')
		.replace(/\s+([.,])/g, '$1')
		.trim();
};

/**
 * Resolve the final, date-substituted SEO title for a puzzle. See
 * `PuzzleConfig.title`'s doc comment for what feeds this and what it's used
 * for.
 */
export const resolvePuzzleTitle = (
	config: PuzzleConfig,
	puzzleDate: string | undefined,
): string => resolveDateTemplate(config.title, puzzleDate);

/**
 * Resolve the final, date-substituted SEO meta description for a puzzle.
 * See `PuzzleConfig.description`'s doc comment for what feeds this and what
 * it's used for.
 */
export const resolvePuzzleDescription = (
	config: PuzzleConfig,
	puzzleDate: string | undefined,
): string => resolveDateTemplate(config.description, puzzleDate);

const isValidPuzzleConfig = (key: string, config: PuzzleConfig): boolean => {
	if (config.slug !== key) return false;
	if (!puzzleGroups.includes(config.puzzleGroup)) return false;
	if (!config.iframe.provider || !config.iframe.urlTemplate) return false;
	if (!config.title.trim()) return false;
	if (!config.description.trim()) return false;
	if (config.image !== undefined && !config.image.trim()) return false;
	return true;
};

/**
 * Fail fast if the registry itself is malformed (e.g. a mismatched slug key,
 * a missing/empty `iframe` config, a missing/empty `title`/`description`,
 * or a present-but-empty `image`). Run once at module load so a bad
 * registry entry surfaces immediately rather than at request time.
 */
export const validatePuzzleConfigs = (
	configs: Record<string, PuzzleConfig>,
): void => {
	for (const [key, config] of Object.entries(configs)) {
		if (!isValidPuzzleConfig(key, config)) {
			throw new TypeError(
				`Invalid PuzzleConfig registry entry for slug "${key}".`,
			);
		}
	}
};

validatePuzzleConfigs(puzzleConfigs);
