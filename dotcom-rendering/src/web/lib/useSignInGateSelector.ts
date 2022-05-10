import { Runnable } from '@guardian/ab-core';
import { useAB } from './useAB';
import {
	SignInGateComponent,
	CurrentSignInGateABTest,
} from '../components/SignInGate/types';
import {
	signInGateTests,
	signInGateTestVariantToGateMapping,
} from '../components/SignInGate/signInGate';

/**
 * @description
 * A custom hook to make which selects the sign in gate (component and ab test)
 * to be displayed on the current page
 * */
export const useSignInGateSelector = ():
	| undefined
	| [SignInGateComponent | null, CurrentSignInGateABTest | null] => {
	const ab = useAB();
	if (!ab) return undefined;
	console.log('ab', ab);

	const test: Runnable | null = ab.firstRunnableTest(signInGateTests);

	console.log('test', test);
	if (!test) {
		return [null, null];
	}

	const currentTest: CurrentSignInGateABTest = {
		name: test.dataLinkNames || test.id,
		variant: test.variantToRun.id,
		id: test.id,
	};
	console.log('currentTest', currentTest);

	const gateVariant =
		signInGateTestVariantToGateMapping?.[currentTest.variant];

	console.log('gateVariant', gateVariant);

	if (!gateVariant) {
		return [null, null];
	}

	return [gateVariant, currentTest];
};
