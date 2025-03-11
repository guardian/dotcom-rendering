import type { CountryCode } from '@guardian/libs';
import { isObject, isOneOf, isString } from '@guardian/libs';
import type { EditionId } from '../../lib/edition';
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

// Convention: In the naming of these types, we maintain the distinction between "AuxiaAPI", "AuxiaProxy" and "AuxiaGate".

// Get Treatments

export interface TreatmentContentDecoded {
	title: string;
	subtitle: string;
	body: string;
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
	browserId: string | undefined;
	isSupporter: boolean;
	dailyArticleCount: number;
	articleIdentifier: string;
	editionId: EditionId;
	contentType: string;
	sectionId: string;
	tagIds: string[];
	gateDismissCount: number;
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
	browserId: string | undefined;
	treatmentTrackingId: string;
	treatmentId: string;
	surface: string;
	interactionType: AuxiaInteractionInteractionType;
	interactionTimeMicros: number;
	actionName: AuxiaInteractionActionName;
}

// DCR Types

export interface AuxiaGateReaderPersonalData {
	browserId: string | undefined;
	dailyArticleCount: number;
	isSupporter: boolean;
}

export interface AuxiaGateDisplayData {
	browserId: string | undefined;
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
