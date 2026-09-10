/**
 * DCR's single source of truth for the structural/rendering behaviour of
 * each supported Puzzle Page slug.
 *
 * Puzzle Page is scoped to iframe-based puzzles only — crosswords remain on
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
}

const amuseLabsUrlTemplate =
	'https://tg.amuselabs.com/guardian/date-picker?set=guardian-{slug}&embed=1&idx=1';

const amuseLabsPuzzle = (
	slug: string,
	puzzleGroup: PuzzleGroup,
): PuzzleConfig => ({
	slug,
	puzzleGroup,
	iframe: { provider: 'amuselabs', urlTemplate: amuseLabsUrlTemplate },
	shareEnabled: true,
	printEnabled: true,
	hasArchive: true,
});

/**
 * The full set of supported Puzzle Page slugs. Keys match each entry's
 * `slug` field (validated at load time by `validatePuzzleConfigs` below).
 */
export const puzzleConfigs: Record<string, PuzzleConfig> = {
	'sudoku-easy': amuseLabsPuzzle('sudoku-easy', 'logic-puzzles'),
	'sudoku-medium': amuseLabsPuzzle('sudoku-medium', 'logic-puzzles'),
	'sudoku-hard': amuseLabsPuzzle('sudoku-hard', 'logic-puzzles'),
	'sudoku-killer': amuseLabsPuzzle('sudoku-killer', 'logic-puzzles'),
	'word-wheel': amuseLabsPuzzle('word-wheel', 'word-games'),
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
	return true;
};

/**
 * Fail fast if the registry itself is malformed (e.g. a mismatched slug key,
 * or a missing/empty `iframe` config). Run once at module load so a bad
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
