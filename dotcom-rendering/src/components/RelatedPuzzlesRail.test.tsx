import { render, screen } from '@testing-library/react';
import type { PuzzleItem } from '../types/puzzlesPage';
import { ConfigProvider } from './ConfigContext';
import {
	RelatedPuzzlesRail,
	type RelatedPuzzlesSource,
} from './RelatedPuzzlesRail';

const items: PuzzleItem[] = [
	{
		id: 'sudoku-easy',
		title: 'Easy sudoku',
		type: 'sudoku',
		set: 'easy',
		cardVariant: 'compact',
		cadence: 'Today',
		url: '/puzzles-and-games/logic-puzzles/sudoku-easy/2026-09-24',
	},
];

const renderRail = (source: RelatedPuzzlesSource = 'puzzle-page') =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<RelatedPuzzlesRail items={items} source={source} />
		</ConfigProvider>,
	);

describe('RelatedPuzzlesRail', () => {
	it.each(['puzzle-page', 'crossword-page', 'archive'] as const)(
		'attributes selections to the %s rail',
		(source) => {
			renderRail(source);
			const link = screen.getByRole('link', {
				name: 'Easy sudoku Today',
			});
			expect(link.closest('[data-component]')).toHaveAttribute(
				'data-component',
				`puzzles-more-from:${source}`,
			);
			expect(link).toHaveAttribute(
				'data-link-name',
				'puzzles | group-0 | card-@1 | card-sudoku-easy',
			);
			expect(link).toHaveAttribute('href', items[0]!.url);
			expect(screen.getByRole('heading')).not.toHaveAttribute(
				'data-link-name',
			);
		},
	);

	it('renders its heading as plain text, not a link', () => {
		const { getByRole, queryByRole } = renderRail();
		expect(
			getByRole('heading', { name: 'More from Puzzles & games' }),
		).toBeInTheDocument();
		expect(
			queryByRole('link', { name: 'Puzzles & games' }),
		).not.toBeInTheDocument();
	});

	it('scrolls the cards horizontally on mobile', () => {
		renderRail();
		const css = [
			...Array.from(document.querySelectorAll('style')).map(
				(style) => style.textContent,
			),
			...Array.from(document.styleSheets).flatMap((sheet) =>
				Array.from(sheet.cssRules).map((rule) => rule.cssText),
			),
		].join('\n');
		expect(css).toMatch(/overflow-x:\s*auto/);
	});
});
