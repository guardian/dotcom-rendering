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
 * This registry is deliberately data-driven: all AmuseLabs-hosted puzzles
 * (sudoku variants, futoshiki, suguru, word-wheel, codeword) share the exact
 * same iframe URL template and differ only by the `{slug}` substitution, so
 * they are modelled as data rather than near-duplicate code paths.
 */

export const puzzleGroups = [
	'crosswords',
	'logic-puzzles',
	'word-games',
	'trivia-and-quizzes',
] as const;

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
	futoshiki: amuseLabsPuzzle('futoshiki', 'logic-puzzles'),
	suguru: amuseLabsPuzzle('suguru', 'logic-puzzles'),
	'word-wheel': amuseLabsPuzzle('word-wheel', 'word-games'),
	codeword: amuseLabsPuzzle('codeword', 'word-games'),
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
	'on-the-ball': {
		slug: 'on-the-ball',
		puzzleGroup: 'trivia-and-quizzes',
		iframe: {
			provider: 'sportsreveal',
			urlTemplate: 'https://sportsreveal.io/guardian',
		},
		shareEnabled: true,
		printEnabled: true,
		hasArchive: true,
	},
	'film-reveal': {
		slug: 'film-reveal',
		puzzleGroup: 'trivia-and-quizzes',
		iframe: {
			provider: 'moviegrid',
			urlTemplate: 'https://moviegrid.io/guardian',
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
