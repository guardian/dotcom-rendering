/**
 * The puzzle types known to the Puzzles API (`guardian/puzzles`,
 * `PUZZLE_TYPES`). `PUT /progress` rejects any other value.
 */
export type PuzzleType =
	| 'CROSSWORD_QUICK'
	| 'CROSSWORD_MINI'
	| 'CROSSWORD_CRYPTIC'
	| 'CROSSWORD_QUICKCRYPTIC'
	| 'CROSSWORD_WEEKEND'
	| 'CROSSWORD_PRIZE'
	| 'CROSSWORD_QUIPTIC'
	| 'CROSSWORD_SUNDAYQUICK'
	| 'SUDOKU_EASY'
	| 'SUDOKU_MEDIUM'
	| 'SUDOKU_HARD'
	| 'SUDOKU_KILLER'
	| 'WORDWHEEL'
	| 'WORDIPLY'
	| 'ONTHEBALL'
	| 'FILMREVEAL';

export type GameStatus = 'not-started' | 'in-progress' | 'completed';

/**
 * What a game adapter reports. Adapters know nothing about the reader, the
 * timestamp or the transport: the reporter adds those.
 */
export type PuzzleProgressEvent = {
	/** The id the Puzzles API uses, e.g. `guardian-sudoku-easy-20261002`. */
	puzzleId: string;
	puzzleType: PuzzleType;
	/** ISO 8601 UTC at midnight, without milliseconds, e.g. `2026-10-02T00:00:00Z`. */
	publishDate: string;
	gameStatus: GameStatus;
	/** A percentage from 0 to 100. */
	progress: number;
};

/** The body of one item of `PUT /progress`. */
export type PuzzleProgressUpdate = PuzzleProgressEvent & {
	/** ISO 8601 UTC without milliseconds. The newest update wins server-side. */
	lastUpdated: string;
};

/**
 * Translates one game's own signals into {@link PuzzleProgressEvent}s.
 *
 * Every method returns `null` for "do not report to the backend". Adapters
 * return `null` wherever the product or provider decision is still open, and
 * say why in a comment, so nothing is reported until it is decided.
 */
export interface PuzzleProgressAdapter {
	/** The game has loaded (or the reader opened the puzzle). */
	start: (raw: unknown) => PuzzleProgressEvent | null;
	/** The reader made progress. */
	update: (raw: unknown) => PuzzleProgressEvent | null;
	/** The reader finished the puzzle. */
	complete: (raw: unknown) => PuzzleProgressEvent | null;
}
