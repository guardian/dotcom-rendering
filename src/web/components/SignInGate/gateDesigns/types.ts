export type SignInGateComponent = {
	gate?: (props: SignInGateProps) => JSX.Element;
	canShow: (
		CAPI: CAPIBrowserType,
		isSignedIn: boolean,
		currentTest: CurrentABTest,
	) => boolean;
};

export interface SignInGateProps {
	signInUrl: string;
	guUrl: string;
	dismissGate: () => void;
	ophanComponentId: string;
	isComment?: boolean;
	abTest?: CurrentABTest;
	signInGateCopy?: SignInGateCopy;
}

export interface SignInGateCopy {
	header: string;
	subHeader: string;
	paragraphs: string[];
}

export type CurrentABTest = {
	name: string;
	variant: string;
	id: string;
};
