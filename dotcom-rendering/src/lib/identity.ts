import type { CustomClaims, IdentityAuthState } from '@guardian/identity-auth';
import { getIdentityAuth } from '@guardian/identity-auth-frontend';
import { reportError } from '../client/sentryLoader/sentry';

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
			if (e instanceof Error) {
				reportError(e, 'okta');
			}

			return {
				isAuthenticated: false,
				accessToken: undefined,
				idToken: undefined,
			};
		});
}
