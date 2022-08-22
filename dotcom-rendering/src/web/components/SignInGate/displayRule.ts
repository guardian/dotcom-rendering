// use the dailyArticleCount from the local storage to see how many articles the user has viewed in a day
import { onConsent } from '@guardian/consent-management-platform';
import type { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { getLocale } from '@guardian/libs';
import {
	getParticipationsFromLocalStorage,
	setParticipationsInLocalStorage,
} from '../../experiments/ab-localstorage';
import type { DailyArticle } from '../../lib/dailyArticleCount';
import { getDailyArticleCount } from '../../lib/dailyArticleCount';
import { hasUserDismissedGateMoreThanCount } from './dismissGate';
import type { CanShowGateProps, CurrentSignInGateABTest } from './types';

// in our case if this is the n-numbered article or higher the user has viewed then set the gate
export const isNPageOrHigherPageView = (n = 2): boolean => {
	// get daily read article count array from local storage
	const [dailyCount = {} as DailyArticle] = getDailyArticleCount() || [];

	const { count = 0 } = dailyCount;

	return count >= n;
};

// determine if the useragent is running iOS 9 (known to be buggy for sign in flow)
export const isIOS9 = (): boolean => {
	// get the browser user agent
	const ua = navigator.userAgent;
	// check useragent if the device is an iOS device
	const appleDevice = /(iPhone|iPod|iPad)/i.test(ua);
	// check useragent if the os is version 9
	const os = /(CPU OS 9_)/i.test(ua);

	// if both true, then it's an apple ios 9 device
	return appleDevice && os;
};

// hide the sign in gate on article types that are not supported
export const isValidContentType = (contentType: string): boolean => {
	// It's safer to definitively *include* types as we
	// know new types will not break the sign-in-gate going forward
	const validTypes = ['Article'];

	return validTypes.some((type: string): boolean => contentType === type);
};

// hide the sign in gate on certain sections of the site, e.g info, about, help etc.
export const isValidSection = (sectionName?: string): boolean => {
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
		(section: string): boolean => sectionName === section,
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

/**
 * Occasionally we may want to track long-running behavior of browsers in a certain test,
 * without adding new browsers to the test bucket. We cannot rely on the GU_mvt_id bucketing alone to do this.
 * You can use this method to show the gate based on local storage participation key ("gu.ab.participations") instead.
 *
 * After the cut off date users without the local storage participation key won't see the gate at all.
 *
 * @param cutOff - UTC timestamp
 * @param currentTest - test the
 * @returns Promise<boolean>
 */
export const useParticipations = (
	cutOff: number,
	currentTest: CurrentSignInGateABTest,
): Promise<boolean> => {
	const now = Date.now(); // UTC
	const { id, variant } = currentTest;

	// BEFORE cutoff date all users will be bucketed and potentially shown the gate if they satisfy all subsequent conditions
	if (now < cutOff) {
		// sets participation under local storage key: 'gu.ab.participations'
		setParticipationsInLocalStorage({
			[id]: { variant: variant },
		});
		return Promise.resolve(true); //  we only want to bucket until the cutoff
	}

	// AFTER cutoff date, browsers without local storage test paticipatieon
	const participations = getParticipationsFromLocalStorage();
	// if the test particpation exists, show the test gate
	return !!participations[id] && participations[id]?.variant === variant
		? Promise.resolve(true)
		: Promise.resolve(false);
};

export const canShowSignInGate = ({
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
			!hasUserDismissedGateMoreThanCount(
				currentTest.variant,
				currentTest.name,
				5,
			) &&
			isNPageOrHigherPageView(3) &&
			isValidContentType(contentType) &&
			isValidSection(sectionName) &&
			isValidTag(tags) &&
			// hide the sign in gate on isPaidContent
			!isPaidContent &&
			// hide the sign in gate on internal tools preview &&
			!isPreview &&
			!isIOS9(),
	);

export const canShowMandatoryUs: ({
	isSignedIn,
	currentTest,
	contentType,
	sectionName,
	tags,
	isPaidContent,
	isPreview,
}: CanShowGateProps) => Promise<boolean> = async ({
	isSignedIn,
	currentTest,
	contentType,
	sectionName,
	tags,
	isPaidContent,
	isPreview,
}: CanShowGateProps) => {
	return (
		(await getLocale()) === 'US' &&
		(await hasRequiredConsents()) &&
		(await canShowSignInGate({
			isSignedIn,
			currentTest,
			contentType,
			sectionName,
			tags,
			isPaidContent,
			isPreview,
		}))
	);
};
