import { SignInGateSelectorProps } from '@frontend/web/components/SignInGate/types';
import { useSignInGateSelector } from './useSignInGateSelector';

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
