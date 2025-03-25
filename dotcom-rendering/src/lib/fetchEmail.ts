import { getAuthState } from './identity';

const getEmail = async (): Promise<string | undefined> => {
	const authState = await getAuthState();
	return authState.idToken?.claims.email;
};

/**
 * Fetches a signed in user's email address from Okta token.
 * Returns null if no email address is found or if the request times out after 1 second.
 */
export const lazyFetchEmailWithTimeout =
	(): (() => Promise<string | null>) => () => {
		return new Promise((resolve) => {
			setTimeout(() => resolve(null), 1000);
			void getEmail().then((email) => {
				resolve(email ?? null);
			});
		});
	};
