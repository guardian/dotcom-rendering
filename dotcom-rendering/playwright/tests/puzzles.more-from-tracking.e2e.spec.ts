import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { Standard } from '../../fixtures/generated/fe-articles/Standard';
import { quickCrossword } from '../../fixtures/manual/editionsCrossword';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
import { createPuzzlesPage } from '../../fixtures/manual/puzzlesPage';
import type { RelatedPuzzlesSource } from '../../src/components/RelatedPuzzlesRail';
import type { PuzzleItem, PuzzlesArchive } from '../../src/types/puzzlesPage';
import { disableCMP } from '../lib/cmp';
import { waitForIsland } from '../lib/islands';
import { loadPage } from '../lib/load-page';
import {
	ADDITIONAL_REQUEST_PATH,
	IMPRESSION_REQUEST_PATH,
	interceptOphanRequest,
} from '../lib/ophan';

const destination = '/crosswords/quick/17599';
const items: PuzzleItem[] = [
	{
		id: 'quick-daily',
		title: 'Quick crossword',
		type: 'crossword',
		set: 'quick',
		cardVariant: 'primary',
		cadence: 'Daily',
		date: '2026-09-24',
		index: 99,
		url: destination,
		image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"/%3E',
	},
	{
		id: 'unavailable',
		title: 'Coming soon',
		type: 'word-game',
		set: 'all',
		cardVariant: 'compact',
		cadence: 'Daily',
	},
	{
		id: 'wordiply-daily',
		title: 'Wordiply',
		type: 'wordiply',
		set: 'all',
		cardVariant: 'compact',
		cadence: 'Daily',
		url: 'https://www.wordiply.com/',
	},
];
const archive: PuzzlesArchive = {
	category: 'logic-puzzles',
	title: 'Logic puzzles',
	description: 'Choose a puzzle.',
	selectedPuzzle: {
		id: 'sudoku-easy',
		title: 'Easy sudoku',
		puzzleType: 'SUDOKU_EASY',
		set: 'easy',
	},
	puzzles: [],
	year: 2026,
	month: 9,
	items: [],
	recentItems: [],
	hasError: false,
	moreFrom: items,
};
const configOverrides = {
	serverSideABTests: { 'puzzles-new-hub-v1': 'variant' },
};

