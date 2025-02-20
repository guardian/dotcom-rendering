import { expect, test } from '@playwright/test';
import { match1, match2 } from '../fixtures/cricket-match';
import { tweetBlock } from '../fixtures/tweet-block';
import { disableCMP } from '../lib/cmp';
import { getIframeBody } from '../lib/iframe';
import { waitForIsland } from '../lib/islands';
import { loadPage } from '../lib/load-page';
import {
	expectToBeVisible,
	expectToExist,
	expectToNotBeVisible,
	expectToNotExist,
} from '../lib/locators';
import { stubResponse } from '../lib/network';

const blogUrl =
	'https://www.theguardian.com/australia-news/live/2022/feb/22/australia-news-live-updates-scott-morrison-nsw-trains-coronavirus-covid-omicron-weather';

test.describe('Liveblogs', () => {
	test.beforeEach(async ({ context }) => {
		await disableCMP(context);
	});

	test('should show the toast, incrementing the count as new updates are sent', async ({
		page,
	}) => {
		await loadPage({
			page,
			path: `/Article/${blogUrl}`,
			queryParams: { live: 'true' },
		});
		await waitForIsland(page, 'Liveness', { waitFor: 'attached' });

		await expectToNotExist(page, `[data-testid="toast"]`);

		await page.evaluate(() => {
			window.mockLiveUpdate({
				numNewBlocks: 1,
				html: '<p>New block 1</p>',
				mostRecentBlockId: 'abc',
			});
		});

		await expectToExist(page, `[data-testid="toast"]`);

		// this locator resolves to two elements, where one is hidden
		// chaining the visible=true locator will only return the visible element
		// https://playwright.dev/docs/locators#matching-only-visible-elements
		await expect(
			page.getByText('1 new update').locator('visible=true'),
		).toBeVisible();

		await page.evaluate(() => {
			window.mockLiveUpdate({
				numNewBlocks: 1,
				html: '<p>New block 2</p>',
				mostRecentBlockId: 'abc',
			});
		});

		// this locator resolves to two elements, where one is hidden
		// chaining the visible=true locator will only return the visible element
		// https://playwright.dev/docs/locators#matching-only-visible-elements
		await expect(
			page.getByText('2 new updates').locator('visible=true'),
		).toBeVisible();
	});

	test('should insert the html from the update call', async ({ page }) => {
		await loadPage({
			page,
			path: `/Article/${blogUrl}`,
			queryParams: { live: 'true' },
		});
		await waitForIsland(page, 'Liveness', { waitFor: 'attached' });

		await page.evaluate(() => {
			window.mockLiveUpdate({
				numNewBlocks: 1,
				html: '<p>New block 1</p>',
				mostRecentBlockId: 'abc',
			});
		});

		await expect(
			page.getByText('New block').locator('visible=true'),
		).toBeVisible();
	});

	test('should scroll the page to the top and reveal content when the toast is clicked', async ({
		page,
	}) => {
		await loadPage({
			page,
			path: `/Article/${blogUrl}`,
			queryParams: { live: 'true' },
		});

		await waitForIsland(page, 'Liveness', { waitFor: 'attached' });

		await expectToNotExist(page, `[data-testid="toast"]`);

		await page.evaluate(() => {
			window.mockLiveUpdate({
				numNewBlocks: 1,
				html: '<p>New block 1</p>',
				mostRecentBlockId: 'abc',
			});
		});

		await expectToExist(page, `[data-testid="toast"]`);

		const updateLocator = page
			.getByText('1 new update')
			.locator('visible=true');

		await expect(updateLocator).toBeVisible();
		await updateLocator.click();

		await expectToNotExist(page, `[data-testid="toast"]`);
	});

	test('should enhance tweets after they have been inserted', async ({
		page,
	}) => {
		await loadPage({
			page,
			path: `/Article/${blogUrl}`,
			queryParams: { live: 'true' },
		});
		await waitForIsland(page, 'Liveness', { waitFor: 'attached' });

		await page.evaluate((block) => {
			window.mockLiveUpdate(block);
		}, tweetBlock);

		const updateLocator = page
			.getByText('1 new update')
			.locator('visible=true');

		await expect(updateLocator).toBeVisible();
		await updateLocator.click();

		await waitForIsland(page, 'TweetBlockComponent', {
			waitFor: 'attached',
		});

		const tweetIframeSelector =
			'#tweet-container-60f4fe21-3568-4345-90f0-6838a247ec98 iframe';

		await page.locator(tweetIframeSelector).scrollIntoViewIfNeeded();

		await expectToBeVisible(page, tweetIframeSelector);

		const twitterIframe = getIframeBody(page, tweetIframeSelector);

		await expect(await twitterIframe).toContainText(
			'Don’t believe the spin. Once you break through typical Washington math',
			{ timeout: 20000 },
		);
	});

	test('should use the right block id when polling from the second page', async ({
		page,
	}) => {
		const lastUpdateRequestPromise = page.waitForRequest((request) => {
			const matchUrl = request
				.url()
				.match(/.*nextgen\.guardianapps\.co\.uk.*lastUpdate=.*/);
			if (!matchUrl) {
				return false;
			}
			const searchParams = new URLSearchParams(
				request.url().split('?')[1],
			);
			const matchLastUpdate =
				searchParams.get('lastUpdate') ===
				'block-62148e2d8f081f9e465d1bb7';
			return matchLastUpdate;
		});

		await loadPage({
			page,
			path: `/Article/${blogUrl}`,
			queryParams: {
				live: 'true',
				page: 'with:block-6214732b8f08f86d89ef68d6',
				filterKeyEvents: 'false',
			},
			fragment: '#liveblog-navigation',
		});

		await lastUpdateRequestPromise;
	});

	test('should handle when the toast is clicked from the second page', async ({
		page,
	}) => {
		await loadPage({
			page,
			path: `/Article/${blogUrl}`,
			queryParams: {
				live: 'true',
				page: 'with:block-6214732b8f08f86d89ef68d6',
				filterKeyEvents: 'false',
			},
			fragment: '#liveblog-navigation',
		});

		await waitForIsland(page, 'Liveness', { waitFor: 'attached' });

		await page.evaluate(() =>
			window.scrollTo(0, document.documentElement.scrollHeight),
		);

		await expectToNotExist(page, `[data-testid="toast"]`);

		await page.evaluate(() => {
			window.mockLiveUpdate({
				numNewBlocks: 1,
				html: '<p>New block 1</p>',
				mostRecentBlockId: 'abc',
			});
		});

		await expectToExist(page, `[data-testid="toast"]`);

		const updateLocator = page
			.getByText('1 new update')
			.locator('visible=true');
		await expect(updateLocator).toBeVisible();

		await updateLocator.click();

		expect(
			await page.evaluate(() => window.document.location.hash),
		).toEqual('#maincontent');

		expect(
			await page.evaluate(() => window.document.location.pathname),
		).toEqual(
			'/australia-news/live/2022/feb/22/australia-news-live-updates-scott-morrison-nsw-trains-coronavirus-covid-omicron-weather',
		);

		expect(
			await page.evaluate(() => window.document.location.search),
		).toEqual('');
	});

	test('should initially hide new blocks, only revealing them when the top of blog is in view', async ({
		page,
	}) => {
		await loadPage({
			page,
			path: `/Article/${blogUrl}`,
			queryParams: {
				live: 'true',
			},
		});
		await waitForIsland(page, 'Liveness', { waitFor: 'attached' });

		await page.evaluate(() =>
			window.scrollTo(0, document.documentElement.scrollHeight),
		);

		await page.evaluate((block) => {
			window.mockLiveUpdate(block);
		}, tweetBlock);

		const tweetIframeSelector =
			'#tweet-container-60f4fe21-3568-4345-90f0-6838a247ec98 iframe';

		await expectToNotBeVisible(page, tweetIframeSelector);

		await page
			.locator('div[data-gu-name="media"]')
			.scrollIntoViewIfNeeded();

		await waitForIsland(page, 'TweetBlockComponent', {
			waitFor: 'attached',
		});

		await page.locator(tweetIframeSelector).scrollIntoViewIfNeeded();

		await expectToBeVisible(page, tweetIframeSelector);

		const twitterIframe = getIframeBody(page, tweetIframeSelector);

		await expect(await twitterIframe).toContainText(
			'Don’t believe the spin. Once you break through typical Washington math',
			{ timeout: 20000 },
		);
	});

	test('should render live score updates to a cricketblog', async ({
		page,
	}) => {
		const update1ResponsePromise = stubResponse(
			page,
			/england-cricket-team\.json/,
			{
				status: 200,
				json: {
					scorecardUrl: '/test',
					match: match1,
				},
			},
		);

		await loadPage({
			page,
			path: `/Article/https://theguardian.com/sport/live/2022/mar/27/west-indies-v-england-third-test-day-four-live`,
			queryParams: {
				live: 'true',
			},
		});
		await waitForIsland(page, 'Liveness', { waitFor: 'attached' });

		await update1ResponsePromise;

		await expect(page.getByText('297 & 28 - 0 (4.5 overs)')).toBeVisible();

		await expect(
			page.getByText('204 & 120 all out (64.2 overs)'),
		).toBeVisible();

		await stubResponse(page, /england-cricket-team\.json/, {
			status: 200,
			json: {
				scorecardUrl: '/test',
				match: match2,
			},
		});

		// The cricket data is updated every 14 seconds, so we need a longer timeout here
		await expect(page.getByText('297 & 104 - 3 (25 overs)')).toBeVisible({
			timeout: 30000,
		});
	});
});
