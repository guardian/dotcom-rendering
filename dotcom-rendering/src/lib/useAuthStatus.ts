import { useEffect, useState } from 'react';
import type { AuthStatus } from './identity';
import {
	eitherInOktaTestOrElse,
	getSignedInStatusWithCookies,
	getSignedInStatusWithOkta,
} from './identity';

export type AuthStatusOrPending = AuthStatus | { kind: 'Pending' };

/**
 * A hook to find out if a user is signed in.
 * Returns `'Pending'` until status is known.
 * Always returns `'Pending'` during server-side rendering.
 * */
export const useIsSignedIn = (): boolean | 'Pending' => {
	const authStatus = useAuthStatus();
	switch (authStatus.kind) {
		case 'Pending':
			return 'Pending';
		case 'SignedInWithCookies':
		case 'SignedInWithOkta':
			return true;
		case 'SignedOutWithCookies':
		case 'SignedOutWithOkta':
			return false;
	}
};

export const useAuthStatus = (): AuthStatusOrPending => {
	const [authStatus, setAuthStatus] = useState<AuthStatusOrPending>({
		kind: 'Pending',
	});

	useEffect(() => {
		eitherInOktaTestOrElse(
			(oktaAuthState) => {
				setAuthStatus(getSignedInStatusWithOkta(oktaAuthState));
			},
			() => setAuthStatus(getSignedInStatusWithCookies()),
		).catch((error) => {
			console.error(error);
		});
	}, []);

	return authStatus;
};
