import { constructQuery } from './querystring';

type AuthenticationComponentId =
	| 'amp_sidebar_signin'
	| 'guardian_signin_header'
	| 'signin_to_comment'
	| 'register_to_comment'
	| 'signin_to_reply_comment';

type AuthenticationEventParams = {
	componentType: string;
	componentId: AuthenticationComponentId;
	viewId?: string;
};

export const createAuthenticationEventParams = (
	componentId: AuthenticationComponentId,
	pageViewId?: string,
): string => {
	const params: AuthenticationEventParams = {
		componentType: 'identityauthentication',
		componentId,
	};

	if (pageViewId) {
		params.viewId = pageViewId;
	}

	return `componentEventParams=${encodeURIComponent(constructQuery(params))}`;
};
