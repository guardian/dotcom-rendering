import {
	getPuzzleConfig,
	puzzleConfigs,
	resolveIframeUrl,
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

	it('rejects an entry with an empty iframe url', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: {
					...puzzleConfigs.wordiply!,
					iframe: {
						...puzzleConfigs.wordiply!.iframe,
						url: '',
					},
				},
			}),
		).toThrow(TypeError);
	});

	it('rejects an entry with a non-absolute iframe url', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: {
					...puzzleConfigs.wordiply!,
					iframe: {
						...puzzleConfigs.wordiply!.iframe,
						url: '/not-absolute',
					},
				},
			}),
		).toThrow(TypeError);
	});

	it('rejects an entry with a missing iframe provider', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: {
					...puzzleConfigs.wordiply!,
					iframe: {
						...puzzleConfigs.wordiply!.iframe,
						provider: '',
					},
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

	describe('resolveIframeUrl', () => {
		// Each of these hardcodes and checks a single entry's own, complete,
		// expected real URL independently, this is deliberately what would
		// have caught the original killer-sudoku bug (a shared, slug-derived
		// URL template silently produced the wrong AmuseLabs "set" for it),
		// rather than testing a substitution mechanism in the abstract.
		it('resolves sudoku-easy to its exact, confirmed AmuseLabs URL', () => {
			expect(resolveIframeUrl(puzzleConfigs['sudoku-easy']!)).toBe(
				'https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-easy&embed=1&idx=1',
			);
		});

		it('resolves sudoku-medium to its exact, confirmed AmuseLabs URL', () => {
			expect(resolveIframeUrl(puzzleConfigs['sudoku-medium']!)).toBe(
				'https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-medium&embed=1&idx=1',
			);
		});

		it('resolves sudoku-hard to its exact, confirmed AmuseLabs URL', () => {
			expect(resolveIframeUrl(puzzleConfigs['sudoku-hard']!)).toBe(
				'https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-hard&embed=1&idx=1',
			);
		});

		it('resolves sudoku-killer to its exact, confirmed AmuseLabs URL (killer-sudoku-medium, not sudoku-killer)', () => {
			expect(resolveIframeUrl(puzzleConfigs['sudoku-killer']!)).toBe(
				'https://tg.amuselabs.com/guardian/date-picker?set=guardian-killer-sudoku-medium&embed=1&idx=1',
			);
			expect(
				resolveIframeUrl(puzzleConfigs['sudoku-killer']!),
			).not.toContain('guardian-sudoku-killer');
		});

		it('resolves word-wheel to its exact, confirmed AmuseLabs URL', () => {
			expect(resolveIframeUrl(puzzleConfigs['word-wheel']!)).toBe(
				'https://tg.amuselabs.com/guardian/date-picker?set=guardian-word-wheel&embed=1&idx=1',
			);
		});

		it('resolves wordiply to its exact, own explicit (non-AmuseLabs) URL', () => {
			expect(resolveIframeUrl(puzzleConfigs.wordiply!)).toBe(
				'https://www.wordiply.com/',
			);
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