const loadRail = async (
	page: Page,
	source: RelatedPuzzlesSource,
	recommendations = items,
) => {
	const impression = interceptOphanRequest({
		page,
		path: IMPRESSION_REQUEST_PATH,
		searchParamMatcher: () => true,
	});
	if (source === 'puzzle-page') {
		const puzzle = createPuzzlePage('word-wheel');
		await loadPage({
			page,
			path: '/PuzzlePage/https://www.theguardian.com/puzzles-and-games/word-games/word-wheel/2026-09-24',
			overrides: {
				feFixture: {
					...puzzle,
					isAdFreeUser: true,
					instance: {
						...puzzle.instance,
						moreFromPuzzlesAndGames: recommendations,
					},
				},
				configOverrides,
			},
		});
	} else if (source === 'crossword-page') {
		await loadPage({
			page,
			path: '/Article/https://www.theguardian.com/crosswords/quick/17606',
			overrides: {
				feFixture: {
					...Standard,
					format: {
						design: 'CrosswordDesign',
						theme: 'LifestylePillar',
						display: 'StandardDisplay',
					},
					crossword: quickCrossword,
					isAdFreeUser: true,
					isCommentable: false,
					moreFromPuzzlesAndGames: recommendations,
				},
				configOverrides,
			},
		});
	} else {
		await loadPage({
			page,
			path: '/PuzzlesPage/https://www.theguardian.com/puzzles-and-games/logic-puzzles/archive',
			overrides: {
				feFixture: createPuzzlesPage({
					archive: { ...archive, moreFrom: recommendations },
					isAdFreeUser: true,
				}),
				configOverrides,
			},
		});
	}
	await impression;
	const rail = page.locator(`[data-component="puzzles-more-from:${source}"]`);
	await expect(rail).toBeAttached();
	return rail;
};

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
		if (component?.startsWith('puzzles-more-from:')) {
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
const nextClick = (page: Page) =>
	interceptOphanRequest({
		page,
		path: ADDITIONAL_REQUEST_PATH,
		searchParamMatcher: (params) =>
			params.get('clickComponent')?.startsWith('puzzles-more-from:') ===
			true,
	});

test.describe('More from Puzzles & games click tracking', () => {
	test.beforeEach(async ({ context }) => {
		await disableCMP(context);
		await context.route('https://ophan.theguardian.com/**', async (route) =>
			route.fulfill({ status: 204 }),
		);
		await context.route('https://tg.amuselabs.com/**', async (route) =>
			route.fulfill({ contentType: 'text/html', body: '' }),
		);
		await context.route('**/puzzles-and-games/progress', async (route) =>
			route.fulfill({ json: { results: [] } }),
		);
	});

	for (const source of [
		'puzzle-page',
		'crossword-page',
		'archive',
	] as const) {
		for (const width of [375, 1280]) {
			test(`attributes ${source} selections and preserves navigation at ${width}px`, async ({
				page,
			}) => {
				await page.setViewportSize({ width, height: 900 });
				const clicks = recordClicks(page);
				const rail = await loadRail(page, source);
				await waitForIsland(page, 'RelatedPuzzlesRailEnhanced');
				await page.route(`**${destination}`, async (route) =>
					route.fulfill({
						contentType: 'text/html',
						body: '<h1>Puzzle destination</h1>',
					}),
				);
				const click = nextClick(page);
				await rail
					.locator('a')
					.first()
					.locator('.puzzle-card-title')
					.click();
				await click;
				await expect(
					page.getByRole('heading', { name: 'Puzzle destination' }),
				).toBeVisible();
				await expect(page).toHaveURL(new RegExp(`${destination}$`));
				expect(clicks).toEqual([
					{
						component: `puzzles-more-from:${source}`,
						names: [
							'puzzles | group-0 | card-@1 | card-quick-daily',
						],
					},
				]);
			});
		}
	}

	for (const activation of ['artwork', 'background', 'keyboard'] as const) {
		test(`captures one activation from the card ${activation}`, async ({
			page,
		}) => {
			const clicks = recordClicks(page);
			const rail = await loadRail(page, 'puzzle-page');
			await waitForIsland(page, 'RelatedPuzzlesRailEnhanced');
			await page.route(`**${destination}`, async (route) =>
				route.fulfill({
					contentType: 'text/html',
					body: '<h1>Puzzle destination</h1>',
				}),
			);
			const link = rail.locator('a').first();
			const click = nextClick(page);
			switch (activation) {
				case 'artwork':
					await link.locator('img').click();
					break;
				case 'background':
					await link.click({ position: { x: 4, y: 100 } });
					break;
				case 'keyboard':
					await link.press('Enter');
					break;
			}
			await click;
			await expect(
				page.getByRole('heading', { name: 'Puzzle destination' }),
			).toBeVisible();
			expect(clicks).toEqual([
				{
					component: 'puzzles-more-from:puzzle-page',
					names: ['puzzles | group-0 | card-@1 | card-quick-daily'],
				},
			]);
		});
	}

	test('keeps attribution and the original destination after progress enrichment', async ({
		context,
		page,
	}) => {
		const clicks = recordClicks(page);
		await context.route('**/puzzles-and-games/progress', async (route) =>
			route.fulfill({
				json: {
					results: [
						{
							puzzleType: 'CROSSWORD_QUICK',
							publishDate: '2026-10-01',
							progress: 100,
							gameStatus: 'completed',
							gameUrl: '/crosswords/quick/17606',
						},
					],
				},
			}),
		);
		const rail = await loadRail(page, 'archive');
		await waitForIsland(page, 'RelatedPuzzlesRailEnhanced');
		await expect(rail.getByText('Played')).toBeVisible();
		await page.route(`**${destination}`, async (route) =>
			route.fulfill({
				contentType: 'text/html',
				body: '<h1>Puzzle destination</h1>',
			}),
		);
		const click = nextClick(page);
		await rail.locator('a').first().click();
		await click;
		await expect(page).toHaveURL(new RegExp(`${destination}$`));
		expect(clicks).toEqual([
			{
				component: 'puzzles-more-from:archive',
				names: ['puzzles | group-0 | card-@1 | card-quick-daily'],
			},
		]);
	});

	test('tracks the rendered position of an external card and preserves new-tab behaviour', async ({
		context,
		page,
	}) => {
		const clicks = recordClicks(page);
		const rail = await loadRail(page, 'puzzle-page');
		await waitForIsland(page, 'RelatedPuzzlesRailEnhanced');
		await context.route('https://www.wordiply.com/**', async (route) =>
			route.fulfill({
				contentType: 'text/html',
				body: '<h1>Wordiply destination</h1>',
			}),
		);
		const popup = context.waitForEvent('page');
		const click = nextClick(page);
		await rail.getByRole('link', { name: 'Wordiply Daily' }).click();
		const destinationPage = await popup;
		await click;
		await expect(
			destinationPage.getByRole('heading', {
				name: 'Wordiply destination',
			}),
		).toBeVisible();
		expect(clicks).toEqual([
			{
				component: 'puzzles-more-from:puzzle-page',
				names: ['puzzles | group-0 | card-@3 | card-wordiply-daily'],
			},
		]);
		await destinationPage.close();
	});

	test('preserves modified-click navigation without duplicating tracking', async ({
		context,
		page,
	}) => {
		const clicks = recordClicks(page);
		const rail = await loadRail(page, 'puzzle-page');
		await waitForIsland(page, 'RelatedPuzzlesRailEnhanced');
		await context.route(`**${destination}`, async (route) =>
			route.fulfill({
				contentType: 'text/html',
				body: '<h1>Puzzle destination</h1>',
			}),
		);
		const originalUrl = page.url();
		const popup = context.waitForEvent('page');
		const click = nextClick(page);
		await rail
			.locator('a')
			.first()
			.click({ modifiers: ['ControlOrMeta'] });
		const destinationPage = await popup;
		await click;
		await expect(destinationPage).toHaveURL(new RegExp(`${destination}$`));
		expect(page.url()).toBe(originalUrl);
		expect(clicks).toEqual([
			{
				component: 'puzzles-more-from:puzzle-page',
				names: ['puzzles | group-0 | card-@1 | card-quick-daily'],
			},
		]);
		await destinationPage.close();
	});

	test('captures server-rendered card selections before the rail hydrates', async ({
		context,
		page,
	}) => {
		await context.route(
			'**/assets/RelatedPuzzlesRailEnhanced.client.web*.js',
			async (route) => route.abort(),
		);
		const clicks = recordClicks(page);
		const rail = await loadRail(page, 'puzzle-page');
		await rail.scrollIntoViewIfNeeded();
		await expect(
			page.locator('gu-island[name="RelatedPuzzlesRailEnhanced"]'),
		).not.toHaveAttribute('data-island-status', 'hydrated');
		await page.route(`**${destination}`, async (route) =>
			route.fulfill({
				contentType: 'text/html',
				body: '<h1>Puzzle destination</h1>',
			}),
		);
		const click = nextClick(page);
		await rail.locator('a').first().click();
		await click;
		await expect(
			page.getByRole('heading', { name: 'Puzzle destination' }),
		).toBeVisible();
		expect(clicks).toEqual([
			{
				component: 'puzzles-more-from:puzzle-page',
				names: ['puzzles | group-0 | card-@1 | card-quick-daily'],
			},
		]);
	});
});
