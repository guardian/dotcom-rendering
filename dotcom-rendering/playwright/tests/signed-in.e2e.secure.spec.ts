import { test } from '@playwright/test';
import { cmpAcceptAll } from '../lib/cmp';
import { loadPage } from '../lib/load-page';
import { isSecureServerAvailable } from '../lib/secure';
import { expectToBeSignedIn, signIn } from '../lib/sign-in';

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
			await expectToBeSignedIn(page);
		} else {
			// eslint-disable-next-line no-console -- e2e test
			console.info(
				'Secure server is not available, skipping secure sign-in test',
			);
		}
	});
});
