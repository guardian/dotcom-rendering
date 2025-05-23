import { expect, test } from '@playwright/test';
import { Standard as standardArticle } from '../../fixtures/generated/fe-articles/Standard';
import { disableCMP } from '../lib/cmp';
import { waitForIsland } from '../lib/islands';
import {
	fetchAndloadPageWithOverrides,
	loadPageWithOverrides,
} from '../lib/load-page';
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
			'/commentisfree/2025/jan/14/bradford-radical-culture-city-of-culture-bronte';
		const secureServerAvailable = await isSecureServerAvailable();
		if (secureServerAvailable) {
			await disableCMP(context);
			await fetchAndloadPageWithOverrides(
				page,
				`https://www.theguardian.com${path}`,
				{
					configOverrides: {
						idUrl: 'https://profile.thegulocal.com',
					},
				},
				{
					useSecure: true,
				},
			);
			await signIn(page, context, path);
		}
	});
});
