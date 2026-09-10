import { gameConfigs } from '../../src/model/games/gameConfigs';
import type { FEGamePageType } from '../../src/types/gamePage';
import type { PuzzleItem } from '../../src/types/puzzlesPage';
import { Standard } from '../generated/fe-articles/Standard';

const sampleMoreFromPuzzlesAndGames: PuzzleItem[] = [
	{
		id: 'sudoku-easy-daily',
		title: 'Sudoku easy',
		type: 'sudoku-easy',
		set: 'all',
		cardVariant: 'compact',
		cadence: 'Daily',
		slug: 'sudoku-easy',
	},
	{
		id: 'word-wheel-daily',
		title: 'Word wheel',
		type: 'word-wheel',
		set: 'all',
		cardVariant: 'compact',
		cadence: 'Daily',
		slug: 'word-wheel',
	},
];

/**
 * Builds a `FEGamePageType` fixture for the given `slug`, defaulting to a
 * generic instance for that slug's `GameConfig`. Pass `overrides` to
 * customise individual fields (deep-merged only one level for `instance`).
 */
export const createGamePage = (
	slug: string,
	overrides: Partial<FEGamePageType> = {},
): FEGamePageType => {
	const gameConfig = gameConfigs[slug];

	if (!gameConfig) {
		throw new Error(`Unknown game slug in fixture: ${slug}`);
	}

	return {
		id: `game-page-${slug}`,
		slug,
		webTitle: `${slug} | The Guardian`,
		config: {
			...Standard.config,
			contentType: 'Game',
			// DCR no longer gates /GamePage on any AB test participation (the
			// former 'game-page-experiment' gate was removed; routes will be
			// mapped/exposed via a different project instead), so this is left
			// empty rather than implying any particular value is required.
			serverSideABTests: {},
		},
		nav: Standard.nav,
		pageFooter: Standard.pageFooter,
		canonicalUrl: `https://www.theguardian.com/games/${slug}`,
		editionId: Standard.editionId,
		instance: {
			title: `${slug} puzzle`,
			moreFromPuzzlesAndGames: sampleMoreFromPuzzlesAndGames,
		},
		...overrides,
	};
};

/** One fixture per supported slug, for local dev preview and tests. */
export const gamePageFixtures: Record<string, FEGamePageType> = Object.keys(
	gameConfigs,
).reduce<Record<string, FEGamePageType>>((acc, slug) => {
	acc[slug] = createGamePage(slug);
	return acc;
}, {});
