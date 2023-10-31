import type { Response } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { disableCMP } from '../../lib/cmp';
import { loadPage } from '../../lib/load-page';
import { waitForIsland } from '../../lib/util';

const assertOnJsonResponseProperty = async (
	response: Response,
	url: string | RegExp,
	expectedProperty: string,
): Promise<boolean> => {
	const isURL = response.request().url().match(url);
	console.log('isURL', isURL);
	if (!isURL) return false;
	const status = response.status();
	console.log('status', status);
	if (status !== 200) return false;
	const json = await response.json();
	console.log('json', json);
	const prop = json[expectedProperty];
	if (!prop) return false;
	console.log('prop', prop);
	return true;
};

test.describe('E2E Page rendering', () => {
	test.describe('for WEB', () => {
		test('It should load an article and make the expected ajax calls', async ({
			context,
			page,
		}) => {
			await disableCMP(context);

			// rich link
			// api.nextgen.guardianapps.co.uk/embed/card/lifeandstyle/2013/nov/09/impostor-syndrome-oliver-burkeman.json?dcr=true
			const richLinkResponsePromise = page.waitForResponse((response) =>
				assertOnJsonResponseProperty(response, /embed\/card/, 'tags'),
			);

			// most-read-geo aka most viewed in right hand column
			// https://api.nextgen.guardianapps.co.uk/most-read-geo.json?dcr=true
			const mostReadRightResponsePromise = page.waitForResponse(
				(response) =>
					assertOnJsonResponseProperty(
						response,
						/most-read-geo\.json/,
						'heading',
					),
			);

			// most-read/commentisfree.json aka most viewed in footer
			// https://api.nextgen.guardianapps.co.uk/most-read/commentisfree.json?_edition=UK&dcr=true
			const mostReadFooterResponsePromise = page.waitForResponse(
				(response) =>
					assertOnJsonResponseProperty(
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

			await waitForIsland(page, 'MostViewedRightWrapper');
			await mostReadRightResponsePromise;

			await waitForIsland(page, 'MostViewedFooterData');
			await mostReadFooterResponsePromise;

			// await waitForIsland(page, 'MostViewedFooterData');
			// cy.intercept('GET', '**/most-read-geo**', (req) => {
			// 	req.reply((res) => {
			// 		expect(res.body).to.have.property('heading');
			// 		expect(res.statusCode).to.be.equal(200);
			// 	});
			// });
			// cy.contains('Most viewed');

			// cy.scrollTo('bottom', { duration: 500 });

			// cy.intercept('GET', '/embed/card/**', (req) => {
			// 	req.reply((res) => {
			// 		expect(res.statusCode).to.be.equal(200);
			// 	});
			// });
			// cy.contains('Read more');

			// // We scroll again here because not all the content at the bottom of the page loads
			// // when you first touch bottom, you sometimes need to scroll once more to trigger
			// // lazy loading Most Popular
			// cy.scrollTo('bottom', { duration: 500 });

			// cy.intercept('GET', '/most-read/**', (req) => {
			// 	req.reply((res) => {
			// 		expect(res.body).to.have.property('tabs');
			// 		expect(res.statusCode).to.be.equal(200);
			// 	});
			// });
			// cy.contains('Most commented');
		});
	});

	// TODO e2e add skipped tests from article.e2e.cy.js

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
});
