import { useEffect, useState } from 'react';
import {
	CurrentSignInGateABTest,
	SignInGateComponent,
	SignInGateSelectorProps,
} from '@frontend/web/components/SignInGate/types';
import { useOnce } from '@frontend/web/lib/useOnce';
import { useSignInGateSelector } from '@frontend/web/lib/useSignInGateSelector';

/**
 * @description
 * A custom hook to determine if a sign in gate will show on the current page
 * @param {Boolean} isSignedIn - Is the user signed in to the guardian
 * @param {CAPIBrowserType} CAPI - The CAPI object
 * */
export const useSignInGateWillShow = ({
	isSignedIn,
	CAPI,
}: SignInGateSelectorProps): boolean | undefined => {
	const [gateVariant, setGateVariant] = useState<
		SignInGateComponent | null | undefined
	>(undefined);
	const [currentTest, setCurrentTest] = useState<
		CurrentSignInGateABTest | null | undefined
	>(undefined);
	const [canShowGate, setCanShowGate] = useState(false);
	const gateSelector = useSignInGateSelector();

	useOnce(() => {
		const [gateSelectorVariant, gateSelectorTest] = gateSelector;
		setGateVariant(gateSelectorVariant);
		setCurrentTest(gateSelectorTest);
	}, [gateSelector]);

	useEffect(() => {
		if (gateVariant && currentTest) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			gateVariant
				?.canShow(CAPI, !!isSignedIn, currentTest)
				.then(setCanShowGate);
		}
	}, [currentTest, gateVariant, CAPI, isSignedIn]);

	return canShowGate && !!gateVariant && !!gateVariant.gate;
};
