import { expect, test } from '@playwright/test';
import { cmpAcceptAll, cmpRejectAll } from '../../lib/cmp';
import { loadPage } from '../../lib/load-page';

const firstPage =
	'https://www.theguardian.com/uk-news/2021/jun/04/police-flabbergasted-at-time-it-took-london-bridge-terrorist-to-die-inquest-hears';

test.describe('Consent tests', () => {
	test('should make calls to Google Analytics after the reader consents', async ({
		page,
	}) => {
		await loadPage(page, `/Article/${firstPage}`);
		// Assert ga is undefined before any user consent has been given
		expect(await page.evaluate(() => window.ga)).toBeUndefined();
		// Accept all
		await cmpAcceptAll(page);
		// Make a second page load now that we have the CMP cookies set to accept tracking
		// Wait for a call to Google Analytics to be made now that consent has been given
		const gaRquestPromise = page.waitForRequest(
			'https://www.google-analytics.com/**',
		);
		await page.reload();
		await gaRquestPromise;
	});

	test('should not add GA tracking scripts onto the window object after the reader rejects consent', async ({
		page,
	}) => {
		await loadPage(page, `/Article/${firstPage}`);
		// Assert ga is undefined before any user consent has been given
		expect(await page.evaluate(() => window.ga)).toBeUndefined();
		// Reject all
		await cmpRejectAll(page);
		// Make a second page load now that we have the CMP cookies set to reject tracking
		// Assert ga is still undefined as consent has not been given
		// Using falsy as ga can be null or undefined for an unknown reason
		await page.reload();
		expect(await page.evaluate(() => window.ga)).toBeFalsy();
	});
});
