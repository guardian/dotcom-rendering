import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { ORIGIN } from '../../playwright.config';
import { resolvePuzzleIframeUrl } from '../../src/lib/puzzleIframeUrl';
import { puzzleConfigs } from '../../src/model/puzzles/puzzleConfigs';

test.describe('MovieGrid account identity', () => {
	test.skip(
		!process.env.PUZZLES_MOVIEGRID_IDENTITY_LIVE,
		'Creates isolated test identities in the real provider games.',
	);

	for (const [slug, providerUrl] of [
		['film-reveal', 'https://moviegrid.io/guardian/archive?id=394'],
		['on-the-ball', 'https://sportsreveal.io/guardian/archive?id=414'],
	] as const) {
		test(`keeps guest and account game state separate for ${slug}`, async ({
			page,
		}) => {
			const accounts = [
				`guardian-test-a-${randomUUID()}`,
				`guardian-test-b-${randomUUID()}`,
			];
			await page.setViewportSize({ width: 1280, height: 1200 });
			const src = (userId: string | null) =>
				resolvePuzzleIframeUrl(
					puzzleConfigs[slug]!,
					{ userId, darkMode: false },
					providerUrl,
				);
			await page.goto(ORIGIN, { waitUntil: 'domcontentloaded' });
			await page.setContent(
				`<iframe title="Test puzzle" width="1100" height="1000" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" src="${src(null)}"></iframe>`,
			);
			const iframe = page.locator('iframe');
			const game = page.frameLocator('iframe');
			const copyResults = game.getByText('Copy results', { exact: true });
			const start = game.getByText('Start', { exact: true });
			const giveUp = async () => {
				await game
					.getByText('Give up', { exact: true })
					.waitFor({ state: 'visible' });
				if (await start.isVisible()) await start.click();
				try {
					await game
						.getByText('Give up', { exact: true })
						.click({ timeout: 2000 });
				} catch (error) {
					if (!(await start.isVisible())) throw error;
					await start.click();
					await game.getByText('Give up', { exact: true }).click();
				}
				await game.getByText('Yes', { exact: true }).click();
				await expect(copyResults).toBeVisible();
			};
			if (slug === 'on-the-ball') {
				await start.waitFor({ state: 'visible' });
			}
			await giveUp();
			const guestToken = await game
				.locator('html')
				.evaluate(() => localStorage.getItem('token'));
			expect(guestToken).toMatch(/^rand-/);
			const loadIdentity = async (userId: string | null) => {
				await iframe.evaluate((element, url) => {
					element.setAttribute('src', url);
				}, src(userId));
				await expect
					.poll(() =>
						game
							.locator('html')
							.evaluate(() =>
								new URL(location.href).searchParams.get('uid'),
							),
					)
					.toBe(userId ?? guestToken);
			};

			await loadIdentity(accounts[0]!);
			await game
				.getByText('Give up', { exact: true })
				.waitFor({ state: 'visible' });
			await expect(copyResults).toHaveCount(0);
			expect(
				await game
					.locator('html')
					.evaluate(() => localStorage.getItem('token')),
			).toBe(guestToken);
			await giveUp();

			await loadIdentity(accounts[1]!);
			await game
				.getByText('Give up', { exact: true })
				.waitFor({ state: 'visible' });
			await expect(copyResults).toHaveCount(0);
			await loadIdentity(accounts[0]!);
			await expect(copyResults).toBeVisible();
			await loadIdentity(null);
			await expect(copyResults).toBeVisible();
			expect(
				await game
					.locator('html')
					.evaluate(() => localStorage.getItem('token')),
			).toBe(guestToken);
		});
	}
});
