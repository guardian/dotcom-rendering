import type { BrowserContext, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { addCookie, clearCookie } from 'playwright/lib/cookies';
import { getIframeBody } from 'playwright/lib/iframe';
import { expectToBeVisible, expectToNotExist } from 'playwright/lib/locators';
import { Labs as labsArticle } from '../../fixtures/generated/articles/Labs';
import { Standard as standardArticle } from '../../fixtures/generated/articles/Standard';
import {
	COMPLETE_REGISTRATION_BUTTON,
	SIGN_IN_INCENTIVES_DIGITAL,
	SIGN_IN_PROMPT,
	SUBSCRIPTION_HEADER,
} from '../../src/lib/signInAfterCheckOutText';
import { CMP_LAYER1_IFRAME, cmpAcceptAll, disableCMP } from '../lib/cmp';
import { loadPageWithOverrides } from '../lib/load-page';

const setArticleCount = async (page: Page, dailyArticleCount: number) => {
	await page.evaluate((n) => {
		window.localStorage.setItem(
			'gu.history.dailyArticleCount',
			JSON.stringify({
				value: [{ day: Math.floor(Date.now() / 86400000), count: n }],
			}),
		);
	}, dailyArticleCount);
};

const setMvtCookie = async (context: BrowserContext) => {
	// sign in gate main runs from 0-900000 MVT IDs, so 500_000 forces user into test
	await addCookie(context, { name: 'GU_mvt_id', value: String(500_000) });
};

const setGuCOCompleteCookie = async (
	context: BrowserContext,
	userType: string,
	productType: string,
) => {
	await addCookie(context, {
		name: 'GU_CO_COMPLETE',
		value: encodeURIComponent(
			`{"userType":"${userType}","product":"${productType}"}`,
		),
	});
};

const GATE_HEADER = 'Register: it’s quick and easy';

const SIGN_IN_GATE_MAIN_SELECTOR = '[data-testid=sign-in-gate-main]';

const scrollToGateForLazyLoading = async (page: Page) => {
	await page.locator('#sign-in-gate').scrollIntoViewIfNeeded();
};

test.describe('Sign In Gate Tests', () => {
	test.beforeEach(async ({ context }) => {
		await disableCMP(context);
		await setMvtCookie(context);
	});

	test.describe('SignInGate', () => {
		test('load the sign in gate', async ({ page }) => {
			await loadPageWithOverrides(page, standardArticle);

			// set article count to be min number to view gate
			await setArticleCount(page, 3);

			await scrollToGateForLazyLoading(page);

			await expectToBeVisible(page, SIGN_IN_GATE_MAIN_SELECTOR);

			await expect(
				page.locator(SIGN_IN_GATE_MAIN_SELECTOR),
			).toContainText(GATE_HEADER);
		});

		test('do NOT load the sign in gate if the user has not read at least 3 article in a day', async ({
			page,
		}) => {
			await loadPageWithOverrides(page, standardArticle);

			await setArticleCount(page, 1);

			await scrollToGateForLazyLoading(page);

			await expectToNotExist(page, SIGN_IN_GATE_MAIN_SELECTOR);
		});

		test('do NOT load the sign in gate if the user is signed in', async ({
			context,
			page,
		}) => {
			// Fake login
			await addCookie(context, { name: 'GU_U', value: 'true' });

			await loadPageWithOverrides(page, standardArticle);

			await scrollToGateForLazyLoading(page);

			await expectToNotExist(page, SIGN_IN_GATE_MAIN_SELECTOR);
		});

		test('do NOT load the sign in gate if the user has already dismissed the gate', async ({
			page,
		}) => {
			await loadPageWithOverrides(page, standardArticle);

			await page.evaluate(() => {
				localStorage.setItem(
					'gu.prefs.sign-in-gate',
					JSON.stringify({
						value: {
							'SignInGateMain-main-variant-5':
								'2020-07-22T08:25:05.567Z',
							'gate-dismissed-count-SignInGateMain-main-variant-5': 6,
						},
					}),
				);
			});

			await scrollToGateForLazyLoading(page);

			await expectToNotExist(page, SIGN_IN_GATE_MAIN_SELECTOR);
		});

		test('do NOT load the sign in gate if the article is not a valid section (membership)', async ({
			page,
		}) => {
			await loadPageWithOverrides(page, standardArticle, {
				configOverrides: { section: 'membership' },
			});

			await scrollToGateForLazyLoading(page);

			await expectToNotExist(page, SIGN_IN_GATE_MAIN_SELECTOR);
		});

		test('do NOT load the sign in gate if the article is a paid article', async ({
			page,
		}) => {
			await loadPageWithOverrides(page, labsArticle);

			await scrollToGateForLazyLoading(page);

			await expectToNotExist(page, SIGN_IN_GATE_MAIN_SELECTOR);
		});

		test('do NOT load the sign in gate on a device with an ios9 user agent string', async ({
			page,
		}) => {
			const ios9UserAgent =
				'Mozilla/5.0 (iPad; CPU OS 9_0 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4';

			await page.addInitScript((userAgent) => {
				Object.defineProperty(window.navigator, 'userAgent', {
					value: userAgent,
				});
			}, ios9UserAgent);

			await loadPageWithOverrides(page, standardArticle);

			const userAgent = await page.evaluate(
				() => window.navigator.userAgent,
			);

			expect(userAgent).toEqual(ios9UserAgent);

			await scrollToGateForLazyLoading(page);

			await expectToNotExist(page, SIGN_IN_GATE_MAIN_SELECTOR);
		});

		test('remove gate when the dismiss button is clicked', async ({
			page,
		}) => {
			await loadPageWithOverrides(page, standardArticle);

			// set article count to be min number to view gate
			await setArticleCount(page, 3);

			await scrollToGateForLazyLoading(page);

			await expectToBeVisible(page, SIGN_IN_GATE_MAIN_SELECTOR);

			await page
				.locator('[data-testid=sign-in-gate-main_dismiss]')
				.click();

			await expectToNotExist(page, SIGN_IN_GATE_MAIN_SELECTOR);
		});

		test('register CTA button should contain correct profile.theguardian.com href', async ({
			page,
		}) => {
			await loadPageWithOverrides(page, standardArticle);

			// set article count to be min number to view gate
			await setArticleCount(page, 3);

			await scrollToGateForLazyLoading(page);

			await expectToBeVisible(page, SIGN_IN_GATE_MAIN_SELECTOR);

			const registerHref = await page
				.locator('[data-testid=sign-in-gate-main_register]')
				.getAttribute('href');

			expect(registerHref).toContain('profile.theguardian.com/register');
		});

		test('sign in link should contain correct profile.theguardian.com href', async ({
			page,
		}) => {
			await loadPageWithOverrides(page, standardArticle);

			// set article count to be min number to view gate
			await setArticleCount(page, 3);

			await scrollToGateForLazyLoading(page);

			await expectToBeVisible(page, SIGN_IN_GATE_MAIN_SELECTOR);

			const signInHref = await page
				.locator('[data-testid=sign-in-gate-main_signin]')
				.getAttribute('href');

			expect(signInHref).toContain('profile.theguardian.com/signin');
		});

		test('show cmp ui when privacy settings link is clicked', async ({
			context,
			page,
		}) => {
			// For this test remove the gu-cmp-disabled cookie to ensure cmp is shown
			await clearCookie(context, 'gu-cmp-disabled');

			await loadPageWithOverrides(page, standardArticle);

			await cmpAcceptAll(page);

			// set article count to be min number to view gate
			await setArticleCount(page, 3);

			await scrollToGateForLazyLoading(page);

			await expectToBeVisible(page, SIGN_IN_GATE_MAIN_SELECTOR);

			await page
				.locator('[data-testid=sign-in-gate-main_privacy]')
				.click();

			await expectToBeVisible(page, CMP_LAYER1_IFRAME);

			await expect(
				await getIframeBody(page, CMP_LAYER1_IFRAME),
			).toContainText('Privacy settings');
		});
	});

	test.describe('SignInGate Personalised', () => {
		test('show the main sign in gate if GU_CO_COMPLETE is not present', async ({
			page,
		}) => {
			await loadPageWithOverrides(page, standardArticle, {
				switchOverrides: {
					personaliseSignInGateAfterCheckout: true,
				},
			});

			await setArticleCount(page, 3);

			await scrollToGateForLazyLoading(page);

			await expectToBeVisible(page, SIGN_IN_GATE_MAIN_SELECTOR);

			await expect(
				page.locator(SIGN_IN_GATE_MAIN_SELECTOR),
			).toContainText(GATE_HEADER);

			await expect(
				page.locator(SIGN_IN_GATE_MAIN_SELECTOR),
			).toContainText('It’s still free to read – this is not a paywall');

			await expect(
				page.locator(SIGN_IN_GATE_MAIN_SELECTOR),
			).toContainText(
				'We’re committed to keeping our quality reporting open.',
			);

			await expect(
				page.locator(SIGN_IN_GATE_MAIN_SELECTOR),
			).toContainText('Register for free');
		});

		test('show the main sign in gate if GU_CO_COMPLETE is present but flag is false', async ({
			context,
			page,
		}) => {
			await setGuCOCompleteCookie(context, 'new', 'SupporterPlus');

			await loadPageWithOverrides(page, standardArticle, {
				switchOverrides: {
					personaliseSignInGateAfterCheckout: false,
				},
			});

			await setArticleCount(page, 3);

			await scrollToGateForLazyLoading(page);

			await expectToBeVisible(page, SIGN_IN_GATE_MAIN_SELECTOR);

			await expect(
				page.locator(SIGN_IN_GATE_MAIN_SELECTOR),
			).toContainText(GATE_HEADER);

			const registerHref = await page
				.locator('[data-testid=sign-in-gate-main_register]')
				.getAttribute('href');

			expect(registerHref).toContain('/register?returnUrl=');
			expect(registerHref).toContain('main_variant_');
			expect(registerHref).not.toContain(
				'personalised_new_SupporterPlus',
			);
		});

		test('show the main sign in gate when GU_CO_COMPLETE is present but with invalid contents', async ({
			context,
			page,
		}) => {
			await setGuCOCompleteCookie(context, 'invalid', 'Contribution');

			await loadPageWithOverrides(page, standardArticle, {
				switchOverrides: {
					personaliseSignInGateAfterCheckout: true,
				},
			});

			await setArticleCount(page, 3);

			await scrollToGateForLazyLoading(page);

			await expectToBeVisible(page, SIGN_IN_GATE_MAIN_SELECTOR);

			await expect(
				page.locator(SIGN_IN_GATE_MAIN_SELECTOR),
			).toContainText(GATE_HEADER);

			const registerHref = await page
				.locator('[data-testid=sign-in-gate-main_register]')
				.getAttribute('href');

			expect(registerHref).toContain('/register?returnUrl=');
			expect(registerHref).not.toContain(
				'personalised_new_SupporterPlus',
			);
		});

		test('show personalised copy when when GU_CO_COMPLETE is present and has correct value', async ({
			context,
			page,
		}) => {
			await setGuCOCompleteCookie(context, 'new', 'SupporterPlus');

			await loadPageWithOverrides(page, standardArticle, {
				switchOverrides: {
					personaliseSignInGateAfterCheckout: true,
				},
			});

			await setArticleCount(page, 3);

			await scrollToGateForLazyLoading(page);

			await expectToBeVisible(page, SIGN_IN_GATE_MAIN_SELECTOR);

			await expect(
				page.locator(SIGN_IN_GATE_MAIN_SELECTOR),
			).toContainText(SUBSCRIPTION_HEADER);

			await expect(
				page.locator(SIGN_IN_GATE_MAIN_SELECTOR),
			).toContainText(SIGN_IN_PROMPT);

			// check all the sign-in incentive text copy is present
			for (const signInText of SIGN_IN_INCENTIVES_DIGITAL) {
				await expect(
					page.locator(SIGN_IN_GATE_MAIN_SELECTOR),
				).toContainText(signInText);
			}

			await expect(
				page.locator('[data-testid=sign-in-gate-main_register]'),
			).toContainText(COMPLETE_REGISTRATION_BUTTON);

			const registerHref = await page
				.locator('[data-testid=sign-in-gate-main_register]')
				.getAttribute('href');

			expect(registerHref).toContain('/register?returnUrl=');
			expect(registerHref).toContain('personalised_new_SupporterPlus');
		});
	});
});
