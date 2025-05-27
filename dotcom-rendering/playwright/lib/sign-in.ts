import { randomUUID } from 'node:crypto';
import type { BrowserContext, Page } from '@playwright/test';
import { loadPage } from './load-page';
import { expectToExist } from './locators';

type Networks = 'facebook' | 'apple' | 'google';

type SocialLink = {
	socialId: number;
	network: Networks;
};

type IDAPITestUserOptions = {
	primaryEmailAddress?: `${string}@theguardian.com`;
	isUserEmailValidated?: boolean;
	socialLinks?: SocialLink[];
	password?: string;
	deleteAfterMinute?: boolean;
	isGuestUser?: boolean;
	doNotSetUsername?: boolean;
};

type IDAPITestUserResponse = [
	{
		key: 'GU_U';
		value: string;
	},
	{
		key: 'SC_GU_LA';
		sessionCookie: boolean;
		value: string;
	},
	{
		key: 'SC_GU_U';
		value: string;
	},
];

type IDAPITestUser = {
	email: string;
	cookies: IDAPITestUserResponse;
	password: string;
};

const createTestUser = async (): Promise<IDAPITestUser> => {
	try {
		if (!process.env.IDAPI_CLIENT_ACCESS_TOKEN) {
			throw new Error(
				'IDAPI_CLIENT_ACCESS_TOKEN environment variable is not set',
			);
		}
		const email = `dcr-e2e-${randomUUID()}@theguardian.com`;
		const password = randomUUID();
		const response = await fetch(
			'https://idapi.code.dev-theguardian.com/user/test',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-GU-ID-Client-Access-Token': `Bearer ${process.env.IDAPI_CLIENT_ACCESS_TOKEN}`,
				},
				body: JSON.stringify({
					primaryEmailAddress: email,
					isUserEmailValidated: true,
					socialLinks: [],
					password,
					deleteAfterMinute: true,
					isGuestUser: false,
					doNotSetUsername: false,
				} as IDAPITestUserOptions),
			},
		);

		if (!response.ok) {
			throw new Error(
				`Failed to create IDAPI test user: ${response.statusText}`,
			);
		}

		const responseBody = (await response.json()) as {
			values: IDAPITestUserResponse;
		};

		return {
			email,
			cookies: responseBody.values,
			password,
		};
	} catch (error) {
		throw new Error(`Failed to create IDAPI test user: ${String(error)}`);
	}
};

const signIn = async (
	page: Page,
	context: BrowserContext,
	path: string,
): Promise<void> => {
	const PROFILE_URL_CODE = 'https://profile.code.dev-theguardian.com';

	await page.goto(PROFILE_URL_CODE);
	await page.waitForLoadState('load');

	await page.click('text="Sign in"');

	await page.waitForLoadState('load');
	await expectToExist(page, 'a:text("Sign in with a password instead")');

	const { email, password } = await createTestUser();

	await page.fill('input[name=email]', email);
	await page.click('a:text("Sign in with a password instead")');

	await page.waitForLoadState('load');
	await expectToExist(page, '[data-cy="main-form-submit-button"]');

	await page.fill('input[name=password]', password);
	await page.click('[data-cy="main-form-submit-button"]');

	await page.waitForURL('https://m.code.dev-theguardian.com/uk');
	await page.waitForLoadState('load');

	await context.addCookies([
		{
			name: 'GU_U',
			value: 'true',
			expires: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // unix timestamp 1 year from now
			domain: 'r.thegulocal.com',
			path: '/',
		},
	]);

	await loadPage({ page, path, useSecure: true });
	await page.waitForLoadState('load');
};

export { createTestUser, signIn };
