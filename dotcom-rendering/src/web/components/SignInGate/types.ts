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

// Taking this approach for validating whether a specific
// string is in a union type as per the advice of this blog:
// https://dev.to/hansott/how-to-check-if-string-is-member-of-union-type-1j4m
// Other option is to use an enum, though there are downside to this:
// https://dev.to/azure/the-dangers-of-typescript-enums-55pd

const ALL_USER_TYPES = ['new', 'guest', 'current'] as const;
type UserTypeTuple = typeof ALL_USER_TYPES;
export type UserType = UserTypeTuple[number];

export function isUserType(value: unknown): value is UserType {
	return ALL_USER_TYPES.includes(value as UserType)
}

const ALL_PRODUCTS = ['Contribution', 'DigitalPack', 'Paper', 'GuardianWeekly'] as const;
type ProductTuple = typeof ALL_PRODUCTS
export type Product = ProductTuple[number]

export function isProduct(value: unknown): value is Product {
	return ALL_PRODUCTS.includes(value as Product)
}
export interface CheckoutCompleteCookieData {
	userType: UserType;
	product: Product;
}

export function isCheckoutCompleteCookieData(obj: unknown): obj is CheckoutCompleteCookieData {
	// TODO - validate whether this type casting here is ok
	const castObj = (obj as CheckoutCompleteCookieData)
	return isUserType(castObj.userType) && isProduct(castObj.product);
}

export const safeJsonParse = <T>(guard: (o: unknown) => o is T) =>
  (text: string): ParseResult<T> => {
	try {
		const parsed = JSON.parse(text) as unknown
		return guard(parsed) ? { parsed, hasError: false } : { hasError: true }
	}
	catch(_) {
		return { hasError: true}
	}
  }

type ParseResult<T> =
  | { parsed: T; hasError: false; error?: undefined }
  | { parsed?: undefined; hasError: true; error?: unknown }
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
