import { render, screen } from '@testing-library/react';
import { usePuzzleProgress } from '../lib/usePuzzleProgress';
import type { PuzzleItem } from '../types/puzzlesPage';
import { ConfigProvider } from './ConfigContext';
import { RelatedPuzzlesRailEnhanced } from './RelatedPuzzlesRailEnhanced.island';

jest.mock('../lib/usePuzzleProgress', () => ({ usePuzzleProgress: jest.fn() }));

const mockedUsePuzzleProgress = jest.mocked(usePuzzleProgress);
const items: PuzzleItem[] = [
	{
		id: 'quick-daily',
		title: 'Quick crossword',
		type: 'crossword',
		set: 'quick',
		cardVariant: 'compact',
		cadence: 'Daily',
		date: '2026-09-24',
		url: '/crosswords/quick/17599',
	},
];

const rail = () => (
	<ConfigProvider
		value={{
			renderingTarget: 'Web',
			darkModeAvailable: false,
			assetOrigin: '/',
			editionId: 'UK',
		}}
	>
		<RelatedPuzzlesRailEnhanced items={items} source="crossword-page" />
	</ConfigProvider>
);

describe('RelatedPuzzlesRailEnhanced tracking', () => {
	afterEach(() => jest.clearAllMocks());

	it('preserves source, card, position and destination when progress is loaded', () => {
		mockedUsePuzzleProgress.mockReturnValue(undefined);
		const { rerender } = render(rail());
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute(
			'data-link-name',
			'puzzles | group-0 | card-@1 | card-quick-daily',
		);
		expect(link.closest('[data-component]')).toHaveAttribute(
			'data-component',
			'puzzles-more-from:crossword-page',
		);

		mockedUsePuzzleProgress.mockReturnValue([
			{
				puzzleType: 'CROSSWORD_QUICK',
				publishDate: '2026-10-01T00:00:00Z',
				progress: 100,
				gameStatus: 'completed',
				gameUrl: '/crosswords/quick/17606',
			},
		]);
		rerender(rail());
		expect(screen.getByText('Played')).toBeInTheDocument();
		expect(screen.getByRole('link')).toBe(link);
		expect(link).toHaveAttribute('href', '/crosswords/quick/17599');
		expect(link).toHaveAttribute(
			'data-link-name',
			'puzzles | group-0 | card-@1 | card-quick-daily',
		);
		expect(link.closest('[data-component]')).toHaveAttribute(
			'data-component',
			'puzzles-more-from:crossword-page',
		);
	});
});
