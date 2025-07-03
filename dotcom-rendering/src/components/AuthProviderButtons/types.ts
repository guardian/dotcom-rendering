import { z } from 'zod';

type Stringifiable = string | boolean | number | null | undefined;

export type StringifiableRecord = Record<
	string,
	Stringifiable | readonly Stringifiable[]
>;

export interface TrackingQueryParams {
	// this is the url of the referring page
	// https://github.com/guardian/ophan/blob/70b658e785c490c411670bbd3c7fde62ae0224fc/the-slab/app/extractors/ReferrerExtractor.scala#L171
	ref?: string;
	// this refViewId refers to the referral page view id
	// that the user was on to use for tracking referrals
	// https://github.com/guardian/ophan/blob/70b658e785c490c411670bbd3c7fde62ae0224fc/the-slab/app/extractors/ReferrerExtractor.scala#L129
	refViewId?: string;
	// componentEventsParams is included so that we can pass Ophan ComponentEvent information to IDAPI, allowing us to
	// fire Ophan ComponentEvent on the server with information (componentType, abTest, etc.) from the frontend client
	// the value of componentEventParams should be passed as a URL encoded string of key value pairs in the form of key=value,
	// forExample componentType=SIGN_IN_GATE&componentId=inital_test&abTestName=SignInGateFirstTest&abTestVariant=variant&viewId=k2oj70c85n0d0fbtl6tg would be url encoded as componentType%3DSIGN_IN_GATE%26componentId%3Dinital_test%26abTestName%3DSignInGateFirstTest%26abTestVariant%3Dvariant%26viewId%3Dk2oj70c85n0d0fbtl6tg
	// the valid keys for the componentEventParams componentType, componentId, abTestName, abTestVariant, viewId, browserId (optional, but in most cases you'd want this), visitId (optional, same as browserId)
	// these correspond to whats required by the Ophan ComponentEvent (https://dashboard.ophan.co.uk/docs/thrift/componentevent.html)
	// if IDAPI doesn't find the required keys in componentEventParams or fails to parse componentEventParams then the Ophan ComponentEvent will not be fired
	// we URL encode the value of componentEventParams due to the number of keys available
	// as well as getting confused with other parameters, so we thought it best to pass it as a URL encoded string, and then do the decoding once it gets to IDAPI
	componentEventParams?: string;
	listName?: string;
}

export const validClientId = [
	'members',
	'recurringContributions',
	'jobs',
	'comments',
	'subscriptions',
] as const;

export type ValidClientId = (typeof validClientId)[number];

/**
 * PersistableQueryParams are query parameters
 * that are safe to persist between requests
 * for example query parameters that should be passed
 * from page to page in a flow e.g. returnUrl
 */
export interface PersistableQueryParams
	extends TrackingQueryParams,
		StringifiableRecord {
	returnUrl: string;
	clientId?: ValidClientId;
	// This is the fromURI query parameter from Otka authorization code flow
	// that we intercept in fastly. We can send a user back to this uri
	// to complete the authorization code flow for that application
	fromURI?: string;
	// This is the client Id of a calling application in Okta (ie iOS app etc)
	appClientId?: string;
	// fallback to Okta Classic if needed
	useOktaClassic?: boolean;
	// Flag to force the sign in page to use passwords, useful for testing/using previous behaviour
	usePasswordSignIn?: boolean;
	// Flag to force the create account flow to force the user to set a password, useful for testing/using previous behaviour
	useSetPassword?: boolean;
}

/**
 * `QueryParams` type is made up of the `PersistableQueryParams`
 * as well as extra parameters that should not persist between
 * request or are only valid for a single request, for example an
 * `error` or state flag
 */
export interface QueryParams
	extends PersistableQueryParams,
		StringifiableRecord {
	emailVerified?: boolean;
	// used to show the success message on the email sent page
	// only if the email is resent from the email sent page
	emailSentSuccess?: boolean;
	csrfError?: boolean;
	recaptchaError?: boolean;
	encryptedEmail?: string;
	error?: string;
	error_description?: string;
	maxAge?: number;
	// only use this to prefill the email input on either sign in page, for passcode or password
	// don't rely on this for any other purpose, or to be a valid email
	signInEmail?: string;
}

export type Stage = 'DEV' | 'CODE' | 'PROD';

export const SUPPORT_EMAIL = 'signinsupport@theguardian.com';

interface GlobalMessage {
	error?: string;
	success?: string;
}

