
/**
 * Simulate an async request to an email sign-up service.
 *
 * TO DO - replace this function with an actual implementation.
 * This is expected to be implemented using a new Bridget function
 * accessed through the native API, but potentially could also involve
 * the weblayer directly fetching a response from Consent(the identity
 * API).
 *
 * @param emailAddress an unverified email address
 * @param newsletterIdentityName the identityName of a newsletter
 * @returns an object with a status code (500 if the email address has no "." character, otherwise 200) and message string.
 */
export async function fakeRequestToEmailSignupService(
	emailAddress: string,
	newsletterIdentityName: string,
): Promise<{ status: number; message?: string }> {
	await new Promise((r) => {
		setTimeout(r, 1000);
	});

	if (!emailAddress.includes('.')) {
		return {
			status: 500,
			message: 'There was no dot in the email address.',
		};
	}

	return { status: 200, message: `fake signed up to ${newsletterIdentityName}` };
}
