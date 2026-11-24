import { puzzleConfigs } from '../model/puzzles/puzzleConfigs';
import {
	getCrosswordIntcmp,
	getPuzzleIntcmp,
	PUZZLES_INTCMP_FALLBACK,
} from './puzzlesAcquisition';

describe('getPuzzleIntcmp', () => {
	it.each([
		['sudoku-easy', 'puzzles_sudoku-easy'],
		['sudoku-medium', 'puzzles_sudoku-medium'],
		['sudoku-hard', 'puzzles_sudoku-hard'],
		['sudoku-killer', 'puzzles_sudoku-killer'],
		['word-wheel', 'puzzles_word-wheel'],
		['wordiply', 'puzzles_wordiply'],
		['film-reveal', 'puzzles_film-reveal'],
		['on-the-ball', 'puzzles_on-the-ball'],
	])('gives %s the value %s', (slug, expected) => {
		expect(getPuzzleIntcmp(slug)).toBe(expected);
	});

	it('has a lowercase value for every puzzle in the registry', () => {
		for (const slug of Object.keys(puzzleConfigs)) {
			expect(getPuzzleIntcmp(slug)).toMatch(/^puzzles_[a-z0-9-]+$/);
			expect(getPuzzleIntcmp(slug)).not.toBe(PUZZLES_INTCMP_FALLBACK);
		}
	});

	it.each([
		undefined,
		'',
		'Sudoku Easy',
		'sudoku_easy',
		'a/b',
		'2026-11-01 ',
	])('falls back for %p', (slug) => {
		expect(getPuzzleIntcmp(slug)).toBe('puzzles_other');
	});
});

describe('getCrosswordIntcmp', () => {
	it.each([
		'quick',
		'mini',
		'cryptic',
		'quick-cryptic',
		'weekend',
		'prize',
		'quiptic',
		'sunday-quick',
	])('gives the %s crossword its own value', (type) => {
		expect(getCrosswordIntcmp(type)).toBe(`puzzles_crossword-${type}`);
	});

	it.each([
		undefined,
		'',
		'everyman',
		'special',
		'speedy',
		'genius',
		'toString',
	])('falls back for %p', (type) => {
		expect(getCrosswordIntcmp(type)).toBe('puzzles_other');
	});
});
