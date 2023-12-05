import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { standardArticle } from '../../fixtures/manual/standard-article';
import { disableCMP } from '../../lib/cmp';
import { addCookie } from '../../lib/cookies';
import { BASE_URL, loadPage } from '../../lib/load-page';

/**
 * Create a POST request to the /Article endpoint so we can override switches
 * in the json sent to DCR
 */
const visitArticleNoOkta = async (page: Page) => {
	const path = `/Article`;
	await page.route(`${BASE_URL}${path}`, async (route) => {
		const postData = {
			...standardArticle,
			config: {
				...standardArticle.config,
				switches: {
					...standardArticle.config.switches,
					/**
					 * We want to continue using cookies for signed in features
					 * until we figure out how to use Okta in e2e testing.
					 * See https://github.com/guardian/dotcom-rendering/issues/8758
					 */
					okta: false,
					idCookieRefresh: false,
					userFeaturesDcr: true,
				},
			},
		};
		await route.continue({
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			postData,
		});
	});
	await loadPage(page, path);
};

test.describe('User cookies tests', () => {
	test(`Request to user features API is sent when no user features expiry cookie`, async ({
		context,
		page,
	}) => {
		// fake login
		await addCookie(context, {
			name: 'GU_U',
			value: 'GU_U_value',
		});

		await disableCMP(context);

		const membersDataApiPromise = page.waitForRequest(
			'https://members-data-api.theguardian.com/user-attributes/me',
		);

		await visitArticleNoOkta(page);

		await membersDataApiPromise;

		// expect GU_U to still be present so it has not been deleted by user-features
		expect(
			(await context.cookies()).find((cookie) => cookie.name === 'GU_U')
				?.value,
		).toEqual('GU_U_value');
	});

	test(`Request to user features API is sent when user features cookie has expired`, async ({
		context,
		page,
	}) => {
		// fake login
		await addCookie(context, {
			name: 'GU_U',
			value: 'GU_U_value',
		});

		const currentTimestamp = new Date().getTime();
		const expirationTimestamp = new Date(
			currentTimestamp - 24 * 60 * 60 * 1000,
		); // 24 hours before now
		const expirationTimestampEpoch = expirationTimestamp.getTime() / 1000;

		// user-features will check if this cookie is missing or expired
		// to determine if it should request new data from the members-data API
		await addCookie(context, {
			name: 'gu_user_features_expiry',
			value: 'gu_user_features_expiry_value',
			expires: expirationTimestampEpoch,
		});

		await disableCMP(context);

		const membersDataApiPromise = page.waitForRequest(
			'https://members-data-api.theguardian.com/user-attributes/me',
		);

		await visitArticleNoOkta(page);

		await membersDataApiPromise;
	});

	test(`Existing old cookie data is deleted when the user is signed out`, async ({
		context,
		page,
	}) => {
		await addCookie(context, {
			name: 'gu_user_features_expiry',
			value: 'gu_user_features_expiry_value',
		});
		await addCookie(context, {
			name: 'GU_AF1',
			value: 'GU_AF1_value',
		});
		await addCookie(context, {
			name: 'gu_paying_member',
			value: 'gu_paying_member_value',
		});
		await addCookie(context, {
			name: 'gu_digital_subscriber',
			value: 'gu_digital_subscriber_value',
		});

		await disableCMP(context);
		await visitArticleNoOkta(page);

		// expect existing cookies to be deleted when GU_U is not present
		expect(
			(await context.cookies()).find((cookie) => cookie.name === 'GU_U'),
		).toBeFalsy();
		expect(
			(await context.cookies()).find(
				(cookie) => cookie.name === 'GU_AF1',
			),
		).toBeFalsy();
		expect(
			(await context.cookies()).find(
				(cookie) => cookie.name === 'gu_paying_member',
			),
		).toBeFalsy();
		expect(
			(await context.cookies()).find(
				(cookie) => cookie.name === 'gu_digital_subscriber',
			),
		).toBeFalsy();
	});
});
