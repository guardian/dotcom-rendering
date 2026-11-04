import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { createPuzzlesPage } from '../../fixtures/manual/puzzlesPage';
import type { PuzzleItem, PuzzlesArchive } from '../../src/types/puzzlesPage';
import { disableCMP } from '../lib/cmp';
import { waitForIsland } from '../lib/islands';
import { loadPage } from '../lib/load-page';
import {
	ADDITIONAL_REQUEST_PATH,
	IMPRESSION_REQUEST_PATH,
	interceptOphanRequest,
} from '../lib/ophan';

const easy: PuzzlesArchive['selectedPuzzle'] = {
	id: 'sudoku-easy',
	title: 'Easy sudoku',
	puzzleType: 'SUDOKU_EASY',
	slug: 'logic-puzzles/sudoku-easy',
	set: 'easy',
};
const medium: PuzzlesArchive['selectedPuzzle'] = {
	id: 'sudoku-medium',
	title: 'Medium sudoku',
	puzzleType: 'SUDOKU_MEDIUM',
	slug: 'logic-puzzles/sudoku-medium',
	set: 'medium',
};
const archiveFor = (puzzle = easy, month = 9): PuzzlesArchive => ({
	category: 'logic-puzzles',
	title: 'Logic puzzles',
	description: 'Choose a puzzle.',
	selectedPuzzle: puzzle,
	puzzles: [easy, medium],
	year: 2026,
	month,
	items: [
		{
			puzzleType: puzzle.puzzleType,
			date: `2026-${String(month).padStart(2, '0')}-02`,
			progress: 0,
			url: `/puzzles-and-games/${puzzle.slug}/2026-${String(month).padStart(2, '0')}-02`,
		},
	],
	recentItems: [
		{
			puzzleType: puzzle.puzzleType,
			date: '2026-09-02',
			progress: 0,
			url: `/puzzles-and-games/${puzzle.slug}/2026-09-02`,
		},
	],
	hasError: false,
	moreFrom: [],
});
const configOverrides = {
	serverSideABTests: { 'puzzles-new-hub-v1': 'variant' },
};
const menuItem = (id: string, title: string, slug: string): PuzzleItem => ({
	id,
	title,
	slug,
	type: 'sudoku',
	set: 'all',
	cardVariant: 'archive',
	variant: 'archive-page',
});

const recordClicks = (page: Page) => {
	const clicks: Array<{ component: string; names: string[] }> = [];
	page.on('request', (request) => {
		if (
			!request
				.url()
				.startsWith(
					`https://ophan.theguardian.com/${ADDITIONAL_REQUEST_PATH}`,
				)
		) {
			return;
		}
		const params = new URL(request.url()).searchParams;
		const component = params.get('clickComponent');
		if (component?.startsWith('puzzles-archive-')) {
			clicks.push({
				component,
				names: JSON.parse(
					params.get('clickLinkNames') ?? '[]',
				) as string[],
			});
		}
	});
	return clicks;
};

const loadArchive = async (page: Page, archive = archiveFor()) => {
	const impression = interceptOphanRequest({
		page,
		path: IMPRESSION_REQUEST_PATH,
		searchParamMatcher: () => true,
	});
	await loadPage({
		page,
		path: '/PuzzlesPage/https://www.theguardian.com/puzzles-and-games/logic-puzzles/archive',
		overrides: {
			feFixture: createPuzzlesPage({ archive, isAdFreeUser: true }),
			configOverrides,
		},
	});
	await impression;
	await waitForIsland(page, 'PuzzlesArchiveCalendar');
};
const nextClick = (page: Page) =>
	interceptOphanRequest({
		page,
		path: ADDITIONAL_REQUEST_PATH,
		searchParamMatcher: (params) =>
			params.get('clickComponent')?.startsWith('puzzles-archive-') ===
			true,
	});

