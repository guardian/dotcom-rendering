export const getIdentityAuth = (): {
	isSignedInWithAuthState: () => Promise<{
		isAuthenticated: boolean;
		accessToken?: string;
		idToken?: string;
	}>;
	authStateManager: {
		subscribe: (callback: () => void) => void;
		unsubscribe: (callback: () => void) => void;
	};
} => ({
	isSignedInWithAuthState: () =>
		Promise.resolve({
			isAuthenticated: false,
			accessToken: undefined,
			idToken: undefined,
		}),
	authStateManager: {
		subscribe: () => {},
		unsubscribe: () => {},
	},
});
