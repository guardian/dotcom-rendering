import { expect, test } from '@playwright/test';
import {
	createPuzzlesPage,
	featuredTriviaPuzzlesContainer,
	triviaPuzzlesContainer,
} from '../../fixtures/manual/puzzlesPage';
import { disableCMP } from '../lib/cmp';
import { loadPage } from '../lib/load-page';

const path = '/PuzzlesPage/https://www.theguardian.com/puzzles-and-games';

for (const isFeatured of [false, true]) {
	for (const width of [375, 1280]) {
		test(`MovieGrid ${isFeatured ? 'featured' : 'standard'} artwork at ${width}px`, async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await page.setViewportSize({ width, height: 900 });
			const title = isFeatured ? 'Featured today' : 'Trivia & quizzes';
			await loadPage({
				page,
				path,
				waitUntil: 'domcontentloaded',
				overrides: {
					feFixture: createPuzzlesPage({
						isAdFreeUser: true,
						layout: {
							containers: [
								isFeatured
									? featuredTriviaPuzzlesContainer
									: triviaPuzzlesContainer,
							],
						},
					}),
					configOverrides: {
						serverSideABTests: {
							'puzzles-new-hub-v1': 'variant',
							'puzzles-new-hub-v2': 'variant',
						},
					},
				},
			});

			const section = page.getByRole('region', {
				name: title,
				exact: true,
			});
			await section.scrollIntoViewIfNeeded();
			const cards = [];
			for (const [slug, name, naturalWidth] of [
				['film-reveal', 'Film reveal', isFeatured ? 690 : 440],
				['on-the-ball', 'On the ball', isFeatured ? 345 : 220],
			] as const) {
				const card = section.getByRole('link', {
					name: `${name} Daily`,
					exact: true,
				});
				await expect(card).toBeVisible();
				await expect(card).toHaveAttribute(
					'href',
					`/puzzles-and-games/trivia-and-quizzes/${slug}/2026-10-28`,
				);
				const image = card.locator('img');
				await expect(image).toHaveAttribute(
					'src',
					`https://i.guim.co.uk/img/uploads/2026/10/28/${slug}-${isFeatured ? 'featured' : 'standard'}.png?width=440&dpr=2&s=none`,
				);
				await expect(image).toHaveJSProperty(
					'naturalWidth',
					naturalWidth,
				);
				await expect(image).toHaveCSS('object-fit', 'contain');
				await expect(image).toHaveAttribute(
					'alt',
					`${name} illustration`,
				);
				await expect(image).toHaveAttribute('aria-hidden', 'true');
				cards.push(await card.boundingBox());
			}
			const [first, second] = cards;
			expect(first).not.toBeNull();
			expect(second).not.toBeNull();
			if (width === 375) {
				expect(second!.y).toBeGreaterThan(first!.y);
			} else {
				expect(second!.y).toBe(first!.y);
				expect(second!.x).toBeGreaterThan(first!.x);
			}
			expect(
				await page.evaluate(
					() =>
						document.documentElement.scrollWidth <=
						window.innerWidth,
				),
			).toBe(true);
			await expect(section.getByText('Played')).toHaveCount(0);
		});
	}
}
