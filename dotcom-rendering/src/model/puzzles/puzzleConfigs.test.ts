import {
	getPuzzleConfig,
	puzzleConfigs,
	resolveIframeUrl,
	validatePuzzleConfigs,
} from './puzzleConfigs';

describe('puzzleConfigs registry', () => {
	it('has an entry for every documented slug', () => {
		expect(Object.keys(puzzleConfigs).sort()).toEqual(
			[
				'codeword',
				'film-reveal',
				'futoshiki',
				'on-the-ball',
				'sudoku-easy',
				'sudoku-hard',
				'sudoku-killer',
				'sudoku-medium',
				'suguru',
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

	it('rejects an entry with an empty iframe urlTemplate', () => {
		expect(() =>
			validatePuzzleConfigs({
				...puzzleConfigs,
				wordiply: {
					...puzzleConfigs.wordiply!,
					iframe: {
						...puzzleConfigs.wordiply!.iframe,
						urlTemplate: '',
					},
				},
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
		it('substitutes the slug into the AmuseLabs URL template', () => {
			expect(resolveIframeUrl(puzzleConfigs['sudoku-easy']!)).toBe(
				'https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-easy&embed=1&idx=1',
			);
		});

		it('returns the bespoke provider URL unchanged when it has no placeholder', () => {
			expect(resolveIframeUrl(puzzleConfigs.wordiply!)).toBe(
				'https://www.wordiply.com/',
			);
		});
	});
});
