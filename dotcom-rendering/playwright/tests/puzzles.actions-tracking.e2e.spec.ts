import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { Standard } from '../../fixtures/generated/fe-articles/Standard';
import { quickCrossword } from '../../fixtures/manual/editionsCrossword';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
import type { PuzzleActionSource } from '../../src/lib/puzzleActionTracking';
import { disableCMP } from '../lib/cmp';
import { waitForIsland } from '../lib/islands';
import { loadPage } from '../lib/load-page';
import {
	ADDITIONAL_REQUEST_PATH,
	IMPRESSION_REQUEST_PATH,
	interceptOphanRequest,
} from '../lib/ophan';

const date = '2026-11-09';
const puzzlePath = `puzzles-and-games/logic-puzzles/sudoku-easy/${date}`;
const crosswordPath = 'crosswords/quick/17599';
const pdf = 'https://example.com/crossword.pdf';
const configOverrides = {
	serverSideABTests: { 'puzzles-new-hub-v1': 'variant' },
};

declare global {
	interface Window {
		puzzlePrintCalls: number;
	}
}

const loadActions = async (
	page: Page,
	source: PuzzleActionSource = 'puzzle-page',
) => {
	const impression = interceptOphanRequest({
		page,
		path: IMPRESSION_REQUEST_PATH,
		searchParamMatcher: () => true,
	});
	if (source === 'puzzle-page') {
		const puzzle = createPuzzlePage('sudoku-easy');
		await loadPage({
			page,
			path: `/PuzzlePage/https://www.theguardian.com/${puzzlePath}`,
			overrides: {
				configOverrides,
				feFixture: {
					...puzzle,
					id: puzzlePath,
					isAdFreeUser: true,
					instance: {
						...puzzle.instance,
						puzzleDate: date,
						moreFromPuzzlesAndGames: [],
					},
				},
			},
		});
	} else {
		await loadPage({
			page,
			path: `/Article/https://www.theguardian.com/${crosswordPath}`,
			overrides: {
				configOverrides,
				feFixture: {
					...Standard,
					format: {
						design: 'CrosswordDesign',
						theme: 'LifestylePillar',
						display: 'StandardDisplay',
					},
					crossword: { ...quickCrossword, pdf },
					pageId: crosswordPath,
					isAdFreeUser: true,
					isCommentable: false,
				},
			},
		});
	}
	await impression;
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
		if (component?.startsWith('puzzles-actions:')) {
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
			params.get('clickComponent')?.startsWith('puzzles-actions:') ===
			true,
	});
test.describe('Puzzle PDF, print and share tracking', () => {
	test.beforeEach(async ({ context, page }) => {
		await disableCMP(context);
		await page.addInitScript(() => {
			window.puzzlePrintCalls = 0;
			window.print = () => {
				window.puzzlePrintCalls += 1;
			};
			Object.defineProperty(navigator, 'canShare', {
				configurable: true,
				value: () => false,
			});
			Object.defineProperty(navigator, 'clipboard', {
				configurable: true,
				value: { writeText: () => Promise.resolve() },
			});
		});
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

	test('tracks a browser print request without claiming completion', async ({
		page,
	}) => {
		const clicks = recordClicks(page);
		await loadActions(page);
		await waitForIsland(page, 'PrintButton');
		const click = nextClick(page);
		await page.getByRole('button', { name: 'Print version' }).click();
		await click;
		expect(await page.evaluate(() => window.puzzlePrintCalls)).toBe(1);
		expect(clicks).toEqual([
			{
				component: 'puzzles-actions:puzzle-page',
				names: ['puzzles | print-request'],
			},
		]);
	});

	test('tracks crossword PDF opening and keeps its exact destination and new-tab behaviour', async ({
		context,
		page,
	}) => {
		const clicks = recordClicks(page);
		await loadActions(page, 'crossword-page');
		await context.route(pdf, async (route) =>
			route.fulfill({
				contentType: 'text/html',
				body: '<h1>PDF destination</h1>',
			}),
		);
		const link = page.getByRole('link', { name: 'Print version' });
		const popup = context.waitForEvent('page');
		const click = nextClick(page);
		await link.click();
		const pdfPage = await popup;
		await click;
		await expect(
			pdfPage.getByRole('heading', { name: 'PDF destination' }),
		).toBeVisible();
		expect(clicks).toEqual([
			{
				component: 'puzzles-actions:crossword-page',
				names: ['puzzles | pdf-open'],
			},
		]);
		await pdfPage.close();
	});

	test('captures the copy-icon click before copied feedback replaces it', async ({
		page,
	}) => {
		const clicks = recordClicks(page);
		await loadActions(page);
		await waitForIsland(page, 'ShareButton');
		const click = nextClick(page);
		await page.locator('[data-gu-name="share-button"] svg').click();
		await click;
		await expect(
			page.getByRole('button', { name: 'Link copied', exact: true }),
		).toBeVisible();
		expect(clicks).toEqual([
			{
				component: 'puzzles-actions:puzzle-page',
				names: ['puzzles | share-attempt | copy | ArticleMeta'],
			},
		]);
	});
});
