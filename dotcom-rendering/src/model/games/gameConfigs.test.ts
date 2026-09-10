import {
	gameConfigs,
	getGameConfig,
	resolveIframeUrl,
	validateGameConfigs,
} from './gameConfigs';

describe('gameConfigs registry', () => {
	it('has an entry for every documented slug', () => {
		expect(Object.keys(gameConfigs).sort()).toEqual(
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
		expect(() => validateGameConfigs(gameConfigs)).not.toThrow();
	});

	it('rejects a registry entry whose slug does not match its key', () => {
		expect(() =>
			validateGameConfigs({
				...gameConfigs,
				wordiply: { ...gameConfigs.wordiply!, slug: 'not-wordiply' },
			}),
		).toThrow(TypeError);
	});

	it('rejects an entry with an unknown gameGroup', () => {
		expect(() =>
			validateGameConfigs({
				...gameConfigs,
				wordiply: {
					...gameConfigs.wordiply!,
					gameGroup: 'not-a-real-group' as never,
				},
			}),
		).toThrow(TypeError);
	});

	it('rejects an entry with an empty iframe urlTemplate', () => {
		expect(() =>
			validateGameConfigs({
				...gameConfigs,
				wordiply: {
					...gameConfigs.wordiply!,
					iframe: {
						...gameConfigs.wordiply!.iframe,
						urlTemplate: '',
					},
				},
			}),
		).toThrow(TypeError);
	});

	describe('getGameConfig', () => {
		it('returns the config for a known slug', () => {
			expect(getGameConfig('sudoku-easy')?.gameGroup).toBe(
				'logic-puzzles',
			);
		});

		it('returns undefined for an unknown slug', () => {
			expect(getGameConfig('not-a-real-game')).toBeUndefined();
		});
	});

	describe('resolveIframeUrl', () => {
		it('substitutes the slug into the AmuseLabs URL template', () => {
			expect(resolveIframeUrl(gameConfigs['sudoku-easy']!)).toBe(
				'https://tg.amuselabs.com/guardian/date-picker?set=guardian-sudoku-easy&embed=1&idx=1',
			);
		});

		it('returns the bespoke provider URL unchanged when it has no placeholder', () => {
			expect(resolveIframeUrl(gameConfigs.wordiply!)).toBe(
				'https://www.wordiply.com/',
			);
		});
	});
});
