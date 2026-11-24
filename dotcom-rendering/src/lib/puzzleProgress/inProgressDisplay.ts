import type { PuzzleType } from './types';

/**
 * Every puzzle type a card or archive item can be mapped to. `CROSSWORD_GENIUS`
 * has a card but is not a type the Puzzles API accepts progress for, so it is
 * not part of `PuzzleType`.
 */
type InProgressDisplayKey = PuzzleType | 'CROSSWORD_GENIUS';

/**
 * Whether the "In progress" label and progress bar are shown for a puzzle.
 *
 * It is decided game by game. Every game shows it except the crosswords: a crossword started in the app has no board to
 * resume on the web (progress is not synced between them), so crosswords stay
 * `false` and keep showing exactly what they showed before. Typing this as a
 * `Record` makes a new puzzle type fail to compile until a decision is made
 * for it.
 */
export const inProgressDisplay: Record<InProgressDisplayKey, boolean> = {
	CROSSWORD_QUICK: false,
	CROSSWORD_MINI: false,
	CROSSWORD_CRYPTIC: false,
	CROSSWORD_QUICKCRYPTIC: false,
	CROSSWORD_WEEKEND: false,
	CROSSWORD_PRIZE: false,
	CROSSWORD_QUIPTIC: false,
	CROSSWORD_SUNDAYQUICK: false,
	CROSSWORD_GENIUS: false,
	SUDOKU_EASY: true,
	SUDOKU_MEDIUM: true,
	SUDOKU_HARD: true,
	SUDOKU_KILLER: true,
	WORDWHEEL: true,
	WORDIPLY: true,
	ONTHEBALL: true,
	FILMREVEAL: true,
};

/**
 * Whether to show the "In progress" label and progress bar for a puzzle type
 * as the Puzzles API names it (e.g. `SUDOKU_EASY`). Anything unknown or missing
 * is `false`, so the cards are left as they were.
 */
export const showsInProgress = (
	puzzleType: string | undefined,
	display: Readonly<Record<string, boolean>> = inProgressDisplay,
): boolean =>
	puzzleType !== undefined &&
	Object.prototype.hasOwnProperty.call(display, puzzleType) &&
	display[puzzleType] === true;
