import { hasUserDismissedGate } from '../dismissGate.ts';
import {
	isIOS9,
	isNPageOrHigherPageView,
	isValidContentType,
	isValidSection,
	isValidTag,
} from '../displayRule.ts';
import type { CanShowGateProps, SignInGateComponent } from '../types.ts';

const canShow = ({
	isSignedIn,
	currentTest,
	contentType,
	sectionId,
	tags,
	isPaidContent,
	isPreview,
}: CanShowGateProps): Promise<boolean> =>
	Promise.resolve(
		!isSignedIn &&
			!hasUserDismissedGate(currentTest.variant, currentTest.name) &&
			isNPageOrHigherPageView(3) &&
			isValidContentType(contentType) &&
			isValidSection(sectionId) &&
			isValidTag(tags) &&
			// hide the sign in gate on isPaidContent
			!isPaidContent &&
			// hide the sign in gate on internal tools preview
			!isPreview &&
			!isIOS9(),
	);

export const signInGateComponent: SignInGateComponent = {
	canShow,
};