test.describe('Puzzle archive click tracking', () => {
	test.beforeEach(async ({ context, page }) => {
		await disableCMP(context);
		await page.clock.setFixedTime(new Date('2026-10-07T12:00:00Z'));
		await context.route('https://ophan.theguardian.com/**', async (route) =>
			route.fulfill({ status: 204 }),
		);
		await context.route('**/puzzles-and-games/progress', async (route) =>
			route.fulfill({ json: { results: [] } }),
		);
		await context.route(
			'**/puzzles-and-games/logic-puzzles/archive-data/**',
			async (route) => {
				const parts = new URL(route.request().url()).pathname.split(
					'/',
				);
				const puzzle = parts.at(-3) === medium.id ? medium : easy;
				await route.fulfill({
					json: archiveFor(puzzle, Number(parts.at(-1))),
				});
			},
		);
	});

	for (const nested of [false, true]) {
		test(`attributes ${nested ? 'nested' : 'top-level'} menu selections without tracking opening`, async ({
			page,
		}) => {
			const clicks = recordClicks(page);
			const impression = interceptOphanRequest({
				page,
				path: IMPRESSION_REQUEST_PATH,
				searchParamMatcher: () => true,
			});
			await loadPage({
				page,
				path: '/PuzzlesPage/https://www.theguardian.com/puzzles-and-games',
				overrides: {
					configOverrides,
					feFixture: createPuzzlesPage({
						isAdFreeUser: true,
						layout: {
							containers: [
								{
									id: 'logic-puzzles',
									title: 'Logic puzzles',
									content: {
										items: [
											[
												{
													...menuItem(
														'easy-card',
														'Easy sudoku',
														easy.slug!,
													),
													cardVariant: 'primary',
													variant: 'iframe-page',
												},
											],
										],
										archiveChoices: [
											menuItem('invalid', 'Invalid', ''),
											menuItem(
												'archive-easy',
												'Easy sudoku archive',
												easy.slug!,
											),
										],
										nestedContainers: [
											{
												id: 'sudoku',
												title: 'Sudoku',
												content: {
													items: [
														[
															{
																...menuItem(
																	'medium-card',
																	'Medium sudoku',
																	medium.slug!,
																),
																cardVariant:
																	'primary',
																variant:
																	'iframe-page',
															},
														],
													],
													archiveChoices: [
														menuItem(
															'archive-medium',
															'Medium sudoku archive',
															medium.slug!,
														),
													],
													nestedContainers: [],
												},
											},
										],
									},
								},
							],
						},
					}),
				},
			});
			await impression;
			await waitForIsland(page, 'PuzzlesDirectoryProgress');
			await page
				.getByText(
					nested ? 'Sudoku archive' : 'Logic puzzles archive',
					{ exact: true },
				)
				.click();
			const link = page.getByRole('link', {
				name: nested ? 'Medium sudoku archive' : 'Easy sudoku archive',
				exact: true,
			});
			const href = await link.getAttribute('href');
			await page.route(`**${href}`, async (route) =>
				route.fulfill({
					contentType: 'text/html',
					body: '<h1>Archive destination</h1>',
				}),
			);
			const click = nextClick(page);
			await link.focus();
			await link.press('Enter');
			await click;
			await expect(
				page.getByRole('heading', { name: 'Archive destination' }),
			).toBeVisible();
			expect(clicks).toEqual([
				{
					component: `puzzles-archive-menu:logic-puzzles${nested ? ':sudoku' : ''}`,
					names: [
						`archive | select | item-archive-${nested ? 'medium' : 'easy'} | position-@1`,
					],
				},
			]);
		});
	}

	test('captures month requests once, including cached navigation, with their original targets', async ({
		page,
	}) => {
		const clicks = recordClicks(page);
		await loadArchive(page);
		for (const [control, month, label] of [
			['Previous month', '08', 'August 2026'],
			['Next month', '09', 'September 2026'],
			['Next month', '10', 'October 2026'],
		] as const) {
			const click = nextClick(page);
			await page
				.getByRole('link', { name: control, exact: true })
				.click();
			await click;
			await expect(page.getByText(label, { exact: true })).toBeVisible();
			expect(clicks.at(-1)).toEqual({
				component: 'puzzles-archive-calendar',
				names: [
					`archive | ${control === 'Previous month' ? 'previous-month' : 'next-month'} | logic-puzzles | puzzle-sudoku-easy | month-2026-${month}`,
				],
			});
		}
		expect(clicks).toHaveLength(3);
		await expect(page).toHaveURL(/puzzle=sudoku-easy&year=2026&month=10$/);
	});

	test('attributes keyboard puzzle-type selection and updates subsequent calendar context', async ({
		page,
	}) => {
		const clicks = recordClicks(page);
		await loadArchive(page);
		const typeClick = nextClick(page);
		await page
			.getByRole('link', { name: 'Medium sudoku', exact: true })
			.press('Enter');
		await typeClick;
		await expect(
			page.getByRole('heading', { name: 'Medium sudoku', exact: true }),
		).toBeVisible();
		const monthClick = nextClick(page);
		await page
			.getByRole('link', { name: 'Previous month', exact: true })
			.click();
		await monthClick;
		await expect(
			page.getByText('August 2026', { exact: true }),
		).toBeVisible();
		expect(clicks).toEqual([
			{
				component: 'puzzles-archive-types',
				names: [
					'archive | puzzle-type | logic-puzzles | puzzle-sudoku-easy | target-puzzle-sudoku-medium | month-2026-09',
				],
			},
			{
				component: 'puzzles-archive-calendar',
				names: [
					'archive | previous-month | logic-puzzles | puzzle-sudoku-medium | month-2026-08',
				],
			},
		]);
	});

	for (const surface of ['date', 'recent'] as const) {
		test(`distinguishes ${surface} selection and preserves the exact destination`, async ({
			page,
		}) => {
			const clicks = recordClicks(page);
			await loadArchive(page);
			const destination =
				'/puzzles-and-games/logic-puzzles/sudoku-easy/2026-09-02';
			await page.route(`**${destination}`, async (route) =>
				route.fulfill({
					contentType: 'text/html',
					body: '<h1>Puzzle destination</h1>',
				}),
			);
			const click = nextClick(page);
			if (surface === 'date') {
				await page
					.getByRole('link', {
						name: '2026-09-02, available',
						exact: true,
					})
					.locator('.day-number')
					.click();
			} else {
				await page
					.getByRole('link', { name: /Latest Easy sudoku/ })
					.locator('time')
					.click();
			}
			await click;
			await expect(page).toHaveURL(new RegExp(`${destination}$`));
			await expect(
				page.getByRole('heading', { name: 'Puzzle destination' }),
			).toBeVisible();
			expect(clicks).toEqual([
				{
					component:
						surface === 'date'
							? 'puzzles-archive-calendar'
							: 'puzzles-archive-recent',
					names: [
						`archive | ${surface} | logic-puzzles | puzzle-sudoku-easy | date-2026-09-02${surface === 'recent' ? ' | card-@1' : ''}`,
					],
				},
			]);
		});
	}

	test('does not track blocked month clicks while loading', async ({
		context,
		page,
	}) => {
		const clicks = recordClicks(page);
		let release!: () => void;
		const response = new Promise<void>((resolve) => {
			release = resolve;
		});
		let loads = 0;
		await context.route(
			'**/puzzles-and-games/logic-puzzles/archive-data/**',
			async (route) => {
				loads += 1;
				await response;
				await route.fulfill({ json: archiveFor(easy, 8) });
			},
		);
		await loadArchive(page);
		await page
			.getByRole('link', { name: 'Previous month', exact: true })
			.click();
		await expect(
			page.getByRole('link', { name: 'Previous month', exact: true }),
		).toHaveAttribute('aria-disabled', 'true');
		await page
			.getByRole('link', { name: 'Previous month', exact: true })
			.dispatchEvent('click');
		await page
			.getByRole('link', { name: 'Next month', exact: true })
			.dispatchEvent('click');
		release();
		await expect(
			page.getByText('August 2026', { exact: true }),
		).toBeVisible();
		expect(loads).toBe(1);
		expect(clicks).toEqual([
			{
				component: 'puzzles-archive-calendar',
				names: [
					'archive | previous-month | logic-puzzles | puzzle-sudoku-easy | month-2026-08',
				],
			},
		]);
	});

	test('does not track disabled future navigation or unavailable dates', async ({
		page,
	}) => {
		const clicks = recordClicks(page);
		await loadArchive(page, archiveFor(easy, 10));
		const next = page.getByRole('button', {
			name: 'Next month',
			exact: true,
		});
		await expect(next).toBeDisabled();
		await next.dispatchEvent('click');
		await page.locator('[data-date="2026-10-04"]').dispatchEvent('click');
		const click = nextClick(page);
		await page
			.getByRole('link', { name: 'Previous month', exact: true })
			.click();
		await click;
		await expect(
			page.getByText('September 2026', { exact: true }),
		).toBeVisible();
		expect(clicks).toEqual([
			{
				component: 'puzzles-archive-calendar',
				names: [
					'archive | previous-month | logic-puzzles | puzzle-sudoku-easy | month-2026-09',
				],
			},
		]);
	});

	test('tracks failed month requests as attempts and preserves retry behaviour', async ({
		context,
		page,
	}) => {
		const clicks = recordClicks(page);
		let requests = 0;
		await context.route(
			'**/puzzles-and-games/logic-puzzles/archive-data/**',
			async (route) => {
				requests += 1;
				if (requests === 1) {
					await route.fulfill({ status: 503 });
				} else {
					await route.fulfill({ json: archiveFor(easy, 8) });
				}
			},
		);
		await loadArchive(page);
		const initialUrl = page.url();
		await page
			.getByRole('link', { name: 'Previous month', exact: true })
			.click();
		await expect(page.getByRole('alert')).toBeVisible();
		expect(page.url()).toBe(initialUrl);
		await page
			.getByRole('link', { name: 'Previous month', exact: true })
			.click();
		await expect(
			page.getByText('August 2026', { exact: true }),
		).toBeVisible();
		expect(clicks).toEqual(
			Array.from({ length: 2 }, () => ({
				component: 'puzzles-archive-calendar',
				names: [
					'archive | previous-month | logic-puzzles | puzzle-sudoku-easy | month-2026-08',
				],
			})),
		);
	});

	test('distinguishes the empty-month fallback from the arrow control', async ({
		page,
	}) => {
		const clicks = recordClicks(page);
		await loadArchive(page, {
			...archiveFor(),
			items: [],
			recentItems: [],
		});
		const click = nextClick(page);
		await page
			.getByRole('link', { name: 'View previous month', exact: true })
			.click();
		await click;
		await expect(
			page.getByText('August 2026', { exact: true }),
		).toBeVisible();
		expect(clicks).toEqual([
			{
				component: 'puzzles-archive-calendar',
				names: [
					'archive | previous-month-empty | logic-puzzles | puzzle-sudoku-easy | month-2026-08',
				],
			},
		]);
	});

	test('preserves modified puzzle-type navigation in a separate tab', async ({
		context,
		page,
	}) => {
		const clicks = recordClicks(page);
		await loadArchive(page);
		await context.route(
			'**/puzzles-and-games/logic-puzzles/archive?*',
			async (route) =>
				route.fulfill({
					contentType: 'text/html',
					body: '<h1>Archive destination</h1>',
				}),
		);
		const originalUrl = page.url();
		const popup = context.waitForEvent('page');
		const click = nextClick(page);
		await page
			.getByRole('link', { name: 'Medium sudoku', exact: true })
			.click({ modifiers: ['ControlOrMeta'] });
		const destination = await popup;
		await click;
		await expect(destination).toHaveURL(
			/puzzle=sudoku-medium&year=2026&month=9$/,
		);
		expect(page.url()).toBe(originalUrl);
		expect(clicks).toEqual([
			{
				component: 'puzzles-archive-types',
				names: [
					'archive | puzzle-type | logic-puzzles | puzzle-sudoku-easy | target-puzzle-sudoku-medium | month-2026-09',
				],
			},
		]);
		await destination.close();
	});
});
