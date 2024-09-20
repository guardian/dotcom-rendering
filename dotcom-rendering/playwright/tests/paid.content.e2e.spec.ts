import { test } from '@playwright/test';
import { cmpAcceptAll } from '../lib/cmp';
import { waitForIsland } from '../lib/islands';
import { loadPage } from '../lib/load-page';
import { expectToBeVisible } from '../lib/locators';
import { ADDITIONAL_REQUEST_PATH, interceptOphanRequest } from '../lib/ophan';

const paidContentPage =
	'https://www.theguardian.com/chase-the-snow-with-sunweb/2024/sep/16/al-pining-for-the-slopes-why-the-french-alps-is-our-favourite-family-ski-destination';

/**
 * This test relies on labs campaigns, where the content is often taken down one the campaign is complete.
 * If this happens you'll need to find a new labs article with a brand badge, you can often find these here:
 * https://www.theguardian.com/tone/advertisement-features
 * You need to edit the link as well as the expected requestURL to include the new brand in the code below, where it states `expect(requestURL).to.include('el=<logo goes here>');`.
 * You can grab the required info in the dev tools network tab on the page itself.
 */
test.describe('Paid content tests', () => {
	test('should send Ophan component event on click of sponsor logo in article meta', async ({
		page,
	}) => {
		await loadPage(page, `/Article/${paidContentPage}`);
		await cmpAcceptAll(page);

		const clickEventRequest = interceptOphanRequest({
			page,
			path: ADDITIONAL_REQUEST_PATH,
			searchParamMatcher: (searchParams) => {
				const clickComponent = searchParams.get('clickComponent');
				const clickLinkNames = searchParams.get('clickLinkNames');
				return (
					clickComponent === 'labs-logo | article-meta-paypal' &&
					clickLinkNames === '["labs-logo-article-meta-paypal"]'
				);
			},
		});

		await waitForIsland(page, 'Branding');

		await expectToBeVisible(page, '[data-testid=branding-logo]');
		await page.locator('[data-testid=branding-logo]').click();

		await clickEventRequest;
	});

	test('should send Ophan component event on click of sponsor logo in onwards section', async ({
		page,
	}) => {
		await loadPage(page, `/Article/${paidContentPage}`);
		await cmpAcceptAll(page);

		const clickEventRequest = interceptOphanRequest({
			page,
			path: ADDITIONAL_REQUEST_PATH,
			searchParamMatcher: (searchParams) => {
				const clickComponent = searchParams.get('clickComponent');
				const clickLinkNames = searchParams.get('clickLinkNames');
				return (
					clickComponent ===
						'labs-logo | article-related-content-paypal' &&
					clickLinkNames ===
						'["labs-logo-article-related-content-paypal","related-content"]'
				);
			},
		});

		await waitForIsland(page, 'OnwardsUpper');

		await expectToBeVisible(page, '[data-testid=card-branding-logo]');
		await page.locator('[data-testid=card-branding-logo]').first().click();

		// Make sure the request to Ophan is made
		await clickEventRequest;
	});
});
