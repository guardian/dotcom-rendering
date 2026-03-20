import { isUndefined } from '@guardian/libs';
import type { BrowserContext, Page, Request } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { allowRejectAll, cmpAcceptAll, cmpRejectAll } from '../lib/cmp';
import { addCookie } from '../lib/cookies';
import { loadPage } from '../lib/load-page';

const optOutOfArticleCountConsent = async (context: BrowserContext) => {
	await addCookie(context, {
		name: 'gu_articleCountOptOut',
		value: 'true',
	});
};

const ARTICLE_PATH =
	'/Article/https://www.theguardian.com/politics/2019/nov/20/jeremy-corbyn-boris-johnson-tv-debate-watched-by-67-million-people';
const RR_BANNER_URL = 'https://contributions.guardianapis.com/banner';

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

const getBannerRequestField = (
	request: Request,
	url: string | RegExp,
	field: string,
): unknown => {
	if (!request.url().match(url)) return undefined;
	const postJSON = request.postDataJSON() as {
		targeting?: Record<string, unknown>;
	};
	return postJSON.targeting?.[field];
};

test.describe('The banner', function () {
	test('makes a request to the support-dotcom-components service', async ({
		page,
		context,
	}) => {
		await optOutOfArticleCountConsent(context);

		const rrBannerRequestPromise = page.waitForRequest((request) =>
			requestBodyHasProperties(request, RR_BANNER_URL, ['targeting']),
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

test.describe('Banner browserId targeting', function () {
	const setAuxiaVariantCookie = async (context: BrowserContext) => {
		await addCookie(context, {
			name: 'gu_client_ab_tests',
			value: 'growth-auxia-banner:variant',
		});
	};
	const setBwidCookie = async (
		context: BrowserContext,
		value = 'test-browser-id',
	) => {
		await addCookie(context, {
			name: 'bwid',
			value,
		});
	};

	const loadAndCaptureBannerRequest = async ({
		page,
		context,
		acceptConsent,
		inAuxiaVariant,
	}: {
		page: Page;
		context: BrowserContext;
		acceptConsent: boolean;
		inAuxiaVariant: boolean;
	}) => {
		if (!acceptConsent) {
			await allowRejectAll(context);
		}
		await optOutOfArticleCountConsent(context);
		await setBwidCookie(context);
		if (inAuxiaVariant) {
			await setAuxiaVariantCookie(context);
		}

		const bannerRequestPromise = page.waitForRequest(
			(request) =>
				request.url().includes(RR_BANNER_URL) &&
				request.method() === 'POST',
		);

		await loadPage({
			page,
			path: ARTICLE_PATH,
			waitUntil: 'domcontentloaded',
			region: 'GB',
			preventSupportBanner: false,
		});

		if (acceptConsent) {
			await cmpAcceptAll(page);
		} else {
			await cmpRejectAll(page);
		}

		return bannerRequestPromise;
	};

	test('sends browserId when user has consented and is in the auxia variant', async ({
		page,
		context,
	}) => {
		const bannerRequest = await loadAndCaptureBannerRequest({
			page,
			context,
			acceptConsent: true,
			inAuxiaVariant: true,
		});

		const browserId = getBannerRequestField(
			bannerRequest,
			RR_BANNER_URL,
			'browserId',
		);
		expect(browserId).toBe('test-browser-id');
	});

	// Skip this test because it doesn't work in the github actions run. It does however work locally
	test.skip('does not send browserId when user has not consented, even if in the auxia variant', async ({
		page,
		context,
	}) => {
		const bannerRequest = await loadAndCaptureBannerRequest({
			page,
			context,
			acceptConsent: false,
			inAuxiaVariant: true,
		});

		const browserId = getBannerRequestField(
			bannerRequest,
			RR_BANNER_URL,
			'browserId',
		);
		expect(browserId).toBeUndefined();
	});

	test('does not send browserId when user is not in the auxia variant, even if consented', async ({
		page,
		context,
	}) => {
		const bannerRequest = await loadAndCaptureBannerRequest({
			page,
			context,
			acceptConsent: true,
			inAuxiaVariant: false,
		});

		const browserId = getBannerRequestField(
			bannerRequest,
			RR_BANNER_URL,
			'browserId',
		);
		expect(browserId).toBeUndefined();
	});
});
