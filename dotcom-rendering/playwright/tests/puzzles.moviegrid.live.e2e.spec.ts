import { expect, test } from '@playwright/test';
import type { PuzzlesArchive } from '../../src/types/puzzlesPage';
import { disableCMP } from '../lib/cmp';

const frontendOrigin = process.env.PUZZLES_FRONTEND_ORIGIN;

test.describe('Live MovieGrid frontend integration', () => {
	test.skip(
		!frontendOrigin,
		'Requires frontend, DCR and an authorized Puzzles API relay.',
	);

	for (const [
		slug,
		title,
		providerOrigin,
		gameHeading,
		naturalWidth,
		puzzleType,
		desktopHeight,
	] of [
		[
			'film-reveal',
			'Film reveal',
			'https://moviegrid.io',
			'Guess the films',
			440,
			'FILMREVEAL',
			700,
		],
		[
			'on-the-ball',
			'On the ball',
			'https://sportsreveal.io',
			'Guess the Premier League player',
			220,
			'ONTHEBALL',
			640,
		],
	] as const) {
		test(`opens ${title} from the hub and loads the real game`, async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await page.setViewportSize({ width: 1280, height: 900 });
			await page.goto(`${frontendOrigin}/puzzles-and-games`, {
				waitUntil: 'domcontentloaded',
			});
			const card = page
				.getByRole('region', { name: 'Trivia & quizzes', exact: true })
				.locator('a')
				.filter({
					has: page.getByRole('heading', {
						name: title,
						exact: true,
					}),
				});
			await expect(card.locator('img')).toHaveJSProperty(
				'naturalWidth',
				naturalWidth,
			);
			await card.click({ noWaitAfter: true });
			await expect(page).toHaveURL(
				new RegExp(`/trivia-and-quizzes/${slug}/\\d{4}-\\d{2}-\\d{2}$`),
			);
			await expect(
				page.getByRole('heading', {
					level: 1,
					name: title,
					exact: true,
				}),
			).toBeVisible();
			const selector = `iframe[title="${title}"]`;
			const iframe = page.locator(selector);
			await expect(iframe).toHaveCSS('min-height', `${desktopHeight}px`);
			await expect(iframe).toHaveAttribute(
				'src',
				new RegExp(`^${providerOrigin}/guardian/archive\\?`),
			);
			const url = new URL((await iframe.getAttribute('src'))!);
			expect(url.origin).toBe(providerOrigin);
			expect(url.searchParams.get('id')).toMatch(/^\d+$/);
			expect(url.searchParams.get('darkMode')).toBe('0');
			await expect(
				page
					.frameLocator(selector)
					.getByText(gameHeading, { exact: true }),
			).toBeVisible({ timeout: 15000 });
		});

		test(`opens the ${title} archive and its calendar data`, async ({
			context,
			page,
			request,
		}) => {
			await disableCMP(context);
			const archivePath = `/puzzles-and-games/trivia-and-quizzes/archive?puzzle=${slug}`;
			const redirect = await request.get(
				`${frontendOrigin}/puzzles-and-games/trivia-and-quizzes/${slug}`,
				{ maxRedirects: 0 },
			);
			expect(redirect.status()).toBe(302);
			expect(redirect.headers().location).toBe(archivePath);

			const response = await page.goto(
				`${frontendOrigin}${archivePath}`,
				{ waitUntil: 'domcontentloaded' },
			);
			expect(response?.status()).toBe(200);
			await expect(
				page.getByRole('heading', {
					level: 1,
					name: 'Trivia & quizzes',
					exact: true,
				}),
			).toBeVisible();
			const puzzleLink = page
				.locator(
					`a[href^="/puzzles-and-games/trivia-and-quizzes/${slug}/"]`,
				)
				.first();
			await expect(puzzleLink).toBeVisible();
			const date = /\/(\d{4})-(\d{2})-\d{2}$/.exec(
				(await puzzleLink.getAttribute('href'))!,
			);
			expect(date).not.toBeNull();
			const calendarResponse = await request.get(
				`${frontendOrigin}/puzzles-and-games/trivia-and-quizzes/archive-data/${slug}/${date![1]}/${Number(date![2])}`,
			);
			expect(calendarResponse.status()).toBe(200);
			const archive = (await calendarResponse.json()) as PuzzlesArchive;
			expect(archive.category).toBe('trivia-and-quizzes');
			expect(archive.description).toBe(
				"Play the full archive of trivia and quizzes from the Guardian. Track your progress of what you've played and started.",
			);
			expect(archive.selectedPuzzle.puzzleType).toBe(puzzleType);
			expect(archive.hasError).toBe(false);
			expect(archive.items.length).toBeGreaterThan(0);
		});
	}
});
