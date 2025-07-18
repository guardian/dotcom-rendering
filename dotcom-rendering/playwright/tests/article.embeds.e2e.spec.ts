import { expect, test } from '@playwright/test';
import { cmpAcceptAll } from '../lib/cmp';
import { getIframeBody, getIframePart } from '../lib/iframe';
import { waitForIsland } from '../lib/islands';
import { loadPage } from '../lib/load-page';
import { expectToBeVisible } from '../lib/locators';

test.describe('Embeds', () => {
	test.describe('WEB', function () {
		test('should render the click to view overlay revealing the embed when clicked', async ({
			page,
		}) => {
			await loadPage({
				page,
				path: '/Article/https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
			});
			await cmpAcceptAll(page);

			await waitForIsland(page, 'EmbedBlockComponent');

			await expect(
				page.locator('gu-island[name="EmbedBlockComponent"]'),
			).toContainText('hosted on wnyc.org');

			await page
				.locator('button[data-testid="click-to-view-button"]')
				.click();

			await expect(
				await getIframeBody(
					page,
					'div[data-testid="embed-block"] > div > iframe',
				),
			).toContainText('Radiolab');
		});

		test('should render the interactive 1', async ({ page }) => {
			await loadPage({
				page,
				path: '/Article/https://www.theguardian.com/sport/2019/nov/15/forget-a-super-bowl-slump-the-la-rams-have-a-jared-goff-problem',
			});
			await cmpAcceptAll(page);

			await waitForIsland(page, 'InteractiveBlockComponent');
			await expect(
				await getIframePart(
					page,
					'[data-testid="interactive-element-LA%20Rams%20dead%20cap%20numbers"] > iframe',
					'.title',
				),
			).toContainText('The Rams’ dead cap numbers for 2020');
		});

		test('should render the interactive 2', async ({ page }) => {
			await loadPage({
				page,
				path: '/Article/https://www.theguardian.com/us-news/2017/jan/17/donald-trump-america-great-again-northampton-county-pennsylvania',
			});
			await cmpAcceptAll(page);

			await waitForIsland(page, 'InteractiveBlockComponent', { nth: 1 });
			await expect(
				await getIframeBody(
					page,
					'[data-testid="interactive-element-pa%20county%20by%20county"] > iframe',
				),
			).toContainText('Switching parties');
		});

		test('should render the soundcloud embed', async ({ page }) => {
			await loadPage({
				page,
				path: '/Article/https://www.theguardian.com/music/2020/jan/31/elon-musk-edm-artist-first-track-dont-doubt-ur-vibe',
			});
			await cmpAcceptAll(page);

			await page
				.locator('div[data-testid="soundcloud-embed"] > iframe')
				.scrollIntoViewIfNeeded();
			await getIframeBody(
				page,
				'div[data-testid="soundcloud-embed"] > iframe',
			);
		});

		test('should render the football embed', async ({ page }) => {
			await loadPage({
				page,
				path: '/Article/https://www.theguardian.com/football/2020/jun/10/premier-league-restart-preview-no-5-burnley',
			});
			await cmpAcceptAll(page);

			const embedSelector = 'div[data-testid="football-table-embed"]';
			const embedLocator = page.locator(embedSelector);
			await embedLocator.scrollIntoViewIfNeeded();
			await expectToBeVisible(page, embedSelector);
			await expect(embedLocator).toContainText('Liverpool');
		});
	});
});
