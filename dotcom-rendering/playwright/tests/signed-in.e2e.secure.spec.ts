import { test } from '@playwright/test';
import { isSecureServerAvailable } from '../lib/secure-server';
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
			// eslint-disable-next-line no-console -- e2e test
			console.log('Secure server is available, running sign-in test');
			await signIn(page, context, path);
			await expectToBeSignedIn(page);
		} else {
			// eslint-disable-next-line no-console -- e2e test
			console.log(
				'Secure server is not available, skipping sign-in test',
			);
		}
	});
});
