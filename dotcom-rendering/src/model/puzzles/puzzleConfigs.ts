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
	 * A short, curated, human-written meta description for this puzzle,
	 * used as the page's `<meta name="description">` (and, derived from
	 * it, its Open Graph/Twitter card description) - see
	 * `render.puzzlePage.web.tsx`. This exists specifically so every Puzzle
	 * Page has a clean, distinct description rather than falling back to
	 * DCR's generic, site-wide description (which risks Google/social
	 * previews auto-generating a snippet from page content instead - see
	 * "SEO risks to revisit..." in docs/puzzle-page.md for a concrete
	 * example of that failure mode elsewhere on the site). Each entry's
	 * copy is written specifically for that puzzle, not a template with
	 * only the slug swapped in.
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
	description: string,
): PuzzleConfig => ({
	slug,
	puzzleGroup,
	iframe: { provider: 'amuselabs', urlTemplate: amuseLabsUrlTemplate },
	shareEnabled: true,
	printEnabled: true,
	hasArchive: true,
	description,
});

/**
 * The full set of supported Puzzle Page slugs. Keys match each entry's
 * `slug` field (validated at load time by `validatePuzzleConfigs` below).
 */
export const puzzleConfigs: Record<string, PuzzleConfig> = {
	'sudoku-easy': amuseLabsPuzzle(
		'sudoku-easy',
		'logic-puzzles',
		'Play easy Sudoku online for free with the Guardian. A gentle, relaxed number puzzle perfect for beginners or a quick warm-up between the harder grids.',
	),
	'sudoku-medium': amuseLabsPuzzle(
		'sudoku-medium',
		'logic-puzzles',
		'Play medium Sudoku online for free with the Guardian. A step up from easy, this classic number puzzle offers just enough challenge to keep you thinking.',
	),
	'sudoku-hard': amuseLabsPuzzle(
		'sudoku-hard',
		'logic-puzzles',
		'Play hard Sudoku online for free with the Guardian. A tough, testing number puzzle for experienced solvers who want a real workout for their logic.',
	),
	'sudoku-killer': amuseLabsPuzzle(
		'sudoku-killer',
		'logic-puzzles',
		'Play Killer Sudoku online for free with the Guardian. This fiendish variant adds coloured cages and hidden sums to the classic grid for a tougher challenge.',
	),
	'word-wheel': amuseLabsPuzzle(
		'word-wheel',
		'word-games',
		'Play Word Wheel online for free with the Guardian. Find as many words as you can from nine letters, then try to crack the nine-letter word that uses them all.',
	),
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
		description:
			'Play Wordiply online for free with the Guardian. Build the longest word you can from a short string of letters, then see how your vocabulary stacks up.',
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

const isValidPuzzleConfig = (key: string, config: PuzzleConfig): boolean => {
	if (config.slug !== key) return false;
	if (!puzzleGroups.includes(config.puzzleGroup)) return false;
	if (!config.iframe.provider || !config.iframe.urlTemplate) return false;
	if (!config.description.trim()) return false;
	if (config.image !== undefined && !config.image.trim()) return false;
	return true;
};

/**
 * Fail fast if the registry itself is malformed (e.g. a mismatched slug key,
 * a missing/empty `iframe` config, a missing/empty `description`, or a
 * present-but-empty `image`). Run once at module load so a bad registry
 * entry surfaces immediately rather than at request time.
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
