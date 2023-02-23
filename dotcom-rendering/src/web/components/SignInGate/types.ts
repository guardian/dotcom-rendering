import { isObject } from '@guardian/libs';
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

export const ALL_USER_TYPES = ['new', 'guest', 'current'] as const;
type UserTypeTuple = typeof ALL_USER_TYPES;
export type UserType = UserTypeTuple[number];

export function isUserType(value: unknown): value is UserType {
	return ALL_USER_TYPES.includes(value as UserType);
}

export const ALL_PRODUCTS = [
	'Contribution',
	'DigitalPack',
	'Paper',
	'GuardianWeekly',
] as const;
type ProductTuple = typeof ALL_PRODUCTS;
export type Product = ProductTuple[number];

export function isProduct(value: unknown): value is Product {
	return ALL_PRODUCTS.includes(value as Product);
}
export interface CheckoutCompleteCookieData {
	userType: UserType;
	product: Product;
}

export function isCheckoutCompleteCookieData(
	obj: unknown,
): obj is CheckoutCompleteCookieData {
	return isObject(obj) && isUserType(obj.userType) && isProduct(obj.product);
}
type BaseSignInGateProps = {
	signInUrl: string;
	guUrl: string;
	dismissGate: () => void;
	ophanComponentId: string;
	abTest?: CurrentSignInGateABTest;
	isMandatory?: boolean;
}

type SignInGateWithoutCheckoutData = BaseSignInGateProps & {
     checkoutCompleteCookieData?: never; // Or just leave it as optional CheckoutCompleteCookieData
      personaliseSignInAfterCheckoutSwitch: false;
}

export type SignInGateWithCheckoutData = BaseSignInGateProps & {
     checkoutCompleteCookieData: CheckoutCompleteCookieData;
      personaliseSignInAfterCheckoutSwitch: true;
}

export type SignInGateProps = SignInGateWithoutCheckoutData | SignInGateWithCheckoutData

export type CurrentSignInGateABTest = {
	name: string;
	variant: string;
	id: string;
};

export type SignInGateTestMap = { [name: string]: SignInGateComponent };
