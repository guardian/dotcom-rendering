import { randomUUID } from 'node:crypto';
import type { BrowserContext, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { cmpAcceptAll } from './cmp';
import { loadPage } from './load-page';
import { expectToExist } from './locators';

type IDAPITestUserOptions = {
	primaryEmailAddress?: `${string}@theguardian.com`;
	isUserEmailValidated?: boolean;
	socialLinks?: Array<{
		socialId: number;
		network: 'facebook' | 'apple' | 'google';
	}>;
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
	// const configOverrides = {
	// stage: 'CODE',
	// isDev: true,
	// idApiUrl: 'https://idapi.code.dev-theguardian.com',
	// idUrl: 'https://profile.code.dev-theguardian.com',
	// };

	// load the page and CMP accept all
	await loadPage({
		page,
		path,
		useSecure: true,
		// overrides: { configOverrides },
		waitUntil: 'load',
	});
	await cmpAcceptAll(page);

	// create a test user in the CODE environment
	await page.goto('https://profile.code.dev-theguardian.com', {
		waitUntil: 'load',
	});

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

	// wait for the redirect to CODE domain
	// in CI this will redirect to /us so use a glob pattern
	await page.waitForURL('https://m.code.dev-theguardian.com/**', {
		waitUntil: 'domcontentloaded',
	});

	// create the GU_U cookie to simulate a signed-in user
	await context.addCookies([
		{
			name: 'GU_U',
			value: 'true',
			expires: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // unix timestamp 1 year from now
			domain: 'r.thegulocal.com',
			path: '/',
		},
	]);

	// navigate back to the original path
	await loadPage({
		page,
		path,
		useSecure: true,
		// overrides: { configOverrides },
		waitUntil: 'load',
	});
};

const expectToBeSignedIn = async (page: Page): Promise<void> => {
	await expect(
		page
			.locator(`gu-island[name="TopBar"]`)
			.first()
			.getByText('My account'),
	).toBeVisible();
};

export { createTestUser, expectToBeSignedIn, signIn };
