import { constructQuery } from '@root/src/lib/querystring';

export type AuthenticationComponentId =
	| 'amp_sidebar_signin'
	| 'guardian_signin_header'
	| 'signin_to_comment'
	| 'register_to_comment';

type AuthenticationEventParams = {
	componentType: string;
	componentId: AuthenticationComponentId;
	viewId?: string;
};

export const createAuthenticationEventParams = (
	componentId: AuthenticationComponentId,
	pageViewId?: string,
) => {
	const params: AuthenticationEventParams = {
		componentType: 'identityauthentication',
		componentId,
	};

	if (pageViewId) {
		params.viewId = pageViewId;
	}

	return `componentEventParams=${encodeURIComponent(constructQuery(params))}`;
};
