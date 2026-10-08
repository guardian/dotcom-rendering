import type {
	PuzzleProgressAdapter,
	PuzzleProgressEvent,
	PuzzleType,
} from '../types';

/**
 * Adapter for the `@guardian/react-crossword` component, which is rendered
 * on the `/crosswords/*` pages.
 *
 * The component reports each change the reader makes to the grid through its
 * `onProgressChange` prop, as `{ progress, filledCells, totalCells,
 * isComplete }`. `isComplete` is true only when every cell holds its
 * solution, and is always false when the solutions are not available.
 */

/** The fields of the component's `data` prop the Puzzles API needs. */
export type CrosswordIdentityData = {
	/** The crossword number, e.g. `28000`. */
	number: number;
	/** Epoch milliseconds of the puzzle date. */
	date: number;
	crosswordType: string;
};

/** The part of the component's `ProgressChange` this adapter reads. */
export type CrosswordProgressChange = {
	filledCells: number;
	totalCells: number;
	isComplete: boolean;
};

/**
 * The crossword types the Puzzles API knows (`puzzleTypeFromCrosswordName`
 * in `guardian/puzzles`, `src/models/archive.ts`).
 *
 * Not reported, because the API has no puzzle type for them: `everyman`,
 * `special` and `speedy`. They are left out on purpose rather than mapped to
 * a similar type, so nothing is stored under the wrong series.
 */
const puzzleTypeByCrosswordType: Record<string, PuzzleType> = {
	quick: 'CROSSWORD_QUICK',
	mini: 'CROSSWORD_MINI',
	cryptic: 'CROSSWORD_CRYPTIC',
	'quick-cryptic': 'CROSSWORD_QUICKCRYPTIC',
	weekend: 'CROSSWORD_WEEKEND',
	prize: 'CROSSWORD_PRIZE',
	quiptic: 'CROSSWORD_QUIPTIC',
	'sunday-quick': 'CROSSWORD_SUNDAYQUICK',
};

type Identity = Pick<
	PuzzleProgressEvent,
	'puzzleId' | 'puzzleType' | 'publishDate'
>;

/**
 * The crossword number alone is not unique: mini, quick-cryptic and
 * sunday-quick all start at 1, and the Puzzles API stores progress by
 * `puzzleId` only. So the id is prefixed with the series, e.g.
 * `guardian-crossword-quick-cryptic-5`. The series is the `crosswordType`.
 * The Puzzles API has to build the same id when it looks up a reader's
 * progress for an archive item.
 */
const toPuzzleId = (crosswordType: string, number: number): string =>
	`guardian-crossword-${crosswordType}-${number}`;

/**
 * The identity of a crossword: a series-qualified id, and the UTC date of
 * the puzzle.
 */
const identityOf = (data: CrosswordIdentityData): Identity | undefined => {
	const puzzleType = puzzleTypeByCrosswordType[data.crosswordType];
	if (puzzleType === undefined || !Number.isFinite(data.number)) {
		return undefined;
	}

	const date = new Date(data.date);
	if (Number.isNaN(date.getTime())) return undefined;

	return {
		puzzleId: toPuzzleId(data.crosswordType, data.number),
		puzzleType,
		publishDate: `${date.toISOString().slice(0, 10)}T00:00:00Z`,
	};
};

const isProgressChange = (raw: unknown): raw is CrosswordProgressChange =>
	typeof raw === 'object' &&
	raw !== null &&
	'filledCells' in raw &&
	typeof raw.filledCells === 'number' &&
	'totalCells' in raw &&
	typeof raw.totalCells === 'number' &&
	'isComplete' in raw &&
	typeof raw.isComplete === 'boolean';

export const createCrosswordAdapter = (
	data: CrosswordIdentityData,
): PuzzleProgressAdapter => {
	const identity = identityOf(data);

	return {
		// Not reported: opening a crossword is not playing it.
		start: () => null,

		update: (raw) => {
			if (!identity || !isProgressChange(raw)) return null;
			if (raw.totalCells <= 0) return null;

			// An empty grid is a puzzle that has not been started, which is
			// also how it looks after the reader clears it to start again.
			if (raw.filledCells <= 0) {
				return { ...identity, gameStatus: 'not-started', progress: 0 };
			}

			// At least 1, so a started puzzle never reads as 0%, and at most
			// 99, so only a correct grid reads as 100%.
			const share = Math.round((raw.filledCells / raw.totalCells) * 100);
			return {
				...identity,
				gameStatus: 'in-progress',
				progress: Math.min(99, Math.max(1, share)),
			};
		},

		complete: (raw) => {
			if (!identity || !isProgressChange(raw) || !raw.isComplete) {
				return null;
			}

			return { ...identity, gameStatus: 'completed', progress: 100 };
		},
	};
};

/**
 * Routes one `onProgressChange` payload to the matching adapter method.
 */
export const handleCrosswordProgressChange = (
	adapter: PuzzleProgressAdapter,
	change: unknown,
): PuzzleProgressEvent | null =>
	isProgressChange(change) && change.isComplete
		? adapter.complete(change)
		: adapter.update(change);
