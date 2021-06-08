import { SignInGateSelectorProps } from '@frontend/web/components/SignInGate/types';
import { useState } from 'react';
import { useSignInGateSelector } from './useSignInGateSelector';

/**
 * @description
 * A custom hook to determine if a sign in gate will show on the current page
 * @param {Boolean} isSignedIn - Is the user signed in to the guardian
 * @param {CAPIBrowserType} CAPI - The CAPI object
 * */
export const useSignInGateWillShow = ({
	isSignedIn,
	CAPI,
}: SignInGateSelectorProps): boolean => {
	const [canShowGate, setCanShowGate] = useState(false);
	const gateSelector = useSignInGateSelector();

	if (!gateSelector) {
		return false;
	}

	const [gateVariant, currentTest] = gateSelector;

	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	gateVariant?.canShow(CAPI, !!isSignedIn, currentTest).then(setCanShowGate);

	return canShowGate && !!gateVariant.gate;
};
