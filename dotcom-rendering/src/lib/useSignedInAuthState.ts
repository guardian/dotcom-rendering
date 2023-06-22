import type { IdentityAuthState } from '@guardian/identity-auth';
import { useEffect, useState } from 'react';
import type { CustomIdTokenClaims } from './identity';

export type AuthStateStatus = 'Pending' | 'NotInTest' | 'Ready';

export const getOptionsHeadersWithOkta = (
	status: AuthStateStatus,
	state: IdentityAuthState,
): RequestInit => {
	if (status === 'NotInTest') {
		return {
			credentials: 'include',
		};
	}

	if (status === 'Ready' && state.accessToken?.accessToken) {
		return {
			headers: {
				Authorization: `Bearer ${state.accessToken.accessToken}`,
			},
		};
	}

	return {};
};

export async function getAuthState(): Promise<
	IdentityAuthState<never, CustomIdTokenClaims>
> {
	const { isSignedInWithOktaAuthState } = await import('./identity');
	const authState = await isSignedInWithOktaAuthState();
	return authState;
}

export async function eitherSignedInWithOktaOrElse<A, B>(
	inOktaTestFunction: (
		authState: IdentityAuthState<never, CustomIdTokenClaims>,
	) => A,
	notInOktaTestFunction: () => B,
): Promise<A | B> {
	const isInOktaExperiment =
		window.guardian.config.tests.oktaVariant === 'variant';

	if (isInOktaExperiment) {
		const authState = await getAuthState();
		return inOktaTestFunction(authState);
	} else {
		return notInOktaTestFunction();
	}
}

export const useSignedInAuthState = (): [
	AuthStateStatus,
	IdentityAuthState<never, CustomIdTokenClaims>,
] => {
	const [authStateStatus, setAuthStateStatus] =
		useState<AuthStateStatus>('Pending');
	const [authState, setAuthState] = useState<
		IdentityAuthState<never, CustomIdTokenClaims>
	>({
		isAuthenticated: false,
	});

	useEffect(() => {
		eitherSignedInWithOktaOrElse(
			(state) => {
				setAuthState(state);
				setAuthStateStatus('Ready');
			},
			() => setAuthStateStatus('NotInTest'),
		).catch((error) => {
			console.error(error);
		});
	}, []);

	return [authStateStatus, authState];
};
