import type { Page } from '@playwright/test';
import { devices, expect, test } from '@playwright/test';
import { disableCMP } from '../../lib/cmp';
import { waitForIsland } from '../../lib/islands';
import { loadPage } from '../../lib/load-page';
import { mockApis } from '../../lib/mocks'; // TODO e2e is this required?

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

const expectToExist = async (page: Page, selector: string, count = 1) => {
	await expect(page.locator(selector)).toHaveCount(count, { timeout: 10000 });
};

const expectToNotExist = async (page: Page, selector: string) => {
	await expect(page.locator(selector)).toHaveCount(0, { timeout: 10000 });
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

			await waitForIsland(page, 'HeaderTopBar', 'hydrated');
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
			await expectToExist(page, '[data-cy=discussion]');
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
			await expectToExist(page, '[data-cy=discussion]');
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
			await expectToNotExist(page, '[data-component=geo-most-popular]');
			await waitForIsland(page, 'MostViewedRightWrapper');
			await expectToExist(page, '[data-component=geo-most-popular]');
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

	test.describe('Navigating the pillar menu', () => {
		test('should expand and close the desktop pillar menu when More is clicked', async ({
			context,
			page,
		}) => {
			await disableCMP(context);
			await loadPage(page, `/Article/${articleUrl}`);

			// Open pillar menu
			await page.locator('[data-cy=nav-show-more-button]').click();
			await expect(
				page
					.locator('[data-cy=expanded-menu]')
					.filter({ hasText: 'Columnists' }),
			).toBeVisible();

			// Assert newslinks second item (first visible) is focused
			// TODO e2e find a better way to filter on visible list items :visible doesn't work
			await expect(
				page.locator('[data-cy="newsLinks"] > li:nth-child(2) a'),
			).toBeFocused();

			// Press escape and assert show more is focused
			await page.locator('body').press('Escape');
			await expect(
				page.locator('[data-cy=nav-show-more-button]'),
			).toBeFocused();
		});

		test.describe('On mobile', () => {
			test('should expand the mobile pillar menu when the VeggieBurger is clicked', async ({
				context,
				page,
			}) => {
				await page.setViewportSize(devices['iPhone X'].viewport);
				await disableCMP(context);
				await loadPage(page, `/Article/${articleUrl}`);

				await page.locator('[data-cy=veggie-burger]').click();
				await expect(
					page
						.locator('nav')
						.first()
						.filter({ hasText: 'Crosswords' }),
				).toBeVisible();

				await page.locator('[data-cy=column-collapse-Opinion]').click();
				await expect(
					page
						.locator('nav')
						.first()
						.filter({ hasText: 'Columnists' }),
				).toBeVisible();

				await page.locator('body').press('Escape');
				await expect(
					page.locator('[data-cy=veggie-burger]'),
				).toBeFocused();
			});

			test('should transfer focus to the sub nav when tabbing from the veggie burger without opening the menu', async ({
				context,
				page,
			}) => {
				await page.setViewportSize(devices['iPhone X'].viewport);
				await disableCMP(context);
				await loadPage(page, `/Article/${articleUrl}`);

				await page.locator('[data-cy=veggie-burger]').focus();
				await page.locator('[data-cy=veggie-burger]').press('Tab');
				await expect(
					page.locator('[data-cy=sub-nav] a').first(),
				).toBeFocused();
			});

			test('should immediately focus on the News menu item when the menu first opens', async ({
				context,
				page,
			}) => {
				await page.setViewportSize(devices['iPhone X'].viewport);
				await disableCMP(context);
				await loadPage(page, `/Article/${articleUrl}`);

				await page.locator('[data-cy=veggie-burger]').click();
				await expect(
					page.locator('[data-cy=column-collapse-News]'),
				).toBeFocused();
			});

			test('should transfer focus to sub menu items when tabbing from section header', async ({
				context,
				page,
			}) => {
				await page.setViewportSize(devices['iPhone X'].viewport);
				await disableCMP(context);
				await loadPage(page, `/Article/${articleUrl}`);

				// tab to the first sub menu item
				await page.locator('[data-cy=veggie-burger]').click();
				await page.keyboard.press('Enter');
				await page.keyboard.press('Tab');

				// Assert first item of first sub menu is focused
				await expect(
					page.locator(
						'[data-cy="nav-menu-columns"] > li:nth-child(1) > ul > li:nth-child(1) > a',
					),
				).toBeFocused();
			});

			test('should let reader traverse section titles using keyboard', async ({
				context,
				page,
			}) => {
				await page.setViewportSize(devices['iPhone X'].viewport);
				await disableCMP(context);
				await loadPage(page, `/Article/${articleUrl}`);

				await page.locator('[data-cy=veggie-burger]').press('Enter');

				// Close the news menu
				await page.locator('*:focus').press('Tab');
				await expect(
					page.locator('[data-cy=column-collapse-Opinion]'),
				).toBeFocused();

				// Open the opinion menu
				await page.locator('*:focus').press('Enter');
				await page.locator('*:focus').press('Tab');
				await expect(
					page.locator('[data-cy=column-collapse-sublink-Opinion]'),
				).toBeFocused();
			});

			test('should expand the subnav when "More" is clicked', async ({
				context,
				page,
			}) => {
				await page.setViewportSize(devices['iPhone X'].viewport);
				await disableCMP(context);
				await loadPage(page, `/Article/${articleUrl}`);

				// Wait for hydration of both navs
				await waitForIsland(page, 'SubNav', 'hydrated', 0);
				await waitForIsland(page, 'SubNav', 'hydrated', 1);

				// Both subnav buttons show 'More'
				await expect(
					page.locator('[data-cy=subnav-toggle]').first(),
				).toHaveText('More');
				await expect(
					page.locator('[data-cy=subnav-toggle]').last(),
				).toHaveText('More');

				// Click Show more in the first sub nav
				await page.locator('[data-cy=subnav-toggle]').first().click();
				// The first button now shows 'Less'
				await expect(
					page.locator('[data-cy=subnav-toggle]').first(),
				).toHaveText('Less');

				// The last subnav still shows 'More'
				await expect(
					page.locator('[data-cy=subnav-toggle]').last(),
				).toHaveText('More');

				// Click Show more on the last sub nav
				await page.locator('[data-cy=subnav-toggle]').last().click();
				// Both subnav buttons show 'Less'
				await expect(
					page.locator('[data-cy=subnav-toggle]').first(),
				).toHaveText('Less');
				await expect(
					page.locator('[data-cy=subnav-toggle]').last(),
				).toHaveText('Less');
			});
		});
	});
});
