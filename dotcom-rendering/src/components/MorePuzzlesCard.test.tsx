import { render } from '@testing-library/react';
import type { PuzzleItem } from '../types/puzzlesPage';
import { ConfigProvider } from './ConfigContext';
import { MorePuzzlesRows } from './MorePuzzlesCard';

const items: PuzzleItem[] = [
	{
		id: 'sudoku-easy',
		title: 'Easy sudoku',
		type: 'sudoku',
		set: 'easy',
		cardVariant: 'compact',
		cadence: 'Today',
		url: '/puzzles-and-games/logic-puzzles/sudoku-easy/2026-09-24',
		backgroundColour: '#CDECFB',
	},
	{
		id: 'crossword-quick',
		title: 'Quick crossword',
		type: 'crossword',
		set: 'quick',
		cardVariant: 'compact',
		cadence: 'No 17,599',
		url: '/crosswords/quick/17599',
		backgroundColour: '#FCE1CE',
	},
];

const renderedCss = (darkModeAvailable: boolean): string => {
	document.head.innerHTML = '';
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<MorePuzzlesRows items={items} />
		</ConfigProvider>,
	);
	// Emotion may insert rules via the CSSOM rather than as text nodes.
	return [
		...Array.from(document.querySelectorAll('style')).map(
			(style) => style.textContent ?? '',
		),
		...Array.from(document.styleSheets).flatMap((sheet) =>
			Array.from(sheet.cssRules).map((rule) => rule.cssText),
		),
	].join('\n');
};

describe('MorePuzzlesCard dark mode', () => {
	it('gives every card the same #333333 background in dark mode when dark mode is available', () => {
		const css = renderedCss(true);

		expect(css).toContain('prefers-color-scheme: dark');
		// Exactly the dark rule per card, scoped to the card itself (not "<card>:root ... <card>").
		const darkRules = css.match(
			/html:not\(\[data-color-scheme='light'\]\) \.css-[\w-]+ \{background-color: #333333;/g,
		);
		expect(darkRules).toHaveLength(2);
	});

	it('does not emit any dark mode rule when dark mode is not available', () => {
		const css = renderedCss(false);

		expect(css).not.toContain('#333333');
		expect(css).not.toContain('prefers-color-scheme');
	});
});
