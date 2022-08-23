// TO DO - add the domain for the sign-up endpoint to the content security policy
// 'connect-src' attribute.
//apps-rendering/src/server/csp.ts
export async function fakeRequestToEmailSignupService(
	emailAddress: string,
	newsletterId: string,
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

	return { status: 200, message: `fake signed up to ${newsletterId}` };
}
