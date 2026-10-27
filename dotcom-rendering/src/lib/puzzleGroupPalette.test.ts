import { palette } from '@guardian/source/foundations';
import { Pillar } from './articleFormat';
import {
	getPuzzleGroupPalette,
	puzzleGroupForItemType,
} from './puzzleGroupPalette';

describe('getPuzzleGroupPalette', () => {
	it('gives crosswords the news .300 colour and a news.550 dark accent', () => {
		expect(getPuzzleGroupPalette('crosswords')).toEqual({
			tint: palette.news[800],
			primary: palette.news[300],
			accent: palette.news[550],
			theme: Pillar.News,
		});
	});

	it('gives word games the opinion palette', () => {
		const { primary, accent, tint, theme } =
			getPuzzleGroupPalette('word-games');
		expect([primary, accent, tint, theme]).toEqual([
			palette.opinion[400],
			palette.opinion[550],
			palette.opinion[800],
			Pillar.Opinion,
		]);
	});

	it('gives logic puzzles the sport palette', () => {
		const { primary, accent, tint, theme } =
			getPuzzleGroupPalette('logic-puzzles');
		expect([primary, accent, tint, theme]).toEqual([
			palette.sport[400],
			palette.sport[500],
			palette.sport[800],
			Pillar.Sport,
		]);
	});
});

describe('puzzleGroupForItemType', () => {
	it.each([
		['crossword', 'crosswords'],
		['sudoku', 'logic-puzzles'],
		['wordiply', 'word-games'],
		['word-wheel', 'word-games'],
		['trivia', 'trivia'],
	])('maps %s to %s', (type, group) => {
		expect(puzzleGroupForItemType(type)).toBe(group);
	});

	it('returns undefined for unknown types', () => {
		expect(puzzleGroupForItemType('something-else')).toBeUndefined();
	});
});
