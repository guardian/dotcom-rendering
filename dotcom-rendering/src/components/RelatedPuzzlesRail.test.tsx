import { render } from '@testing-library/react';
import type { PuzzleItem } from '../types/puzzlesPage';
import { ConfigProvider } from './ConfigContext';
import { RelatedPuzzlesRail } from './RelatedPuzzlesRail';

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

const renderRail = () =>
	render(
		<ConfigProvider
			value={{
				renderingTarget: 'Web',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			<RelatedPuzzlesRail items={items} />
		</ConfigProvider>,
	);

describe('RelatedPuzzlesRail', () => {
	it('links its heading to the Puzzles & games hub', () => {
		const { getByRole } = renderRail();
		expect(getByRole('link', { name: 'Puzzles & games' })).toHaveAttribute(
			'href',
			'/puzzles-and-games',
		);
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
