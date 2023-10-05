import type {
	AccessToken,
	CustomClaims,
	IdentityAuthState,
	IDToken,
} from '@guardian/identity-auth';
import { getIdentityAuth } from '@guardian/identity-auth-frontend';
import { getCookie } from '@guardian/libs';

export type CustomIdTokenClaims = CustomClaims & {
	email: string;
	braze_uuid: string;
};

export async function isSignedInWithOktaAuthState(): Promise<
	IdentityAuthState<never, CustomIdTokenClaims>
> {
	return getIdentityAuth()
		.isSignedInWithAuthState()
		.catch((e) => {
			// eslint-disable-next-line no-console -- we want to log the error to console, not Sentry
			console.error(e);

			return {
				isAuthenticated: false,
				accessToken: undefined,
				idToken: undefined,
			};
		});
}

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

export function getSignedInStatusWithOkta(
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

export function getSignedInStatusWithCookies():
	| SignedOutWithCookies
	| SignedInWithCookies {
	const GU_UCookie = getCookie({ name: 'GU_U', shouldMemoize: true });
	return GU_UCookie === null || GU_UCookie === ''
		? { kind: 'SignedOutWithCookies' }
		: { kind: 'SignedInWithCookies' };
}

export const getAuthStatus = async (): Promise<AuthStatus> => {
	const useOkta = !!window.guardian.config.switches.okta;

	if (useOkta) {
		const authState = await getAuthState();
		return getSignedInStatusWithOkta(authState);
	} else {
		return getSignedInStatusWithCookies();
	}
};
