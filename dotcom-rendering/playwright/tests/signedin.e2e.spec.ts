import { expect, test } from '@playwright/test';
import { Standard as standardArticle } from '../../fixtures/generated/fe-articles/Standard';
import { cmpAcceptAll, disableCMP } from '../lib/cmp';
import { waitForIsland } from '../lib/islands';
import { loadPage, loadPageWithOverrides } from '../lib/load-page';
import { isSecureServerAvailable } from '../lib/secure';
import { signIn } from '../lib/sign-in';

test.describe('Signed out readers', () => {
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
});

test.describe('Signed in readers', () => {
	test('should sign in a user and display account details', async ({
		context,
		page,
	}) => {
		const path =
			'/Article/https://www.theguardian.com/commentisfree/2025/jan/14/bradford-radical-culture-city-of-culture-bronte';
		const secureServerAvailable = await isSecureServerAvailable();
		if (secureServerAvailable) {
			await loadPage({ page, path, useSecure: true });
			await cmpAcceptAll(page);
			await signIn(page, context, path);
		}
	});
});
