import type {
	AccessToken,
	IdentityAuthState,
	IDToken,
} from '@guardian/identity-auth';
import { getCookie } from '@guardian/libs';
import { useEffect, useState } from 'react';
import type { CustomIdTokenClaims } from './identity';

type OktaAuthState = IdentityAuthState<never, CustomIdTokenClaims>;

type SignedOutWithCookies = { kind: 'SignedOutWithCookies' };
export type SignedInWithCookies = { kind: 'SignedInWithCookies' };
type SignedOutWithOkta = { kind: 'SignedOutWithOkta' };
export type SignedInWithOkta = {
	kind: 'SignedInWithOkta';
	accessToken: AccessToken<never>;
	idToken: IDToken<CustomIdTokenClaims>;
};

export type AuthStatus =
	| { kind: 'Pending' }
	| SignedOutWithCookies
	| SignedInWithCookies
	| SignedOutWithOkta
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

export async function getAuthState(): Promise<OktaAuthState> {
	const { isSignedInWithOktaAuthState } = await import('./identity');
	const authState = await isSignedInWithOktaAuthState();
	return authState;
}

export async function eitherInOktaTestOrElse<A, B>(
	inOktaTestFunction: (authState: OktaAuthState) => A,
	notInOktaTestFunction: () => B,
): Promise<A | B> {
	const useOkta = !!window.guardian.config.switches.okta;

	if (useOkta) {
		const authState = await getAuthState();
		return inOktaTestFunction(authState);
	} else {
		return notInOktaTestFunction();
	}
}

function getSignedInStatusWithOkta(
	authState: OktaAuthState,
): SignedOutWithOkta | SignedInWithOkta {
	if (authState.isAuthenticated) {
		return {
			kind: 'SignedInWithOkta',
			accessToken: authState.accessToken,
			idToken: authState.idToken,
		};
	}

	return { kind: 'SignedOutWithOkta' };
}

function getSignedInStatusWithCookies():
	| SignedOutWithCookies
	| SignedInWithCookies {
	const GU_UCookie = getCookie({ name: 'GU_U', shouldMemoize: true });
	return GU_UCookie === null || GU_UCookie === ''
		? { kind: 'SignedOutWithCookies' }
		: { kind: 'SignedInWithCookies' };
}

export const useAuthStatus = (): AuthStatus => {
	const [authStatus, setAuthStatus] = useState<AuthStatus>({
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
