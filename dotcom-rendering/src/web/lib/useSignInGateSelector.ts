import { Runnable } from '@guardian/ab-core';
import { useAB } from '@guardian/ab-react';
import {
	SignInGateComponent,
	CurrentSignInGateABTest,
} from '@frontend/web/components/SignInGate/types';
import {
	signInGateTests,
	signInGateTestVariantToGateMapping,
} from '@frontend/web/components/SignInGate/signInGate';

/**
 * @description
 * A custom hook to make which selects the sign in gate (component and ab test)
 * to be displayed on the current page
 * */
export const useSignInGateSelector = (): [
	SignInGateComponent | null,
	CurrentSignInGateABTest | null,
] => {
	const ab = useAB();

	const test: Runnable | null = ab.firstRunnableTest(signInGateTests);

	if (!test) {
		return [null, null];
	}

	const currentTest: CurrentSignInGateABTest = {
		name: test.dataLinkNames || test.id,
		variant: test.variantToRun.id,
		id: test.id,
	};

	const gateVariant =
		signInGateTestVariantToGateMapping?.[currentTest.variant];

	if (!gateVariant) {
		return [null, null];
	}

	return [gateVariant, currentTest];
};
