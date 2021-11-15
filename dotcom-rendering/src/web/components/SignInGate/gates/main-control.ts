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
			isValidContentType(CAPI.contentType) &&
			isValidSection(CAPI.sectionName) &&
			isValidTag(CAPI.tags) &&
			// hide the sign in gate on isPaidContent
			!CAPI.pageType.isPaidContent &&
			// hide the sign in gate on internal tools preview &&
			!CAPI.isPreview &&
			!isIOS9(),
	);

export const signInGateComponent: SignInGateComponent = {
	canShow,
};
