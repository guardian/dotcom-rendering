import { expect, test } from '@playwright/test';
import { createPuzzlePage } from '../../fixtures/manual/puzzlePage';
import { ORIGIN } from '../../playwright.config';
import { disableCMP } from '../lib/cmp';

const rendererOrigin = process.env.PUZZLES_RENDERER_ORIGIN;
const frontendOrigin = process.env.PUZZLES_FRONTEND_ORIGIN;

test.describe('MovieGrid completion actions', () => {
	test.skip(
		!rendererOrigin,
		'Requires a renderer preview and the real third-party games.',
	);

	for (const [slug, title, gameUrl, shareUrl] of [
		[
			'film-reveal',
			'Film reveal',
			'https://moviegrid.io/guardian/archive?id=394',
			'https://guardian.go.link/1oRLv',
		],
		[
			'on-the-ball',
			'On the ball',
			'https://sportsreveal.io/guardian/archive?id=414',
			'https://guardian.go.link/8FZ5o',
		],
	] as const) {
		test(`copies and shares ${title} results through the parent page`, async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await context.grantPermissions(
				['clipboard-read', 'clipboard-write'],
				{ origin: rendererOrigin! },
			);
			await page.addInitScript(() => {
				if (window !== window.top) return;
				Object.defineProperties(navigator, {
					canShare: { configurable: true, value: () => true },
					share: {
						configurable: true,
						value: async (data: ShareData) => {
							(
								navigator as Navigator & {
									sharedResults?: ShareData;
								}
							).sharedResults = data;
						},
					},
				});
			});
			if (rendererOrigin !== ORIGIN) {
				await page.route(`${ORIGIN}/**`, async (route) => {
					const response = await route.fetch({
						url: route
							.request()
							.url()
							.replace(ORIGIN, rendererOrigin!),
					});
					await route.fulfill({ response });
				});
			}
			const path = frontendOrigin
				? `${rendererOrigin}/PuzzlePage/${frontendOrigin}/puzzles-and-games/trivia-and-quizzes/${slug}/2026-11-03`
				: `${rendererOrigin}/PuzzlePage/moviegrid-actions-${slug}`;
			const fixture = createPuzzlePage(slug, {
				isAdFreeUser: true,
				instance: { title, puzzleDate: '2026-11-03', gameUrl },
			});
			fixture.config.serverSideABTests = {
				'puzzles-new-hub-v1': 'variant',
				'puzzles-new-hub-v2': 'variant',
			};
			if (!frontendOrigin) {
				await page.route(path, (route) =>
					route.continue({
						url: `${rendererOrigin}/PuzzlePage`,
						method: 'POST',
						headers: {
							...route.request().headers(),
							'Content-Type': 'application/json',
						},
						postData: JSON.stringify(fixture),
					}),
				);
			}
			await page.goto(path, { waitUntil: 'domcontentloaded' });
			const iframe = page.locator(`iframe[title="${title}"]`);
			await iframe.scrollIntoViewIfNeeded();
			const game = page.frameLocator(`iframe[title="${title}"]`);
			await game
				.getByText('Give up', { exact: true })
				.waitFor({ state: 'visible', timeout: 15000 });
			const start = game.getByText('Start', { exact: true });
			if (slug === 'on-the-ball') {
				await start.waitFor({ state: 'visible' });
			}
			if (await start.isVisible()) await start.click();
			await game.getByText('Give up', { exact: true }).click();
			await game.getByText('Yes', { exact: true }).click();
			await game.getByText('Copy results', { exact: true }).click();
			await expect
				.poll(() => page.evaluate(() => navigator.clipboard.readText()))
				.toContain(shareUrl);
			await game.getByText('Share', { exact: true }).click();
			await expect
				.poll(() =>
					page.evaluate(
						() =>
							(
								navigator as Navigator & {
									sharedResults?: ShareData;
								}
							).sharedResults,
					),
				)
				.toMatchObject({
					text: expect.stringContaining(title),
					url: shareUrl,
				});
		});
	}
});
