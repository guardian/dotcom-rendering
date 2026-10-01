import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { PuzzlesArchive } from '../types/puzzlesPage';
import {
	archivePageUrl,
	archiveStatus,
	buildCalendarCells,
	canNavigateToNextMonth,
	daysInMonth,
	mondayFirstOffset,
	PuzzlesArchiveCalendar,
} from './PuzzlesArchiveCalendar.island';

const archive: PuzzlesArchive = {
	category: 'logic-puzzles',
	title: 'Logic puzzles',
	description: 'Choose a puzzle.',
	selectedPuzzle: {
		id: 'sudoku-easy',
		title: 'Easy sudoku',
		puzzleType: 'SUDOKU_EASY',
		slug: 'logic-puzzles/sudoku-easy',
		set: 'easy',
	},
	puzzles: [],
	year: 2026,
	month: 9,
	items: [
		{
			puzzleType: 'SUDOKU_EASY',
			date: '2026-09-02',
			progress: 50,
			setterName: 'Philistine',
			url: '/puzzles-and-games/logic-puzzles/sudoku-easy/2026-09-02',
		},
	],
	dataUrl:
		'/puzzles-and-games/archive-data?category=logic-puzzles&puzzle=sudoku-easy',
	hasError: false,
	moreFrom: [],
};

describe('archive calendar helpers', () => {
	it('builds an archive URL that preserves the puzzle and month', () => {
		expect(archivePageUrl('crosswords', 'archive-mini', 2026, 8)).toBe(
			'/puzzles-and-games/crosswords/archive?puzzle=archive-mini&year=2026&month=8',
		);
	});

	it('maps completed, available, in-progress and missing dates', () => {
		expect(archiveStatus({ ...archive.items[0]!, progress: 100 })).toBe(
			'completed',
		);
		expect(archiveStatus({ ...archive.items[0]!, progress: 0 })).toBe(
			'available',
		);
		expect(archiveStatus({ ...archive.items[0]!, progress: 50 })).toBe(
			'available',
		);
		expect(archiveStatus(undefined)).toBe('unavailable');
	});

	it.each([
		[2025, 2, 28],
		[2024, 2, 29],
		[2026, 4, 30],
		[2026, 1, 31],
	])('handles %s-%s with %s days', (year, month, expected) => {
		expect(daysInMonth(year, month)).toBe(expected);
	});

	it('aligns Monday first and never creates dates from another month', () => {
		expect(mondayFirstOffset(2026, 9)).toBe(1);
		const cells = buildCalendarCells(2026, 9, archive.items);
		expect(cells[0]).toBeNull();
		expect(cells.filter(Boolean)).toHaveLength(30);
		expect(
			cells
				.filter(Boolean)
				.every((cell) => cell?.date.startsWith('2026-09')),
		).toBe(true);
	});

	it('only allows navigating forward from a month before the current month', () => {
		const today = new Date(2026, 9, 1);

		expect(canNavigateToNextMonth(2026, 9, today)).toBe(true);
		expect(canNavigateToNextMonth(2026, 10, today)).toBe(false);
		expect(canNavigateToNextMonth(2026, 11, today)).toBe(false);
	});
});

describe('PuzzlesArchiveCalendar', () => {
	it('links an available date to the API-derived exact puzzle destination', () => {
		render(<PuzzlesArchiveCalendar initialArchive={archive} />);
		expect(screen.getByLabelText('2026-09-02, available')).toHaveAttribute(
			'href',
			archive.items[0]?.url,
		);
	});

	it('shows the setter name inside an available date', () => {
		render(<PuzzlesArchiveCalendar initialArchive={archive} />);

		expect(screen.getByTitle('Philistine')).toBeInTheDocument();
	});

	it('loads the previous month without navigating or reloading', async () => {
		const previous = { ...archive, year: 2026, month: 8, items: [] };
		const fetchMock = jest.fn().mockResolvedValue({
			ok: true,
			json: async () => previous,
		});
		Object.defineProperty(global, 'fetch', {
			configurable: true,
			value: fetchMock,
		});
		render(<PuzzlesArchiveCalendar initialArchive={archive} />);

		fireEvent.click(screen.getByRole('link', { name: 'Previous month' }));
		await waitFor(() =>
			expect(screen.getByText('August 2026')).toBeInTheDocument(),
		);
		expect(fetchMock).toHaveBeenCalledWith(
			expect.objectContaining({
				search: expect.stringContaining('month=8'),
			}),
			{ credentials: 'same-origin' },
		);
		expect(window.location.search).toContain('month=8');
		Reflect.deleteProperty(global, 'fetch');
	});

	it('loads the next month without navigating or reloading', async () => {
		const pastArchive = { ...archive, year: 2020, month: 9 };
		const next = { ...pastArchive, month: 10, items: [] };
		const fetchMock = jest.fn().mockResolvedValue({
			ok: true,
			json: async () => next,
		});
		Object.defineProperty(global, 'fetch', {
			configurable: true,
			value: fetchMock,
		});
		render(<PuzzlesArchiveCalendar initialArchive={pastArchive} />);

		fireEvent.click(screen.getByRole('link', { name: 'Next month' }));
		await waitFor(() =>
			expect(screen.getByText('October 2020')).toBeInTheDocument(),
		);
		Reflect.deleteProperty(global, 'fetch');
	});

	it('does not allow navigating beyond the current month', () => {
		const today = new Date();
		const current = {
			...archive,
			year: today.getFullYear(),
			month: today.getMonth() + 1,
		};
		const fetchMock = jest.fn();
		Object.defineProperty(global, 'fetch', {
			configurable: true,
			value: fetchMock,
		});
		render(<PuzzlesArchiveCalendar initialArchive={current} />);

		const nextButton = screen.getByRole('button', { name: 'Next month' });
		expect(nextButton).toBeDisabled();
		fireEvent.click(nextButton);
		expect(fetchMock).not.toHaveBeenCalled();
		Reflect.deleteProperty(global, 'fetch');
	});

	it('loads another puzzle without reloading the page', async () => {
		const otherPuzzle: PuzzlesArchive['selectedPuzzle'] = {
			id: 'sudoku-medium',
			title: 'Medium sudoku',
			puzzleType: 'SUDOKU_MEDIUM',
			slug: 'logic-puzzles/sudoku-medium',
			set: 'medium',
		};
		const initialArchive = {
			...archive,
			puzzles: [archive.selectedPuzzle, otherPuzzle],
		};
		const selectedArchive = {
			...initialArchive,
			selectedPuzzle: otherPuzzle,
			items: [],
		};
		const fetchMock = jest.fn().mockResolvedValue({
			ok: true,
			json: async () => selectedArchive,
		});
		Object.defineProperty(global, 'fetch', {
			configurable: true,
			value: fetchMock,
		});
		const pushState = jest.spyOn(window.history, 'pushState');
		render(<PuzzlesArchiveCalendar initialArchive={initialArchive} />);

		fireEvent.click(screen.getByRole('link', { name: 'Medium sudoku' }));

		await waitFor(() =>
			expect(
				screen.getByRole('heading', { name: 'Medium sudoku' }),
			).toBeInTheDocument(),
		);
		expect(fetchMock).toHaveBeenCalledWith(
			expect.objectContaining({
				search: expect.stringMatching(
					/puzzle=sudoku-medium.*year=2026.*month=9/,
				),
			}),
			{ credentials: 'same-origin' },
		);
		expect(pushState).toHaveBeenCalledWith(
			{},
			'',
			expect.stringContaining('puzzle=sudoku-medium'),
		);

		pushState.mockRestore();
		Reflect.deleteProperty(global, 'fetch');
	});
});