/**
 * This type is manually kept in sync with the Membership API:
 * https://github.com/guardian/members-data-api/blob/main/membership-attribute-service/app/models/Attributes.scala
 */
export const userAttributesResponseSchema = z.object({
	userId: z.string(),

	tier: z.string().optional(),
	recurringContributionPaymentPlan: z.string().optional(),
	oneOffContributionDate: z.string().optional(),
	membershipJoinDate: z.string().optional(),
	digitalSubscriptionExpiryDate: z.string().optional(),
	paperSubscriptionExpiryDate: z.string().optional(),
	guardianWeeklyExpiryDate: z.string().optional(),
	liveAppSubscriptionExpiryDate: z.string().optional(),
	guardianPatronExpiryDate: z.string().optional(),
	alertAvailableFor: z.string().optional(),

	showSupportMessaging: z.boolean(),
	feastIosSubscriptionGroup: z.string().optional(),

	contentAccess: z.object({
		member: z.boolean(),
		paidMember: z.boolean(),
		recurringContributor: z.boolean(),
		supporterPlus: z.boolean(),
		digitalPack: z.boolean(),
		paperSubscriber: z.boolean(),
		guardianWeeklySubscriber: z.boolean(),
		guardianPatron: z.boolean(),
		feast: z.boolean().optional(),
	}),
});
export type UserAttributesResponse = z.infer<
	typeof userAttributesResponseSchema
>;

export type GeoLocation = 'GB' | 'US' | 'AU' | 'EU' | 'ROW';

export interface FieldError {
	field: string;
	message: string;
}

export interface StructuredGatewayError {
	message: string;
	severity: 'BAU' | 'CSRF' | 'UNEXPECTED';
}

export type GatewayError = StructuredGatewayError | string;

export type IsNativeApp = 'android' | 'ios' | undefined;

export type AppName = 'Guardian' | 'Feast' | 'Editions';

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

export interface NewsLetter {
	id: string;
	nameId: string;
	description: string;
	frequency?: string;
	name: string;
	subscribed?: boolean;
}

export interface Consent {
	id: string;
	name: string;
	description?: string;
	consented?: boolean;
}

export type ConsentPath = 'newsletters' | 'data' | 'review';

export interface PageData {
	// environment
	stage?: Stage;
	build?: string;

	// general page data
	returnUrl?: string;
	email?: string;
	signInPageUrl?: string;
	geolocation?: GeoLocation;
	fieldErrors?: FieldError[];
	formError?: GatewayError;
	browserName?: string;
	isNativeApp?: IsNativeApp;
	accountManagementUrl?: string;
	appName?: AppName;

	// token
	token?: string;

	// email sent pages specific
	resendEmailAction?: RoutePaths;
	changeEmailPage?: RoutePaths;

	// onboarding specific
	newsletters?: NewsLetter[];
	consents?: Consent[];
	page?: ConsentPath;
	previousPage?: ConsentPath;

	// reset password token specific
	timeUntilTokenExpiry?: number;

	// jobs specific
	firstName?: string;
	secondName?: string;
	userBelongsToGRS?: boolean;

	// signed in as page specific
	continueLink?: string;
	signOutLink?: string;

	// subscription specific
	newsletterId?: string;

	// delete specific
	contentAccess?: UserAttributesResponse['contentAccess'];

	// okta idx api specific
	hasStateHandle?: boolean; // determines if the state handle is present in the encrypted state, so we know if we're in an Okta IDX flow
	passcodeUsed?: boolean; // determines if the passcode has been used in the Okta IDX flow, so don't show the passcode page again

	// passcode specific
	passcodeSendAgainTimer?: number;

	// sign in with password specific
	focusPasswordField?: boolean;
}

export type CsrfState = {
	token?: string;
	pageUrl?: string;
};

interface ABTesting {
	mvtId?: number;
	participations?: Participations;
	forcedTestVariants?: Participations;
}

type Participations = Record<
	string,
	{
		variant: string;
	}
>;

export interface ClientHosts {
	idapiBaseUrl: string;
	oauthBaseUrl: string;
}

export interface RecaptchaConfig {
	recaptchaSiteKey: string;
}

export interface ClientState {
	queryParams: QueryParams;
	globalMessage?: GlobalMessage;
	pageData?: PageData;
	csrf?: CsrfState;
	abTesting?: ABTesting;
	clientHosts: ClientHosts;
	recaptchaConfig: RecaptchaConfig;
	//just the first group of the request id UUID
	shortRequestId?: string;
}
