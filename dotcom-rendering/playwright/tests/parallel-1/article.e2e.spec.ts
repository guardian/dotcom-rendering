import type { Response } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { disableCMP } from '../../lib/cmp';
import { waitForIsland } from '../../lib/islands';
import { loadPage } from '../../lib/load-page';

const responseHasJsonProperty = async (
	response: Response,
	url: string | RegExp,
	expectedProperty: string,
): Promise<boolean> => {
	const isURL = response.request().url().match(url);
	if (!isURL) return false;
	const status = response.status();
	if (status !== 200) return false;
	const json = (await response.json()) as Record<string, string>;
	const prop = json[expectedProperty];
	if (!prop) return false;
	return true;
};

test.describe('E2E Page rendering', () => {
	test.describe('for WEB', () => {
		test('It should load an article and make the expected network requests for dynamic content', async ({
			context,
			page,
		}) => {
			await disableCMP(context);

			// rich link
			// https://api.nextgen.guardianapps.co.uk/embed/card/lifeandstyle/2013/nov/09/impostor-syndrome-oliver-burkeman.json?dcr=true
			const richLinkResponsePromise = page.waitForResponse((response) =>
				responseHasJsonProperty(response, /embed\/card/, 'tags'),
			);

			// most-read-geo.json aka most viewed right hand column
			// https://api.nextgen.guardianapps.co.uk/most-read-geo.json?dcr=true
			const mostReadRightResponsePromise = page.waitForResponse(
				(response) =>
					responseHasJsonProperty(
						response,
						/most-read-geo\.json/,
						'heading',
					),
			);

			// most-read/commentisfree.json aka most viewed footer
			// https://api.nextgen.guardianapps.co.uk/most-read/commentisfree.json?_edition=UK&dcr=true
			const mostReadFooterResponsePromise = page.waitForResponse(
				(response) =>
					responseHasJsonProperty(
						response,
						/most-read\/commentisfree\.json/,
						'tabs',
					),
			);

			await loadPage(
				page,
				`/Article/https://www.theguardian.com/commentisfree/2019/oct/16/impostor-syndrome-class-unfairness`,
			);

			await expect(page.locator('[data-gu-name="title"]')).toContainText(
				'Opinion',
			);

			await waitForIsland(page, 'RichLinkComponent', 'hydrated', 1);
			await richLinkResponsePromise;
			await expect(
				page
					.locator(`gu-island[name="RichLinkComponent"]`)
					.filter({ hasText: 'Read more' })
					.first(),
			).toBeVisible();

			await waitForIsland(page, 'MostViewedRightWrapper');
			await mostReadRightResponsePromise;
			await expect(
				page
					.locator(`gu-island[name="MostViewedRightWrapper"]`)
					.filter({ hasText: 'Most Viewed' }),
			).toBeVisible();

			await waitForIsland(page, 'MostViewedFooterData');
			await mostReadFooterResponsePromise;
			await expect(
				page
					.locator(`gu-island[name="MostViewedFooterData"]`)
					.filter({ hasText: 'Across The Guardian' }),
			).toBeVisible();
		});
	});

	test.describe('for AMP', function () {
		test(`It should load render an AMP page`, async ({ context, page }) => {
			await loadPage(
				page,
				`/AMPArticle/https://amp.theguardian.com/commentisfree/2019/oct/16/impostor-syndrome-class-unfairness`,
			);

			await expect(page.locator('header').first()).toContainText(
				'Opinion',
			);

			// In this AMP Article we'd expect three advert slots to be inserted
			// (note each of these slots will itself contain a regional slot, that will only appear in certain geos)
			// And each to have the follow IDs
			await expect(page.locator('#ad-1')).toBeAttached();
			await expect(page.locator('#ad-2')).toBeAttached();
			await expect(page.locator('#ad-3')).toBeAttached();
		});
	});

	// TODO e2e add skipped tests from article.e2e.cy.js
});
