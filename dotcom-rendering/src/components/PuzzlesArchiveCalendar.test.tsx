import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import { getAuthStatus } from '../lib/identity';
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

jest.mock('../lib/identity', () => ({
	getAuthStatus: jest.fn(),
}));

const mockedGetAuthStatus = jest.mocked(getAuthStatus);

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
	beforeEach(() => {
		mockedGetAuthStatus.mockResolvedValue({ kind: 'SignedOut' });
		window.history.replaceState(
			{},
			'',
			'/puzzles-and-games/logic-puzzles/archive',
		);
	});

	afterEach(() => {
		jest.restoreAllMocks();
		Reflect.deleteProperty(global, 'fetch');
	});

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

	it('refreshes the initial archive with authenticated progress after hydration', async () => {
		mockedGetAuthStatus.mockResolvedValue({
			kind: 'SignedIn',
			accessToken: { accessToken: 'access-token' },
			idToken: {},
		} as never);
		const authenticatedArchive = {
			...archive,
			items: [{ ...archive.items[0]!, progress: 100 }],
		};
		const fetchMock = jest.fn().mockResolvedValue({
			ok: true,
			json: async () => authenticatedArchive,
		});
		Object.defineProperty(global, 'fetch', {
			configurable: true,
			value: fetchMock,
		});

		render(<PuzzlesArchiveCalendar initialArchive={archive} />);

		await waitFor(() =>
			expect(
				screen.getByLabelText('2026-09-02, completed'),
			).toBeInTheDocument(),
		);
		expect(fetchMock).toHaveBeenCalledWith(
			expect.objectContaining({
				pathname:
					'/puzzles-and-games/logic-puzzles/archive-data/sudoku-easy/2026/9',
			}),
			expect.objectContaining({
				headers: expect.objectContaining({
					Authorization: 'Bearer access-token',
				}),
			}),
		);
	});

	it('keeps the calendar mounted and announces loading in the month controls', async () => {
		let resolveResponse!: (value: unknown) => void;
		const fetchMock = jest.fn().mockReturnValue(
			new Promise((resolve) => {
				resolveResponse = resolve;
			}),
		);
		Object.defineProperty(global, 'fetch', {
			configurable: true,
			value: fetchMock,
		});
		render(<PuzzlesArchiveCalendar initialArchive={archive} />);
		const calendar = screen.getByTestId('archive-calendar');
		const previous = screen.getByRole('link', { name: 'Previous month' });
		const status = screen.getByRole('status');
		expect(status).not.toHaveTextContent('Loading archive…');
		fireEvent.click(previous);
		expect(calendar).toHaveAttribute('aria-busy', 'true');
		expect(
			screen.getByLabelText('2026-09-02, available'),
		).toBeInTheDocument();
		expect(status).toHaveTextContent('Loading archive…');
		expect(previous.parentElement).toContainElement(status);
		await act(async () =>
			resolveResponse({
				ok: true,
				json: async () => ({ ...archive, month: 8, items: [] }),
			}),
		);
		await screen.findByText('August 2026');
		expect(screen.getByTestId('archive-calendar')).toBe(calendar);
		expect(calendar).toHaveAttribute('aria-busy', 'false');
		expect(status).not.toHaveTextContent('Loading archive…');
	});

	it('keeps the selected month and shows recent cards when only earlier publications exist', async () => {
		const weekend: PuzzlesArchive = {
			...archive,
			category: 'crosswords',
			month: 10,
			selectedPuzzle: {
				id: 'archive-weekend',
				title: 'Weekend',
				set: 'weekend',
				puzzleType: 'CROSSWORD_WEEKEND',
			},
			items: [
				{
					...archive.items[0]!,
					date: '2026-09-26',
					url: '/crosswords/weekend/820',
				},
			],
		};
		const fetchMock = jest.fn().mockResolvedValue({
			ok: true,
			json: async () => ({ ...weekend, month: 9 }),
		});
		Object.defineProperty(global, 'fetch', {
			configurable: true,
			value: fetchMock,
		});
		render(<PuzzlesArchiveCalendar initialArchive={weekend} />);
		expect(screen.getByText('October 2026')).toBeInTheDocument();
		expect(
			screen.getByText(
				'No Weekend crosswords are available for October 2026.',
			),
		).toBeInTheDocument();
		expect(
			screen.getByRole('link', { name: /Latest Weekend/ }),
		).toHaveTextContent('2026-09-26');
		expect(
			screen.getByRole('link', { name: /Latest Weekend/ }),
		).toHaveTextContent('By: Philistine');
		expect(fetchMock).not.toHaveBeenCalled();
		fireEvent.click(
			screen.getByRole('link', { name: 'View previous month' }),
		);
		await screen.findByText('September 2026');
		expect(
			screen.getByLabelText('2026-09-26, available'),
		).toBeInTheDocument();
		expect(
			screen.queryByText(/No Weekend crosswords/),
		).not.toBeInTheDocument();
	});

	it('does not describe an API failure as an empty month', async () => {
		Object.defineProperty(global, 'fetch', {
			configurable: true,
			value: jest.fn().mockRejectedValue(new Error('Unavailable')),
		});
		render(
			<PuzzlesArchiveCalendar
				initialArchive={{ ...archive, items: [], hasError: true }}
			/>,
		);
		await screen.findByRole('alert');
		expect(
			screen.queryByRole('link', { name: 'View previous month' }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByText(/No .* are available for/),
		).not.toBeInTheDocument();
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
		mockedGetAuthStatus.mockResolvedValue({
			kind: 'SignedIn',
			accessToken: { accessToken: 'access-token' },
			idToken: {},
		} as never);

		fireEvent.click(screen.getByRole('link', { name: 'Previous month' }));
		await waitFor(() =>
			expect(screen.getByText('August 2026')).toBeInTheDocument(),
		);
		expect(fetchMock).toHaveBeenCalledWith(
			expect.objectContaining({
				pathname:
					'/puzzles-and-games/logic-puzzles/archive-data/sudoku-easy/2026/8',
				search: '',
			}),
			expect.objectContaining({
				cache: 'no-store',
				credentials: 'same-origin',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer access-token',
				},
			}),
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
				pathname:
					'/puzzles-and-games/logic-puzzles/archive-data/sudoku-medium/2026/9',
				search: '',
			}),
			expect.objectContaining({ credentials: 'same-origin' }),
		);
		expect(pushState).toHaveBeenCalledWith(
			{},
			'',
			expect.stringContaining('puzzle=sudoku-medium'),
		);

		pushState.mockRestore();
		Reflect.deleteProperty(global, 'fetch');
	});

	it('restores the browser selection when SSR received no query parameters', async () => {
		const medium = {
			...archive.selectedPuzzle,
			id: 'sudoku-medium',
			title: 'Medium sudoku',
		};
		const initialArchive = {
			...archive,
			puzzles: [archive.selectedPuzzle, medium],
		};
		const fetchMock = jest.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				...initialArchive,
				selectedPuzzle: medium,
				year: 2020,
				month: 8,
				items: [],
			}),
		});
		Object.defineProperty(global, 'fetch', {
			configurable: true,
			value: fetchMock,
		});
		window.history.replaceState(
			{},
			'',
			'?puzzle=sudoku-medium&year=2020&month=8',
		);
		render(<PuzzlesArchiveCalendar initialArchive={initialArchive} />);
		await waitFor(() =>
			expect(screen.getByText('August 2020')).toBeInTheDocument(),
		);
		expect(
			screen.getByRole('link', { name: 'Medium sudoku' }),
		).toHaveAttribute('aria-current', 'page');
		expect(fetchMock).toHaveBeenCalledWith(
			expect.objectContaining({
				pathname:
					'/puzzles-and-games/logic-puzzles/archive-data/sudoku-medium/2020/8',
				search: '',
			}),
			expect.objectContaining({ credentials: 'same-origin' }),
		);
		window.history.replaceState(
			{},
			'',
			'/puzzles-and-games/logic-puzzles/archive',
		);
		fireEvent(window, new PopStateEvent('popstate'));
		await waitFor(() =>
			expect(screen.getByText('September 2026')).toBeInTheDocument(),
		);
		expect(
			screen.getByRole('link', { name: 'Easy sudoku' }),
		).toHaveAttribute('aria-current', 'page');
	});

	it.each(['network', 'wrong selection', 'api error'])(
		'keeps the page and allows retry after %s',
		async (failure) => {
			const fetchMock = jest.fn();
			if (failure === 'network') {
				fetchMock.mockRejectedValueOnce(new Error('Offline'));
			} else {
				fetchMock.mockResolvedValueOnce({
					ok: true,
					json: async () =>
						failure === 'api error'
							? { ...archive, month: 8, hasError: true }
							: archive,
				});
			}
			fetchMock.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ ...archive, month: 8, items: [] }),
			});
			Object.defineProperty(global, 'fetch', {
				configurable: true,
				value: fetchMock,
			});
			const consoleError = jest
				.spyOn(console, 'error')
				.mockImplementation(() => undefined);
			render(<PuzzlesArchiveCalendar initialArchive={archive} />);
			expect(
				fireEvent.click(
					screen.getByRole('link', { name: 'Previous month' }),
				),
			).toBe(false);
			await screen.findByRole('alert');
			expect(screen.getByText('September 2026')).toBeInTheDocument();
			expect(window.location.search).toBe('');
			expect(consoleError).not.toHaveBeenCalled();
			fireEvent.click(
				screen.getByRole('link', { name: 'Previous month' }),
			);
			await screen.findByText('August 2026');
			expect(screen.queryByRole('alert')).not.toBeInTheDocument();
		},
	);
});
