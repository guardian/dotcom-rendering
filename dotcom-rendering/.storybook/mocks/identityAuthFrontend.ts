export const getIdentityAuth = () => ({
	isSignedInWithAuthState: () =>
		Promise.resolve({
			isAuthenticated: false,
			accessToken: undefined,
			idToken: undefined,
		}),
});
