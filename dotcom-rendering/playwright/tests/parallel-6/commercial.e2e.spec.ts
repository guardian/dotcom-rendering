import { test } from '@playwright/test';
import { expectToExist } from 'playwright/lib/locators';
import { cmpAcceptAll } from '../../lib/cmp';
import { loadPage } from '../../lib/load-page';

test.describe('Commercial E2E tests', () => {
	test(`It should load the expected number of ad slots`, async ({ page }) => {
		await loadPage(
			page,
			`/Article/https://www.theguardian.com/environment/2020/oct/13/maverick-rewilders-endangered-species-extinction-conservation-uk-wildlife`,
		);

		await cmpAcceptAll(page);

		// We are excluding survey slot as they can be switched off
		await expectToExist(page, '.js-ad-slot:not([data-name="survey"])', 15);

		// Check all inline slots are present
		for (const i of Array(11).keys()) {
			await expectToExist(page, `[data-name="inline${i + 1}"]`);
		}

		// Check all other fixed slots
		await expectToExist(page, '[data-name="right"]');
		await expectToExist(page, '[data-name="merchandising-high"]');
		await expectToExist(page, '[data-name="mostpop"]');
		await expectToExist(page, '[data-name="merchandising"]');
	});
});
