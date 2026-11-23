import { isSupportedCrosswordType } from './puzzleProgress/adapters/crossword';

/**
 * The `INTCMP` (campaign code) values sent to the Support site by the premium
 * puzzles "Subscribe" button, one per series, so acquisitions can be reported
 * by where they came from.
 *
 * - Puzzle Page: `puzzles_<slug>`, e.g. `puzzles_sudoku-easy`.
 * - Crossword: `puzzles_crossword-<type>`, e.g. `puzzles_crossword-quick`.
 * - Anything else: `puzzles_other`.
 *
 * Lowercase, `_` between parts and `-` inside a name. Never a date, an id or
 * anything else that changes from day to day, so reports do not fill up with
 * one-off values. Support and the data team have to agree any change to these
 * values, because they become the campaign code in acquisition reports.
 */
const PUZZLES_INTCMP_PREFIX = 'puzzles';

export const PUZZLES_INTCMP_FALLBACK = `${PUZZLES_INTCMP_PREFIX}_other`;

const isValidName = (name: string): boolean => /^[a-z0-9-]+$/.test(name);

/** The `INTCMP` of a Puzzle Page, from its slug (`puzzleConfig.slug`). */
export const getPuzzleIntcmp = (slug: string | undefined): string =>
	slug !== undefined && isValidName(slug)
		? `${PUZZLES_INTCMP_PREFIX}_${slug}`
		: PUZZLES_INTCMP_FALLBACK;

/**
 * The `INTCMP` of a crossword, from its `crosswordType`. Only the series the
 * Puzzles API knows get their own value.
 */
export const getCrosswordIntcmp = (
	crosswordType: string | undefined,
): string =>
	crosswordType !== undefined && isSupportedCrosswordType(crosswordType)
		? `${PUZZLES_INTCMP_PREFIX}_crossword-${crosswordType}`
		: PUZZLES_INTCMP_FALLBACK;
