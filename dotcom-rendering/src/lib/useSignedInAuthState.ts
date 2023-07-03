import type {
	AccessToken,
	IdentityAuthState,
	IDToken,
} from '@guardian/identity-auth';
import { useEffect, useState } from 'react';
import type { CustomIdTokenClaims } from './identity';

type SignedInWithCookies = { kind: 'SignedInWithCookies' };
type SignedInWithOkta = {
	kind: 'SignedInWithOkta';
	accessToken: AccessToken<never>;
	idToken: IDToken<CustomIdTokenClaims>;
};

type AuthStatus =
	| { kind: 'Pending' }
	| { kind: 'SignedOutWithCookies' }
	| SignedInWithCookies
	| { kind: 'SignedOutWithOkta' }
	| SignedInWithOkta;

export const getOptionsHeadersWithOkta = (
	authStatus: SignedInWithCookies | SignedInWithOkta,
): RequestInit => {
	if (authStatus.kind === 'SignedInWithCookies') {
		return {
			credentials: 'include',
		};
	}

	return {
		headers: {
			Authorization: `Bearer ${authStatus.accessToken.accessToken}`,
			'X-GU-IS-OAUTH': 'true',
		},
	};
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
