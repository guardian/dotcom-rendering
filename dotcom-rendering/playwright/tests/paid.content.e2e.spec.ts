import { test } from '@playwright/test';
import { cmpAcceptAll } from '../lib/cmp';
import { waitForIsland } from '../lib/islands';
import { loadPage } from '../lib/load-page';
import { expectToBeVisible } from '../lib/locators';
import { ADDITIONAL_REQUEST_PATH, interceptOphanRequest } from '../lib/ophan';

/**
 * This test checks Ophan click events are sent for paid content labs campaigns.
 * We have tried to use a long lived campaign however the content can be taken down.
 *
 * If the content is taken down you'll need to find a new paid content page.
 * The article should have a sponsor logo in the article meta and related content section.
 * You can find all paid content campaigns here:
 * https://www.theguardian.com/tone/advertisement-features
 *
 * You need to edit the expected logo data-component name and data-link-name for both the meta and related content section
 * You can grab the required attribute values in the dev tools for the page itself
 */

const paidContentPage =
	'https://www.theguardian.com/guardian-clearing/2021/jul/12/online-event-how-to-make-clearing-work-for-you-register-now';

const metaLogoDataComponent =
	'labs-logo | article-meta-the-guardian universities';

const metaLogoDataLinkName = 'labs-logo-article-meta-the-guardian universities';

const relatedContentLogoDataComponent =
	'labs-logo | article-related-content-the-guardian universities';

const relatedContentLogoDataLinkName =
	'labs-logo-article-related-content-the-guardian universities';

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
