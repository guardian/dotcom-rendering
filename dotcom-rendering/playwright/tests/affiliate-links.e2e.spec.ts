import { expect, test } from '@playwright/test';
import { cmpAcceptAll } from '../lib/cmp';
import { loadPage } from '../lib/load-page';
import { expectToBeVisible } from '../lib/locators';

test.describe('Affiliate links', () => {
	test.describe('WEB', function () {
		test('should render the affiliate disclaimer on an article containing affiliate links', async ({
			page,
		}) => {
			await loadPage({
				page,
				path: '/Article/https://www.theguardian.com/thefilter/2025/jun/17/best-fans-uk',
			});
			await cmpAcceptAll(page);

			const selector = '[data-testid="affiliate-disclaimer"]';
			const disclaimerLocator = page.locator(selector);
			await disclaimerLocator.scrollIntoViewIfNeeded();
			await expectToBeVisible(page, selector);
			await expect(disclaimerLocator).toContainText('affiliate link');
		});
	});

	test.describe('WEB', function () {
		test('skimlinks should have the attribute rel="sponsored"', async ({
			page,
		}) => {
			await loadPage({
				page,
				path: '/Article/https://www.theguardian.com/thefilter/2025/jun/17/best-fans-uk',
			});
			await cmpAcceptAll(page);

			const selector = '[href*="go.skimresources"]';
			const skimlinkLocator = page.locator(selector).first();
			const skimlinkRelAttribute =
				await skimlinkLocator.getAttribute('rel');
			expect(skimlinkRelAttribute).toBe('sponsored');
		});
	});
});
