import { hasUserDismissedGate } from '../dismissGate';
import { CanShowGateProps, SignInGateComponent } from '../types';
import {
	isNPageOrHigherPageView,
	isValidContentType,
	isValidSection,
	isValidTag,
	isIOS9,
} from '../displayRule';

const canShow = ({
	isSignedIn,
	currentTest,
	contentType,
	sectionName,
	tags,
	isPaidContent,
	isPreview,
}: CanShowGateProps): Promise<boolean> =>
	Promise.resolve(
		!isSignedIn &&
			!hasUserDismissedGate(currentTest.variant, currentTest.name) &&
			isNPageOrHigherPageView(3) &&
			isValidContentType(contentType) &&
			isValidSection(sectionName) &&
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
