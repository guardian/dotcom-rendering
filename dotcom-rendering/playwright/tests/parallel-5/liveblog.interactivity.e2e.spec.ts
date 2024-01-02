import { expect, test } from '@playwright/test';
import { tweetBlock } from 'playwright/fixtures/manual/tweet-block';
import { getIframeBody } from 'playwright/lib/iframe';
import { waitForIsland } from 'playwright/lib/islands';
import { loadPage } from 'playwright/lib/load-page';
import {
	expectToExist,
	expectToNotBeVisible,
	expectToNotExist,
} from 'playwright/lib/locators';
import { stubResponse } from 'playwright/lib/network';
import { match1, match2 } from '../../fixtures/manual/cricket-match';
import { disableCMP } from '../../lib/cmp';

const blogUrl =
	'https://www.theguardian.com/australia-news/live/2022/feb/22/australia-news-live-updates-scott-morrison-nsw-trains-coronavirus-covid-omicron-weather';

test.describe('Liveblogs', () => {
	test.beforeEach(async ({ context }) => {
		await disableCMP(context);
	});

	test('should show the toast, incrementing the count as new updates are sent', async ({
		page,
	}) => {
		await loadPage(page, `/Article/${blogUrl}?live=true`);
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
		await loadPage(page, `/Article/${blogUrl}?live=true`);
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
		await loadPage(page, `/Article/${blogUrl}?live=true`);
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
		await loadPage(page, `/Article/${blogUrl}?live=true`);
		await waitForIsland(page, 'Liveness', { waitFor: 'attached' });

		await page.evaluate((tweet) => {
			window.mockLiveUpdate({
				numNewBlocks: 1,
				html: tweet,
				mostRecentBlockId: 'abc',
			});
		}, tweetBlock);

		const updateLocator = page
			.getByText('1 new update')
			.locator('visible=true');

		await expect(updateLocator).toBeVisible();
		await updateLocator.click();

		await waitForIsland(page, 'TweetBlockComponent', {
			waitFor: 'attached',
		});

		// have to use an attribute selector here as a numeric id is not a valid selector
		const tweetContainerSelector =
			'[id="46d194c9-ea50-4cd5-af8b-a51e8b15c65e"]';

		await page
			.locator(tweetContainerSelector)
			.waitFor({ state: 'visible', timeout: 20000 });

		await page.locator(tweetContainerSelector).scrollIntoViewIfNeeded();

		const twitterIframe = getIframeBody(
			page,
			`${tweetContainerSelector} iframe`,
		);

		await expect(await twitterIframe).toContainText(
			'They will prepare the extraordinary European Council meeting tonight',
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

		await loadPage(
			page,
			`/Article/${blogUrl}?live=true&page=with:block-6214732b8f08f86d89ef68d6&filterKeyEvents=false#liveblog-navigation`,
		);

		await lastUpdateRequestPromise;
	});

	test('should handle when the toast is clicked from the second page', async ({
		page,
	}) => {
		await loadPage(
			page,
			`/Article/${blogUrl}?live=true&page=with:block-6214732b8f08f86d89ef68d6&filterKeyEvents=false#liveblog-navigation`,
		);
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
		await loadPage(page, `/Article/${blogUrl}?live=true`);
		await waitForIsland(page, 'Liveness', { waitFor: 'attached' });

		await page.evaluate(() =>
			window.scrollTo(0, document.documentElement.scrollHeight),
		);

		await page.evaluate((tweet) => {
			window.mockLiveUpdate({
				numNewBlocks: 1,
				html: tweet,
				mostRecentBlockId: 'abc',
			});
		}, tweetBlock);

		await waitForIsland(page, 'TweetBlockComponent', {
			waitFor: 'attached',
		});

		// have to use an attribute selector here as a numeric id is not a valid selector
		const tweetContainerSelector =
			'[id="46d194c9-ea50-4cd5-af8b-a51e8b15c65e"]';

		await expectToNotBeVisible(page, tweetContainerSelector);

		await page
			.locator('div[data-gu-name="media"]')
			.scrollIntoViewIfNeeded();

		await expectToExist(page, tweetContainerSelector);
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

		await loadPage(
			page,
			`/Article/https://theguardian.com/sport/live/2022/mar/27/west-indies-v-england-third-test-day-four-live?live`,
		);
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
