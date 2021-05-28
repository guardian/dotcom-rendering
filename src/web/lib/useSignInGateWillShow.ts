import { SignInGateSelectorProps } from '@frontend/web/components/SignInGate/types';
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
	const gateSelector = useSignInGateSelector();

	if (!gateSelector) {
		return false;
	}

	const [gateVariant, currentTest] = gateSelector;

	return (
		gateVariant.canShow(CAPI, !!isSignedIn, currentTest) &&
		!!gateVariant.gate
	);
};
