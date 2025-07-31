import { hasUserDismissedGate } from '../dismissGate';
import {
	isNPageOrHigherPageView,
	isValidContentType,
	isValidSection,
	isValidTag,
} from '../displayRules';
import type { CanShowGateProps, SignInGateComponent } from '../types';

const canShow = ({
	isSignedIn,
	currentTest,
	contentType,
	sectionId,
	tags,
	isPaidContent,
	isPreview,
}: CanShowGateProps): Promise<boolean> => {
	// 31st July 2025
	// author: Pascal
	// Investigating broken behavior of this function

	console.log('[60f7e8f7] investigation');
	console.log(`isSignedIn: ${isSignedIn}`);
	console.log(`!isSignedIn: ${!isSignedIn}`);
	console.log(`currentTest.variant: ${currentTest.variant}`);
	console.log(`currentTest.name: ${currentTest.name}`);
	console.log(
		`hasUserDismissedGate: ${hasUserDismissedGate(
			currentTest.variant,
			currentTest.name,
		)}`,
	);
	console.log(
		`!hasUserDismissedGate: ${!hasUserDismissedGate(
			currentTest.variant,
			currentTest.name,
		)}`,
	);
	console.log(`isNPageOrHigherPageView: ${isNPageOrHigherPageView(3)}`);
	console.log(`contentType: ${contentType}`);
	console.log(`isValidContentType: ${isValidContentType(contentType)}`);
	console.log(`sectionId: ${sectionId}`);
	console.log(`isValidSection: ${isValidSection(sectionId)}`);
	console.log(`tags: ${JSON.stringify(tags)}`);
	console.log(`isValidTag: ${isValidTag(tags)}`);
	console.log(`isPaidContent: ${isPaidContent}`);
	console.log(`!isPaidContent: ${!isPaidContent}`);
	console.log(`isPreview: ${isPreview}`);
	console.log(`!isPreview: ${!isPreview}`);

	return Promise.resolve(
		!isSignedIn &&
			!hasUserDismissedGate(currentTest.variant, currentTest.name) &&
			isNPageOrHigherPageView(3) &&
			isValidContentType(contentType) &&
			isValidSection(sectionId) &&
			isValidTag(tags) &&
			// hide the sign in gate on isPaidContent
			!isPaidContent &&
			// hide the sign in gate on internal tools preview
			!isPreview,
	);
};

export const signInGateComponent: SignInGateComponent = {
	canShow,
};
