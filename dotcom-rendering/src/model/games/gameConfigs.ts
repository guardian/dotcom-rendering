/**
 * DCR's single source of truth for the structural/rendering behaviour of
 * each supported Game page slug.
 *
 * This registry is deliberately data-driven: all AmuseLabs-hosted games
 * (sudoku variants, futoshiki, suguru, word-wheel, codeword) share the exact
 * same iframe URL template and differ only by the `{slug}` substitution, so
 * they are modelled as data rather than near-duplicate code paths.
 */

export const gameGroups = [
	'crosswords',
	'logic-puzzles',
	'word-games',
	'trivia-and-quizzes',
] as const;

export type GameGroup = (typeof gameGroups)[number];

export const gameRenderModes = ['component', 'iframe'] as const;

export type GameRenderMode = (typeof gameRenderModes)[number];

export interface GameIframeConfig {
	provider: string;
	/**
	 * The iframe src URL. May contain a `{slug}` placeholder token, which is
	 * substituted with the game's `slug` at render time.
	 */
	urlTemplate: string;
}

export interface GameConfig {
	slug: string;
	gameGroup: GameGroup;
	renderMode: GameRenderMode;
	/**
	 * Registry key resolved via `src/lib/gameComponents.ts`. Required when
	 * `renderMode` is `'component'`.
	 */
	componentKey?: string;
	/** Required when `renderMode` is `'iframe'`. */
	iframe?: GameIframeConfig;
	setterEnabled: boolean;
	commentsEnabled: boolean;
	shareEnabled: boolean;
	printEnabled: boolean;
	hasArchive: boolean;
}

const amuseLabsUrlTemplate =
	'https://tg.amuselabs.com/guardian/date-picker?set=guardian-{slug}&embed=1&idx=1';

const amuseLabsGame = (slug: string, gameGroup: GameGroup): GameConfig => ({
	slug,
	gameGroup,
	renderMode: 'iframe',
	iframe: { provider: 'amuselabs', urlTemplate: amuseLabsUrlTemplate },
	setterEnabled: false,
	commentsEnabled: false,
	shareEnabled: true,
	printEnabled: true,
	hasArchive: true,
});

/**
 * The full set of supported Game page slugs. Keys match each entry's `slug`
 * field (validated at load time by `validateGameConfigs` below).
 */
export const gameConfigs: Record<string, GameConfig> = {
	crossword: {
		slug: 'crossword',
		gameGroup: 'crosswords',
		renderMode: 'component',
		componentKey: 'crossword',
		setterEnabled: true,
		commentsEnabled: true,
		shareEnabled: true,
		printEnabled: true,
		hasArchive: true,
	},
	'sudoku-easy': amuseLabsGame('sudoku-easy', 'logic-puzzles'),
	'sudoku-medium': amuseLabsGame('sudoku-medium', 'logic-puzzles'),
	'sudoku-hard': amuseLabsGame('sudoku-hard', 'logic-puzzles'),
	'sudoku-killer': amuseLabsGame('sudoku-killer', 'logic-puzzles'),
	futoshiki: amuseLabsGame('futoshiki', 'logic-puzzles'),
	suguru: amuseLabsGame('suguru', 'logic-puzzles'),
	'word-wheel': amuseLabsGame('word-wheel', 'word-games'),
	codeword: amuseLabsGame('codeword', 'word-games'),
	wordiply: {
		slug: 'wordiply',
		gameGroup: 'word-games',
		renderMode: 'iframe',
		iframe: {
			provider: 'wordiply',
			urlTemplate: 'https://www.wordiply.com/',
		},
		setterEnabled: false,
		commentsEnabled: false,
		shareEnabled: true,
		printEnabled: true,
		hasArchive: true,
	},
	'on-the-ball': {
		slug: 'on-the-ball',
		gameGroup: 'trivia-and-quizzes',
		renderMode: 'iframe',
		iframe: {
			provider: 'sportsreveal',
			urlTemplate: 'https://sportsreveal.io/guardian',
		},
		setterEnabled: false,
		commentsEnabled: false,
		shareEnabled: true,
		printEnabled: true,
		hasArchive: true,
	},
	'film-reveal': {
		slug: 'film-reveal',
		gameGroup: 'trivia-and-quizzes',
		renderMode: 'iframe',
		iframe: {
			provider: 'moviegrid',
			urlTemplate: 'https://moviegrid.io/guardian',
		},
		setterEnabled: false,
		commentsEnabled: false,
		shareEnabled: true,
		printEnabled: true,
		hasArchive: true,
	},
};

/**
 * Look up a game's structural config by slug. Returns `undefined` for an
 * unknown slug so callers (e.g. the `/GamePage` handler) can decide how to
 * respond (404).
 */
export const getGameConfig = (slug: string): GameConfig | undefined =>
	gameConfigs[slug];

/**
 * Resolve the final iframe src URL for an `iframe`-rendered game, expanding
 * the `{slug}` placeholder token in `GameIframeConfig.urlTemplate`.
 */
export const resolveIframeUrl = (config: GameConfig): string => {
	if (!config.iframe) {
		throw new TypeError(
			`GameConfig for slug "${config.slug}" has no iframe config.`,
		);
	}
	return config.iframe.urlTemplate.replaceAll('{slug}', config.slug);
};

const isValidGameConfig = (key: string, config: GameConfig): boolean => {
	if (config.slug !== key) return false;
	if (!gameGroups.includes(config.gameGroup)) return false;
	if (!gameRenderModes.includes(config.renderMode)) return false;
	if (config.renderMode === 'component' && !config.componentKey) {
		return false;
	}
	if (config.renderMode === 'iframe' && !config.iframe) {
		return false;
	}
	if (config.renderMode === 'iframe' && config.componentKey) {
		return false;
	}
	if (config.renderMode === 'component' && config.iframe) {
		return false;
	}
	return true;
};

/**
 * Fail fast if the registry itself is malformed (e.g. a mismatched slug key,
 * or a `component` entry missing its `componentKey`). Run once at module
 * load so a bad registry entry surfaces immediately rather than at request
 * time.
 */
export const validateGameConfigs = (
	configs: Record<string, GameConfig>,
): void => {
	for (const [key, config] of Object.entries(configs)) {
		if (!isValidGameConfig(key, config)) {
			throw new TypeError(
				`Invalid GameConfig registry entry for slug "${key}".`,
			);
		}
	}
};

validateGameConfigs(gameConfigs);
