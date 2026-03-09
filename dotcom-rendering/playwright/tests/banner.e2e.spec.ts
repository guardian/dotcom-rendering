import { isUndefined } from '@guardian/libs';
import type { BrowserContext, Request } from '@playwright/test';
import { test } from '@playwright/test';
import { allowRejectAll, cmpAcceptAll, cmpRejectAll } from '../lib/cmp';
import { addCookie } from '../lib/cookies';
import { loadPage } from '../lib/load-page';

const ARTICLE_PATH =
	'/Article/https://www.theguardian.com/politics/2019/nov/20/jeremy-corbyn-boris-johnson-tv-debate-watched-by-67-million-people';
const BANNER_URL = 'https://contributions.guardianapis.com/banner';

const optOutOfArticleCountConsent = async (context: BrowserContext) => {
	await addCookie(context, {
		name: 'gu_articleCountOptOut',
		value: 'true',
	});
};

const requestBodyHasProperties = (
	request: Request,
	url: string | RegExp,
	expectedProperties: string[],
): boolean => {
	const isURL = request.url().match(url);
	if (!isURL) return false;
	const postJSON = request.postDataJSON() as Record<string, string>;
	return expectedProperties.every(
		(expectedProperty) => !isUndefined(postJSON[expectedProperty]),
	);
};

const getRequestBodyTargeting = (
	request: Request,
	url: string | RegExp,
): Record<string, unknown> | undefined => {
	if (!request.url().match(url)) return undefined;
	const postJSON = request.postDataJSON() as {
		targeting: Record<string, unknown>;
	};
	return postJSON.targeting;
};

test.describe('The banner', function () {
	test('makes a request to the support-dotcom-components service', async ({
		page,
		context,
	}) => {
		await optOutOfArticleCountConsent(context);
		const rrBannerUrl = BANNER_URL;

		const rrBannerRequestPromise = page.waitForRequest((request) =>
			requestBodyHasProperties(request, rrBannerUrl, ['targeting']),
		);

		await loadPage({
			page,
			path: ARTICLE_PATH,
			waitUntil: 'domcontentloaded',
			region: 'GB',
			preventSupportBanner: false,
		});
		await cmpAcceptAll(page);

		await rrBannerRequestPromise;
	});
});

test.describe('Sign-in gate portal', function () {
	test('makes a request to the auxia', async ({ page, context }) => {
		await optOutOfArticleCountConsent(context);

		const auxiaUrl =
			'https://contributions.guardianapis.com/auxia/get-treatments';
		const auxiaRequestPromise = page.waitForRequest((request) =>
			requestBodyHasProperties(request, auxiaUrl, ['isSupporter']),
		);

		await loadPage({
			page,
			path: ARTICLE_PATH,
			waitUntil: 'domcontentloaded',
			region: 'GB',
			preventSupportBanner: false,
			queryParamsOn: true,
			queryParams: { showgate: 'true' },
		});

		await cmpAcceptAll(page);

		await page.evaluate(() => {
			// Set geolocation to IE to force the sign-in gate to appear
			window.localStorage.setItem('gu.geo.override', 'IE');
		});

		await page.reload({ waitUntil: 'domcontentloaded' });

		await auxiaRequestPromise;
	});
});

test.describe('Banner browserId consent', function () {
	test('includes browserId in banner request when user has given consent', async ({
		page,
		context,
	}) => {
		await optOutOfArticleCountConsent(context);
		// Set a known bwid cookie so we can assert it is forwarded
		await addCookie(context, {
			name: 'bwid',
			value: 'test-browser-id-12345',
		});

		const bannerRequestPromise = page.waitForRequest((request) => {
			const targeting = getRequestBodyTargeting(request, BANNER_URL);
			return !isUndefined(targeting?.browserId);
		});

		await loadPage({
			page,
			path: ARTICLE_PATH,
			waitUntil: 'domcontentloaded',
			region: 'GB',
			preventSupportBanner: false,
		});
		await cmpAcceptAll(page);

		await bannerRequestPromise;
	});

	test('omits browserId from banner request when user has rejected consent', async ({
		page,
		context,
	}) => {
		await allowRejectAll(context);
		await optOutOfArticleCountConsent(context);
		await addCookie(context, {
			name: 'bwid',
			value: 'test-browser-id-12345',
		});

		const bannerRequestPromise = page.waitForRequest((request) => {
			const targeting = getRequestBodyTargeting(request, BANNER_URL);
			return !isUndefined(targeting) && isUndefined(targeting.browserId);
		});

		await loadPage({
			page,
			path: ARTICLE_PATH,
			waitUntil: 'domcontentloaded',
			region: 'GB',
			preventSupportBanner: false,
		});
		await cmpRejectAll(page);

		await bannerRequestPromise;
	});
});
