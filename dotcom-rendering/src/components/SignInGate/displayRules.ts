// use the dailyArticleCount from the local storage to see how many articles the user has viewed in a day
import { onConsent } from '@guardian/libs';
import type { ConsentState, CountryCode } from '@guardian/libs';
import type { DailyArticle } from '../../lib/dailyArticleCount';
import { getDailyArticleCount } from '../../lib/dailyArticleCount';
import type { TagType } from '../../types/tag';
import { hasUserDismissedGateMoreThanCount } from './dismissGate';
import type { CanShowGateProps } from './types';

// in our case if this is the n-numbered article or higher the user has viewed then set the gate
export const isNPageOrHigherPageView = (n = 2): boolean => {
	// get daily read article count array from local storage
	const [dailyCount = {} as DailyArticle] = getDailyArticleCount() ?? [];

	const { count = 0 } = dailyCount;

	return count >= n;
};

// hide the sign in gate on article types that are not supported
export const isValidContentType = (contentType: string): boolean => {
	// It's safer to definitively *include* types as we
	// know new types will not break the sign-in-gate going forward
	const validTypes = ['Article'];

	return validTypes.some((type: string): boolean => contentType === type);
};

// hide the sign in gate on certain sections of the site, e.g info, about, help etc.
export const isValidSection = (sectionId?: string): boolean => {
	const invalidSections = [
		'about',
		'info',
		'membership',
		'help',
		'guardian-live-australia',
		'gnm-archive',
	];

	// we check for invalid section by reducing the above array, and then NOT the result so we know
	// its a valid section
	return !invalidSections.some(
		(section: string): boolean => sectionId === section,
	);
};

// hide the sign in gate for certain tags on the site
export const isValidTag = (tags: TagType[]): boolean => {
	const invalidTags = ['info/newsletter-sign-up'];

	return !invalidTags.some((invalidTag) =>
		tags.map((tag) => tag.id).includes(invalidTag),
	);
};

// check CMP banner consents
export const hasRequiredConsents = (): Promise<boolean> =>
	onConsent()
		.then(({ canTarget }: ConsentState) => canTarget)
		.catch(() => false);

export const canShowSignInGate = ({
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
			!hasUserDismissedGateMoreThanCount(
				currentTest.variant,
				currentTest.name,
				5,
			) &&
			isNPageOrHigherPageView(3) &&
			isValidContentType(contentType) &&
			isValidSection(sectionId) &&
			isValidTag(tags) &&
			// hide the sign in gate on isPaidContent
			!isPaidContent &&
			// hide the sign in gate on internal tools preview &&
			!isPreview,
	);

export const canShowSignInGateMandatory: ({
	isSignedIn,
	currentTest,
	contentType,
	sectionId,
	tags,
	isPaidContent,
	isPreview,
	currentLocaleCode,
}: CanShowGateProps) => Promise<boolean> = async ({
	isSignedIn,
	currentTest,
	contentType,
	sectionId,
	tags,
	isPaidContent,
	isPreview,
	currentLocaleCode,
}: CanShowGateProps) => {
	return await canShowSignInGate({
		isSignedIn,
		currentTest,
		contentType,
		sectionId,
		tags,
		isPaidContent,
		isPreview,
		currentLocaleCode,
	});
};

const US_REGION_CODES: (CountryCode | undefined)[] = [
	'US',
	'AS',
	'GU',
	'MP',
	'PR',
	'VI',
];

export const canShowSignInGateWithOffers = ({
	isSignedIn,
	currentTest,
	contentType,
	sectionId,
	tags,
	isPaidContent,
	isPreview,
	currentLocaleCode,
}: CanShowGateProps): Promise<boolean> =>
	Promise.resolve(
		!isSignedIn &&
			!hasUserDismissedGateMoreThanCount(
				currentTest.variant,
				currentTest.name,
				5,
			) &&
			isNPageOrHigherPageView(3) &&
			isValidContentType(contentType) &&
			isValidSection(sectionId) &&
			isValidTag(tags) &&
			// hide the sign in gate on isPaidContent
			!isPaidContent &&
			// hide the sign in gate on internal tools preview &&
			!isPreview &&
			// hide the sign in gate for AU and US readers
			!['AU', ...US_REGION_CODES].includes(currentLocaleCode),
	);

/*
	Date: 29th April 2025

	We have a request to prevent sign-in gate for a specific URL. This feels like an
	adhoc request and not a new general feature to implement.

	We have a check in SDC: https://github.com/guardian/support-dotcom-components/pull/1345 ,
	to prevent the Auxia gate from showing, but we also need to prevent the legacy gate from
	showing. For a cleaner implementation. we are simply going to prevent any of the two
	gates components from rendering.

	To keep things simple, we are going to add a check in SignInGateSelector, which seems
	like a good place.
*/

export const pageIdIsAllowedForGating = (pageId: string): boolean => {
	// This function was introduced to handle the specific request of not showing a gate for
	// this url: https://www.theguardian.com/tips

	// pageId is the path without the starting slash
	// example:
	// - full url: https://www.theguardian.com/world/2025/apr/29/canada-election-result-liberal-win-mark-carney-anti-trump
	// - pageId: world/2025/apr/29/canada-election-result-liberal-win-mark-carney-anti-trump

	const denyPaths = [
		'tips',
		'help/ng-interactive/2017/mar/17/contact-the-guardian-securely',
	];

	return !denyPaths.some((denyPath) => pageId.startsWith(denyPath));
};
