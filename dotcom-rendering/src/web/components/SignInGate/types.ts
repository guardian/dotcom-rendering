import type { TagType } from '../../../types/tag';

export type CanShowGateProps = {
	isSignedIn: boolean;
	currentTest: CurrentSignInGateABTest;
	contentType: string;
	sectionName?: string;
	tags: TagType[];
	isPaidContent: boolean;
	isPreview?: boolean;
};

export type SignInGateComponent = {
	gate?: (props: SignInGateProps) => JSX.Element;
	canShow: ({
		isSignedIn,
		currentTest,
	}: CanShowGateProps) => Promise<boolean>;
};

export type UserType = 'new' | 'guest' | 'current';
export type Product =
	| 'Contribution'
	| 'DigitalPack'
	| 'Paper'
	| 'GuardianWeekly';
export interface CheckoutCompleteCookieData {
	userType: UserType;
	product: Product;
}

export interface SignInGateProps {
	signInUrl: string;
	guUrl: string;
	dismissGate: () => void;
	ophanComponentId: string;
	abTest?: CurrentSignInGateABTest;
	isMandatory?: boolean;
	checkoutCompleteCookieData?: CheckoutCompleteCookieData;
}

// Type with checkoutCompleteCookieData non optional
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type SignInGatePropsWithCheckoutCompleteCookieData = WithRequired<
	SignInGateProps,
	'checkoutCompleteCookieData'
>;

export type CurrentSignInGateABTest = {
	name: string;
	variant: string;
	id: string;
};

export type SignInGateTestMap = { [name: string]: SignInGateComponent };
