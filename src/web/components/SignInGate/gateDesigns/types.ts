export type CanShow = (
	CAPI: CAPIBrowserType,
	isSignedIn: boolean,
	currentTest: CurrentABTest,
) => Promise<boolean>;

export type SignInGateComponent = {
	gate?: (props: SignInGateProps) => JSX.Element;
	canShow: CanShow;
};

export interface SignInGateProps {
	signInUrl: string;
	guUrl: string;
	dismissGate: () => void;
	ophanComponentId: string;
	isComment?: boolean;
	abTest?: CurrentABTest;
}

export type CurrentABTest = {
	name: string;
	variant: string;
	id: string;
};
