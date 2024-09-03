import { expect, test } from '@playwright/test';
import { disableCMP } from '../lib/cmp';
import { addCookie } from '../lib/cookies';
import { loadPage } from '../lib/load-page';

const scenarios = [
	{ pageId: 'uk', edition: 'AU', showBanner: true },
	{ pageId: 'europe', edition: 'US', showBanner: true },
	{ pageId: 'uk', edition: 'UK', showBanner: false },
	{ pageId: 'us', edition: 'US', showBanner: false },
];

test.describe('Edition Switcher Banner', () => {
	for (const { pageId, edition } of scenarios.filter(
		({ showBanner }) => showBanner,
	)) {
		test.describe("the page ID doesn't match the edition", () => {
			test.skip(`It shows the banner when the edition is ${edition} and the page is /${pageId}`, async ({
				context,
				page,
			}) => {
				await addCookie(context, {
					name: 'GU_EDITION',
					value: `${edition}`,
				});

				await disableCMP(context);
				await loadPage(
					page,
					`/Front/https://www.theguardian.com/${pageId}`,
				);

				await expect(
					page.locator('[data-component="edition-switcher-banner"]'),
				).toBeVisible();
			});
		});
	}

	for (const { pageId, edition } of scenarios.filter(
		({ showBanner }) => !showBanner,
	)) {
		test.describe('the page ID matches the edition', () => {
			test.skip(`It does NOT show the banner when the edition is ${edition} and the page is /${pageId}`, async ({
				context,
				page,
			}) => {
				await addCookie(context, {
					name: 'GU_EDITION',
					value: `${edition}`,
				});

				await disableCMP(context);
				await loadPage(
					page,
					`/Front/https://www.theguardian.com/${pageId}`,
				);

				await expect(
					page.locator('[data-component="edition-switcher-banner"]'),
				).not.toBeVisible();
			});
		});
	}

	test.describe('the page is not a network front', () => {
		test(`It does NOT show the banner on a section front`, async ({
			context,
			page,
		}) => {
			await addCookie(context, {
				name: 'GU_EDITION',
				value: 'US',
			});

			await disableCMP(context);
			await loadPage(page, `/Front/https://www.theguardian.com/uk/sport`);

			await expect(
				page.locator('[data-component="edition-switcher-banner"]'),
			).not.toBeVisible();
		});

		test(`It does NOT show the banner on an article`, async ({
			context,
			page,
		}) => {
			await addCookie(context, {
				name: 'GU_EDITION',
				value: 'US',
			});

			await disableCMP(context);
			await loadPage(
				page,
				`/Article/https://www.theguardian.com/environment/2020/oct/13/maverick-rewilders-endangered-species-extinction-conservation-uk-wildlife`,
			);

			await expect(
				page.locator('[data-component="edition-switcher-banner"]'),
			).not.toBeVisible();
		});
	});
});
