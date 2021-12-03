import { ClassNames } from '@emotion/react';

import { adJson, stringify } from '@root/src/amp/lib/ad-json';
import { regionClasses } from '@root/src/amp/lib/region-classes';

// Largest size first
const inlineSizes = [
	{ width: 320, height: 480 }, // Picnic story
	{ width: 300, height: 250 }, // MPU
	{ width: 250, height: 250 }, // Square
];

// Note: amp-sticky-ad has max height of 100
const stickySizes = [{ width: 320, height: 50 }]; // Mobile Leaderboard

type AdRegion = 'US' | 'AU' | 'ROW';

// Array of possible ad regions
const adRegions: AdRegion[] = ['US', 'AU', 'ROW'];

const dfpAdUnitRoot = 'theguardian.com';

const ampData = (section: string, contentType: string): string => {
	const dfpAccountId = '59666047';

	if (section !== '') {
		return `/${dfpAccountId}/${dfpAdUnitRoot}/${section}/${contentType.toLowerCase()}/amp`;
	}

	return `/${dfpAccountId}/${dfpAdUnitRoot}/amp`;
};

const preBidServerPrefix = 'https://prebid.adnxs.com/pbs/v1/openrtb2/amp';
const permutiveURL = 'https://guardian.amp.permutive.com/rtc?type=doubleclick';
const amazonConfig = {
	aps: { PUB_ID: '3722', PARAMS: { amp: '1' } },
};

/**
 * Determine the Placement ID that is used to look up a given stored bid request
 *
 * Stored bid requests are stored by the prebid server instance and each is
 * keyed by a placement ID. This placement ID corresponds to the tag id parameter
 * provided on the client
 *
 * @param adRegion The advertising region - different regions are covered by different
 * stored bid requests
 * @returns The placement id for an ad, depending on its ad region
 */
const getPlacementIdByAdRegion = (adRegion: AdRegion): number => {
	switch (adRegion) {
		case 'US':
			return 7;
		case 'AU':
			return 6;
		default:
			return 4;
	}
};

export const realTimeConfig = (
	usePrebid: boolean,
	usePermutive: boolean,
	useAmazon: boolean,
	placementID: number,
): string => {
	const prebidURL = [
		// The tag_id in the URL is used to look up the bulk of the request
		// In this case it corresponds to the placement ID of the bid requests
		// on the prebid server
		`${preBidServerPrefix}?tag_id=${placementID}`,
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
	].join('&');

	const urls = [
		usePrebid ? prebidURL : '',
		usePermutive ? permutiveURL : '',
	].filter(Boolean); // remove empty strings, which are falsey

	const vendors = useAmazon ? amazonConfig : {};

	const data = {
		urls,
		vendors,
	};

	return JSON.stringify(data);
};

export interface CommercialConfig {
	usePrebid: boolean;
	usePermutive: boolean;
	useAmazon: boolean;
}

export interface BaseAdProps {
	edition: Edition;
	section: string;
	contentType: string;
	commercialProperties: CommercialProperties;
}

interface AdProps extends BaseAdProps {
	isSticky?: boolean;
	rtcConfig: string;
}

interface RegionalAdProps extends BaseAdProps {
	config: CommercialConfig;
}

export const Ad = ({
	isSticky = false,
	edition,
	section,
	contentType,
	commercialProperties,
	rtcConfig,
}: AdProps) => {
	const adSizes = isSticky ? stickySizes : inlineSizes;
	// Set Primary ad size as first element (should be the largest)
	const [{ width, height }] = adSizes;
	// Secondary ad sizes
	const multiSizes = adSizes.map((e) => `${e.width}x${e.height}`).join(',');

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
			json={stringify(adJson(commercialProperties[edition].adTargeting))}
			data-slot={ampData(section, contentType)}
			rtc-config={rtcConfig}
		/>
	);
};

/**
 * Ad slot component whose config differs based on region.
 * For each adRegion, create an Ad component with styling so that all but the component for the
 * user's region are hidden
 * @param RegionalAdProps
 * @returns an Ad component per region
 */
export const RegionalAd = ({
	edition,
	section,
	contentType,
	commercialProperties,
	config,
}: RegionalAdProps) => (
	<>
		{adRegions.map((adRegion) => (
			<ClassNames key={adRegion}>
				{({ css, cx }) => (
					<div
						className={cx(
							css`
								${regionClasses[adRegion].styles}
							`,
						)}
					>
						<Ad
							isSticky={false}
							edition={edition}
							section={section}
							contentType={contentType}
							commercialProperties={commercialProperties}
							rtcConfig={realTimeConfig(
								config.usePrebid,
								config.usePermutive,
								config.useAmazon,
								getPlacementIdByAdRegion(adRegion),
							)}
						/>
					</div>
				)}
			</ClassNames>
		))}
	</>
);
