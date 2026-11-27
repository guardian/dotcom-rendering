import { palette } from '../palette';
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
	/** `primary` in light mode and `accent` in dark mode. */
	themedPrimary: string;
	/** `tint` in light mode and a neutral fill in dark mode. */
	themedHover: string;
	/** The page theme whose pillar palette matches this group. */
	theme: ArticleTheme;
};

/**
 * Single source of truth for the colour each Puzzles & games group takes.
 * The values are in `paletteDeclarations.ts`. Crosswords use `.300` as their
 * main colour (`news[400]` is too bright for the design), the other groups use
 * `.400`. There is no `sport[550]`, so logic puzzles use `sport[500]` as their
 * dark mode accent.
 */
const puzzleGroupPalettes = {
	crosswords: {
		tint: palette('--puzzles-crosswords-tint'),
		primary: palette('--puzzles-crosswords-primary'),
		accent: palette('--puzzles-crosswords-accent'),
		themedPrimary: palette('--puzzles-crosswords-themed-primary'),
		themedHover: palette('--puzzles-crosswords-themed-hover'),
		theme: Pillar.News,
	},
	'word-games': {
		tint: palette('--puzzles-word-games-tint'),
		primary: palette('--puzzles-word-games-primary'),
		accent: palette('--puzzles-word-games-accent'),
		themedPrimary: palette('--puzzles-word-games-themed-primary'),
		themedHover: palette('--puzzles-word-games-themed-hover'),
		theme: Pillar.Opinion,
	},
	'logic-puzzles': {
		tint: palette('--puzzles-logic-puzzles-tint'),
		primary: palette('--puzzles-logic-puzzles-primary'),
		accent: palette('--puzzles-logic-puzzles-accent'),
		themedPrimary: palette('--puzzles-logic-puzzles-themed-primary'),
		themedHover: palette('--puzzles-logic-puzzles-themed-hover'),
		theme: Pillar.Sport,
	},
	trivia: {
		tint: palette('--puzzles-trivia-tint'),
		primary: palette('--puzzles-trivia-primary'),
		accent: palette('--puzzles-trivia-accent'),
		themedPrimary: palette('--puzzles-trivia-themed-primary'),
		themedHover: palette('--puzzles-trivia-themed-hover'),
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
