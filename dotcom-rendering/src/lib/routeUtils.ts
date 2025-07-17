/**
 * ExtractRouteParams type generates a object type definition given a path type string
 * @example
 * given the string type '/a/:first/:last'
 * would create a type definition
 * type { first: string, last: string }
 * @file
 * This file was migrated from:
 * https://github.com/guardian/gateway/blob/b980d008f91bd1abb108e50de9cdd1c364f37f4d/src/shared/lib/routeUtils.ts
 */
import type {
	PersistableQueryParams,
	QueryParams,
} from '../components/AuthProviderButtons/types';

/**
 * ExtractRouteParams type generates a object type definition given a path type string
 * @example
 * given the string type '/a/:first/:last'
 * would create a type definition
 * type { first: string, last: string }
 */

export type ExtractRouteParams<T> = string extends T
	? Record<string, string>
	: T extends `${string}:${infer Param}/${infer Rest}`
	? { [k in Param | keyof ExtractRouteParams<Rest>]?: string }
	: T extends `${string}:${infer Param}`
	? { [k in Param]?: string }
	: Record<string, never>;

export type ConsentPath = 'newsletters' | 'data' | 'review';

/**
 * These are all the accepted url routes for this application
 * If you want to add a new route, it will need to be added below
 */
export const ValidRoutePathsArray = [
	'/404',
	'/change-email/:token',
	'/change-email/complete',
	'/change-email/error',
	'/agree/GRS',
	'/email/:template',
	'/consent-token/:token/accept',
	'/consent-token/error',
	'/consent-token/resend',
	'/consent-token/email-sent',
	'/delete',
	'/delete/complete',
	'/delete/email-sent',
	'/delete-blocked',
	'/delete-email-validation',
	'/delete-set-password',
	'/error',
	'/maintenance',
	'/oauth/authorization-code/:callbackParam',
	'/oauth/authorization-code/application-callback',
	'/oauth/authorization-code/callback',
	'/oauth/authorization-code/delete-callback',
	'/oauth/authorization-code/interaction-code-callback',
	'/reauthenticate',
	'/reauthenticate/password',
	'/register',
	'/register/code',
	'/register/code/expired',
	'/register/code/resend',
	'/register/email',
	'https://profile.theguardian.com/register/email',
	'/register/email-sent',
	'/register/email-sent/resend',
	'/reset-password',
	'/reset-password/:token',
	'/reset-password/code',
	'/reset-password/code/expired',
	'/reset-password/code/resend',
	'/reset-password/complete',
	'/reset-password/email-sent',
	'/reset-password/expired',
	'/reset-password/password',
	'/reset-password/resend',
	'/set-password',
	'/set-password/:token',
	'/set-password/complete',
	'/set-password/email-sent',
	'/set-password/expired',
	'/set-password/password',
	'/set-password/resend',
	'/signed-in-as',
	'/signin',
	'/signin/code',
	'/signin/code/resend',
	'/signin/code/expired',
	'/signin/password',
	'/signin/refresh',
	'/signin/:social',
	'https://profile.theguardian.com/signin/:social',
	'/signin/email-sent',
	'/signin/email-sent/resend',
	'/signout',
	'/signout/all',
	'/unsubscribe/:emailType/:data/:token',
	'/unsubscribe/success',
	'/unsubscribe/error',
	'/unsubscribe-all/:data/:token',
	'/subscribe/:emailType/:data/:token',
	'/subscribe/success',
	'/subscribe/error',
	'/verify-email',
	'/welcome',
	'/welcome/:token',
	'/welcome/:app/complete',
	'/welcome/complete',
	'/welcome/email-sent',
	'/welcome/existing',
	'/welcome/expired',
	'/welcome/resend',
	'/welcome/google',
	'/welcome/apple',
	'/welcome/social',
	'/welcome/review',
	'/welcome/newsletters',
	'/welcome/password',
] as const;

export type RoutePaths = (typeof ValidRoutePathsArray)[number];

/**
 * These are all valid paths for the Identity API
 * New routes should be added below
 */
export type ApiRoutePaths =
	| '/auth/oauth-token'
	| '/consents'
	| '/consent-email/:token'
	| '/consent-email/resend/:token'
	| '/newsletters'
	| '/signin-token/token/:token'
	| '/unauth'
	| '/user/change-email'
	| '/unsubscribe'
	| '/subscribe'
	| '/unsubscribe-all'
	| '/users/me/consents'
	| '/users/me/newsletters'
	| '/users/me/touch-braze';

