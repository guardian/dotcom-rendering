import { expect, test } from '@playwright/test';
import { signIn } from 'playwright/lib/sign-in';
import { Standard as standardArticle } from '../../fixtures/generated/fe-articles/Standard';
import { disableCMP } from '../lib/cmp';
import { waitForIsland } from '../lib/islands';
import { loadPage, loadPageWithOverrides } from '../lib/load-page';

test.describe('Signed in readers', () => {
	test('should not display signed in texts when users are not signed in', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPageWithOverrides(page, standardArticle);

		await waitForIsland(page, 'DiscussionWeb');

		// Check that the discussion container is showing the reader as signed out
		const discussionText = await page
			.locator('[data-testid=discussion]')
			.textContent();

		expect(discussionText).toContain(
			'Sign in or create your Guardian account to join the discussion',
		);
	});

	test.only('should sign in a user and display account details', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPage({
			page,
			path: `/Article/https://www.theguardian.com/politics/2019/oct/29/tories-restore-party-whip-to-10-mps-who-sought-to-block-no-deal-brexit`,
		});
		await signIn(page, context);
	});
});
