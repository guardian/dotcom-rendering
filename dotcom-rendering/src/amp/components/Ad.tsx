import { adJson, stringify } from '../lib/ad-json';
import { realTimeConfig, RTCParameters } from '../lib/real-time-config';
import { useContentABTestGroup } from './ContentABTest';

// Largest size first
const inlineSizes = [
	{ width: 320, height: 480 }, // Picnic story
	{ width: 300, height: 250 }, // MPU
	{ width: 250, height: 250 }, // Square
];

// Note: amp-sticky-ad has max height of 100
const stickySizes = [{ width: 320, height: 50 }]; // Mobile Leaderboard

const dfpAdUnitRoot = 'theguardian.com';

const ampData = (section: string, contentType: string): string => {
	const dfpAccountId = '59666047';

	if (section !== '') {
		return `/${dfpAccountId}/${dfpAdUnitRoot}/${section}/${contentType.toLowerCase()}/amp`;
	}

	return `/${dfpAccountId}/${dfpAdUnitRoot}/amp`;
};

const preBidServerPrefix = 'https://prebid.adnxs.com/pbs/v1/openrtb2/amp';

const relevantYieldURLPrefix = 'https://pbs.relevant-digital.com/openrtb2/amp';

const commonPrebidUrlParams = [
	'w=ATTR(width)',
	'h=ATTR(height)',
	'ow=ATTR(data-override-width)',
	'oh=ATTR(data-override-height)',
	'ms=ATTR(data-multi-size)',
	'slot=ATTR(data-slot)',
	'targeting=TGT',
	'curl=CANONICAL_URL',
	'timeout=TIMEOUT',
	'adcid=ADCID',
	'purl=HREF',
	'gdpr_consent=CONSENT_STRING',
];

const mapAdTargeting = (adTargeting: AdTargeting): AdTargetParam[] => {
	const adTargetingMapped: AdTargetParam[] = [];

	if (!adTargeting.disableAds) {
		adTargetingMapped.push({
			name: 'sens',
			value: adTargeting.customParams.sens,
		});

		adTargetingMapped.push({
			name: 'urlkw',
			value: adTargeting.customParams.urlkw,
		});
	}

	return adTargetingMapped;
};

// Variants for the Prebid server test
// Assign each variant 4 groups e.g. 33.3% of content types each
const variants = {
	control: new Set([0, 1, 2, 3]),
	'relevant-yield': new Set([4, 5, 6, 7]),
	pubmatic: new Set([8, 9, 10, 11]),
};

// Determine participation in a variant from group
const isInVariant = (
	variantName: 'control' | 'relevant-yield' | 'pubmatic',
	group: number | undefined,
) => group !== undefined && variants[variantName].has(group);

const useRealTimeConfig = (
	usePrebid: boolean,
	usePermutive: boolean,
	useAmazon: boolean,
	{ placementId, tagId, profileId, pubId }: RTCParameters,
): string => {
	const { group } = useContentABTestGroup();

	// Relevant Yield variant
	if (isInVariant('relevant-yield', group)) {
		const relevantYieldURL = [
			`${relevantYieldURLPrefix}?tag_id=${tagId}`,
			...commonPrebidUrlParams,
			'tgt_pfx=rv',
			'dummy_param=ATTR(data-amp-slot-index)',
		].join('&');

		return realTimeConfig({
			url: usePrebid ? relevantYieldURL : undefined,
			usePermutive,
			useAmazon,
		});
	}

	// Pubmatic variant
	if (isInVariant('pubmatic', group)) {
		const pubmaticConfig = {
			openwrap: {
				PROFILE_ID: profileId,
				PUB_ID: pubId,
			},
		};

		return realTimeConfig({
			vendors: usePrebid ? pubmaticConfig : {},
			usePermutive,
			useAmazon,
			timeoutMillis: 1000,
		});
	}

	// Control / AB testing not enabled

	const prebidURL = [
		// The tag_id in the URL is used to look up the bulk of the request
		// In this case it corresponds to the placement ID of the bid requests
		// on the prebid server
		`${preBidServerPrefix}?tag_id=${placementId}`,
		...commonPrebidUrlParams,
	].join('&');

	return realTimeConfig({
		url: usePrebid ? prebidURL : undefined,
		usePermutive,
		useAmazon,
	});
};

interface CommercialConfig {
	usePrebid: boolean;
	usePermutive: boolean;
	useAmazon: boolean;
}

export interface BaseAdProps {
	edition: Edition;
	section: string;
	contentType: string;
	commercialProperties: CommercialProperties;
	adTargeting: AdTargeting;
	config: CommercialConfig;
}

interface AdProps extends BaseAdProps {
	isSticky?: boolean;
	rtcParameters: RTCParameters;
}

export const Ad = ({
	isSticky = false,
	edition,
	section,
	contentType,
	commercialProperties,
	adTargeting,
	config: { useAmazon, usePrebid, usePermutive },
	rtcParameters,
}: AdProps) => {
	const adSizes = isSticky ? stickySizes : inlineSizes;
	// Set Primary ad size as first element (should be the largest)
	const [{ width, height }] = adSizes;
	// Secondary ad sizes
	const multiSizes = adSizes.map((e) => `${e.width}x${e.height}`).join(',');

	const rtcConfig = useRealTimeConfig(
		usePrebid,
		usePermutive,
		useAmazon,
		rtcParameters,
	);

	return (
		<amp-ad
			data-block-on-consent=""
			// Primary ad size width and height
			width={width}
			height={height}
			// Secondary ad sizes
			data-multi-size={multiSizes}
			// Setting data-multi-size-validation to false allows
			// secondary ad sizes that are less than 2/3rds of the
			// corresponding primary size.
			data-multi-size-validation="false"
			data-npa-on-unknown-consent={true}
			data-loading-strategy="prefer-viewability-over-views"
			layout="fixed"
			type="doubleclick"
			json={stringify(
				adJson([
					...commercialProperties[edition].adTargeting,
					...mapAdTargeting(adTargeting),
				]),
			)}
			data-slot={ampData(section, contentType)}
			rtc-config={rtcConfig}
		/>
	);
};
