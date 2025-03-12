import { expect, test } from '@playwright/test';
import { Standard as standardArticle } from '../../fixtures/generated/fe-articles/Standard';
import { disableCMP } from '../lib/cmp';
import { waitForIsland } from '../lib/islands';
import { loadPageNoOkta } from '../lib/load-page';

test.describe('Signed in readers', () => {
	test('should not display signed in texts when users are not signed in', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPageNoOkta(page, standardArticle);

		await waitForIsland(page, 'DiscussionWeb');

		// Check that the discussion container is showing the reader as signed out
		const discussionText = await page
			.locator('[data-testid=discussion]')
			.textContent();

		expect(discussionText).toContain(
			'Sign in or create your Guardian account to join the discussion',
		);
	});
});
