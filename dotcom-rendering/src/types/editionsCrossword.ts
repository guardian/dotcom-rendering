export type FEEditionsCrosswords = {
	crosswords: FEEditionsCrossword[];
};

type FECrosswordEntry = {
	id: string;
	number: number;
	humanNumber: string;
	direction: 'across' | 'down';
	position: { x: number; y: number };
	separatorLocations: {
		','?: number[];
		'-'?: number[];
	};
	length: number;
	clue: string;
	group: string[];
	solution?: string;
	format?: string;
};

type FECrosswordDimensions = {
	cols: number;
	rows: number;
};

export type FEEditionsCrossword = {
	name: string;
	type: string;
	number: number;
	date: string;
	dimensions: FECrosswordDimensions;
	entries: FECrosswordEntry[];
	solutionAvailable: boolean;
	hasNumbers: boolean;
	randomCluesOrdering: boolean;
	instructions?: string;
	creator?: { name: string; webUrl: string };
	pdf?: string;
	annotatedSolution?: string;
	dateSolutionAvailable: string;
};

export type CrosswordsByDate = Record<string, FEEditionsCrossword[]>;

/**
 * Groups crosswords by their date, and drops any crosswords that have an
 * invalid date.
 *
 * @param formatter The `DateTimeFormat` used to generate the dates used for
 * the keys of the object. This is a parameter because it often depends on the
 * runtime being used (e.g. to set the timezone).
 * @example
 * const formatter = Intl.DateTimeFormat('en-GB', {
 *   year: 'numeric',
 *   month: 'long',
 *   day: '2-digit',
 *   weekday: 'long',
 * });
 * @param crosswords A list of crosswords to be grouped
 * @returns An object where the keys are a representation of the dates the
 * crosswords were published
 * @example
 * {
 *   "Wednesday 20 November 2024": [crosswordOne, crosswordTwo],
 *   "Thursday 21 November 2024": [crosswordThree],
 * }
 */
export const groupByDate =
	(formatter: Intl.DateTimeFormat) =>
	(crosswords: FEEditionsCrossword[]): CrosswordsByDate =>
		crosswords.reduce<CrosswordsByDate>((crosswordsByDate, crossword) => {
			const date = new Date(crossword.date);

			if (date.toString() === 'Invalid Date') {
				return crosswordsByDate;
			}

			const key = formatter.format(date);
			const existingEntry = crosswordsByDate[key];
			const newEntry =
				existingEntry === undefined
					? [crossword]
					: [...existingEntry, crossword];

			return { ...crosswordsByDate, [key]: newEntry };
		}, {});
