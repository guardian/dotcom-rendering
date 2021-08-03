// use the dailyArticleCount from the local storage to see how many articles the user has viewed in a day
import {
	DailyArticle,
	getDailyArticleCount,
} from '@frontend/web/lib/dailyArticleCount';
import { onConsentChange } from '@guardian/consent-management-platform';
import { ConsentState } from '@guardian/consent-management-platform/dist/types';
import { getLocale } from '@guardian/libs';
import { hasUserDismissedGateMoreThanCount } from '@root/src/web/components/SignInGate/dismissGate';
import { CurrentSignInGateABTest } from './types';

// in our case if this is the n-numbered article or higher the user has viewed then set the gate
export const isNPageOrHigherPageView = (n: number = 2): boolean => {
	// get daily read article count array from local storage
	const [dailyCount = {} as DailyArticle] = getDailyArticleCount();

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
export const isValidContentType = (CAPI: CAPIBrowserType): boolean => {
	// It's safer to definitively *include* types as we
	// know new types will not break the sign-in-gate going forward
	const validTypes = ['Article'];

	return validTypes.some(
		(type: string): boolean => CAPI.contentType === type,
	);
};

// hide the sign in gate on certain sections of the site, e.g info, about, help etc.
export const isValidSection = (CAPI: CAPIBrowserType): boolean => {
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
		(section: string): boolean => CAPI.sectionName === section,
	);
};

// hide the sign in gate for certain tags on the site
export const isValidTag = (CAPI: CAPIBrowserType): boolean => {
	const invalidTags = ['info/newsletter-sign-up'];

	return !invalidTags.some((invalidTag) =>
		CAPI.tags.map((tag) => tag.id).includes(invalidTag),
	);
};

// hide the sign in gate on isPaidContent
export const isPaidContent = (CAPI: CAPIBrowserType): boolean =>
	CAPI.pageType.isPaidContent;

// hide the sign in gate on internal tools preview
export const isPreview = (CAPI: CAPIBrowserType): boolean =>
	CAPI.isPreview || false;

export const hasRequiredConsents = (): Promise<boolean> => {
	const hasConsentedToAll = (state: ConsentState) => {
		const consentFlags = state.tcfv2?.consents
			? Object.values(state.tcfv2.consents)
			: [];
		const vendorConsentFlags = state.tcfv2?.vendorConsents
			? Object.values(state.tcfv2.vendorConsents)
			: [];
		const isEmpty =
			consentFlags.length === 0 || vendorConsentFlags.length === 0;

		return (
			!isEmpty && [...consentFlags, ...vendorConsentFlags].every(Boolean)
		);
	};

	return new Promise((resolve) => {
		onConsentChange((state) => {
			if (state.tcfv2) {
				return resolve(hasConsentedToAll(state));
			}

			if (state.ccpa) {
				return resolve(state.ccpa.doNotSell === false);
			}

			if (state.aus) {
				return resolve(state.aus.personalisedAdvertising);
			}

			// this shouldn't ever be hit, but this is here as safety
			return resolve(false);
		});
	});
};

export const canShow = (
	CAPI: CAPIBrowserType,
	isSignedIn: boolean,
	currentTest: CurrentSignInGateABTest,
): Promise<boolean> =>
	Promise.resolve(
		!isSignedIn &&
			!hasUserDismissedGateMoreThanCount(
				currentTest.variant,
				currentTest.name,
				5,
			) &&
			isNPageOrHigherPageView(3) &&
			isValidContentType(CAPI) &&
			isValidSection(CAPI) &&
			isValidTag(CAPI) &&
			!isPaidContent(CAPI) &&
			!isPreview(CAPI) &&
			!isIOS9(),
	);

export const canShowMandatoryUs: (
	CAPI: CAPIBrowserType,
	isSignedIn: boolean,
	currentTest: CurrentSignInGateABTest,
) => Promise<boolean> = async (
	CAPI: CAPIBrowserType,
	isSignedIn: boolean,
	currentTest: CurrentSignInGateABTest,
) => {
	return (
		(await getLocale()) === 'US' &&
		(await hasRequiredConsents()) &&
		(await canShow(CAPI, isSignedIn, currentTest))
	);
};
