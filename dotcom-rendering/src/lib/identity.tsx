import { getCookie } from '@guardian/libs';
import type { AuthState, OktaAuthOptions } from '@okta/own-lib';
import { OktaAuth } from '@okta/own-lib';
import React, { useEffect, useState } from 'react';

interface OktaAuthContextType {
	oktaAuth: OktaAuth;
	authState: AuthState | null;
}

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

const oktaAuthInit = new OktaAuth(config);

async function isLoggedIn(oktaAuth: OktaAuth, authState: AuthState) {
	console.log('using isLoggedIn function');
	if (ifSignedOutClearTokens(oktaAuth)) {
		console.log('signed out and cleared tokens');
		return false;
	}
	return await checkIfSignedIn(authState, oktaAuth);
}

function ifSignedOutClearTokens(oktaAuth: OktaAuth) {
	if (getCookie({ name: 'GU_SO' })) {
		oktaAuth.tokenManager.clear();
		return true;
	}
	return false;
}

async function checkIfSignedIn(authState: AuthState, oktaAuth: OktaAuth) {
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

const useOktaAuth = (): OktaAuthContextType => {
	const oktaAuth = oktaAuthInit;
	const [authState, setAuthState] = React.useState<AuthState | null>(() => {
		return oktaAuth.authStateManager.getAuthState();
	});

	React.useEffect(() => {
		async function oktaAuthState() {
			// Update Security provider with latest authState
			const currentAuthState = oktaAuth.authStateManager.getAuthState();
			if (currentAuthState !== authState) {
				setAuthState(currentAuthState);
			}
			const handler = (newAuthState: AuthState) => {
				setAuthState(newAuthState);
			};
			oktaAuth.authStateManager.subscribe(handler);

			// Trigger an initial change event to make sure authState is latest
			await oktaAuth.start();

			return () => {
				oktaAuth.authStateManager.unsubscribe(handler);
			};
		}
		oktaAuthState().catch(() => {
			console.log('error in oktaAuthState');
		});
	}, [oktaAuth, authState]);
	return { oktaAuth, authState };
};

export const CheckUserSignInStatus = (): boolean => {
	const { oktaAuth, authState } = useOktaAuth();
	console.log(authState);
	console.log(oktaAuth);

	const [isSignedIn, setIsSignedIn] = useState(false);
	useEffect(() => {
		(async () => {
			if (authState) {
				setIsSignedIn(await isLoggedIn(oktaAuth, authState));
			}
		})().catch(() => {
			console.log('error in oktaAuthState');
		});
	}, [authState, oktaAuth]);

	console.log('checkSignedIn');
	console.log(isSignedIn);

	return isSignedIn ? true : false;
};
