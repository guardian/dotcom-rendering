import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { expectToBeVisible, expectToExist } from 'playwright/lib/locators';
import { loadPage } from '../../lib/load-page';

const expectMetaContentValue = async (
	page: Page,
	name: string,
	value: string,
) => {
	expect(
		await page.locator(`head meta[name="${name}"]`).getAttribute('content'),
	).toEqual(value);
};

test.describe('The web document renders with the correct meta and analytics elements and attributes', () => {
	test(`The page is structured as expected`, async ({ page }) => {
		await loadPage(
			page,
			'/Article/https://www.theguardian.com/lifeandstyle/2021/jan/21/never-conduct-any-business-naked-how-to-work-from-bed-without-getting-sacked',
		);

		await expect(page.locator('head')).toHaveCount(1);

		await expectMetaContentValue(
			page,
			'description',
			'From warming up your voice to avoiding spillages, here are some tips for keeping up professional appearances',
		);
		await expectMetaContentValue(
			page,
			'viewport',
			'width=device-width,minimum-scale=1,initial-scale=1',
		);

		// the most important opengraph meta tags exist
		await expectToExist(page, `head meta[property="og:url"]`);
		await expectToExist(page, `head meta[property="og:description"]`);
		await expectToExist(page, `head meta[property="og:title"]`);
		await expectToExist(page, `head meta[property="og:type"]`);
		await expectToExist(page, `head meta[property="og:image"]`);
		await expectToExist(page, `head meta[property="article:author"]`);

		// the most important twitter meta tags exist
		await expectToExist(page, `head meta[name="twitter:card"]`);
		await expectToExist(page, `head meta[name="twitter:image"]`);
		await expectToExist(page, `head meta[name="twitter:site"]`);

		// all the required links exist
		await expectToExist(page, `head link[rel="canonical"]`);
	});

	test('Subnav links exists with correct values', async ({ page }) => {
		await loadPage(
			page,
			`/Article/https://www.theguardian.com/lifeandstyle/2021/jan/21/never-conduct-any-business-naked-how-to-work-from-bed-without-getting-sacked`,
		);

		// Pillar ophan data-link-name exists with correct value
		await expectToExist(
			page,
			`a[data-link-name="nav3 : primary : Opinion"]`,
		);

		// Only the top subnav is initially rendered so the count here is one
		await expectToBeVisible(
			page,
			`a[data-link-name="nav2 : subnav : Pensions"]`,
		);
	});

	test('Meta ophan data-attributes exist, content and attributes are correct', async ({
		page,
	}) => {
		await loadPage(
			page,
			`/Article/https://www.theguardian.com/lifeandstyle/2021/jan/21/never-conduct-any-business-naked-how-to-work-from-bed-without-getting-sacked`,
		);

		await expectToExist(page, `address[data-component="meta-byline"]`);
		await expectToExist(page, `address[data-link-name="byline"]`);

		const authorProfileLink = page
			.locator('a[rel="author"]')
			.getByText('Zoe Williams');

		expect(await authorProfileLink.getAttribute('href')).toEqual(
			'https://www.theguardian.com/profile/zoewilliams',
		);
	});

	test('Section, Footer and Series ophan data-attributes exist', async ({
		page,
	}) => {
		await loadPage(
			page,
			`/Article/https://www.theguardian.com/lifeandstyle/2021/jan/21/never-conduct-any-business-naked-how-to-work-from-bed-without-getting-sacked`,
		);
		await expectToExist(page, `[data-component="section"]`);
		await expectToExist(page, `[data-link-name="article section"]`);
		await expectToExist(page, `a[data-component="series"]`);
		await expectToExist(page, `a[data-link-name="article series"]`);
		await expectToExist(page, `[data-component="footer"]`);
		await expectToExist(page, `[data-link-name="footer"]`);
		await expectToExist(
			page,
			`[data-link-name="footer : primary : Opinion"]`,
		);
	});
});
