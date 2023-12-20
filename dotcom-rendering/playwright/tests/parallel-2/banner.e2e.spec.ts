import type { BrowserContext, Request } from '@playwright/test';
import { test } from '@playwright/test';
import { disableCMP } from '../../lib/cmp';
import { addCookie } from '../../lib/cookies';
import { loadPage } from '../../lib/load-page';

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
		(expectedProperty) => postJSON[expectedProperty] !== undefined,
	);
};

test.describe('The banner', function () {
	test('makes a request to the support-dotcom-components service', async ({
		page,
		context,
	}) => {
		await disableCMP(context);
		await optOutOfArticleCountConsent(context);
		const rrBannerUrl = 'https://contributions.guardianapis.com/banner';

		const rrBannerRequestPromise = page.waitForRequest((request) =>
			requestBodyHasProperties(request, rrBannerUrl, [
				'targeting',
				'tracking',
			]),
		);

		await loadPage(
			page,
			`/Article/https://www.theguardian.com/politics/2019/nov/20/jeremy-corbyn-boris-johnson-tv-debate-watched-by-67-million-people`,
			'domcontentloaded',
			'GB',
			false,
		);

		await rrBannerRequestPromise;
	});
});
