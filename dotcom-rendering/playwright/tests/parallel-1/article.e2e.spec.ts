import { expect, test } from '@playwright/test';
import { disableCMP } from '../../lib/cmp';
import { loadPage } from '../../lib/load-page';
import { waitForIsland } from '../../lib/util';

test.describe('E2E Page rendering', () => {
	test.describe('for WEB', () => {
		test('It should load an article and make the expected ajax calls', async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage(
				page,
				`/Article/https://www.theguardian.com/commentisfree/2019/oct/16/impostor-syndrome-class-unfairness`,
			);

			// await waitForIsland(page, 'MostViewedFooterData');
			await expect(page.locator('header').first()).toContainText(
				'Opinion',
			);

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
