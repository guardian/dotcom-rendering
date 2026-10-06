import {
	createAmuseLabsAdapter,
	handleAmuseLabsMessage,
	parseAmuseLabsMessage,
} from './amuseLabs';

// Shape observed on a real sudoku embed on 2026-10-02.
const puzzleLoad = {
	id: 'guardian-sudoku-easy-20261002',
	series: 'guardian-sudoku-easy',
	puzzleType: 'sudoku',
	src: 'crossword',
	type: 'PUZZLE_LOAD',
	date: 1790899202000,
	progress: 'puzzleLoaded',
};

const puzzleComplete = {
	src: 'crossword',
	type: 'PUZZLE_COMPLETE',
	completedCorrectly: true,
	timeTaken: 123,
	score: 100,
};

describe('parseAmuseLabsMessage', () => {
	it('parses the JSON strings AmuseLabs posts', () => {
		expect(parseAmuseLabsMessage(JSON.stringify(puzzleLoad))).toEqual(
			puzzleLoad,
		);
	});

	it('accepts an already parsed object', () => {
		expect(parseAmuseLabsMessage(puzzleLoad)).toEqual(puzzleLoad);
	});

	it.each([undefined, null, 42, 'not json', '[1,2]', '"text"'])(
		'ignores %p',
		(raw) => {
			expect(parseAmuseLabsMessage(raw)).toBeUndefined();
		},
	);
});

describe('AmuseLabs adapter', () => {
	it('does not report when the puzzle loads', () => {
		const adapter = createAmuseLabsAdapter();
		expect(handleAmuseLabsMessage(adapter, puzzleLoad)).toBeNull();
	});

	it('does not report interactions yet', () => {
		const adapter = createAmuseLabsAdapter();
		expect(
			handleAmuseLabsMessage(adapter, {
				...puzzleLoad,
				type: 'event',
				gridOffset: 10,
			}),
		).toBeNull();
	});

	it('reports completion using the identity remembered from the load', () => {
		const adapter = createAmuseLabsAdapter();
		handleAmuseLabsMessage(adapter, JSON.stringify(puzzleLoad));

		expect(
			handleAmuseLabsMessage(adapter, JSON.stringify(puzzleComplete)),
		).toEqual({
			puzzleId: 'guardian-sudoku-easy-20261002',
			puzzleType: 'SUDOKU_EASY',
			publishDate: '2026-10-02T00:00:00Z',
			gameStatus: 'completed',
			progress: 100,
		});
	});

	it('prefers the identity carried by the completion message', () => {
		const adapter = createAmuseLabsAdapter();

		expect(
			handleAmuseLabsMessage(adapter, {
				...puzzleComplete,
				id: 'guardian-word-wheel-20261001',
				series: 'guardian-word-wheel',
			}),
		).toMatchObject({
			puzzleId: 'guardian-word-wheel-20261001',
			puzzleType: 'WORDWHEEL',
			publishDate: '2026-10-01T00:00:00Z',
		});
	});

	it('maps the killer sudoku series, which has a different name from the slug', () => {
		const adapter = createAmuseLabsAdapter();

		expect(
			handleAmuseLabsMessage(adapter, {
				...puzzleComplete,
				id: 'guardian-killer-sudoku-medium-20261002',
				series: 'guardian-killer-sudoku-medium',
			}),
		).toMatchObject({ puzzleType: 'SUDOKU_KILLER' });
	});

	it('falls back to the date field when the id has no date suffix', () => {
		const adapter = createAmuseLabsAdapter();

		expect(
			handleAmuseLabsMessage(adapter, {
				...puzzleComplete,
				id: 'abc',
				series: 'guardian-sudoku-hard',
				date: 1790899202000,
			}),
		).toMatchObject({ publishDate: '2026-10-02T00:00:00Z' });
	});

	it('does not report a completion it cannot attribute to a puzzle', () => {
		const adapter = createAmuseLabsAdapter();
		expect(handleAmuseLabsMessage(adapter, puzzleComplete)).toBeNull();
	});

	it('does not report a completion for an unknown series', () => {
		const adapter = createAmuseLabsAdapter();
		expect(
			handleAmuseLabsMessage(adapter, {
				...puzzleComplete,
				id: 'other-20261002',
				series: 'other',
			}),
		).toBeNull();
	});

	it('does not report a puzzle that finished incorrectly', () => {
		const adapter = createAmuseLabsAdapter();
		handleAmuseLabsMessage(adapter, puzzleLoad);

		expect(
			handleAmuseLabsMessage(adapter, {
				...puzzleComplete,
				completedCorrectly: false,
			}),
		).toBeNull();
	});

	it.each(['PICKER_LOADED', 'PUZZLE_SIZE_CHANGE', 'embed-size'])(
		'ignores %s messages',
		(type) => {
			const adapter = createAmuseLabsAdapter();
			expect(
				handleAmuseLabsMessage(adapter, { ...puzzleLoad, type }),
			).toBeNull();
		},
	);
});
