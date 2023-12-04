/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/shared/src/lib/tracking.ts
 */
import type { OphanAction, OphanComponentEvent } from '@guardian/libs';
import { addRegionIdToSupportUrl } from '@guardian/support-dotcom-components';
import type {
	BannerTest,
	BannerVariant,
	EpicTest,
	EpicVariant,
	TargetingAbTest,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/src/types';

// TRACKING VIA support.theguardian.com
type LinkParams = {
	REFPVID: string;
	INTCMP: string;
	acquisitionData: string;
	numArticles: number;
};

type AbTestObject = {
	name: string;
	variant: string;
	testType?: string;
};

const generateAbTestArray = (
	abTestName: string,
	abTestVariant: string,
	targetingAbTest?: TargetingAbTest,
	amountsAbTestName?: string,
	amountsAbTestVariant?: string,
): AbTestObject[] => {
	const abTests: AbTestObject[] = [
		{
			name: abTestName,
			variant: abTestVariant,
		},
	];
	if (targetingAbTest) {
		abTests.push({
			name: targetingAbTest.testName,
			variant: targetingAbTest.variantName,
		});
	}
	if (amountsAbTestName && amountsAbTestVariant) {
		abTests.push({
			name: amountsAbTestName,
			variant: amountsAbTestVariant,
			testType: 'AMOUNTS_TEST',
		});
	}
	return abTests;
};

const encodeAcquisitionsData = (
	params: Tracking,
	abTests: AbTestObject[],
): string => {
	return encodeURIComponent(
		JSON.stringify({
			source: params.platformId,
			componentId: params.campaignCode,
			componentType: params.componentType,
			campaignCode: params.campaignCode,
			abTests,
			referrerPageviewId: params.ophanPageId,
			referrerUrl: params.referrerUrl,
			isRemote: true, // Temp param to indicate served by remote service
			labels: params.labels,
		}),
	);
};

const generateQueryString = (
	params: Tracking,
	acquisitionData: string,
	numArticles: number,
): string => {
	const trackingLinkParams: LinkParams = {
		REFPVID: params.ophanPageId || 'not_found',
		INTCMP: params.campaignCode || '',
		acquisitionData,
		numArticles: numArticles || 0,
	};

	const queryString = Object.entries(trackingLinkParams)
		.filter(([, value]) => value !== undefined)
		.map(([key, value]) => `${key}=${value}`);

	return queryString.join('&');
};

export const addTrackingParams = (
	baseUrl: string,
	params: Tracking,
	numArticles?: number,
	amountsAbTestName?: string,
	amountsAbTestVariant?: string,
): string => {
	const abTests = generateAbTestArray(
		params.abTestName,
		params.abTestVariant,
		params.targetingAbTest,
		amountsAbTestName,
		amountsAbTestVariant,
	);
	const acquisitionData = encodeAcquisitionsData(params, abTests);
	const queryString = generateQueryString(
		params,
		acquisitionData,
		numArticles ?? 0,
	);
	const alreadyHasQueryString = baseUrl.includes('?');
	return `${baseUrl}${alreadyHasQueryString ? '&' : '?'}${queryString}`;
};

export const isSupportUrl = (baseUrl: string): boolean =>
	/\bsupport\./.test(baseUrl);

export const addRegionIdAndTrackingParamsToSupportUrl = (
	baseUrl: string,
	tracking: Tracking,
	numArticles?: number,
	countryCode?: string,
	amountsAbTestName?: string,
	amountsAbTestVariant?: string,
): string => {
	if (!isSupportUrl(baseUrl)) {
		return baseUrl;
	}
	const urlWithRegion = addRegionIdToSupportUrl(baseUrl, countryCode);

	return addTrackingParams(
		urlWithRegion,
		tracking,
		numArticles,
		amountsAbTestName,
		amountsAbTestVariant,
	);
};

const hrefRegex = /href="(.*?)"/g;
export const addTrackingParamsToBodyLinks = (
	text: string,
	tracking: Tracking,
	numArticles?: number,
	countryCode?: string,
): string => {
	const trackingWithLabel = addLabelToTracking(tracking, 'body-link');

	const replaceHref = (wholeMatch: string, url: string) =>
		`href="${addRegionIdAndTrackingParamsToSupportUrl(
			url,
			trackingWithLabel,
			numArticles,
			countryCode,
		)}"`;

	return text.replace(hrefRegex, replaceHref);
};

// TRACKING VIA profile.theguardian.com
type ProfileLinkParams = {
	componentEventParams: string;
	returnUrl: string;
};

type TrackingParam = keyof Tracking;

export const addProfileTrackingParams = (
	baseUrl: string,
	params: Tracking,
): string => {
	const constructQuery = (query: Partial<Tracking>): string =>
		Object.keys(query)
			.map((param) => {
				const value = query[param as TrackingParam];
				const queryValue = Array.isArray(value)
					? value.map((v) => encodeURIComponent(v)).join(',')
					: encodeURIComponent(value as string | number | boolean);
				return `${param}=${queryValue}`;
			})
			.join('&');

	const componentEventParamsData = {
		componentType: params.componentType,
		componentId: params.campaignCode,
		abTestName: params.abTestName,
		abTestVariant: params.abTestVariant,
		viewId: params.ophanPageId,
	};

	const trackingLinkParams: ProfileLinkParams = {
		// Note: profile subdomain take uri encoded query params NOT json
		componentEventParams: encodeURIComponent(
			constructQuery(componentEventParamsData),
		),
		returnUrl: params.referrerUrl,
	};

	const queryString = Object.entries(trackingLinkParams)
		.filter(([, value]) => value !== undefined)
		.map(([key, value]) => `${key}=${value}`);
	const alreadyHasQueryString = baseUrl.includes('?');

	return `${baseUrl}${alreadyHasQueryString ? '&' : '?'}${queryString.join(
		'&',
	)}`;
};

export const isProfileUrl = (baseUrl: string): boolean =>
	/\bprofile\./.test(baseUrl);
export const addTrackingParamsToProfileUrl = (
	baseUrl: string,
	tracking: Tracking,
): string => {
	return isProfileUrl(baseUrl)
		? addProfileTrackingParams(baseUrl, tracking)
		: baseUrl;
};

// SHARED TRACKING
const campaignPrefix = 'gdnwb_copts_memco';

export const buildCampaignCode = (
	test: EpicTest,
	variant: EpicVariant,
): string =>
	`${campaignPrefix}_${test.campaignId ?? test.name}_${variant.name}`;

export const buildBannerCampaignCode = (
	test: BannerTest,
	variant: BannerVariant,
): string => `${test.name}_${variant.name}`;

export const buildAmpEpicCampaignCode = (
	testName: string,
	variantName: string,
): string => `AMP__${testName}__${variantName}`;

const createEventFromTracking = (action: OphanAction) => {
	return (tracking: Tracking, componentId: string): OphanComponentEvent => {
		const {
			abTestName,
			abTestVariant,
			componentType,
			products = [],
			labels = [],
			campaignCode,
		} = tracking;
		const abTest =
			abTestName && abTestVariant
				? {
						name: abTestName,
						variant: abTestVariant,
				  }
				: null;

		const targetingAbTest = tracking.targetingAbTest
			? {
					name: tracking.targetingAbTest.testName,
					variant: tracking.targetingAbTest.variantName,
			  }
			: null;

		return {
			component: {
				componentType,
				products,
				campaignCode,
				id: componentId,
				labels,
			},
			...(abTest ? { abTest } : {}),
			...(targetingAbTest ? { targetingAbTest } : {}),
			action,
		};
	};
};

export const addLabelToTracking = (
	tracking: Tracking,
	label: string,
): Tracking => {
	if (tracking.labels) {
		return {
			...tracking,
			labels: [...tracking.labels, label],
		};
	} else {
		return {
			...tracking,
			labels: [label],
		};
	}
};

export const createClickEventFromTracking = createEventFromTracking('CLICK');

export const createViewEventFromTracking = createEventFromTracking('VIEW');

export const createInsertEventFromTracking = createEventFromTracking('INSERT');
