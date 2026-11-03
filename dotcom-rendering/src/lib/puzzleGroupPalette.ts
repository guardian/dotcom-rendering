import { palette } from '@guardian/source/foundations';
import { ArticleSpecial, type ArticleTheme, Pillar } from './articleFormat';

export type PuzzleGroupKey =
	| 'crosswords'
	| 'word-games'
	| 'logic-puzzles'
	| 'trivia';

export type PuzzleGroupPalette = {
	/** Light tint, used for card backgrounds and chip hover fills. */
	tint: string;
	/** Main colour in light mode (chips, titles, setter). */
	primary: string;
	/** Lighter counterpart of `primary`, readable on dark backgrounds. */
	accent: string;
	/** The page theme whose pillar palette matches this group. */
	theme: ArticleTheme;
};

/**
 * Single source of truth for the colour each Puzzles & games group takes.
 * Crosswords use `.300` as their main colour (`news[400]` is too bright for
 * the design), the other groups use `.400`. There is no `sport[550]`, so
 * logic puzzles use `sport[500]` as their dark mode accent.
 */
const puzzleGroupPalettes = {
	crosswords: {
		tint: palette.news[800],
		primary: palette.news[300],
		accent: palette.news[550],
		theme: Pillar.News,
	},
	'word-games': {
		tint: palette.opinion[800],
		primary: palette.opinion[400],
		accent: palette.opinion[550],
		theme: Pillar.Opinion,
	},
	'logic-puzzles': {
		tint: palette.sport[800],
		primary: palette.sport[400],
		accent: palette.sport[500],
		theme: Pillar.Sport,
	},
	trivia: {
		tint: palette.labs[700],
		primary: palette.labs[200],
		accent: palette.labs[400],
		theme: ArticleSpecial.Labs,
	},
} satisfies Record<PuzzleGroupKey, PuzzleGroupPalette>;

export const getPuzzleGroupPalette = (
	group: PuzzleGroupKey,
): PuzzleGroupPalette => puzzleGroupPalettes[group];

/** Maps a `PuzzleItem.type` to its group, or `undefined` for unknown types. */
export const puzzleGroupForItemType = (
	type: string,
): PuzzleGroupKey | undefined => {
	switch (type) {
		case 'crossword':
			return 'crosswords';
		case 'sudoku':
			return 'logic-puzzles';
		case 'wordiply':
		case 'word-wheel':
			return 'word-games';
		case 'trivia':
		case 'film-reveal':
		case 'on-the-ball':
			return 'trivia';
		default:
			return undefined;
	}
};
