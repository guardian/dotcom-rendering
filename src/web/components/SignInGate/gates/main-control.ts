import { hasUserDismissedGate } from '@frontend/web/components/SignInGate/dismissGate';
import {
	CurrentSignInGateABTest,
	SignInGateComponent,
} from '@frontend/web/components/SignInGate/types';
import {
	isNPageOrHigherPageView,
	isValidContentType,
	isValidSection,
	isValidTag,
	isPaidContent,
	isPreview,
	isIOS9,
} from '@frontend/web/components/SignInGate/displayRule';

const canShow = (
	CAPI: CAPIBrowserType,
	isSignedIn: boolean,
	currentTest: CurrentSignInGateABTest,
): Promise<boolean> =>
	Promise.resolve(
		!isSignedIn &&
			!hasUserDismissedGate(currentTest.variant, currentTest.name) &&
			isNPageOrHigherPageView(3) &&
			isValidContentType(CAPI) &&
			isValidSection(CAPI) &&
			isValidTag(CAPI) &&
			!isPaidContent(CAPI) &&
			!isPreview(CAPI) &&
			!isIOS9(),
	);

export const signInGateComponent: SignInGateComponent = {
	canShow,
};
