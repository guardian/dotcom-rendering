export type CanShowGateProps = {
	CAPI: CAPIBrowserType;
	isSignedIn: boolean;
	currentTest: CurrentSignInGateABTest;
	contentType: string;
	sectionName?: string;
};

export type SignInGateComponent = {
	gate?: (props: SignInGateProps) => JSX.Element;
	canShow: ({
		CAPI,
		isSignedIn,
		currentTest,
	}: CanShowGateProps) => Promise<boolean>;
};

export interface SignInGateProps {
	signInUrl: string;
	guUrl: string;
	dismissGate: () => void;
	ophanComponentId: string;
	isComment?: boolean;
	abTest?: CurrentSignInGateABTest;
	isMandatory?: boolean;
}

export type CurrentSignInGateABTest = {
	name: string;
	variant: string;
	id: string;
};

export interface SignInGateSelectorProps {
	isSignedIn?: boolean;
	CAPI: CAPIBrowserType;
}

export type SignInGateTestMap = { [name: string]: SignInGateComponent };
