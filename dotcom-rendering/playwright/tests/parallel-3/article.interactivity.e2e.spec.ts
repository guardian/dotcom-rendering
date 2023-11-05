import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { disableCMP } from '../../lib/cmp';
import { loadPage } from '../../lib/load-page';
import { mockApis } from '../../lib/mocks'; // TODO is this required?
import { waitForIsland } from '../../lib/util';

const articleUrl =
	'https://www.theguardian.com/politics/2019/oct/29/tories-restore-party-whip-to-10-mps-who-sought-to-block-no-deal-brexit';

const expectToBeVisible = async (page: Page, selector: string, nth = 0) => {
	await expect(page.locator(selector).nth(nth)).toBeVisible({
		timeout: 10000,
	});
};

const expectToNotBeVisible = async (page: Page, selector: string, nth = 0) => {
	await expect(page.locator(selector).nth(nth)).not.toBeVisible({
		timeout: 10000,
	});
};

// TODO e2e add a more precise test to check if the element exists in the DOM using count
const expectToBeAttached = async (page: Page, selector: string, nth = 0) => {
	await expect(page.locator(selector).nth(nth)).toBeAttached({
		timeout: 10000,
	});
};

const expectToNotBeAttached = async (page: Page, selector: string, nth = 0) => {
	await expect(page.locator(selector).nth(nth)).not.toBeAttached({
		timeout: 10000,
	});
};

