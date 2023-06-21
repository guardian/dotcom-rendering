import type { IdentityAuthState } from '@guardian/identity-auth';
import { useEffect, useState } from 'react';

export type AuthStateStatus = 'Pending' | 'NotInTest' | 'Ready';

async function getAuthState(): Promise<IdentityAuthState> {
	const { isSignInWithOktaAuthState } = await import('./identity');
	const authState = await isSignInWithOktaAuthState();
	return authState;
}

export const useSignedInAuthState = (): [
	AuthStateStatus,
	IdentityAuthState,
] => {
	const [status, setStatus] = useState<AuthStateStatus>('Pending');
	const [authState, setAuthState] = useState<IdentityAuthState>({
		isAuthenticated: false,
	});

	useEffect(() => {
		const isInOktaExperiment =
			window.guardian.config.tests.oktaVariant === 'variant';

		if (isInOktaExperiment) {
			getAuthState()
				.then((result) => {
					setAuthState(result);
					setStatus('Ready');
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			setStatus('NotInTest');
		}
	}, []);

	return [status, authState];
};
