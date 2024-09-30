import { test } from '@playwright/test';
import { cmpAcceptAll } from '../lib/cmp';
import { waitForIsland } from '../lib/islands';
import { loadPage } from '../lib/load-page';
import { expectToBeVisible } from '../lib/locators';
import { ADDITIONAL_REQUEST_PATH, interceptOphanRequest } from '../lib/ophan';

const paidContentPage =
	'https://www.theguardian.com/guardian-clearing/2021/jul/12/online-event-how-to-make-clearing-work-for-you-register-now';

const metaLogoDataComponent =
	'labs-logo | article-meta-the-guardian universities';

const metaLogoDataLinkName = 'labs-logo-article-meta-the-guardian universities';

const relatedContentLogoDataComponent =
	'labs-logo | article-related-content-the-guardian universities';

const relatedContentLogoDataLinkName =
	'labs-logo-article-related-content-the-guardian universities';

/**
 * This test relies on labs campaigns, where the content is often taken down one the campaign is complete.
 * If this happens you'll need to find a new labs article with a brand badge, you can often find these here:
 * https://www.theguardian.com/tone/advertisement-features
 * You need to edit the link as well as the expected requestURL to include the new brand in the code below, where it states `expect(requestURL).to.include('el=<logo goes here>');`.
 * You can grab the required info in the dev tools network tab on the page itself.
 */
test.describe('Paid content tests', () => {
	test('should send Ophan component event on click of sponsor logo in article meta and related content section', async ({
		page,
	}) => {
		await loadPage(page, `/Article/${paidContentPage}`);
		await cmpAcceptAll(page);

		// meta logo
		const metaClickEventRequest = interceptOphanRequest({
			page,
			path: ADDITIONAL_REQUEST_PATH,
			searchParamMatcher: (searchParams) => {
				const clickComponent = searchParams.get('clickComponent');
				const clickLinkNames = searchParams.get('clickLinkNames');
				return (
					clickComponent === metaLogoDataComponent &&
					clickLinkNames === `["${metaLogoDataLinkName}"]`
				);
			},
		});

		await waitForIsland(page, 'Branding');

		await expectToBeVisible(page, '[data-testid=branding-logo]');
		await page.locator('[data-testid=branding-logo]').click();

		await metaClickEventRequest;

		// go back to the paid content page
		await page.goBack();

		// related content logo
		const relatedClickEventRequest = interceptOphanRequest({
			page,
			path: ADDITIONAL_REQUEST_PATH,
			searchParamMatcher: (searchParams) => {
				const clickComponent = searchParams.get('clickComponent');
				const clickLinkNames = searchParams.get('clickLinkNames');
				return (
					clickComponent === relatedContentLogoDataComponent &&
					clickLinkNames ===
						`["${relatedContentLogoDataLinkName}","related-content"]`
				);
			},
		});

		await waitForIsland(page, 'OnwardsUpper');

		await expectToBeVisible(page, '[data-testid=card-branding-logo]');
		await page.locator('[data-testid=card-branding-logo]').first().click();

		await relatedClickEventRequest;
	});
});
