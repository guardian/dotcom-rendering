import type { Runnable } from '@guardian/ab-core';
import {
	signInGateTests,
	signInGateTestVariantToGateMapping,
} from '../components/SignInGate/signInGate';
import type {
	CurrentSignInGateABTest,
	SignInGateComponent,
} from '../components/SignInGate/types';
import { useAB } from './useAB';

/**
 * @description
 * A custom hook to make which selects the sign in gate (component and ab test)
 * to be displayed on the current page
 * */
export const useSignInGateSelector = ():
	| undefined
	| [SignInGateComponent | null, CurrentSignInGateABTest | null] => {
	const ab = useAB()?.api;
	if (!ab) return undefined;

	const test: Runnable | null = ab.firstRunnableTest(signInGateTests);

	if (!test) {
		return [null, null];
	}

	const currentTest: CurrentSignInGateABTest = {
		name: test.dataLinkNames || test.id,
		variant: test.variantToRun.id,
		id: test.id,
	};

	const gateVariant = signInGateTestVariantToGateMapping[currentTest.variant];

	if (!gateVariant) {
		return [null, null];
	}

	return [gateVariant, currentTest];
};
