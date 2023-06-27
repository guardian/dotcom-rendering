export type AuthenticationComponentId = 'signin_to_reply_comment';

export const createAuthenticationEventParams = (
	componentId: AuthenticationComponentId,
) => {
	const params = `componentType=identityauthentication&componentId=${componentId}`;
	return `componentEventParams=${encodeURIComponent(params)}`;
};
