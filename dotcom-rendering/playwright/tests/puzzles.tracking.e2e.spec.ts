import { expect, test } from '@playwright/test';
import { createPuzzlesPage } from '../../fixtures/manual/puzzlesPage';
import type { PuzzleItem } from '../../src/types/puzzlesPage';
import { disableCMP } from '../lib/cmp';
import { waitForIsland } from '../lib/islands';
import { loadPage } from '../lib/load-page';
import {
	ADDITIONAL_REQUEST_PATH,
	IMPRESSION_REQUEST_PATH,
	interceptOphanRequest,
} from '../lib/ophan';

const destination = '/puzzles-and-games/word-games/word-wheel/2026-11-03';
const card: PuzzleItem = {
	id: 'word-wheel-daily',
	title: 'Word wheel',
	type: 'word-wheel',
	set: 'all',
	cardVariant: 'primary',
	cadence: 'Daily',
	index: 99,
	url: destination,
	image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"/%3E',
};
const fixture = createPuzzlesPage({
	layout: {
		containers: [
			{
				id: 'word-games',
				title: 'Word games',
				content: {
					items: [[], [card]],
					nestedContainers: [
						{
							id: 'daily',
							title: 'Daily games',
							content: {
								items: [
									[
										{
											...card,
											id: 'word-wheel-nested',
											cardVariant: 'compact',
										},
									],
								],
								nestedContainers: [],
							},
						},
					],
				},
			},
		],
	},
});
const linkName = 'puzzles | group-0 | card-@1 | card-word-wheel-daily';

test.describe('Puzzles Hub card tracking', () => {
	test.beforeEach(async ({ context, page }) => {
		await disableCMP(context);
		await context.route('**/puzzles-and-games/progress', async (route) => {
			await route.fulfill({ json: { results: [] } });
		});
		await context.route(
			'https://ophan.theguardian.com/**',
			async (route) => {
				await route.fulfill({ status: 204 });
			},
		);
		const impression = interceptOphanRequest({
			page,
			path: IMPRESSION_REQUEST_PATH,
			searchParamMatcher: () => true,
		});
		await loadPage({
			page,
			path: '/PuzzlesPage/https://www.theguardian.com/puzzles-and-games',
			overrides: {
				feFixture: fixture,
				configOverrides: {
					serverSideABTests: { 'puzzles-new-hub-v1': 'variant' },
				},
			},
		});
		await impression;
		await waitForIsland(page, 'PuzzlesDirectoryProgress');
	});

	for (const activation of [
		'title',
		'artwork',
		'background',
		'keyboard',
	] as const) {
		test(`captures one click for the ${activation}`, async ({ page }) => {
			const clicks: URLSearchParams[] = [];
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
				if (params.get('clickComponent') === 'puzzles-hub:word-games') {
					clicks.push(params);
				}
			});
			// Keep this fixture open while testing each activation path; bubbling is unchanged.
			await page.evaluate(() => {
				document.addEventListener('click', (event) => {
					if (
						(event.target as Element).closest('a[data-link-name]')
					) {
						event.preventDefault();
					}
				});
			});
			const link = page.locator(
				'[data-component="puzzles-hub:word-games"] a',
			);
			await expect(link).toHaveAttribute('href', destination);
			const click = interceptOphanRequest({
				page,
				path: ADDITIONAL_REQUEST_PATH,
				searchParamMatcher: (params) =>
					params.get('clickComponent') === 'puzzles-hub:word-games',
			});
			switch (activation) {
				case 'title':
					await link.getByRole('heading').click();
					break;
				case 'artwork':
					await link.locator('img').click();
					break;
				case 'background':
					await link.click({ position: { x: 4, y: 100 } });
					break;
				case 'keyboard':
					await link.focus();
					await link.press('Enter');
					break;
			}
			await click;
			await page.evaluate(
				() =>
					new Promise<void>((resolve) =>
						requestAnimationFrame(() => resolve()),
					),
			);
			expect(clicks).toHaveLength(1);
			expect(JSON.parse(clicks[0]!.get('clickLinkNames')!)).toEqual([
				linkName,
			]);
		});
	}

	test('preserves internal navigation and identifies a nested placement', async ({
		page,
	}) => {
		await page.route(`**${destination}`, async (route) => {
			await route.fulfill({
				contentType: 'text/html',
				body: '<h1>Puzzle destination</h1>',
			});
		});
		const link = page.locator(
			'[data-component="puzzles-hub:word-games:daily"] a',
		);
		await expect(link).toHaveAttribute('href', destination);
		const click = interceptOphanRequest({
			page,
			path: ADDITIONAL_REQUEST_PATH,
			searchParamMatcher: (params) =>
				params.get('clickComponent') === 'puzzles-hub:word-games:daily',
		});
		await link.click();
		const request = await click;
		expect(
			JSON.parse(
				new URL(request.url()).searchParams.get('clickLinkNames')!,
			),
		).toEqual(['puzzles | group-0 | card-@1 | card-word-wheel-nested']);
		await expect(page).toHaveURL(new RegExp(`${destination}$`));
		await expect(
			page.getByRole('heading', { name: 'Puzzle destination' }),
		).toBeVisible();
	});

	test('preserves opening a card in a new tab with a modified click', async ({
		context,
		page,
	}) => {
		await context.route(`**${destination}`, async (route) => {
			await route.fulfill({
				contentType: 'text/html',
				body: '<h1>Puzzle destination</h1>',
			});
		});
		const originalUrl = page.url();
		const click = interceptOphanRequest({
			page,
			path: ADDITIONAL_REQUEST_PATH,
			searchParamMatcher: (params) =>
				params.get('clickComponent') === 'puzzles-hub:word-games',
		});
		const popup = context.waitForEvent('page');
		await page
			.locator('[data-component="puzzles-hub:word-games"] a')
			.click({ modifiers: ['ControlOrMeta'] });
		const destinationPage = await popup;
		await click;
		await expect(destinationPage).toHaveURL(new RegExp(`${destination}$`));
		expect(page.url()).toBe(originalUrl);
		await destinationPage.close();
	});
});
