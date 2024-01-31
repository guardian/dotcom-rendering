import { expect, test } from '@playwright/test';
import { Standard as standardArticle } from '../../fixtures/generated/articles/Standard';
import { disableCMP } from '../lib/cmp';
import { addCookie } from '../lib/cookies';
import { waitForIsland } from '../lib/islands';
import { loadPageNoOkta } from '../lib/load-page';
import { stubResponse } from '../lib/network';

const profileResponse = {
	status: 'ok',
	userProfile: {
		userId: '102309223',
		displayName: 'Guardian User',
		webUrl: 'https://profile.theguardian.com/user/id/102309223',
		apiUrl: 'https://discussion.guardianapis.com/discussion-api/profile/102309223',
		avatar: 'https://avatar.guim.co.uk/user/102309223',
		secureAvatarUrl: 'https://avatar.guim.co.uk/user/102309223',
		badge: [],
		privateFields: {
			canPostComment: true,
			isPremoderated: false,
			hasCommented: false,
		},
	},
};

const idapiIdentifiersResponse = {
	id: '000000000',
	brazeUuid: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
	puzzleUuid: 'aaaaaaaaaaaa',
	googleTagId: 'aaaaaaaaaaaa',
};

test.describe('Signed in readers', () => {
	test('should display the correct page state for signed in users', async ({
		context,
		page,
	}) => {
		// Fake login
		await addCookie(context, { name: 'GU_U', value: 'true' });

		// Mock call to '/user/me/identifiers'
		const idapiReponseProfile = stubResponse(
			page,
			'**/user/me/identifiers',
			{
				json: idapiIdentifiersResponse,
			},
		);

		// Mock call to 'profile/me'
		const profileResponsePromise = stubResponse(
			page,
			'**/profile/me?strict_sanctions_check=false',
			{
				json: profileResponse,
			},
		);

		await disableCMP(context);
		await loadPageNoOkta(page, standardArticle);

		await idapiReponseProfile;
		await profileResponsePromise;

		// This text is shown in the header for signed in users
		await expect(page.getByText('My account')).toBeVisible();
	});

	test('should have the correct urls for the header links', async ({
		context,
		page,
	}) => {
		// Fake login
		await addCookie(context, { name: 'GU_U', value: 'true' });

		await addCookie(context, {
			name: 'gu_hide_support_messaging',
			value: 'true',
		});

		// Mock call to 'profile/me'
		const profileResponsePromise = stubResponse(
			page,
			'**/profile/me?strict_sanctions_check=false',
			{
				json: profileResponse,
			},
		);

		await disableCMP(context);
		await loadPageNoOkta(page, standardArticle);

		await profileResponsePromise;

		expect(
			await page
				.locator('a[data-link-name="nav3 : topbar : printsubs"]')
				.getAttribute('href'),
		).toContain('support.theguardian.com/subscribe');

		expect(
			await page
				.locator('a[data-link-name="nav3 : job-cta"]')
				.getAttribute('href'),
		).toContain('https://jobs.theguardian.com');

		expect(
			await page
				.locator('a[data-link-name="nav3 : search"]')
				.getAttribute('href'),
		).toContain(
			'https://www.google.co.uk/advanced_search?q=site:www.theguardian.com',
		);
	});

	test('should not display signed in texts when users are not signed in', async ({
		context,
		page,
	}) => {
		await disableCMP(context);
		await loadPageNoOkta(page, standardArticle);

		await waitForIsland(page, 'DiscussionContainer');

		// Check that the discussion container is showing the reader as signed out
		const discussionText = await page
			.locator('[data-testid=discussion]')
			.textContent();

		expect(discussionText).toContain(
			'Sign in or create your Guardian account to join the discussion',
		);
	});
});
