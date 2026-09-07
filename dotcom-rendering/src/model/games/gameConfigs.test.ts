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
				'crossword',
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
				crossword: { ...gameConfigs.crossword!, slug: 'not-crossword' },
			}),
		).toThrow(TypeError);
	});

	it('rejects a component entry missing componentKey', () => {
		expect(() =>
			validateGameConfigs({
				...gameConfigs,
				crossword: {
					...gameConfigs.crossword!,
					componentKey: undefined,
				},
			}),
		).toThrow(TypeError);
	});

	it('rejects an iframe entry missing its iframe config', () => {
		expect(() =>
			validateGameConfigs({
				...gameConfigs,
				wordiply: { ...gameConfigs.wordiply!, iframe: undefined },
			}),
		).toThrow(TypeError);
	});

	it('rejects an entry that mixes componentKey and iframe', () => {
		expect(() =>
			validateGameConfigs({
				...gameConfigs,
				wordiply: {
					...gameConfigs.wordiply!,
					componentKey: 'crossword',
				},
			}),
		).toThrow(TypeError);
	});

	describe('getGameConfig', () => {
		it('returns the config for a known slug', () => {
			expect(getGameConfig('crossword')?.gameGroup).toBe('crosswords');
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

		it('throws for a component-rendered game with no iframe config', () => {
			expect(() => resolveIframeUrl(gameConfigs.crossword!)).toThrow(
				TypeError,
			);
		});
	});
});
