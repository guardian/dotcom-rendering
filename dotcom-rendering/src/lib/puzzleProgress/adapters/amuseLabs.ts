import type {
	PuzzleProgressAdapter,
	PuzzleProgressEvent,
	PuzzleType,
} from '../types';

/**
 * Adapter for the AmuseLabs (PuzzleMe) iframe: sudoku (easy, medium, hard,
 * killer) and word wheel.
 *
 * AmuseLabs posts to the parent window as JSON strings (not objects), from
 * `https://tg.amuselabs.com`. Observed on a real sudoku embed (2026-10-02):
 *
 * - `PUZZLE_LOAD` once the puzzle has loaded: `id`
 *   (`guardian-sudoku-easy-20261002`), `series`, `puzzleType`, `date` (epoch
 *   milliseconds) and `progress: "puzzleLoaded"`.
 * - `event` with `gridOffset` on a click inside the puzzle (not on a move).
 *   It carries `id` and `series`.
 * - Sudoku: selecting a cell and entering a digit produced NO
 *   `PUZZLE_PROGRESS` or other per-move message.
 * - Word wheel is an AmuseLabs Word Flower (`puzzleType: "wordf"`), the only
 *   type that sends `PUZZLE_PROGRESS` (`wordsFound`, `totalWords`,
 *   `isPangram`, `progress: "puzzleInProgress"`), verified on a real embed
 *   on 2026-10-06. It fires when the player finds a valid word. It is
 *   reported as `in-progress` with the share of words found, or as
 *   `completed` once every word has been found: see `update` below.
 * - `PUZZLE_COMPLETE` (documented, not yet observed): `score`, `timeTaken`,
 *   `completedCorrectly`.
 */
export const AMUSELABS_ORIGIN = 'https://tg.amuselabs.com';

const puzzleTypeBySeries: Record<string, PuzzleType> = {
	'guardian-sudoku-easy': 'SUDOKU_EASY',
	'guardian-sudoku-medium': 'SUDOKU_MEDIUM',
	'guardian-sudoku-hard': 'SUDOKU_HARD',
	'guardian-killer-sudoku-medium': 'SUDOKU_KILLER',
	'guardian-word-wheel': 'WORDWHEEL',
};

