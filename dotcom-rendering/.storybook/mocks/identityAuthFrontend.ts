export const getIdentityAuth = (): {
	isSignedInWithAuthState: () => Promise<{
		isAuthenticated: boolean;
		accessToken?: string;
		idToken?: string;
	}>;
} => ({
	isSignedInWithAuthState: () =>
		Promise.resolve({
			isAuthenticated: false,
			accessToken: undefined,
			idToken: undefined,
		}),
});
