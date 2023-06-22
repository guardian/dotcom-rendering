import type { IdentityAuthState } from '@guardian/identity-auth';
import { useEffect, useState } from 'react';
import type { CustomIdTokenClaims } from './identity';

type AuthStatus =
	| { kind: 'Pending' }
	| { kind: 'NotInTest' }
	| {
			kind: 'Ready';
			authState: IdentityAuthState<never, CustomIdTokenClaims>;
	  };

export const getOptionsHeadersWithOkta = (
	authStatus: AuthStatus,
): RequestInit => {
	if (authStatus.kind === 'NotInTest') {
		return {
			credentials: 'include',
		};
	}

	if (
		authStatus.kind === 'Ready' &&
		authStatus.authState.accessToken?.accessToken
	) {
		return {
			headers: {
				Authorization: `Bearer ${authStatus.authState.accessToken.accessToken}`,
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

export const useSignedInAuthState = (): AuthStatus => {
	const [authStateStatus, setAuthStateStatus] = useState<AuthStatus>({
		kind: 'Pending',
	});

	useEffect(() => {
		eitherSignedInWithOktaOrElse(
			(state) => {
				setAuthStateStatus({
					kind: 'Ready',
					authState: state,
				});
			},
			() => setAuthStateStatus({ kind: 'NotInTest' }),
		).catch((error) => {
			console.error(error);
		});
	}, []);

	return authStateStatus;
};
