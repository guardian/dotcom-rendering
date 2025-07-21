/**
 * @file AuthProviderButtons.tsx
 * This file was migrated from:
 * https://github.com/guardian/gateway/blob/b980d008f91bd1abb108e50de9cdd1c364f37f4d/src/shared/model/QueryParams.ts
 */
export type Stringifiable = string | boolean | number | null | undefined;
export type StringifiableRecord = Record<
	string,
	Stringifiable | readonly Stringifiable[]
>;

export interface TrackingQueryParams {
	ref?: string;
	refViewId?: string;
	componentEventParams?: string;
	listName?: string;
}

export type ValidClientId =
	| 'members'
	| 'recurringContributions'
	| 'jobs'
	| 'comments'
	| 'subscriptions';

export interface PersistableQueryParams
	extends TrackingQueryParams,
		StringifiableRecord {
	returnUrl: string;
	clientId?: ValidClientId;
	fromURI?: string;
	appClientId?: string;
	useOktaClassic?: boolean;
	usePasswordSignIn?: boolean;
	useSetPassword?: boolean;
}

export interface QueryParams
	extends PersistableQueryParams,
		StringifiableRecord {
	emailVerified?: boolean;
	emailSentSuccess?: boolean;
	csrfError?: boolean;
	recaptchaError?: boolean;
	encryptedEmail?: string;
	error?: string;
	error_description?: string;
	maxAge?: number;
	signInEmail?: string;
}

export type IsNativeApp = 'android' | 'ios' | undefined;
