/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/shared/src/lib/tracking.ts
 */
import { isUndefined } from '@guardian/libs';
import type { ComponentEvent, TAction } from '@guardian/ophan-tracker-js';
import { addRegionIdToSupportUrl } from '@guardian/support-dotcom-components';
import type {
	AbandonedBasket,
	BannerTest,
	BannerVariant,
	ContributionFrequency,
	EpicTest,
	EpicVariant,
	TargetingAbTest,
	Tracking,
} from '@guardian/support-dotcom-components/dist/shared/types';
import type { ChoiceCard } from '@guardian/support-dotcom-components/dist/shared/types/props/choiceCards';

// TRACKING VIA support.theguardian.com
type LinkParams = {
	REFPVID: string;
	INTCMP: string;
	acquisitionData: string;
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
): string => {
	const trackingLinkParams: LinkParams = {
		REFPVID: params.ophanPageId || 'not_found',
		INTCMP: params.campaignCode || '',
		acquisitionData,
	};

	const queryString = Object.entries(trackingLinkParams)
		.filter(([, value]) => !isUndefined(value))
		.map(([key, value]) => `${key}=${value}`);

	return queryString.join('&');
};

const addTrackingParams = (
	baseUrl: string,
	params: Tracking,
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
	const queryString = generateQueryString(params, acquisitionData);
	const alreadyHasQueryString = baseUrl.includes('?');
	return `${baseUrl}${alreadyHasQueryString ? '&' : '?'}${queryString}`;
};

const addAbandonedBasketContributionParams = (
	baseUrl: string,
	{ region, amount, billingPeriod }: AbandonedBasket,
): string => {
	return `${baseUrl}/${region}/contribute/checkout?selected-amount=${amount}&selected-contribution-type=${billingPeriod}`;
};

export const addAbandonedBasketParamsToUrl = (
	baseUrl: string,
	abandonedBasket: AbandonedBasket,
): string => {
	switch (abandonedBasket.product) {
		case 'Contribution':
		case 'SupporterPlus':
			return addAbandonedBasketContributionParams(
				baseUrl,
				abandonedBasket,
			);
		default:
			return baseUrl;
	}
};

export const addAbandonedBasketAndTrackingParamsToUrl = (
	baseUrl: string,
	abandonedBasket: AbandonedBasket,
	tracking: Tracking,
): string => {
	return addTrackingParams(
		addAbandonedBasketParamsToUrl(baseUrl, abandonedBasket),
		tracking,
	);
};

const addPromoCodesToUrl = (url: string, promoCodes: string[]): string => {
	if (!promoCodes.length) return url;
	const separator = url.includes('?') ? '&' : '?';
	const promoParams = promoCodes
		.map((code) => `promoCode=${encodeURIComponent(code)}`)
		.join('&');
	return `${url}${separator}${promoParams}`;
};

export const isSupportUrl = (baseUrl: string): boolean =>
	/\bsupport\./.test(baseUrl);

// Enriches the path and querystring of a link to the Support site
interface SupportUrlData {
	baseUrl: string; // the base url, which may already contain a querystring. Typically defined in the RRCP tool
	tracking: Tracking; // tracking data to be added to the querystring
	promoCodes: string[]; // any promo codes, to be added in the promoCodes parameter
	countryCode?: string; // browser's country code
	amountsAbTestName?: string; // amounts test name if applicable
	amountsAbTestVariant?: string; // amounts test variant name if applicable
}

export const enrichSupportUrl = ({
	baseUrl,
	tracking,
	promoCodes,
	countryCode,
	amountsAbTestName,
	amountsAbTestVariant,
}: SupportUrlData): string => {
	if (!isSupportUrl(baseUrl)) {
		return baseUrl;
	}
	const urlWithRegion = addRegionIdToSupportUrl(baseUrl, countryCode);

	const withTracking = addTrackingParams(
		urlWithRegion,
		tracking,
		amountsAbTestName,
		amountsAbTestVariant,
	);

	return addPromoCodesToUrl(withTracking, promoCodes);
};

const hrefRegex = /href="(.*?)"/g;
export const addTrackingParamsToBodyLinks = (
	text: string,
	tracking: Tracking,
	promoCodes: string[],
	countryCode?: string,
): string => {
	const trackingWithLabel = addLabelToTracking(tracking, 'body-link');

	const replaceHref = (wholeMatch: string, baseUrl: string) =>
		`href="${enrichSupportUrl({
			baseUrl,
			tracking: trackingWithLabel,
			promoCodes,
			countryCode,
		})}"`;

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
		.filter(([, value]) => !isUndefined(value))
		.map(([key, value]) => `${key}=${value}`);
	const alreadyHasQueryString = baseUrl.includes('?');

	return `${baseUrl}${alreadyHasQueryString ? '&' : '?'}${queryString.join(
		'&',
	)}`;
};

export const addChoiceCardsParams = (
	url: string,
	frequency: ContributionFrequency,
	amount?: number | 'other',
): string => {
	const newParams = `selected-contribution-type=${frequency}${
		amount !== undefined ? `&selected-amount=${amount}` : ''
	}`;
	const alreadyHasQueryString = url.includes('?');
	return `${url}${alreadyHasQueryString ? '&' : '?'}${newParams}`;
};

export const addChoiceCardsOneTimeParams = (url: string): string => {
	const newParams = `oneTime`;
	const alreadyHasQueryString = url.includes('?');
	return `${url}${alreadyHasQueryString ? '&' : '?'}${newParams}`;
};

export const addChoiceCardsProductParams = (
	url: string,
	product: string,
	ratePlan: string,
	contribution?: number,
): string => {
	const newParams = `product=${product}&ratePlan=${ratePlan}${
		contribution !== undefined ? `&contribution=${contribution}` : ''
	}`;

	const alreadyHasQueryString = url.includes('?');
	return `${url}${alreadyHasQueryString ? '&' : '?'}${newParams}`;
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

export const getChoiceCardUrl = (
	choiceCard: ChoiceCard,
	baseUrl: string,
): string => {
	const { destinationUrl, product } = choiceCard;

	const url: string =
		destinationUrl && destinationUrl.trim() !== ''
			? destinationUrl.trim()
			: baseUrl;

	if (product.supportTier === 'OneOff') {
		return addChoiceCardsOneTimeParams(url);
	}

	return addChoiceCardsProductParams(
		url,
		product.supportTier,
		product.ratePlan,
	);
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

const createEventFromTracking = (action: TAction) => {
	return (tracking: Tracking, componentId: string): ComponentEvent => {
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
