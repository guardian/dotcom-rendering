import type { CrosswordProps } from '@guardian/react-crossword';
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

const sampleCrosswordData: CrosswordProps['data'] = {
	crosswordType: 'quick',
	date: Date.now(),
	dimensions: { cols: 3, rows: 1 },
	id: 'quick/1',
	name: 'Quick crossword No 1',
	number: 1,
	solutionAvailable: false,
	entries: [
		{
			id: '1-across',
			number: 1,
			humanNumber: '1',
			clue: 'Sample clue (3)',
			direction: 'across',
			position: { x: 0, y: 0 },
			separatorLocations: {},
			length: 3,
			group: ['1-across'],
		},
	],
};

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

	const isCrossword = gameConfig.componentKey === 'crossword';

	return {
		id: `game-page-${slug}`,
		slug,
		webTitle: `${slug} | The Guardian`,
		config: {
			...Standard.config,
			contentType: 'Game',
			serverSideABTests: { 'game-page-experiment': 'variant' },
		},
		nav: Standard.nav,
		pageFooter: Standard.pageFooter,
		canonicalUrl: `https://www.theguardian.com/games/${slug}`,
		editionId: Standard.editionId,
		instance: {
			title: isCrossword ? 'Quick crossword No 1' : `${slug} puzzle`,
			puzzleType: isCrossword ? 'Quick crossword' : undefined,
			setterName: gameConfig.setterEnabled ? 'Sample Setter' : undefined,
			date: '1 January 2025',
			discussionId: gameConfig.commentsEnabled
				? `game/${slug}`
				: undefined,
			crosswordData: isCrossword ? sampleCrosswordData : undefined,
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