type OktaApiRoutePaths =
	| '/api/v1/apps/:id'
	| '/api/v1/authn'
	| '/api/v1/authn/credentials/reset_password'
	| '/api/v1/authn/recovery/token'
	| '/api/v1/sessions/me'
	| '/api/v1/sessions/:sessionId'
	| '/api/v1/users'
	| '/api/v1/users/:id'
	| '/api/v1/users/:id/credentials/forgot_password'
	| '/api/v1/users/:id/groups'
	| '/api/v1/users/:id/lifecycle/activate'
	| '/api/v1/users/:id/lifecycle/deactivate'
	| '/api/v1/users/:id/lifecycle/reactivate'
	| '/api/v1/users/:id/lifecycle/reset_password'
	| '/api/v1/users/:id/sessions';

type MembersDataApiRoutePaths = '/user-attributes/me';

type UserBenefitsApiRoutePaths = '/benefits/me';

export type PasswordRoutePath = Extract<
	'/reset-password' | '/set-password' | '/welcome',
	RoutePaths
>;

/**
 * This is all valid routes on the site, only used for the helper function addQueryParamsToPath
 */
export type AllRoutes =
	| ApiRoutePaths
	| RoutePaths
	| OktaApiRoutePaths
	| MembersDataApiRoutePaths
	| UserBenefitsApiRoutePaths;

/**
 * Object which has matching parameter keys for a path.
 * @example
 * a string type of '/a/:first/:last'
 * would require an object { first: "value", last: "value" } for token substitution
 */

export type PathParams<P extends AllRoutes> = ExtractRouteParams<P>;

type BuildUrl = <P extends AllRoutes>(
	path: P,
	params?: ExtractRouteParams<P>,
) => string;
/**
 * Build an url with a path and its parameters.
 * @example
 * buildUrl(
 *   '/a/:first/:last',
 *   { first: 'p', last: 'q' },
 * ) // returns '/a/p/q'
 * @param path target path.
 * @param params parameters.
 */
export const buildUrl: BuildUrl = <P extends AllRoutes>(
	path: P,
	params: PathParams<P> = {} as PathParams<P>,
): string => {
	//Upcast `params` to be used in string replacement.
	const paramObj: Record<string, string | undefined> = params;

	return Object.keys(paramObj).reduce((fullPath, key) => {
		return fullPath.replace(`:${key}`, String(paramObj[key]));
	}, path);
};

/**
 * function to remove undefined, null, and empty string values from an object
 * and covert the values to strings so they can be used in a query string using
 * the URLSearchParams object
 * @param obj Object to remove empty keys from
 * @returns Object with empty keys removed and values converted to strings
 */
export const removeEmptyKeysFromObjectAndConvertValuesToString = (
	obj: Record<string, unknown>,
): Record<string, string> => {
	const newObj: Record<string, string> = {};
	for (const key of Object.keys(obj)) {
		const asStr = obj[key]?.toString();
		if (asStr) {
			newObj[key] = asStr;
		}
	}
	return newObj;
};

/**
 *
 * @param path a path segment of a url that is not typed as part of RoutePaths
 * @param params QueryParams - any query params to be added to the path
 * @param overrides Any query parameter overrides
 * @returns string
 * This takes a non-typed url string and adds query parameters
 * This should only be used when you have a path that is dynamically generated ie from another input parameter
 * You should use addQueryParamsToPath for all typed internal application urls
 */

/**
 * @param params QueryParams object with all query parameters
 * @returns PersistableQueryParams - object with query parameters to persist between requests
 */
export const getPersistableQueryParams = (
	params: QueryParams,
): PersistableQueryParams => ({
	returnUrl: params.returnUrl,
	clientId: params.clientId,
	ref: params.ref,
	refViewId: params.refViewId,
	listName: params.listName,
	componentEventParams: params.componentEventParams,
	fromURI: params.fromURI,
	appClientId: params.appClientId,
	useOktaClassic: params.useOktaClassic,
	usePasswordSignIn: params.usePasswordSignIn,
	useSetPassword: params.useSetPassword,
});

export const addQueryParamsToUntypedPath = (
	path: string,
	params: QueryParams,
	overrides?: Partial<QueryParams>,
): string => {
	const divider = path.includes('?') ? '&' : '?';
	const searchParams = new URLSearchParams(
		removeEmptyKeysFromObjectAndConvertValuesToString({
			...getPersistableQueryParams(params),
			...overrides,
		}),
	);

	searchParams.sort();

	return `${path}${divider}${searchParams.toString()}`;
};

/**
 * Build an Gateway url with a path and its parameters.
 * @param path target path.
 * @param params parameters.
 * @param queryParams QueryParams
 */
export const buildUrlWithQueryParams = <P extends AllRoutes>(
	path: P,
	params: PathParams<P> = {} as PathParams<P>,
	queryParams: QueryParams,
	queryParamOverrides?: Partial<QueryParams>,
): string => {
	const url = buildUrl(path, params);
	return addQueryParamsToUntypedPath(url, queryParams, queryParamOverrides);
};
