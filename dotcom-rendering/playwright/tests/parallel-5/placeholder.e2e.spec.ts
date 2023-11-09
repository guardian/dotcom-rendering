import { expect, test } from '@playwright/test';
import { disableCMP } from '../../lib/cmp';
import { loadPage } from '../../lib/load-page';

const article =
	'https://www.theguardian.com/uk-news/2021/jun/04/police-flabbergasted-at-time-it-took-london-bridge-terrorist-to-die-inquest-hears';

// Placeholder for parallel 5 tests to stop Playwright erroring that no tests were found
// Remove once parallel 5 tests exist
test.describe('Placeholder for parallel 5', () => {
	test('placeholder', async ({ context, page }) => {
		await disableCMP(context);
		await loadPage(page, `/Article/${article}`);
		await expect(page.getByText('Police ‘flabbergasted’')).toBeVisible();
	});
});
