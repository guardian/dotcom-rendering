import {
	createCrosswordAdapter,
	handleCrosswordProgressChange,
} from './crossword';

const data = {
	number: 28000,
	// 2026-10-02T00:00:00Z
	date: 1790899200000,
	crosswordType: 'cryptic',
};

const change = (overrides: {
	filledCells?: number;
	totalCells?: number;
	isComplete?: boolean;
}) => ({
	progress: [],
	filledCells: 10,
	totalCells: 100,
	isComplete: false,
	...overrides,
});

describe('crossword adapter', () => {
	it('does not report when the crossword is opened', () => {
		expect(createCrosswordAdapter(data).start(undefined)).toBeNull();
	});

	it('reports the share of filled cells as in-progress', () => {
		const adapter = createCrosswordAdapter(data);

		expect(
			handleCrosswordProgressChange(adapter, change({ filledCells: 25 })),
		).toEqual({
			puzzleId: 'guardian-crossword-cryptic-28000',
			puzzleType: 'CROSSWORD_CRYPTIC',
			publishDate: '2026-10-02T00:00:00Z',
			gameStatus: 'in-progress',
			progress: 25,
		});
	});

	it('never reports a started crossword as 0%', () => {
		const adapter = createCrosswordAdapter(data);

		expect(
			handleCrosswordProgressChange(
				adapter,
				change({ filledCells: 1, totalCells: 500 }),
			),
		).toMatchObject({ gameStatus: 'in-progress', progress: 1 });
	});

	it('does not report a full but wrong grid as 100%', () => {
		const adapter = createCrosswordAdapter(data);

		expect(
			handleCrosswordProgressChange(
				adapter,
				change({ filledCells: 100, isComplete: false }),
			),
		).toMatchObject({ gameStatus: 'in-progress', progress: 99 });
	});

	it('reports completed only when the grid is complete and correct', () => {
		const adapter = createCrosswordAdapter(data);

		expect(
			handleCrosswordProgressChange(
				adapter,
				change({ filledCells: 100, isComplete: true }),
			),
		).toMatchObject({ gameStatus: 'completed', progress: 100 });
	});

	it('reports not-started when the grid is emptied', () => {
		const adapter = createCrosswordAdapter(data);

		expect(
			handleCrosswordProgressChange(adapter, change({ filledCells: 0 })),
		).toMatchObject({ gameStatus: 'not-started', progress: 0 });
	});

	it.each([
		['quick', 'CROSSWORD_QUICK'],
		['mini', 'CROSSWORD_MINI'],
		['cryptic', 'CROSSWORD_CRYPTIC'],
		['quick-cryptic', 'CROSSWORD_QUICKCRYPTIC'],
		['weekend', 'CROSSWORD_WEEKEND'],
		['prize', 'CROSSWORD_PRIZE'],
		['quiptic', 'CROSSWORD_QUIPTIC'],
		['sunday-quick', 'CROSSWORD_SUNDAYQUICK'],
	])('maps %s to %s', (crosswordType, puzzleType) => {
		const adapter = createCrosswordAdapter({ ...data, crosswordType });

		expect(
			handleCrosswordProgressChange(adapter, change({})),
		).toMatchObject({ puzzleType });
	});

	it.each(['everyman', 'special', 'speedy', 'unknown'])(
		'does not report %s, which the Puzzles API has no type for',
		(crosswordType) => {
			const adapter = createCrosswordAdapter({ ...data, crosswordType });

			expect(
				handleCrosswordProgressChange(adapter, change({})),
			).toBeNull();
		},
	);

	it('gives crosswords of different series with the same number different ids', () => {
		const idOf = (crosswordType: string) =>
			handleCrosswordProgressChange(
				createCrosswordAdapter({ ...data, number: 5, crosswordType }),
				change({}),
			)?.puzzleId;

		expect(idOf('mini')).toBe('guardian-crossword-mini-5');
		expect(idOf('quick-cryptic')).toBe(
			'guardian-crossword-quick-cryptic-5',
		);
		expect(idOf('sunday-quick')).toBe('guardian-crossword-sunday-quick-5');
	});

	it('uses the UTC date of the puzzle', () => {
		const adapter = createCrosswordAdapter({
			...data,
			date: 1790899200000 + 23 * 60 * 60 * 1000,
		});

		expect(
			handleCrosswordProgressChange(adapter, change({})),
		).toMatchObject({ publishDate: '2026-10-02T00:00:00Z' });
	});

	it.each([
		['an invalid date', { ...data, date: Number.NaN }],
		['an invalid number', { ...data, number: Number.NaN }],
	])('does not report %s', (_, invalid) => {
		const adapter = createCrosswordAdapter(invalid);

		expect(handleCrosswordProgressChange(adapter, change({}))).toBeNull();
	});

	it.each([
		undefined,
		null,
		'text',
		{},
		{ filledCells: '1', totalCells: 10, isComplete: false },
		change({ totalCells: 0 }),
	])('ignores a malformed change %p', (raw) => {
		const adapter = createCrosswordAdapter(data);

		expect(handleCrosswordProgressChange(adapter, raw)).toBeNull();
	});
});
