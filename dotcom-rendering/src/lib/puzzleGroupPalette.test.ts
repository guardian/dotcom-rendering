import { palette } from '@guardian/source/foundations';
import { paletteDeclarations } from '../paletteDeclarations';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from './articleFormat';
import {
	getPuzzleGroupPalette,
	puzzleGroupForItemType,
} from './puzzleGroupPalette';

const declarations = (mode: 'light' | 'dark') =>
	paletteDeclarations(
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Crossword,
			theme: Pillar.News,
		},
		mode,
	);

describe('getPuzzleGroupPalette', () => {
	it.each([
		['crosswords', Pillar.News],
		['word-games', Pillar.Opinion],
		['logic-puzzles', Pillar.Sport],
		['trivia', ArticleSpecial.Labs],
	] as const)('points %s at its palette colours', (group, theme) => {
		expect(getPuzzleGroupPalette(group)).toEqual({
			tint: `var(--puzzles-${group}-tint)`,
			primary: `var(--puzzles-${group}-primary)`,
			accent: `var(--puzzles-${group}-accent)`,
			themedPrimary: `var(--puzzles-${group}-themed-primary)`,
			themedHover: `var(--puzzles-${group}-themed-hover)`,
			theme,
		});
	});

	it.each([
		['crosswords', palette.news, 800, 300, 550],
		['word-games', palette.opinion, 800, 400, 550],
		['logic-puzzles', palette.sport, 800, 400, 500],
		['trivia', palette.labs, 700, 200, 400],
	] as const)(
		'declares the %s colours',
		(group, hue, tint, primary, accent) => {
			const shades: Record<number, string> = hue;

			expect(declarations('light')).toEqual(
				expect.arrayContaining([
					`--puzzles-${group}-tint: ${shades[tint]};`,
					`--puzzles-${group}-primary: ${shades[primary]};`,
					`--puzzles-${group}-accent: ${shades[accent]};`,
					`--puzzles-${group}-themed-primary: ${shades[primary]};`,
				]),
			);
			expect(declarations('dark')).toContain(
				`--puzzles-${group}-themed-primary: ${shades[accent]};`,
			);
		},
	);
});

describe('puzzleGroupForItemType', () => {
	it.each([
		['crossword', 'crosswords'],
		['sudoku', 'logic-puzzles'],
		['wordiply', 'word-games'],
		['word-wheel', 'word-games'],
		['trivia', 'trivia'],
		['film-reveal', 'trivia'],
		['on-the-ball', 'trivia'],
	])('maps %s to %s', (type, group) => {
		expect(puzzleGroupForItemType(type)).toBe(group);
	});

	it('returns undefined for unknown types', () => {
		expect(puzzleGroupForItemType('something-else')).toBeUndefined();
	});
});