type Identity = {
	puzzleId: string;
	puzzleType: PuzzleType;
	publishDate: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

/** AmuseLabs sends JSON strings, but accept an already-parsed object too. */
export const parseAmuseLabsMessage = (
	raw: unknown,
): Record<string, unknown> | undefined => {
	if (isRecord(raw)) return raw;
	if (typeof raw !== 'string') return undefined;
	try {
		const parsed: unknown = JSON.parse(raw);
		return isRecord(parsed) ? parsed : undefined;
	} catch {
		return undefined;
	}
};

const toMidnightUtc = (year: number, month: number, day: number): string =>
	`${year.toString().padStart(4, '0')}-${month
		.toString()
		.padStart(2, '0')}-${day.toString().padStart(2, '0')}T00:00:00Z`;

/**
 * The publish date, preferring the `YYYYMMDD` suffix of the puzzle id
 * (`guardian-sudoku-easy-20261002`), which is the date the Puzzles API uses,
 * and falling back to the `date` field (epoch milliseconds).
 */
const publishDateOf = (id: string, date: unknown): string | undefined => {
	const suffix = /-(\d{4})(\d{2})(\d{2})$/.exec(id);
	if (suffix) {
		return toMidnightUtc(
			Number(suffix[1]),
			Number(suffix[2]),
			Number(suffix[3]),
		);
	}
	if (typeof date === 'number' && Number.isFinite(date)) {
		const d = new Date(date);
		return toMidnightUtc(
			d.getUTCFullYear(),
			d.getUTCMonth() + 1,
			d.getUTCDate(),
		);
	}
	return undefined;
};

const identityOf = (message: Record<string, unknown>): Identity | undefined => {
	const { id, series, date } = message;
	if (typeof id !== 'string' || typeof series !== 'string') return undefined;
	const puzzleType = puzzleTypeBySeries[series];
	const publishDate = publishDateOf(id, date);
	if (puzzleType === undefined || publishDate === undefined) return undefined;
	return { puzzleId: id, puzzleType, publishDate };
};

/**
 * The progress reported for the first interaction, before there is anything
 * to measure. Deliberately not 0, so that consumers which only look at
 * `progress` still see the puzzle as started.
 */
export const FIRST_INTERACTION_PROGRESS = 1;

const clampPercentage = (value: number): number =>
	Math.min(100, Math.max(0, Math.round(value)));

export const createAmuseLabsAdapter = (): PuzzleProgressAdapter => {
	// `PUZZLE_COMPLETE` is documented with the puzzle id, but the other
	// messages are not guaranteed to carry a usable one, so remember the
	// identity from `PUZZLE_LOAD` as a fallback.
	let loaded: Identity | undefined;

	return {
		start: (raw) => {
			const message = parseAmuseLabsMessage(raw);
			const identity = message ? identityOf(message) : undefined;
			if (identity) loaded = identity;

			// Deliberately not reported. `PUZZLE_LOAD` fires on every page view
			// whether or not the reader plays, so reporting `in-progress` here
			// would mark every visited puzzle as started. The first interaction
			// (`event`, see `update`) is used instead.
			return null;
		},

		update: (raw) => {
			const message = parseAmuseLabsMessage(raw);
			if (!message) return null;

			// Word wheel (an AmuseLabs Word Flower) sends `PUZZLE_PROGRESS` each
			// time the player finds a valid word, as documented at
			// https://amuselabs.com/docs/integration/iframe-communication/
			if (message.type === 'PUZZLE_PROGRESS') {
				const { wordsFound, totalWords } = message;
				if (
					typeof wordsFound !== 'number' ||
					typeof totalWords !== 'number' ||
					!Number.isFinite(wordsFound) ||
					!Number.isFinite(totalWords) ||
					totalWords <= 0
				) {
					return null;
				}

				const identity = identityOf(message) ?? loaded;
				if (!identity) return null;

				// Finding every word completes the word wheel. The pangram is one
				// of those words, so `isPangram` adds nothing to this decision.
				if (wordsFound >= totalWords) {
					return {
						...identity,
						gameStatus: 'completed',
						progress: 100,
					};
				}

				return {
					...identity,
					gameStatus: 'in-progress',
					progress: clampPercentage((wordsFound / totalWords) * 100),
				};
			}

			// The first interaction with the puzzle (sudoku and word wheel). The
			// documentation describes it as a hint for the parent page to scroll
			// the puzzle into view, "at first interaction", but it is the only
			// signal that the reader has started a sudoku, which sends no
			// per-move or percentage message (verified on a real embed).
			//
			// It is reported every time it arrives, with no memory of what was
			// reported before: a reader who restarts, or whose first click was
			// ignored because they were signed out, must be able to move back to
			// `in-progress`. The reporter drops an update that has not changed.
			if (message.type === 'event') {
				const identity = identityOf(message) ?? loaded;
				if (!identity) return null;

				return {
					...identity,
					gameStatus: 'in-progress',
					progress: FIRST_INTERACTION_PROGRESS,
				};
			}

			return null;
		},

		complete: (raw): PuzzleProgressEvent | null => {
			const message = parseAmuseLabsMessage(raw);
			if (!message) return null;

			// Finishing with errors is not completing: `completedCorrectly:
			// false` is a wrong solution, not a finished puzzle. The reader
			// stays `in-progress`, already reported at the first interaction.
			if (message.completedCorrectly === false) return null;

			const identity = identityOf(message) ?? loaded;
			if (!identity) return null;

			return {
				...identity,
				gameStatus: 'completed',
				progress: 100,
			};
		},
	};
};

/**
 * Routes one raw `message` event payload from the AmuseLabs iframe to the
 * matching adapter method.
 */
export const handleAmuseLabsMessage = (
	adapter: PuzzleProgressAdapter,
	raw: unknown,
): PuzzleProgressEvent | null => {
	const message = parseAmuseLabsMessage(raw);
	if (!message) return null;

	switch (message.type) {
		case 'PUZZLE_LOAD':
			return adapter.start(message);
		case 'event':
		case 'PUZZLE_PROGRESS':
			return adapter.update(message);
		case 'PUZZLE_COMPLETE':
			return adapter.complete(message);
		default:
			return null;
	}
};
