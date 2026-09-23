import {
	getPuzzleConfig,
	puzzleConfigs,
	resolvePuzzleDescription,
	resolvePuzzleTitle,
	validatePuzzleConfigs,
} from './puzzleConfigs';

describe('puzzleConfigs registry', () => {
	it('has an entry for every documented slug', () => {
		expect(Object.keys(puzzleConfigs).sort()).toEqual(
			[
				'sudoku-easy',
				'sudoku-hard',
				'sudoku-killer',
				'sudoku-medium',
				'word-wheel',
				'wordiply',
			].sort(),
		);
	});

	it('does not throw for the current registry', () => {
		expect(() => validatePuzzleConfigs(puzzleConfigs)).not.toThrow();
	});

	it('rejects a registry entry whose slug does not match its key', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: { ...puzzleConfigs.wordiply!, slug: 'not-wordiply' },
			}),
		).toThrow(TypeError);
	});

	it('rejects an entry with an unknown puzzleGroup', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: {
					...puzzleConfigs.wordiply!,
					puzzleGroup: 'not-a-real-group' as never,
				},
			}),
		).toThrow(TypeError);
	});

	it('rejects an amuselabs entry with an empty set', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				'sudoku-easy': {
					...puzzleConfigs['sudoku-easy']!,
					iframe: { provider: 'amuselabs', set: '' },
				},
			}),
		).toThrow(TypeError);
	});

	it('rejects an amuselabs entry with a whitespace-only set', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				'sudoku-easy': {
					...puzzleConfigs['sudoku-easy']!,
					iframe: { provider: 'amuselabs', set: '   ' },
				},
			}),
		).toThrow(TypeError);
	});

	it('rejects a wordiply entry with an empty baseUrl', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: {
					...puzzleConfigs.wordiply!,
					iframe: { provider: 'wordiply', baseUrl: '' },
				},
			}),
		).toThrow(TypeError);
	});

	it('rejects a wordiply entry with a non-absolute baseUrl', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: {
					...puzzleConfigs.wordiply!,
					iframe: { provider: 'wordiply', baseUrl: '/not-absolute' },
				},
			}),
		).toThrow(TypeError);
	});

	it('rejects an entry with an unrecognised iframe provider', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: {
					...puzzleConfigs.wordiply!,
					iframe: {
						provider: 'not-a-real-provider',
						baseUrl: 'https://example.com',
					} as never,
				},
			}),
		).toThrow(TypeError);
	});

	it('requires every entry to have a non-empty title', () => {
		expect(
			Object.values(puzzleConfigs).every(
				(config) => config.title.trim().length > 0,
			),
		).toBe(true);
	});

	it('requires every entry to have a distinct title (not a templated copy)', () => {
		const titles = Object.values(puzzleConfigs).map(
			(config) => config.title,
		);
		expect(new Set(titles).size).toBe(titles.length);
	});

	it('rejects an entry with an empty title', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: { ...puzzleConfigs.wordiply!, title: '' },
			}),
		).toThrow(TypeError);
	});

	it('rejects an entry with a whitespace-only title', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: { ...puzzleConfigs.wordiply!, title: '   ' },
			}),
		).toThrow(TypeError);
	});

	it('requires every entry to have a non-empty description', () => {
		expect(
			Object.values(puzzleConfigs).every(
				(config) => config.description.trim().length > 0,
			),
		).toBe(true);
	});

	it('requires every entry to have a distinct description (not a templated copy)', () => {
		const descriptions = Object.values(puzzleConfigs).map(
			(config) => config.description,
		);
		expect(new Set(descriptions).size).toBe(descriptions.length);
	});

	it('rejects an entry with an empty description', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: { ...puzzleConfigs.wordiply!, description: '' },
			}),
		).toThrow(TypeError);
	});

	it('rejects an entry with a whitespace-only description', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: { ...puzzleConfigs.wordiply!, description: '   ' },
			}),
		).toThrow(TypeError);
	});

	it('allows every entry to have no image configured (the current state)', () => {
		expect(
			Object.values(puzzleConfigs).every(
				(config) => config.image === undefined,
			),
		).toBe(true);
	});

	it('does not throw when an entry has a valid, non-empty image set', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: {
					...puzzleConfigs.wordiply!,
					image: 'https://example.com/wordiply.jpg',
				},
			}),
		).not.toThrow();
	});

	it('rejects an entry with an empty-string image', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: { ...puzzleConfigs.wordiply!, image: '' },
			}),
		).toThrow(TypeError);
	});

	it('rejects an entry with a whitespace-only image', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: { ...puzzleConfigs.wordiply!, image: '   ' },
			}),
		).toThrow(TypeError);
	});

	describe('getPuzzleConfig', () => {
		it('returns the config for a known slug', () => {
			expect(getPuzzleConfig('sudoku-easy')?.puzzleGroup).toBe(
				'logic-puzzles',
			);
		});

		it('returns undefined for an unknown slug', () => {
			expect(getPuzzleConfig('not-a-real-puzzle')).toBeUndefined();
		});
	});

	describe('printEnabled (Sudoku-only, per PR #16700 review)', () => {
		it('is true for all 4 sudoku entries', () => {
			expect(puzzleConfigs['sudoku-easy']!.printEnabled).toBe(true);
			expect(puzzleConfigs['sudoku-medium']!.printEnabled).toBe(true);
			expect(puzzleConfigs['sudoku-hard']!.printEnabled).toBe(true);
			expect(puzzleConfigs['sudoku-killer']!.printEnabled).toBe(true);
		});

		it('is false for word-wheel and wordiply', () => {
			expect(puzzleConfigs['word-wheel']!.printEnabled).toBe(false);
			expect(puzzleConfigs.wordiply!.printEnabled).toBe(false);
		});
	});

	describe('registry iframe config shape', () => {
		// Each of these hardcodes and checks a single entry's own, exact
		// provider-specific identity data independently, this is
		// deliberately what would have caught the original killer-sudoku bug
		// (a shared, slug-derived URL template silently produced the wrong
		// AmuseLabs "set" for it), rather than testing a substitution
		// mechanism in the abstract.
		it('sudoku-easy has its exact, confirmed AmuseLabs set', () => {
			expect(puzzleConfigs['sudoku-easy']!.iframe).toEqual({
				provider: 'amuselabs',
				set: 'guardian-sudoku-easy',
			});
		});

		it('sudoku-medium has its exact, confirmed AmuseLabs set', () => {
			expect(puzzleConfigs['sudoku-medium']!.iframe).toEqual({
				provider: 'amuselabs',
				set: 'guardian-sudoku-medium',
			});
		});

		it('sudoku-hard has its exact, confirmed AmuseLabs set', () => {
			expect(puzzleConfigs['sudoku-hard']!.iframe).toEqual({
				provider: 'amuselabs',
				set: 'guardian-sudoku-hard',
			});
		});

		it('sudoku-killer has its exact, confirmed AmuseLabs set (killer-sudoku-medium, not sudoku-killer)', () => {
			expect(puzzleConfigs['sudoku-killer']!.iframe).toEqual({
				provider: 'amuselabs',
				set: 'guardian-killer-sudoku-medium',
			});
		});

		it('word-wheel has its exact, confirmed AmuseLabs set', () => {
			expect(puzzleConfigs['word-wheel']!.iframe).toEqual({
				provider: 'amuselabs',
				set: 'guardian-word-wheel',
			});
		});

		it('wordiply has its own explicit (non-AmuseLabs) base URL', () => {
			expect(puzzleConfigs.wordiply!.iframe).toEqual({
				provider: 'wordiply',
				baseUrl: 'https://www.wordiply.com/',
			});
		});
	});

	describe('resolvePuzzleTitle', () => {
		it('substitutes {date} with the short-formatted puzzleDate', () => {
			expect(
				resolvePuzzleTitle(puzzleConfigs['sudoku-easy']!, '2026-09-15'),
			).toBe('Easy sudoku 15 Sep 26 - logic puzzle | The Guardian');
		});

		it('produces the exact verbatim copy for every V0 puzzle on a given date', () => {
			expect(
				resolvePuzzleTitle(puzzleConfigs['word-wheel']!, '2026-09-15'),
			).toBe('Word wheel 15 Sep 26 - word game | The Guardian');
			expect(
				resolvePuzzleTitle(puzzleConfigs.wordiply!, '2026-09-15'),
			).toBe('Wordiply 15 Sep 26 - word game | The Guardian');
			expect(
				resolvePuzzleTitle(
					puzzleConfigs['sudoku-medium']!,
					'2026-09-15',
				),
			).toBe('Medium sudoku 15 Sep 26 - logic puzzle | The Guardian');
			expect(
				resolvePuzzleTitle(puzzleConfigs['sudoku-hard']!, '2026-09-15'),
			).toBe('Hard sudoku 15 Sep 26 - logic puzzle | The Guardian');
			expect(
				resolvePuzzleTitle(
					puzzleConfigs['sudoku-killer']!,
					'2026-09-15',
				),
			).toBe('Killer sudoku 15 Sep 26 - logic puzzle | The Guardian');
		});

		it('tidies up the double space left behind when puzzleDate is undefined', () => {
			expect(
				resolvePuzzleTitle(puzzleConfigs['sudoku-easy']!, undefined),
			).toBe('Easy sudoku - logic puzzle | The Guardian');
		});
	});

	describe('resolvePuzzleDescription', () => {
		it('substitutes {date} with the short-formatted puzzleDate', () => {
			expect(
				resolvePuzzleDescription(
					puzzleConfigs['sudoku-easy']!,
					'2026-09-15',
				),
			).toBe(
				'Easy sudoku 15 Sep 26. Ease yourself in with this easy sudoku. Fill the grid with the numbers 1 to 9, appearing only once in every column, row and 3x3 box.',
			);
		});

		it('tidies up the space before the following full stop when puzzleDate is undefined', () => {
			expect(
				resolvePuzzleDescription(
					puzzleConfigs['sudoku-easy']!,
					undefined,
				),
			).toBe(
				'Easy sudoku. Ease yourself in with this easy sudoku. Fill the grid with the numbers 1 to 9, appearing only once in every column, row and 3x3 box.',
			);
		});
	});
});
