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
	second_cta_name?: string;
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
	countryCode: string;
	mvtId: number;
	should_show_legacy_gate_tmp: boolean; // [1]
	hasConsented: boolean;
	shouldNotServeMandatory: boolean; // [2]
	mustShowDefaultGate: boolean; // [3]
}

// [1]

// date: 13th May 2025
// comment id: 5395f64b

// This is a temporary attribute that is being introduced to smooth (and reduce risk) the
// transfer of gate management from the client side to SDC for the non Auxia part of the Audience

// We are going to start rerouting gate requests to the SDC endpoint, but without having yet
// implemented the old gate display logic into SDC. This attribute is then going to carry over
// the local decision, there by allowing SDC to copy the local decision and know whether to
// return a (gu-default gate) gate.

// Once the correct logic has been implemented in SDC, this attribute will be decommissioned as no longer
// necessary.

// Obviously, the value it carries for standard Auxia audience requests in irrelevant.
// We will be setting it to false.

// [2]
// date: 03rd July 2025
// If shouldNotServeMandatory, we should not show a mandatory gate.

// [3]
// date: 23rd July 2025
// author: Pascal
// In order to facilitate internal testing, this attribute forces
// the display of a sign-in gate, namely the default gu gate. If it is true then
// the default gate is going to be displayed. Note that this applies to both auxia and
// non auxia audiences. In particular because it also applies to auxia audiences, for which
// the value of should_show_legacy_gate_tmp is ignored, then the information needs to come to
// the SDC server as a new parameter in the GetTreatments payload. To trigger
// gate display, the url should have query parameter `showgate=true`

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
	countryCode: string;
	mvtId: number; // [1]
	hasConsented: boolean;
}
// [1] value of the GU_mvt_id cookie (as number), to be able to maintain
// existing (auxia and non auxia) cohorts in the SDC logic.

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
