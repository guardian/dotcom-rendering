import {
	createAmuseLabsAdapter,
	FIRST_INTERACTION_PROGRESS,
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

	describe('first interaction', () => {
		const interaction = {
			id: 'guardian-sudoku-easy-20261002',
			series: 'guardian-sudoku-easy',
			puzzleType: 'sudoku',
			src: 'crossword',
			type: 'event',
			gridOffset: 0,
		};

		it('reports in-progress with a placeholder progress', () => {
			const adapter = createAmuseLabsAdapter();

			expect(handleAmuseLabsMessage(adapter, interaction)).toEqual({
				puzzleId: 'guardian-sudoku-easy-20261002',
				puzzleType: 'SUDOKU_EASY',
				publishDate: '2026-10-02T00:00:00Z',
				gameStatus: 'in-progress',
				progress: FIRST_INTERACTION_PROGRESS,
			});
		});

		it('reports every interaction, so one that was not accepted can be sent again', () => {
			const adapter = createAmuseLabsAdapter();
			const first = handleAmuseLabsMessage(adapter, interaction);

			expect(first).not.toBeNull();
			expect(handleAmuseLabsMessage(adapter, interaction)).toEqual(first);
		});

		it('does not move a completed puzzle back to in-progress, e.g. when the reader closes the "well done" dialog of a puzzle they reopened', () => {
			const adapter = createAmuseLabsAdapter();
			handleAmuseLabsMessage(adapter, puzzleLoad);
			expect(
				handleAmuseLabsMessage(adapter, puzzleComplete),
			).toMatchObject({ gameStatus: 'completed' });

			expect(handleAmuseLabsMessage(adapter, interaction)).toBeNull();
		});

		it('still reports the first interaction of a puzzle that was not completed', () => {
			const adapter = createAmuseLabsAdapter();
			handleAmuseLabsMessage(adapter, puzzleLoad);
			handleAmuseLabsMessage(adapter, {
				...puzzleComplete,
				completedCorrectly: false,
			});

			expect(handleAmuseLabsMessage(adapter, interaction)).toMatchObject({
				gameStatus: 'in-progress',
			});
		});

		it('falls back to the identity remembered from the load', () => {
			const adapter = createAmuseLabsAdapter();
			handleAmuseLabsMessage(adapter, puzzleLoad);

			expect(
				handleAmuseLabsMessage(adapter, {
					type: 'event',
					gridOffset: 0,
				}),
			).toMatchObject({ puzzleId: 'guardian-sudoku-easy-20261002' });
		});

		it('does not report an interaction it cannot attribute to a puzzle', () => {
			const adapter = createAmuseLabsAdapter();

			expect(
				handleAmuseLabsMessage(adapter, {
					type: 'event',
					gridOffset: 0,
				}),
			).toBeNull();
		});
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

	it('does not report a wrongly solved puzzle as completed', () => {
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

	describe('word wheel PUZZLE_PROGRESS', () => {
		// Shape observed on a real word wheel embed on 2026-10-06.
		const wordWheelProgress = {
			id: 'guardian-wordwheel-20261006',
			series: 'guardian-word-wheel',
			puzzleType: 'wordf',
			pageSrc: 'puzzleme-player',
			type: 'PUZZLE_PROGRESS',
			date: 1791244800000,
			progress: 'puzzleInProgress',
			wordsFound: 3,
			totalWords: 15,
			isPangram: false,
		};

		it('reports the share of words found as in-progress', () => {
			const adapter = createAmuseLabsAdapter();

			expect(
				handleAmuseLabsMessage(
					adapter,
					JSON.stringify(wordWheelProgress),
				),
			).toEqual({
				puzzleId: 'guardian-wordwheel-20261006',
				puzzleType: 'WORDWHEEL',
				publishDate: '2026-10-06T00:00:00Z',
				gameStatus: 'in-progress',
				progress: 20,
			});
		});

		it('rounds the percentage', () => {
			const adapter = createAmuseLabsAdapter();

			expect(
				handleAmuseLabsMessage(adapter, {
					...wordWheelProgress,
					wordsFound: 1,
				}),
			).toMatchObject({ progress: 7 });
		});

		it('reports completed once every word has been found', () => {
			const adapter = createAmuseLabsAdapter();

			expect(
				handleAmuseLabsMessage(adapter, {
					...wordWheelProgress,
					wordsFound: 15,
				}),
			).toMatchObject({ gameStatus: 'completed', progress: 100 });
		});

		it('does not move a completed word wheel back to in-progress on the next interaction', () => {
			const adapter = createAmuseLabsAdapter();
			handleAmuseLabsMessage(adapter, {
				...wordWheelProgress,
				wordsFound: 15,
			});

			expect(
				handleAmuseLabsMessage(adapter, {
					...wordWheelProgress,
					type: 'event',
				}),
			).toBeNull();
		});

		it('does not depend on isPangram to complete', () => {
			const adapter = createAmuseLabsAdapter();

			expect(
				handleAmuseLabsMessage(adapter, {
					...wordWheelProgress,
					wordsFound: 15,
					isPangram: false,
				}),
			).toMatchObject({ gameStatus: 'completed' });
		});

		it('reports the first interaction before any word is found', () => {
			const adapter = createAmuseLabsAdapter();

			expect(
				handleAmuseLabsMessage(adapter, {
					...wordWheelProgress,
					type: 'event',
				}),
			).toMatchObject({
				puzzleType: 'WORDWHEEL',
				gameStatus: 'in-progress',
				progress: FIRST_INTERACTION_PROGRESS,
			});
		});

		it('falls back to the identity remembered from the load', () => {
			const adapter = createAmuseLabsAdapter();
			handleAmuseLabsMessage(adapter, {
				...wordWheelProgress,
				type: 'PUZZLE_LOAD',
			});

			expect(
				handleAmuseLabsMessage(adapter, {
					type: 'PUZZLE_PROGRESS',
					wordsFound: 5,
					totalWords: 10,
				}),
			).toMatchObject({
				puzzleId: 'guardian-wordwheel-20261006',
				progress: 50,
			});
		});

		it.each([
			{ wordsFound: undefined },
			{ totalWords: undefined },
			{ totalWords: 0 },
			{ wordsFound: '3' },
			{ totalWords: Number.NaN },
		])('does not report invalid counts %p', (override) => {
			const adapter = createAmuseLabsAdapter();

			expect(
				handleAmuseLabsMessage(adapter, {
					...wordWheelProgress,
					...override,
				}),
			).toBeNull();
		});

		it('does not report a message it cannot attribute to a puzzle', () => {
			const adapter = createAmuseLabsAdapter();

			expect(
				handleAmuseLabsMessage(adapter, {
					type: 'PUZZLE_PROGRESS',
					wordsFound: 1,
					totalWords: 10,
				}),
			).toBeNull();
		});
	});
});
