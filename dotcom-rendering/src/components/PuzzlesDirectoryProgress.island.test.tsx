import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { getAuthStatus, subscribeToAuthStateChange } from '../lib/identity';
import type { PuzzlesLayoutType } from '../types/puzzlesPage';
import {
	enrichLayoutWithProgress,
	puzzleCardCadence,
	PuzzlesDirectoryProgress,
	puzzleTypeForCard,
} from './PuzzlesDirectoryProgress.island';

jest.mock('../lib/identity', () => ({
	getAuthStatus: jest.fn(),
	subscribeToAuthStateChange: jest.fn(),
}));

const mockedGetAuthStatus = jest.mocked(getAuthStatus);
const mockedSubscribeToAuthStateChange = jest.mocked(
	subscribeToAuthStateChange,
);

const layout: PuzzlesLayoutType = {
	containers: [
		{
			id: 'crosswords',
			title: 'Crosswords',
			variant: 'standard',
			content: {
				items: [
					[
						{
							id: 'quick',
							title: 'Quick',
							type: 'crossword',
							set: 'quick',
							cardVariant: 'primary',
							cadence: 'Today',
							setter: 'Server setter',
						},
					],
				],
				nestedContainers: [],
			},
		},
	],
};

describe('PuzzlesDirectoryProgress', () => {
	beforeEach(() => {
		mockedSubscribeToAuthStateChange.mockReturnValue(jest.fn());
	});

	afterEach(() => {
		Reflect.deleteProperty(global, 'fetch');
		jest.clearAllMocks();
	});

	it('maps card types and enriches duplicate cards without mutating the input', () => {
		const original = layout.containers[0]!.content.items[0]![0]!;
		expect(puzzleTypeForCard(original)).toBe('CROSSWORD_QUICK');

		const enriched = enrichLayoutWithProgress(
			layout,
			[
				{
					puzzleType: 'CROSSWORD_QUICK',
					publishDate: '2026-08-03T00:00:00Z',
					progress: 100,
					setterName: ' API setter ',
					gameUrl: 'https://www.theguardian.com/crosswords/quick/123',
				},
			],
			new Date('2026-08-04T12:00:00Z'),
		);
		const enrichedItem = enriched.containers[0]!.content.items[0]![0]!;

		expect(enrichedItem).toMatchObject({
			cadence: 'Mon 3 Aug',
			progress: 100,
			setter: 'API setter',
			url: '/crosswords/quick/123',
		});
		expect(original).toMatchObject({
			setter: 'Server setter',
		});
		expect(original).not.toHaveProperty('progress');
	});

	it.each([
		['Mini', 'mini', 'CROSSWORD_MINI', '295', 'mini-crossword'],
		['Weekend', 'weekend', 'CROSSWORD_WEEKEND', '821', 'weekend-crossword'],
	])(
		'uses the canonical route for %s crossword URLs',
		(title, set, puzzleType, number, apiPath) => {
			const quick = layout.containers[0]!.content.items[0]![0]!;
			const crosswordLayout: PuzzlesLayoutType = {
				containers: [
					{
						...layout.containers[0]!,
						content: {
							items: [
								[
									{
										...quick,
										id: set,
										title,
										set,
									},
								],
							],
							nestedContainers: [],
						},
					},
				],
			};

			const enriched = enrichLayoutWithProgress(crosswordLayout, [
				{
					puzzleType,
					publishDate: '2026-10-08T00:00:00Z',
					progress: 0,
					gameUrl: `/crosswords/${apiPath}/${number}`,
				},
			]);

			expect(enriched.containers[0]!.content.items[0]![0]!.url).toBe(
				`/crosswords/${set}/${number}`,
			);
		},
	);

	it('uses Today for the current London date and formats older publication dates', () => {
		expect(
			puzzleCardCadence(
				'2026-08-03T00:00:00Z',
				new Date('2026-08-03T12:00:00Z'),
			),
		).toBe('Today');
		expect(
			puzzleCardCadence(
				'2026-08-03T00:00:00Z',
				new Date('2026-08-04T12:00:00Z'),
			),
		).toBe('Mon 3 Aug');
	});

	it('uses Puzzles API dates for daily and weekly crossword cards', () => {
		const quick = layout.containers[0]!.content.items[0]![0]!;
		const weeklyLayout: PuzzlesLayoutType = {
			containers: [
				{
					...layout.containers[0]!,
					content: {
						items: [
							[
								{ ...quick, cadence: undefined },
								{
									...quick,
									id: 'weekend',
									title: 'Weekend',
									set: 'weekend',
									cadence: undefined,
								},
							],
						],
						nestedContainers: [],
					},
				},
			],
		};

		const enriched = enrichLayoutWithProgress(
			weeklyLayout,
			[
				{
					puzzleType: 'CROSSWORD_QUICK',
					publishDate: '2026-10-02T00:00:00Z',
					progress: 0,
				},
				{
					puzzleType: 'CROSSWORD_WEEKEND',
					publishDate: '2026-09-26T00:00:00Z',
					progress: 0,
				},
			],
			new Date('2026-10-02T12:00:00Z'),
		);

		expect(
			enriched.containers[0]!.content.items[0]!.map(
				(item) => item.cadence,
			),
		).toEqual(['Today', 'Sat 26 Sep']);
	});

	it('uses the Puzzles API publication date for internal iframe routes', () => {
		const quick = layout.containers[0]!.content.items[0]![0]!;
		const iframeLayout: PuzzlesLayoutType = {
			containers: [
				{
					...layout.containers[0]!,
					content: {
						items: [
							[
								{
									...quick,
									id: 'sudoku-easy',
									type: 'sudoku',
									set: 'easy',
									slug: 'logic-puzzles/sudoku-easy',
									variant: 'iframe-page',
									date: undefined,
								},
							],
						],
						nestedContainers: [],
					},
				},
			],
		};

		const enriched = enrichLayoutWithProgress(iframeLayout, [
			{
				puzzleType: 'SUDOKU_EASY',
				publishDate: '2026-09-30T00:00:00Z',
				progress: 0,
				gameUrl:
					'https://tg.amuselabs.com/guardian/date-picker?id=latest',
			},
		]);

		expect(enriched.containers[0]!.content.items[0]![0]!.date).toBe(
			'2026-09-30',
		);
	});

	it('always requests progress and omits Authorization when signed out', async () => {
		mockedGetAuthStatus.mockResolvedValue({ kind: 'SignedOut' });
		const fetchMock = jest.fn().mockResolvedValue({
			ok: true,
			json: async () => ({ results: [] }),
		});
		Object.defineProperty(global, 'fetch', {
			configurable: true,
			value: fetchMock,
		});

		render(<PuzzlesDirectoryProgress layout={layout} renderAds={false} />);

		await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
		expect(fetchMock).toHaveBeenCalledWith('/puzzles-and-games/progress', {
			cache: 'no-store',
			credentials: 'same-origin',
			headers: { Accept: 'application/json' },
		});
	});

	it('sends the access token and renders API setter and completion data when signed in', async () => {
		mockedGetAuthStatus.mockResolvedValue({
			kind: 'SignedIn',
			accessToken: { accessToken: 'access-token' },
			idToken: {},
		} as never);
		const fetchMock = jest.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				results: [
					{
						puzzleType: 'CROSSWORD_QUICK',
						publishDate: '2020-08-03T00:00:00Z',
						progress: 100,
						setterName: 'API setter',
						gameUrl: '/crosswords/quick/123',
					},
				],
			}),
		});
		Object.defineProperty(global, 'fetch', {
			configurable: true,
			value: fetchMock,
		});

		render(<PuzzlesDirectoryProgress layout={layout} renderAds={false} />);

		await screen.findByText('By: API setter');
		expect(screen.getByText('Mon 3 Aug')).toBeInTheDocument();
		expect(screen.getByText('Played')).toBeInTheDocument();
		expect(fetchMock).toHaveBeenCalledWith(
			'/puzzles-and-games/progress',
			expect.objectContaining({
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer access-token',
				},
			}),
		);
	});
});
