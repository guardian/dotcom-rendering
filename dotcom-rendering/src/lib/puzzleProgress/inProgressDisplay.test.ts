import {
	inProgressDisplay,
	progressPercentage,
	showsInProgress,
} from './inProgressDisplay';

const entries = Object.entries(inProgressDisplay);
const crosswords = entries.filter(([puzzleType]) =>
	puzzleType.startsWith('CROSSWORD_'),
);
const games = entries.filter(
	([puzzleType]) => !puzzleType.startsWith('CROSSWORD_'),
);

describe('inProgressDisplay', () => {
	it('has an entry for every puzzle family', () => {
		expect(games.map(([puzzleType]) => puzzleType).sort()).toEqual([
			'FILMREVEAL',
			'ONTHEBALL',
			'SUDOKU_EASY',
			'SUDOKU_HARD',
			'SUDOKU_KILLER',
			'SUDOKU_MEDIUM',
			'WORDIPLY',
			'WORDWHEEL',
		]);
		expect(crosswords.map(([puzzleType]) => puzzleType).sort()).toEqual([
			'CROSSWORD_CRYPTIC',
			'CROSSWORD_GENIUS',
			'CROSSWORD_MINI',
			'CROSSWORD_PRIZE',
			'CROSSWORD_QUICK',
			'CROSSWORD_QUICKCRYPTIC',
			'CROSSWORD_QUIPTIC',
			'CROSSWORD_SUNDAYQUICK',
			'CROSSWORD_WEEKEND',
		]);
	});

	it.each(games)('turns the game %s on', (_puzzleType, enabled) => {
		expect(enabled).toBe(true);
	});

	it.each(crosswords)(
		'keeps the crossword %s off',
		(_puzzleType, enabled) => {
			expect(enabled).toBe(false);
		},
	);
});

describe('showsInProgress', () => {
	it.each(entries)('follows the config for %s', (puzzleType, enabled) => {
		expect(showsInProgress(puzzleType)).toBe(enabled);
	});

	it.each(games)('shows it for the game %s', (puzzleType) => {
		expect(showsInProgress(puzzleType)).toBe(true);
	});

	it.each(crosswords)('never shows it for the crossword %s', (puzzleType) => {
		expect(showsInProgress(puzzleType)).toBe(false);
	});

	it('is true only for the puzzle types switched on', () => {
		const display = { SUDOKU_EASY: true, SUDOKU_MEDIUM: false };

		expect(showsInProgress('SUDOKU_EASY', display)).toBe(true);
		expect(showsInProgress('SUDOKU_MEDIUM', display)).toBe(false);
		expect(showsInProgress('SUDOKU_HARD', display)).toBe(false);
		expect(showsInProgress('CROSSWORD_QUICK', display)).toBe(false);
	});

	it('is false when the puzzle type is missing', () => {
		expect(showsInProgress(undefined)).toBe(false);
		expect(showsInProgress(undefined, { SUDOKU_EASY: true })).toBe(false);
	});

	it('is false for a puzzle type it does not know', () => {
		expect(showsInProgress('NOT_A_PUZZLE')).toBe(false);
		expect(showsInProgress('')).toBe(false);
	});

	it('is false for names inherited from Object.prototype', () => {
		expect(showsInProgress('toString')).toBe(false);
		expect(showsInProgress('constructor', { SUDOKU_EASY: true })).toBe(
			false,
		);
	});
});

describe('progressPercentage', () => {
	it.each([
		[0, 0],
		[40, 40],
		[99.5, 99.5],
		[100, 100],
	])('keeps %s as %s', (progress, expected) => {
		expect(progressPercentage(progress)).toBe(expected);
	});

	it.each([
		[-5, 0],
		[150, 100],
		[Number.POSITIVE_INFINITY, undefined],
	])('limits %s to the range 0 to 100 (%s)', (progress, expected) => {
		expect(progressPercentage(progress)).toBe(expected);
	});

	it('has no width without a usable value', () => {
		expect(progressPercentage(undefined)).toBeUndefined();
		expect(progressPercentage(Number.NaN)).toBeUndefined();
	});
});
