import { paletteDeclarations } from '../paletteDeclarations';
import { ArticleDesign, ArticleDisplay, Pillar } from './articleFormat';
import { puzzlesLightColours, puzzlesPageTheme } from './puzzlesTheme';

const declarations = (mode: 'light' | 'dark') =>
	paletteDeclarations(
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Crossword,
			theme: Pillar.News,
		},
		mode,
	);

describe('Puzzles & games calendar day colours', () => {
	it.each([
		['--puzzles-completed-day-background', '#185E36'],
		['--puzzles-completed-day-icon', '#99E5BA'],
		['--puzzles-in-progress-day-background', '#672005'],
	])('sets %s to %s in dark mode', (name, colour) => {
		expect(declarations('dark')).toContain(`${name}: ${colour};`);
	});
});

describe('puzzlesPageTheme', () => {
	it('only emits dark mode rules when dark mode is available', () => {
		expect(puzzlesPageTheme(true).styles).toContain(
			'prefers-color-scheme: dark',
		);
		expect(puzzlesPageTheme(false).styles).not.toContain(
			'prefers-color-scheme',
		);
	});
});

describe('puzzlesLightColours', () => {
	it('redeclares the light Puzzles & games colours and nothing else', () => {
		const names = Array.from(
			puzzlesLightColours.styles.matchAll(/(--[\w-]+):/g),
			(match) => match[1] ?? '',
		);

		expect(names).toContain('--puzzles-text-colour');
		expect(
			names.filter((name) => !/^--(puzzles|unlock-modal)-/.test(name)),
		).toEqual([]);
		expect(puzzlesLightColours.styles).toContain(
			'--puzzles-page-background: #FFFFFF;',
		);
	});
});
