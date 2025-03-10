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

type SignedOutWithOkta = { kind: 'SignedOutWithOkta' };
export type SignedInWithOkta = {
	kind: 'SignedInWithOkta';
	accessToken: AccessToken<never>;
	idToken: IDToken<CustomIdTokenClaims>;
};

export type AuthStatus = SignedOutWithOkta | SignedInWithOkta;

export const getOptionsHeadersWithOkta = (
	authStatus: SignedInWithOkta,
): RequestInit => {
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

export const isUserLoggedInOktaRefactor = (): Promise<boolean> =>
	getAuthStatus().then((authStatus) =>
		authStatus.kind === 'SignedInWithOkta' ? true : false,
	);

export const getAuthStatus = async (): Promise<AuthStatus> => {
	const authState = await getAuthState();
	return getSignedInStatusWithOkta(authState);
};
