import { puzzleConfigs } from '../../src/model/puzzles/puzzleConfigs';
import type { FEPuzzlePageType } from '../../src/types/puzzlePage';
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
 * Builds a `FEPuzzlePageType` fixture for the given `slug`, defaulting to a
 * generic instance for that slug's `PuzzleConfig`. Pass `overrides` to
 * customise individual fields (deep-merged only one level for `instance`).
 */
export const createPuzzlePage = (
	slug: string,
	overrides: Partial<FEPuzzlePageType> = {},
): FEPuzzlePageType => {
	const puzzleConfig = puzzleConfigs[slug];

	if (!puzzleConfig) {
		throw new Error(`Unknown puzzle slug in fixture: ${slug}`);
	}

	return {
		id: `puzzle-page-${slug}`,
		slug,
		webTitle: `${slug} | The Guardian`,
		config: {
			...Standard.config,
			contentType: 'Game',
			// DCR no longer gates /PuzzlePage on any AB test participation
			// (the former 'game-page-experiment' gate was removed; routes
			// will be mapped/exposed via a different project instead), so
			// this is left empty rather than implying any particular value
			// is required.
			serverSideABTests: {},
		},
		nav: Standard.nav,
		pageFooter: Standard.pageFooter,
		canonicalUrl: `https://www.theguardian.com/games/${slug}`,
		editionId: Standard.editionId,
		instance: {
			title: `${slug} puzzle`,
			puzzleDate: '2026-09-11',
			moreFromPuzzlesAndGames: sampleMoreFromPuzzlesAndGames,
		},
		...overrides,
	};
};

/** One fixture per supported slug, for local dev preview and tests. */
export const puzzlePageFixtures: Record<string, FEPuzzlePageType> = Object.keys(
	puzzleConfigs,
).reduce<Record<string, FEPuzzlePageType>>((acc, slug) => {
	acc[slug] = createPuzzlePage(slug);
	return acc;
}, {});
