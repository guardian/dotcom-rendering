export type SignInGateComponent = {
    gate: (props: SignInGateProps) => JSX.Element;
    canShow: (CAPI: CAPIBrowserType) => boolean;
};

export interface SignInGateProps {
    signInUrl: string;
    guUrl: string;
    dismissGate: () => void;
    component: string;
    isComment?: boolean;
    abTest?: CurrentABTest;
}

export type CurrentABTest = {
    name: string;
    variant: string;
};
