import { getCookie } from '@guardian/libs';
import type { AuthState, OktaAuthOptions } from '@okta/okta-auth-js';
import { OktaAuth } from '@okta/okta-auth-js';

const CLIENT_ID = '0oa53x6k5wGYXOGzm0x7';
const ISSUER =
	'https://profile.code.dev-theguardian.com/oauth2/aus3v9gla95Toj0EE0x7';
// BASENAME includes trailing slash
const REDIRECT_URI = `http://localhost:3030/`;

const config: OktaAuthOptions = {
	clientId: CLIENT_ID,
	issuer: ISSUER,
	redirectUri: REDIRECT_URI,
	scopes: ['openid', 'profile', 'email'],
	pkce: true,
};

export const oktaAuthInit = new OktaAuth(config);

export async function isLoggedIn(oktaAuth: OktaAuth, authState: AuthState) {
	console.log('using isLoggedIn function');
	if (ifSignedOutClearTokens(oktaAuth)) {
		console.log('signed out and cleared tokens');
		return false;
	}
	return await checkIfSignedIn(authState, oktaAuth);
}

export function ifSignedOutClearTokens(oktaAuth: OktaAuth) {
	if (getCookie({ name: 'GU_SO' })) {
		oktaAuth.tokenManager.clear();
		return true;
	}
	return false;
}

export async function checkIfSignedIn(
	authState: AuthState,
	oktaAuth: OktaAuth,
) {
	if (authState.isAuthenticated) {
		console.log('is authenticated with tokens');
		return true;
	}
	if (getCookie({ name: 'GU_U' })) {
		console.log('has GU_U cookie');
		try {
			const res = await oktaAuth.token.getWithoutPrompt();
			console.log('got refreshed tokens');
			console.log(res.tokens);
			oktaAuth.tokenManager.setTokens(res.tokens);
			return true;
		} catch (err: unknown) {
			console.log('reached token error');
			console.error(err);
			return false;
		}
	}
	return false;
}
