import type {
	AccessToken,
	CustomClaims,
	IdentityAuthState,
	IDToken,
} from '@guardian/identity-auth';
import { getIdentityAuth } from '@guardian/identity-auth-frontend';

export type CustomIdTokenClaims = CustomClaims & {
	email: string;
	braze_uuid: string;
};

export async function isSignedInAuthState(): Promise<
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

type AuthState = IdentityAuthState<never, CustomIdTokenClaims>;

type SignedOut = { kind: 'SignedOut' };
export type SignedIn = {
	kind: 'SignedIn';
	accessToken: AccessToken<never>;
	idToken: IDToken<CustomIdTokenClaims>;
};

export type AuthStatus = SignedOut | SignedIn;

export const getOptionsHeaders = (authStatus: SignedIn): RequestInit => {
	return {
		headers: {
			Authorization: `Bearer ${authStatus.accessToken.accessToken}`,
			'X-GU-IS-OAUTH': 'true',
		},
	};
};

export async function getAuthState(): Promise<AuthState> {
	const authState = await isSignedInAuthState();
	return authState;
}

export function getSignedInStatus(authState: AuthState): SignedOut | SignedIn {
	if (authState.isAuthenticated) {
		return {
			kind: 'SignedIn',
			accessToken: authState.accessToken,
			idToken: authState.idToken,
		};
	}

	return { kind: 'SignedOut' };
}

export const isUserLoggedIn = (): Promise<boolean> =>
	getAuthStatus().then((authStatus) =>
		authStatus.kind === 'SignedIn' ? true : false,
	);

export const getAuthStatus = async (): Promise<AuthStatus> => {
	const authState = await getAuthState();
	return getSignedInStatus(authState);
};
