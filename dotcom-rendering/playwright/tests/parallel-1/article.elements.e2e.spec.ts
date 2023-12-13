import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { waitForIsland } from 'playwright/lib/islands';
import { expectToBeVisible } from 'playwright/lib/locators';
import { cmpAcceptAll } from '../../lib/cmp';
import { loadPage } from '../../lib/load-page';

const getIframeBody = async (page: Page, iframeSelector: string) => {
	const iframeLocator = page.frameLocator(iframeSelector).locator('body');
	await iframeLocator.scrollIntoViewIfNeeded();
	await expect(
		page.frameLocator(iframeSelector).locator('body'),
	).toBeAttached();
	return iframeLocator;
};

test.describe('Elements', () => {
	test.describe('AMP', () => {
		test('should render the corona interactive atom embed', async ({
			page,
		}) => {
			await loadPage(
				page,
				'/AMPArticle/https://www.theguardian.com/world/2020/apr/24/new-mother-dies-of-coronavirus-six-days-after-giving-birth',
			);
			await cmpAcceptAll(
				page,
				'amp-consent > iframe[src*="sourcepoint"]',
			);

			await expect(
				await getIframeBody(
					page,
					'amp-iframe[data-testid="atom-embed-url"] > iframe',
				),
			).toContainText('Daily cases');
		});

		test('should render the counted interactive embed', async ({
			page,
		}) => {
			await loadPage(
				page,
				'/AMPArticle/https://www.theguardian.com/us-news/2015/nov/05/police-tasers-deaths-the-counted',
			);
			await cmpAcceptAll(
				page,
				'amp-consent > iframe[src*="sourcepoint"]',
			);

			const ampIframeContainerSelector =
				'amp-iframe[src="https://interactive.guim.co.uk/embed/2015/10/2015-10-counted-table/"]';

			await page
				.locator(ampIframeContainerSelector)
				.scrollIntoViewIfNeeded();

			const ampIframeSelector = `${ampIframeContainerSelector} > iframe`;

			await expect(
				await getIframeBody(page, ampIframeSelector),
			).toContainText('Deaths after Taser use: the findings');
		});
	});

	test.describe('WEB', function () {
		test('should render the click to view overlay revealing the embed when clicked', async ({
			page,
		}) => {
			await loadPage(
				page,
				'/Article/https://www.theguardian.com/sport/blog/2015/dec/02/the-joy-of-six-sports-radio-documentaries',
			);
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
			await loadPage(
				page,
				'/Article/https://www.theguardian.com/sport/2019/nov/15/forget-a-super-bowl-slump-the-la-rams-have-a-jared-goff-problem',
			);
			await cmpAcceptAll(page);

			await waitForIsland(page, 'InteractiveBlockComponent');
			await expect(
				await getIframeBody(
					page,
					'[data-testid="interactive-element-LA%20Rams%20dead%20cap%20numbers"] > iframe',
				),
			).toContainText('The Rams’ dead cap numbers for 2020');
		});

		test('should render the interactive 2', async ({ page }) => {
			await loadPage(
				page,
				'/Article/https://www.theguardian.com/us-news/2017/jan/17/donald-trump-america-great-again-northampton-county-pennsylvania',
			);
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
			await loadPage(
				page,
				'/Article/https://www.theguardian.com/music/2020/jan/31/elon-musk-edm-artist-first-track-dont-doubt-ur-vibe',
			);
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
			await loadPage(
				page,
				'/Article/https://www.theguardian.com/football/2020/jun/10/premier-league-restart-preview-no-5-burnley',
			);
			await cmpAcceptAll(page);

			const embedSelector = 'div[data-testid="football-table-embed"]';
			const embedLocator = page.locator(embedSelector);
			await embedLocator.scrollIntoViewIfNeeded();
			await expectToBeVisible(page, embedSelector);
			await expect(embedLocator).toContainText('Liverpool');
		});

		// Skipping for now as the change to the affiliate disclaimer block has been reverted
		// https://github.com/guardian/frontend/pull/26749
		test.skip('should render the affiliate disclaimer block', async ({
			page,
		}) => {
			await loadPage(
				page,
				'/Article/https://www.theguardian.com/music/2020/jun/15/pet-shop-boys-where-to-start-in-their-back-catalogue',
			);
			await cmpAcceptAll(page);

			const selector = '[data-testid="affiliate-disclaimer"]';
			const locator = page.locator(selector);
			await locator.scrollIntoViewIfNeeded();
			await expectToBeVisible(page, selector);
			await expect(locator).toContainText('affiliate link');
		});
	});
});
