import { getCookie } from '@guardian/libs';
import type { AuthState, OktaAuthOptions } from '@okta/okta-auth-js';
import { OktaAuth } from '@okta/okta-auth-js';
import React, { useEffect, useState } from 'react';

console.log('identity loaded');

interface OktaAuthContextType {
	oktaAuth: OktaAuth;
	authState: AuthState | null;
}

function getStage() {
	if (typeof window !== 'undefined' && !window.guardian.config.isDev) {
		return window.guardian.config.stage;
	} else return 'DEV';
}

const stage = getStage();

console.log('stage', stage);

const CLIENT_ID =
	stage === 'PROD' ? '0oa79m1fmgzrtaHc1417' : '0oa53x6k5wGYXOGzm0x7';

const ISSUER =
	stage === 'PROD'
		? 'https://profile.theguardian.com/oauth2/aus3xgj525jYQRowl417'
		: 'https://profile.code.dev-theguardian.com/oauth2/aus3v9gla95Toj0EE0x7';

function determineREDIRECT_URI() {
	switch (stage) {
		case 'PROD':
			return 'https://www.theguardian.com/ ';
		case 'CODE':
			return 'https://m.code.dev-theguardian.com/';
		case 'DEV':
			return 'http://localhost:3030/';
	}
}

const REDIRECT_URI = determineREDIRECT_URI();
console.log('REDIRECT_URI', REDIRECT_URI);

const config: OktaAuthOptions = {
	clientId: CLIENT_ID,
	issuer: ISSUER,
	redirectUri: REDIRECT_URI,
	scopes: ['openid', 'profile', 'email'],
	pkce: true,
};

const oktaAuthInit = new OktaAuth(config);
// const oktaStart = () => oktaAuthInit.start().catch((err) => {console.log(err)});

async function getSignedInStatus(oktaAuth: OktaAuth, authState: AuthState) {
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
	console.log('useOktaAuth called');
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
			console.error('error in oktaAuthState');
		});
	}, [oktaAuth, authState]);
	return { oktaAuth, authState };
};

function OktaForSignInCheck() {
	console.info('using okta for sign in check');
	const { oktaAuth, authState } = useOktaAuth();
	console.log('HERE');
	console.log(`authState in useOktaForSignInCheck is`);
	console.log(authState);
	console.log('oktaAuth in useOktaForSignInCheck is');
	console.log(oktaAuth);

	const [isSignedIn, setIsSignedIn] = useState(false);
	useEffect(() => {
		(async () => {
			if (authState) {
				setIsSignedIn(await getSignedInStatus(oktaAuth, authState));
			}
		})().catch(() => {
			console.error('error in oktaAuthState');
		});
	}, [authState, oktaAuth]);

	console.log('CheckUserSignInStatus');
	console.log(isSignedIn);
	return isSignedIn;
}

export const CheckUserSignInStatus = (): boolean => {
	const isSignedIn = OktaForSignInCheck();

	return isSignedIn;
};
