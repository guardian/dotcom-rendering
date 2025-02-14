import type { CountryCode } from '@guardian/libs';
import { isObject, isOneOf, isString } from '@guardian/libs';
import type { TagType } from '../../types/tag';

export type CanShowGateProps = {
	isSignedIn: boolean;
	currentTest: CurrentSignInGateABTest;
	contentType: string;
	sectionId?: string;
	tags: TagType[];
	isPaidContent: boolean;
	isPreview?: boolean;
	currentLocaleCode: CountryCode | undefined;
};

export type SignInGateComponent = {
	gate?: (props: SignInGateProps) => JSX.Element;
	canShow: ({
		isSignedIn,
		currentTest,
	}: CanShowGateProps) => Promise<boolean>;
};

export const ALL_USER_TYPES = ['new', 'guest', 'current'] as const;
export type UserType = (typeof ALL_USER_TYPES)[number];

export const isUserType = isOneOf(ALL_USER_TYPES);

export const ALL_PRODUCTS = [
	'Contribution',
	'SupporterPlus',
	'Paper',
	'GuardianWeekly',
] as const;
export type Product = (typeof ALL_PRODUCTS)[number];

export const isProduct = isOneOf(ALL_PRODUCTS);
export interface CheckoutCompleteCookieData {
	userType: UserType;
	product: Product;
}

export function isCheckoutCompleteCookieData(
	obj: unknown,
): obj is CheckoutCompleteCookieData {
	return (
		isObject(obj) &&
		isString(obj.userType) &&
		isUserType(obj.userType) &&
		isString(obj.product) &&
		isProduct(obj.product)
	);
}
export type SignInGateProps = {
	signInUrl: string;
	registerUrl: string;
	guUrl: string;
	dismissGate: () => void;
	ophanComponentId: string;
	abTest?: CurrentSignInGateABTest;
	isMandatory?: boolean;
	checkoutCompleteCookieData?: CheckoutCompleteCookieData;
	personaliseSignInGateAfterCheckoutSwitch?: boolean;
};

export interface SignInGateCustomizableTextProps extends SignInGateProps {
	title: string;
	subtitle: string;
	body: string | JSX.Element;
}

export type CurrentSignInGateABTest = {
	name: string;
	variant: string;
	id: string;
};

export type SignInGateTestMap = { [name: string]: SignInGateComponent };

// -------------------------------
// Auxia Integration Experiment //
// -------------------------------
/*
	comment group: auxia-prototype-e55a86ef
*/

// convention: In the naming of these types, we maintain the distinction between "AuxiaAPI" and "AuxiaProxy"
// The latter refering to the support-dotcom-components proxy for the Auxia API

// Get Treatments

export interface TreatmentContentDecoded {
	title: string;
	subtitle: string;
	body: string;
	privacy_button_name: string;
	first_cta_name: string;
	first_cta_link: string;
	second_cta_name: string;
}

export interface AuxiaAPIResponseDataUserTreatment {
	treatmentId: string;
	treatmentTrackingId: string;
	rank: string;
	contentLanguageCode: string;
	treatmentContent: string;
	treatmentType: string;
	surface: string;
}

export interface AuxiaProxyGetTreatmentsPayload {
	user_has_consented_to_personal_data_use: boolean;
	browserId: string;
	is_supporter: boolean;
	daily_article_count: number;
	article_identifier: string;
}

export interface AuxiaProxyGetTreatmentsResponse {
	status: boolean;
	data?: AuxiaProxyGetTreatmentsProxyResponseData;
}

export interface AuxiaProxyGetTreatmentsProxyResponseData {
	responseId: string;
	userTreatment?: AuxiaAPIResponseDataUserTreatment;
}

// Log Treatment Interaction

export type AuxiaInteractionInteractionType =
	| 'VIEWED'
	| 'CLICKED'
	| 'DISMISSED';

export type AuxiaInteractionActionName =
	| 'PRIVACY-BUTTON'
	| 'REGISTER-LINK'
	| 'SIGN-IN-LINK'
	| 'HOW-TO-LINK'
	| 'WHY-LINK'
	| 'HELP-LINK'
	| ''; // used for 'VIEWED' and 'DISMISSED' interactions

export interface AuxiaProxyLogTreatmentInteractionPayload {
	user_has_consented_to_personal_data_use: boolean;
	browserId: string;
	treatmentTrackingId: string;
	treatmentId: string;
	surface: string;
	interactionType: AuxiaInteractionInteractionType;
	interactionTimeMicros: number;
	actionName: AuxiaInteractionActionName;
}

// DCR Types

export interface AuxiaGateDisplayData {
	browserId: string;
	auxiaData: AuxiaProxyGetTreatmentsProxyResponseData;
}

export type SignInGatePropsAuxia = {
	guUrl: string;
	signInUrl: string;
	dismissGate: () => void;
	ophanComponentId: string;
	abTest?: CurrentSignInGateABTest;
	checkoutCompleteCookieData?: CheckoutCompleteCookieData;
	personaliseSignInGateAfterCheckoutSwitch?: boolean;
	userTreatment: AuxiaAPIResponseDataUserTreatment;
	logTreatmentInteractionCall: (
		interactionType: AuxiaInteractionInteractionType,
		actionName: AuxiaInteractionActionName,
	) => Promise<void>;
};