test.describe('Interactivity', () => {
	test.describe('Verify elements have been hydrated', () => {
		test('should open the edition dropdown menu when clicked and hide when expected', async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage(page, `/Article/${articleUrl}`);

			await expectToNotBeVisible(page, '[data-cy=dropdown-options]');

			await waitForIsland(page, 'EditionDropdown', 'hydrated');
			// Open it
			await page.locator('[data-cy=dropdown-button]').click();
			await expectToBeVisible(page, '[data-cy=dropdown-options]');
			// Pressing esc hides it
			await page.locator('body').press('Escape');
			await expectToNotBeVisible(page, '[data-cy=dropdown-options]');
			// Open it again
			await page.locator('[data-cy=dropdown-button]').click();
			await expectToBeVisible(page, '[data-cy=dropdown-options]');
			// Clicking elsewhere in the document hides it
			await page.locator('h1').first().press('Escape');
			await expectToNotBeVisible(page, '[data-cy=dropdown-options]');
		});

		test('loads the discussion when you click the comment count', async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage(
				page,
				`/Article/https://www.theguardian.com/commentisfree/2022/jan/20/uk-government-yemen-war-saudi-arabia-westminster`,
			);

			await expectToBeVisible(page, '[data-cy=comment-counts]');
			// The discusion is not yet loaded
			await expectToNotBeVisible(page, '[data-cy=discussion]');
			// Click the comment count
			await page.locator('[data-cy=comment-counts]').click();
			await waitForIsland(page, 'DiscussionContainer', 'hydrated');
			await expectToBeAttached(page, '[data-cy=discussion]');
		});

		test('loads the discussion immediately when you use a url ending in #comments', async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage(
				page,
				`/Article/https://www.theguardian.com/commentisfree/2022/jan/20/uk-government-yemen-war-saudi-arabia-westminster#comments`,
			);
			await expectToBeAttached(page, '[data-cy=discussion]');
		});

		test('loads the discussion immediately when you use a permalink', async ({
			context,
			page,
		}) => {
			// The permalink feature is not currently working but once it does we want this test ready to go
			await disableCMP(context);
			await loadPage(
				page,
				`/Article/https://www.theguardian.com/commentisfree/2022/jan/20/uk-government-yemen-war-saudi-arabia-westminster#comments`,
			);
			await waitForIsland(page, 'DiscussionContainer', 'hydrated');
			await expectToBeVisible(page, '[id=comment-154433663]');
		});

		test('loads the most viwed list only after starting to scroll the page', async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage(page, `/Article/${articleUrl}`);
			await expectToNotBeAttached(
				page,
				'[data-component=geo-most-popular]',
			);
			await waitForIsland(page, 'MostViewedRightWrapper');
			await expectToBeAttached(page, '[data-component=geo-most-popular]');
		});

		test('should display and hydrate all the rich links for an article', async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage(page, `/Article/${articleUrl}`);
			// Verify two rich links were server rendered
			await expect(
				page.locator('[data-component=rich-link]'),
			).toHaveCount(2);
			// Verify hydration
			await waitForIsland(page, 'RichLinkComponent', 'hydrated', 0);
			await waitForIsland(page, 'RichLinkComponent', 'hydrated', 1);
			await expectToBeVisible(
				page,
				'img[alt="Michael Barnier and the EU flag"]',
			);
		});

		test('should render the reader revenue links in the header', async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage(page, `/Article/${articleUrl}`);
			await waitForIsland(page, 'SupportTheG', 'rendered');
			await expect(
				page
					.locator('header')
					.filter({ hasText: 'Support the Guardian' }),
			).toBeVisible();
		});
	});

	test.describe('When most viewed is mocked', () => {
		test('should change the list of most viewed items when a tab is clicked', async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage(page, `/Article/${articleUrl}`);

			// Make sure most viewed footer isn't in the dom yet
			await expect(
				page.locator('[data-cy=mostviewed-footer]'),
			).toHaveCount(0);

			// Wait for hydration
			await waitForIsland(page, 'MostViewedRightWrapper');
			await expect(
				page
					.locator(`gu-island[name="MostViewedRightWrapper"]`)
					.filter({ hasText: 'Most Viewed' }),
			).toBeVisible();

			await waitForIsland(page, 'MostViewedFooterData');
			await expect(
				page
					.locator(`gu-island[name="MostViewedFooterData"]`)
					.filter({ hasText: 'Across The Guardian' }),
			).toBeVisible();

			await mockApis(page);
			await expectToBeVisible(page, '[data-cy=tab-body-0]');
			await expectToNotBeVisible(page, '[data-cy=tab-body-1]');
			await page.locator('[data-cy=tab-heading-1]').click();
			await expectToNotBeVisible(page, '[data-cy=tab-body-0]');
			await expectToBeVisible(page, '[data-cy=tab-body-1]');
		});
	});

	// describe('Navigating the pillar menu', function () {
	// 	it('should expand and close the desktop pillar menu when More is clicked', function () {
	// 		cy.visit(`/Article/${articleUrl}`);
	// 		cy.get('[data-cy=nav-show-more-button]').click();
	// 		cy.get('[data-cy=expanded-menu]').within(() => {
	// 			cy.contains('Columnists').should('be.visible');
	// 		});
	// 		// Assert first item is highlighted
	// 		cy.get('[data-cy="newsLinks"] > li')
	// 			.eq(1)
	// 			.within(() => {
	// 				cy.get('a').should('have.focus');
	// 			});
	// 		// check focus is on menu button on close
	// 		cy.focused().type('{esc}');
	// 		cy.focused().should('have.attr', 'data-cy', 'nav-show-more-button');

	// 		// TODO: should also include assertion to select menu item when AD z-index fixed
	// 		// See: https://trello.com/c/y8CyFKJm/1524-top-nav-ad-and-nav-z-index-issue
	// 	});

	// 	describe('On mobile', function () {
	// 		it('should expand the mobile pillar menu when the VeggieBurger is clicked', function () {
	// 			cy.viewport('iphone-x');
	// 			cy.visit(`/Article/${articleUrl}`);
	// 			cy.get('[data-cy=veggie-burger]').click();
	// 			cy.contains('Crosswords');
	// 			cy.get('[data-cy=column-collapse-Opinion]').click();
	// 			cy.contains('Columnists').should('be.visible');
	// 			// this input element is not visible and typing into it will cause Cypress to fail to type - so force override
	// 			// https://docs.cypress.io/guides/references/error-messages#cy-failed-because-the-element-cannot-be-interacted-with
	// 			cy.focused().type('{esc}', { force: true });
	// 			// check focus is on veggie burger menu button on close
	// 			cy.focused().should('have.attr', 'data-cy', 'veggie-burger');
	// 		});

	// 		it('should transfer focus to the sub nav when tabbing from the veggie burger without opening the menu', function () {
	// 			cy.viewport('iphone-x');
	// 			cy.visit(`/Article/${articleUrl}`);
	// 			cy.get('[data-cy=veggie-burger]').focus();
	// 			cy.get('[data-cy=veggie-burger]').tab();
	// 			cy.get('[data-cy=sub-nav] a').first().should('have.focus');
	// 		});

	// 		it('should immediately focus on the News menu item when the menu first opens', function () {
	// 			cy.viewport('iphone-x');
	// 			cy.visit(`/Article/${articleUrl}`);
	// 			cy.get('[data-cy=veggie-burger]').click();
	// 			cy.get('[data-cy=column-collapse-News]').should('have.focus');
	// 		});

	// 		it('should transfer focus to sub menu items when tabbing from section header', function () {
	// 			cy.viewport('iphone-x');
	// 			cy.visit(`/Article/${articleUrl}`);
	// 			cy.get('[data-cy=veggie-burger]').click();
	// 			cy.focused().type('{enter}');
	// 			cy.focused().tab();
	// 			// get the first column (news column)
	// 			cy.get('[data-cy="nav-menu-columns"] li')
	// 				.first()
	// 				.within(() => {
	// 					// get the first element in that column
	// 					cy.get('ul > li > a').first().should('have.focus');
	// 				});
	// 		});

	// 		it('should let reader traverse section titles using keyboard', function () {
	// 			cy.viewport('iphone-x');
	// 			cy.visit(`/Article/${articleUrl}`);
	// 			cy.get('[data-cy=veggie-burger]').type('{enter}');
	// 			// Close the news menu
	// 			cy.focused().type('{enter}');
	// 			cy.focused().tab();
	// 			cy.focused().should(
	// 				'have.attr',
	// 				'data-cy',
	// 				'column-collapse-Opinion',
	// 			);
	// 			// Open the opinion menu
	// 			cy.focused().type('{enter}');
	// 			cy.focused().tab();
	// 			cy.focused().should(
	// 				'have.attr',
	// 				'data-cy',
	// 				'column-collapse-sublink-Opinion',
	// 			);
	// 		});

	// 		it('should expand the subnav when "More" is clicked', function () {
	// 			cy.viewport('iphone-x');
	// 			cy.visit(`/Article/${articleUrl}`);
	// 			// Wait for hydration
	// 			cy.get('gu-island[name=SubNav]')
	// 				.first()
	// 				.should('have.attr', 'data-island-status', 'hydrated');
	// 			// Both subnav buttons show 'More'
	// 			cy.get('[data-cy=subnav-toggle]').first().contains('More');
	// 			cy.get('[data-cy=subnav-toggle]').last().contains('More');
	// 			// Click Show more in the first sub nav
	// 			cy.get('[data-cy=subnav-toggle]').first().click();
	// 			// The first button now shows 'Less'
	// 			cy.get('[data-cy=subnav-toggle]').first().contains('Less');
	// 			// Scroll to bottom to trigger hydration
	// 			cy.scrollTo('bottom', { duration: 300 });
	// 			// We need this second call to fix flakiness where content loads in pushing the page
	// 			// down and preventing the scroll request to actually reach the bottom. We will fix
	// 			// this later when we've defined fixed heights for these containers, preventing CLS
	// 			cy.scrollTo('bottom', { duration: 300 });
	// 			// Wait for hydration
	// 			cy.get('gu-island[name=SubNav]')
	// 				.last()
	// 				.should('have.attr', 'data-island-status', 'hydrated');
	// 			// The other subnav still shows 'More'
	// 			cy.get('[data-cy=subnav-toggle]').last().contains('More');
	// 			// Click Show more on the last sub nav
	// 			cy.get('[data-cy=subnav-toggle]').last().click();
	// 			// Both subnav buttons show 'Less'
	// 			cy.get('[data-cy=subnav-toggle]').first().contains('Less');
	// 			cy.get('[data-cy=subnav-toggle]').last().contains('Less');
	// 		});
	// 	});
});
