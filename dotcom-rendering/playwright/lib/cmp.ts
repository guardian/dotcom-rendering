import type { BrowserContext, Page } from '@playwright/test';
import { addCookie } from './cookies';
import { waitForIsland } from './islands';

const SP_LAYER1_IFRAME = '[id*="sp_message_iframe"]';
const SP_LAYER1_ACCEPT_ALL_BUTTON = 'button.sp_choice_type_11';
const SP_LAYER2_MANAGE_MY_COOKIES_BUTTON = 'button.sp_choice_type_12';

const SP_LAYER2_IFRAME = 'iframe[title="SP Consent Message"]';
const SP_LAYER2_ACCEPT_ALL_BUTTON = 'button.sp_choice_type_ACCEPT_ALL';
const SP_LAYER2_REJECT_ALL_BUTTON = 'button.sp_choice_type_REJECT_ALL';

/**
 * Accept all on the Sourcepoint CMP banner
 */
const cmpAcceptAll = async (page: Page, rootIframe?: string): Promise<void> => {
	// root iframes are used for AMP pages which have two layers of iframes
	const root = rootIframe ? page.frameLocator(rootIframe) : page;
	const acceptAllButton = root
		.frameLocator(SP_LAYER1_IFRAME)
		.locator(SP_LAYER1_ACCEPT_ALL_BUTTON);
	await acceptAllButton.click();
	// wait for consent settings to apply
	await new Promise((r) => setTimeout(r, 2000));
};

/**
 * Reject all on the Sourcepoint CMP banner
 */
const cmpRejectAll = async (page: Page): Promise<void> => {
	const manageMyCookiesButton = page
		.frameLocator(SP_LAYER1_IFRAME)
		.locator(SP_LAYER2_MANAGE_MY_COOKIES_BUTTON);
	await manageMyCookiesButton.click();
	const rejectAllButton = page
		.frameLocator(SP_LAYER2_IFRAME)
		.locator(SP_LAYER2_REJECT_ALL_BUTTON);
	await rejectAllButton.click();
	// wait for consent settings to apply
	await new Promise((r) => setTimeout(r, 2000));
};

/**
 * Reconsent on the Sourcepoint CMP banner
 *
 * Clicks the Privacy Settings link in the footer then the Accept All button
 */
const cmpReconsent = async (page: Page): Promise<void> => {
	await waitForIsland(page, 'PrivacySettingsLink');
	const privacySettingsSelector = '[data-link-name="privacy-settings"]';
	await page.locator(privacySettingsSelector).scrollIntoViewIfNeeded();
	await page.locator(privacySettingsSelector).click();
	const acceptAllButton = page
		.frameLocator(SP_LAYER2_IFRAME)
		.locator(SP_LAYER2_ACCEPT_ALL_BUTTON);
	await acceptAllButton.click();
	// wait for consent settings to apply
	await new Promise((r) => setTimeout(r, 2000));
};

/**
 * Disable CMP
 */
const disableCMP = async (context: BrowserContext): Promise<void> => {
	await addCookie(context, {
		name: 'gu-cmp-disabled',
		value: 'true',
	});
};

export { cmpAcceptAll, cmpReconsent, cmpRejectAll, disableCMP };
