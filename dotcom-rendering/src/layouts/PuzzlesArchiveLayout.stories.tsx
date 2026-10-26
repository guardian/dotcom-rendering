import { css, Global } from '@emotion/react';
import { breakpoints, palette } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { createPuzzlesPage } from '../../fixtures/manual/puzzlesPage';
import { extractNAV } from '../model/extract-nav';
import type { PuzzlesArchive } from '../types/puzzlesPage';
import { PuzzlesArchiveLayout } from './PuzzlesArchiveLayout';

const puzzles = ['Quick', 'Mini', 'Cryptic', 'Quick cryptic', 'Quiptic'].map(
	(title) => {
		const id = title.toLowerCase().replace(' ', '-');
		return {
			id,
			title,
			puzzleType: id.toUpperCase(),
			slug: `crosswords/${id}`,
			set: id,
		};
	},
);
const mini = puzzles[1]!;

const archive: PuzzlesArchive = {
	category: 'crosswords',
	title: 'Crosswords',
	description: 'Choose a crossword from our archive.',
	selectedPuzzle: mini,
	puzzles,
	year: 2026,
	month: 8,
	items: Array.from({ length: 26 }, (_, index) => {
		const day = String(index + 1).padStart(2, '0');
		return {
			puzzleType: mini.puzzleType,
			date: `2026-08-${day}`,
			progress: [15, 21, 24, 25].includes(index + 1)
				? 100
				: index + 1 === 11
					? 50
					: 0,
			setterName: 'Setter name',
			url: `/crosswords/mini/2026-08-${day}`,
		};
	}),
	hasError: false,
	moreFrom: [
		{
			id: 'sudoku-easy',
			title: 'Sudoku easy',
			type: 'sudoku',
			set: 'easy',
			cardVariant: 'compact',
			cadence: 'Daily',
			url: '/puzzles-and-games/logic-puzzles/sudoku-easy',
		},
		{
			id: 'word-wheel',
			title: 'Word wheel',
			type: 'word-wheel',
			set: 'all',
			cardVariant: 'compact',
			cadence: 'Daily',
			url: '/puzzles-and-games/word-wheel',
		},
		{
			id: 'wordiply',
			title: 'Wordiply',
			type: 'wordiply',
			set: 'all',
			cardVariant: 'compact',
			cadence: 'Daily',
			url: '/puzzles-and-games/wordiply',
		},
	],
};

const puzzlesPage = createPuzzlesPage({ archive });

const meta = {
	title: 'Layouts/Puzzles Archive',
	component: PuzzlesArchiveLayout,
	args: {
		puzzlesPage,
		NAV: extractNAV(puzzlesPage.nav),
	},
	decorators: [
		(Story) => (
			<>
				{/* Without commercial JS the right slot has no height, so reserve an MPU. */}
				<Global
					styles={css`
						#dfp-ad--right {
							min-height: 250px;
							background: ${palette.neutral[93]};
						}
					`}
				/>
				<Story />
			</>
		),
	],
} satisfies Meta<typeof PuzzlesArchiveLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Chromatic does not support `viewports` and `modes` on the same story, so
 * the viewports live on the light stories and the dark stories use modes.
 */
const lightParameters = {
	chromatic: {
		viewports: [
			breakpoints.mobileMedium,
			breakpoints.tablet,
			breakpoints.desktop,
			breakpoints.wide,
		],
	},
};

const darkParameters = {
	chromatic: {
		modes: {
			'dark mobileMedium': {
				globalColourScheme: 'dark',
				viewport: breakpoints.mobileMedium,
			},
			'dark desktop': {
				globalColourScheme: 'dark',
				viewport: breakpoints.desktop,
			},
		},
	},
};

export const WithAds = {
	parameters: lightParameters,
} satisfies Story;

export const AdFree = {
	args: {
		puzzlesPage: { ...puzzlesPage, isAdFreeUser: true },
	},
	parameters: lightParameters,
} satisfies Story;

const archiveItems = (
	puzzle: { puzzleType: string; slug?: string },
	setterName?: string,
) =>
	Array.from({ length: 26 }, (_, index) => {
		const day = String(index + 1).padStart(2, '0');
		return {
			puzzleType: puzzle.puzzleType,
			date: `2026-08-${day}`,
			progress: [15, 21, 24, 25].includes(index + 1) ? 100 : 0,
			...(setterName && { setterName }),
			url: `/puzzles-and-games/${puzzle.slug}/2026-08-${day}`,
		};
	});

const wordWheel = {
	id: 'word-wheel',
	title: 'Word wheel',
	puzzleType: 'WORD_WHEEL',
	slug: 'word-games/word-wheel',
	set: 'word-wheel',
};

const wordGamesArchive: PuzzlesArchive = {
	...archive,
	category: 'word-games',
	title: 'Word games',
	description: 'Choose a word game from our archive.',
	selectedPuzzle: wordWheel,
	puzzles: [wordWheel],
	items: archiveItems(wordWheel),
};

const sudokuPuzzles = ['Easy', 'Medium', 'Hard', 'Killer'].map((title) => {
	const id = `sudoku-${title.toLowerCase()}`;
	return {
		id,
		title,
		puzzleType: id.toUpperCase().replace('-', '_'),
		slug: `logic-puzzles/${id}`,
		set: id,
	};
});
const sudokuMedium = sudokuPuzzles[1]!;

const logicPuzzlesArchive: PuzzlesArchive = {
	...archive,
	category: 'logic-puzzles',
	title: 'Logic puzzles',
	description: 'Choose a logic puzzle from our archive.',
	selectedPuzzle: { ...sudokuMedium, title: 'Medium sudoku' },
	puzzles: sudokuPuzzles,
	items: archiveItems(sudokuMedium),
};

export const WordGames = {
	args: {
		puzzlesPage: createPuzzlesPage({ archive: wordGamesArchive }),
	},
	parameters: lightParameters,
} satisfies Story;

export const LogicPuzzles = {
	args: {
		puzzlesPage: createPuzzlesPage({ archive: logicPuzzlesArchive }),
	},
	parameters: lightParameters,
} satisfies Story;

export const CrosswordsDark = {
	args: { darkModeAvailable: true },
	parameters: darkParameters,
} satisfies Story;

export const WordGamesDark = {
	args: {
		darkModeAvailable: true,
		puzzlesPage: createPuzzlesPage({ archive: wordGamesArchive }),
	},
	parameters: darkParameters,
} satisfies Story;

export const LogicPuzzlesDark = {
	args: {
		darkModeAvailable: true,
		puzzlesPage: createPuzzlesPage({ archive: logicPuzzlesArchive }),
	},
	parameters: darkParameters,
} satisfies Story;
