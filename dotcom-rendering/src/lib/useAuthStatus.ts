import { useEffect, useState } from 'react';
import type { AuthStatus } from './identity';
import { getAuthState, getSignedInStatusWithOkta } from './identity';

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
		case 'SignedInWithOkta':
			return true;
		case 'SignedOutWithOkta':
			return false;
	}
};

export const useAuthStatus = (): AuthStatusOrPending => {
	const [authStatus, setAuthStatus] = useState<AuthStatusOrPending>({
		kind: 'Pending',
	});

	useEffect(() => {
		void getAuthState()
			.then((oktaAuthState) => {
				setAuthStatus(getSignedInStatusWithOkta(oktaAuthState));
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);
	return authStatus;
};
