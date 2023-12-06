/**
 * an individual A/B test, structured for Ophan
 */
declare type OphanABEvent = {
	variantName: string;
	complete: string | boolean;
	campaignCodes?: string[];
};
/**
 * the actual payload we send to Ophan: an object of OphanABEvents with test IDs as keys
 */
declare type OphanABPayload = {
	abTestRegister: Record<string, OphanABEvent>;
};
declare type OphanProduct =
	| 'CONTRIBUTION'
	| 'RECURRING_CONTRIBUTION'
	| 'MEMBERSHIP_SUPPORTER'
	| 'MEMBERSHIP_PATRON'
	| 'MEMBERSHIP_PARTNER'
	| 'DIGITAL_SUBSCRIPTION'
	| 'PRINT_SUBSCRIPTION';
declare type OphanAction =
	| 'INSERT'
	| 'VIEW'
	| 'EXPAND'
	| 'LIKE'
	| 'DISLIKE'
	| 'SUBSCRIBE'
	| 'ANSWER'
	| 'VOTE'
	| 'CLICK';
declare type OphanComponentType =
	| 'READERS_QUESTIONS_ATOM'
	| 'QANDA_ATOM'
	| 'PROFILE_ATOM'
	| 'GUIDE_ATOM'
	| 'TIMELINE_ATOM'
	| 'NEWSLETTER_SUBSCRIPTION'
	| 'SURVEYS_QUESTIONS'
	| 'ACQUISITIONS_EPIC'
	| 'ACQUISITIONS_ENGAGEMENT_BANNER'
	| 'ACQUISITIONS_THANK_YOU_EPIC'
	| 'ACQUISITIONS_HEADER'
	| 'ACQUISITIONS_FOOTER'
	| 'ACQUISITIONS_INTERACTIVE_SLICE'
	| 'ACQUISITIONS_NUGGET'
	| 'ACQUISITIONS_STANDFIRST'
	| 'ACQUISITIONS_THRASHER'
	| 'ACQUISITIONS_EDITORIAL_LINK'
	| 'ACQUISITIONS_SUBSCRIPTIONS_BANNER'
	| 'ACQUISITIONS_OTHER'
	| 'SIGN_IN_GATE'
	| 'RETENTION_ENGAGEMENT_BANNER'
	| 'RETENTION_EPIC';
declare type OphanComponent = {
	componentType: OphanComponentType;
	id?: string;
	products?: OphanProduct[];
	campaignCode?: string;
	labels?: string[];
};
declare type OphanComponentEvent = {
	component: OphanComponent;
	action: OphanAction;
	value?: string;
	id?: string;
	abTest?: {
		name: string;
		variant: string;
	};
};
declare type TestMeta = {
	abTestName: string;
	abTestVariant: string;
	campaignCode: string;
	campaignId?: string;
	componentType: OphanComponentType;
	products?: OphanProduct[];
};
export type {
	OphanABEvent,
	OphanABPayload,
	OphanAction,
	OphanComponent,
	OphanComponentEvent,
	OphanComponentType,
	OphanProduct,
	TestMeta,
};
