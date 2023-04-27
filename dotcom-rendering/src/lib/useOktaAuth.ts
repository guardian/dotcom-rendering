import type { AuthState, OktaAuth } from '@okta/okta-auth-js';
import React, { useEffect, useState } from 'react';
import { isLoggedIn, oktaAuthInit } from './identity';

interface OktaAuthContextType {
	oktaAuth: OktaAuth;
	authState: AuthState | null;
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
    return {oktaAuth, authState}
};



export const CheckSignedIn = (): boolean => {

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

	console.log("checkSignedIn");
	console.log(isSignedIn);



return isSignedIn ? true : false}