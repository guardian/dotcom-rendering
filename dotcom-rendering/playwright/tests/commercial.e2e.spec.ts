import { test } from '@playwright/test';
import { cmpAcceptAll } from '../lib/cmp';
import { loadPage } from '../lib/load-page';
import { expectToExist } from '../lib/locators';

test.describe('Commercial E2E tests', () => {
	test(`It should load the expected number of ad slots`, async ({ page }) => {
		await loadPage({
			page,
			path: `/Article/https://www.theguardian.com/environment/2020/oct/13/maverick-rewilders-endangered-species-extinction-conservation-uk-wildlife`,
		});

		await cmpAcceptAll(page);

		const fixedSlots = [
			'carrot', // Not used often, likely to be unfilled
			'right',
			'merchandising-high',
			'mostpop',
			'merchandising',
		];

		const totalSlotsExpected = 16; // All slots, even if unfilled ie. `display: none`
		const inlineSlots = totalSlotsExpected - fixedSlots.length;

		// We are excluding survey slot as they can be switched off
		await expectToExist(
			page,
			'.js-ad-slot:not([data-name="survey"])',
			totalSlotsExpected,
		);

		// Check all inline slots are present

		for (const i of Array(inlineSlots).keys()) {
			await expectToExist(page, `[data-name="inline${i + 1}"]`);
		}

		// Check all other fixed slots
		for (const slotName of fixedSlots) {
			await expectToExist(page, `[data-name="${slotName}"]`);
		}
	});
});
