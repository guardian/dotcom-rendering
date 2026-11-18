import { render, screen } from '@testing-library/react';
import type { GameStatus } from '../lib/puzzleProgress/types';
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

// Emotion does not re-insert a rule it already inserted, so the dark mode
// render happens once and its CSS is shared by the tests below.
let cachedDarkCss: string | undefined;
const darkCss = (): string => {
	cachedDarkCss ??= renderedCss(true);
	return cachedDarkCss;
};

describe('MorePuzzlesCard dark mode', () => {
	it('gives every card the same #333333 background in dark mode when dark mode is available', () => {
		const css = darkCss();

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

describe('MorePuzzlesCard dark mode title colours', () => {
	const titleDarkColours = (): string[] => {
		const css = darkCss();
		return Array.from(
			css.matchAll(
				/html:not\(\[data-color-scheme='light'\]\) \.css-[\w-]+ \{color: (#[0-9A-Fa-f]{6});\}/g,
			),
		).map((match) => match[1] ?? '');
	};

	it('maps each group title to its lighter dark mode tint', () => {
		// sudoku: sport[500]; crossword: news[550]
		expect(titleDarkColours()).toEqual(['#00B2FF', '#FF9081']);
	});
});

describe('MorePuzzlesCard click tracking', () => {
	const rows = (cards: PuzzleItem[], tracked = true) => (
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<MorePuzzlesRows
				items={cards}
				ophanComponentName={
					tracked ? 'puzzles-more-from:puzzle-page' : undefined
				}
			/>
		</ConfigProvider>
	);

	it('uses displayed position and card identity without changing internal or external destinations', () => {
		const cards = [
			{ ...items[0]!, index: 99 },
			{ ...items[0]!, id: 'unavailable', url: undefined },
			{ ...items[1]!, url: 'https://www.wordiply.com/' },
		];
		const { container } = render(rows(cards));
		const links = screen.getAllByRole('link');
		expect(
			links.map((link) => link.getAttribute('data-link-name')),
		).toEqual([
			'puzzles | group-0 | card-@1 | card-sudoku-easy',
			'puzzles | group-0 | card-@3 | card-crossword-quick',
		]);
		expect(links[0]).toHaveAttribute('href', cards[0]!.url);
		expect(links[0]).not.toHaveAttribute('target');
		expect(links[1]).toHaveAttribute('href', 'https://www.wordiply.com/');
		expect(links[1]).toHaveAttribute('target', '_blank');
		expect(links[1]).toHaveAttribute('rel', 'noopener noreferrer');
		expect(container.querySelector('article')).not.toHaveAttribute(
			'data-link-name',
		);
	});

	it('recalculates positions after reordering or removing recommendations', () => {
		const { rerender } = render(rows(items));
		expect(
			screen.getByRole('link', { name: 'Quick crossword No 17,599' }),
		).toHaveAttribute(
			'data-link-name',
			'puzzles | group-0 | card-@2 | card-crossword-quick',
		);
		rerender(rows([items[1]!, items[0]!]));
		expect(
			screen.getByRole('link', { name: 'Quick crossword No 17,599' }),
		).toHaveAttribute(
			'data-link-name',
			'puzzles | group-0 | card-@1 | card-crossword-quick',
		);
		rerender(rows([items[1]!]));
		expect(screen.getAllByRole('link')).toHaveLength(1);
		expect(screen.getByRole('link')).toHaveAttribute(
			'data-link-name',
			'puzzles | group-0 | card-@1 | card-crossword-quick',
		);
	});

	it('leaves standalone rows untracked unless a component context is supplied', () => {
		const { container } = render(rows(items, false));
		expect(container.querySelector('[data-component]')).toBeNull();
		for (const link of screen.getAllByRole('link')) {
			expect(link).not.toHaveAttribute('data-link-name');
		}
	});
});

describe('MorePuzzlesCard progress', () => {
	// The progress value is deliberately misleading: only the status counts.
	const renderWithStatus = (gameStatus: GameStatus | undefined) =>
		render(
			<ConfigProvider
				value={{
					renderingTarget: 'Web',
					darkModeAvailable: false,
					assetOrigin: '/',
					editionId: 'UK',
				}}
			>
				<MorePuzzlesRows
					items={items.map((item) => ({
						...item,
						progress: 50,
						gameStatus,
					}))}
				/>
			</ConfigProvider>,
		);

	it('shows Played with an icon for a completed puzzle', () => {
		renderWithStatus('completed');
		const played = screen.getAllByText('Played');
		expect(played).toHaveLength(2);
		expect(played[0]?.querySelector('svg')).toBeInTheDocument();
	});

	it.each([undefined, 'not-started' as const, 'in-progress' as const])(
		'shows nothing for status %s',
		(status) => {
			renderWithStatus(status);
			expect(screen.queryByText('Played')).not.toBeInTheDocument();
		},
	);
});
