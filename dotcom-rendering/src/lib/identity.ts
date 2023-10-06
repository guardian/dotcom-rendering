import type { CustomClaims, IdentityAuthState } from '@guardian/identity-auth';
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
