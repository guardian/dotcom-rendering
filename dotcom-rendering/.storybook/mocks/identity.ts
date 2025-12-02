/**
 * Mock identity module for Storybook.
 *
 * This allows stories to control the authentication state
 * by setting window.__STORYBOOK_AUTH_STATE__ before rendering.
 */

import type { AuthStatus, SignedIn } from '../../src/lib/identity';

// Extend window type for our mock
declare global {
	interface Window {
		__STORYBOOK_AUTH_STATE__?: 'SignedIn' | 'SignedOut';
	}
}

const mockAccessToken = {
	expiresAt: Date.now() / 1000 + 3600,
	scopes: ['openid', 'profile', 'email'],
	clockSkew: 0,
	accessToken: 'mock-access-token-for-storybook',
	claims: {
		aud: 'guardian-frontend',
		auth_time: Date.now() / 1000,
		cid: 'guardian-frontend',
		exp: Date.now() / 1000 + 3600,
		iat: Date.now() / 1000,
		iss: 'https://profile.theguardian.com',
		jti: 'mock-jti',
		scp: ['openid', 'profile', 'email'],
		sub: 'mock-user-id',
		uid: 'mock-uid',
		ver: 1,
		email_validated: true,
		identity_username: 'storybook-user',
		legacy_identity_id: 'mock-legacy-id',
		user_groups: [],
	},
	tokenType: 'Bearer' as const,
};

const mockIdToken = {
	idToken: 'mock-id-token-for-storybook',
	issuer: 'https://profile.theguardian.com',
	clientId: 'guardian-frontend',
	nonce: 'mock-nonce',
	clockSkew: 0,
	expiresAt: Date.now() / 1000 + 3600,
	scopes: ['openid', 'profile', 'email'],
	claims: {
		aud: 'guardian-frontend',
		auth_time: Date.now() / 1000,
		exp: Date.now() / 1000 + 3600,
		iat: Date.now() / 1000,
		iss: 'https://profile.theguardian.com',
		sub: 'mock-user-id',
		identity_username: 'storybook-user',
		email_validated: true,
		email: 'storybook@example.com',
		braze_uuid: 'mock-braze-uuid',
		user_groups: [],
		legacy_identity_id: 'mock-legacy-id',
		amr: ['pwd'],
		at_hash: 'mock-at-hash',
		idp: 'guardian',
		jti: 'mock-jti',
		name: 'Storybook User',
		nonce: 'mock-nonce',
		ver: 1,
	},
};

export async function getAuthState() {
	const authState = window.__STORYBOOK_AUTH_STATE__ ?? 'SignedOut';

	if (authState === 'SignedIn') {
		return {
			isAuthenticated: true,
			accessToken: mockAccessToken,
			idToken: mockIdToken,
		};
	}

	return {
		isAuthenticated: false,
		accessToken: undefined,
		idToken: undefined,
	};
}

export function getSignedInStatus(authState: {
	isAuthenticated: boolean;
	accessToken?: typeof mockAccessToken;
	idToken?: typeof mockIdToken;
}): AuthStatus {
	if (
		authState.isAuthenticated &&
		authState.accessToken &&
		authState.idToken
	) {
		return {
			kind: 'SignedIn',
			accessToken: authState.accessToken,
			idToken: authState.idToken,
		} as unknown as SignedIn;
	}

	return { kind: 'SignedOut' };
}

export const getOptionsHeaders = (authStatus: SignedIn): RequestInit => {
	return {
		headers: {
			Authorization: `Bearer ${authStatus.accessToken.accessToken}`,
			'X-GU-IS-OAUTH': 'true',
		},
	};
};

export const isUserLoggedIn = (): Promise<boolean> =>
	getAuthStatus().then((authStatus) =>
		authStatus.kind === 'SignedIn' ? true : false,
	);

export const getAuthStatus = async (): Promise<AuthStatus> => {
	const authState = await getAuthState();
	return getSignedInStatus(authState);
};

export async function isSignedInAuthState() {
	return getAuthState();
}
