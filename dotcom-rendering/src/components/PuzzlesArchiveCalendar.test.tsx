import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { PuzzlesArchive } from '../types/puzzlesPage';
import {
	archiveStatus,
	buildCalendarCells,
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
			puzzleId: 'guardian-sudoku-20260902',
			puzzleType: 'SUDOKU_EASY',
			date: '2026-09-02',
			progress: 50,
			url: '/puzzles-and-games/logic-puzzles/sudoku-easy/2026-09-02?puzzleId=guardian-sudoku-20260902',
		},
	],
	dataUrl:
		'/puzzles-and-games/archive-data?category=logic-puzzles&puzzle=sudoku-easy',
	hasError: false,
	moreFrom: [],
};

describe('archive calendar helpers', () => {
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
});

describe('PuzzlesArchiveCalendar', () => {
	it('links an available date to the API-derived exact puzzle destination', () => {
		render(<PuzzlesArchiveCalendar initialArchive={archive} />);
		expect(screen.getByLabelText('2026-09-02, available')).toHaveAttribute(
			'href',
			archive.items[0]?.url,
		);
	});

	it('loads the previous month without navigating or reloading', async () => {
		const previous = { ...archive, year: 2026, month: 8, items: [] };
		const fetchMock = jest.fn().mockResolvedValue({
			ok: true,
			json: async () => previous,
		} as Response);
		Object.defineProperty(global, 'fetch', {
			configurable: true,
			value: fetchMock,
		});
		render(<PuzzlesArchiveCalendar initialArchive={archive} />);

		fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
		await waitFor(() =>
			expect(screen.getByText('August 2026')).toBeInTheDocument(),
		);
		expect(fetchMock).toHaveBeenCalledWith(
			expect.objectContaining({
				search: expect.stringContaining('month=8'),
			}),
			{ credentials: 'same-origin' },
		);
		Reflect.deleteProperty(global, 'fetch');
	});

	it('loads the next month without navigating or reloading', async () => {
		const next = { ...archive, year: 2026, month: 10, items: [] };
		const fetchMock = jest.fn().mockResolvedValue({
			ok: true,
			json: async () => next,
		} as Response);
		Object.defineProperty(global, 'fetch', {
			configurable: true,
			value: fetchMock,
		});
		render(<PuzzlesArchiveCalendar initialArchive={archive} />);

		fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
		await waitFor(() =>
			expect(screen.getByText('October 2026')).toBeInTheDocument(),
		);
		Reflect.deleteProperty(global, 'fetch');
	});
});
