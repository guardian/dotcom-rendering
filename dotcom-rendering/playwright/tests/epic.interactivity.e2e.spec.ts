import { test } from '@playwright/test';
import { disableCMP } from 'playwright/lib/cmp';
import { waitForIsland } from 'playwright/lib/islands';
import { loadPage } from 'playwright/lib/load-page';
import { expectToBeVisible } from '../lib/locators';

const blogUrl =
	'https://www.theguardian.com/australia-news/live/2022/feb/22/australia-news-live-updates-scott-morrison-nsw-trains-coronavirus-covid-omicron-weather';

test.describe('Epics', () => {
	test('should render the liveblog epic in the list of blocks', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPage(
			page,
			`/Article/${blogUrl}?live=true&force-liveblog-epic=true`,
		);

		// Wait for hydration of the Epic
		// The LiveBlogEpic island does not become visible so we wait for it to be attached
		await waitForIsland(page, 'LiveBlogEpic', {
			waitFor: 'attached',
		});

		// Expect the Epic inserted by the island to be visible
		await page
			.locator('[data-testid=contributions-liveblog-epic]')
			.scrollIntoViewIfNeeded();
		await expectToBeVisible(
			page,
			'[data-testid=contributions-liveblog-epic]',
		);
	});
});
