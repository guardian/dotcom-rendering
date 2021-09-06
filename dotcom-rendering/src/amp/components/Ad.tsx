import { ClassNames } from '@emotion/react';

import { adJson, stringify } from '@root/src/amp/lib/ad-json';
import { regionClasses } from '@root/src/amp/lib/region-classes';

// Largest size first
const inlineSizes = [
	{ width: 300, height: 250 }, // MPU
	{ width: 250, height: 250 }, // Square
];

// Note: amp-sticky-ad has max height of 100
const stickySizes = [{ width: 320, height: 50 }]; // Mobile Leaderboard

type AdRegion = 'US' | 'AU' | 'ROW';

const dfpAdUnitRoot = 'theguardian.com';

const ampData = (section: string, contentType: string): string => {
	const dfpAccountId = '59666047';

	if (section !== '') {
		return `/${dfpAccountId}/${dfpAdUnitRoot}/${section}/${contentType.toLowerCase()}/amp`;
	}

	return `/${dfpAccountId}/${dfpAdUnitRoot}/amp`;
};

/**
 * Determine the Placement ID that is used to look up a given stored bid request
 *
 * Stored bid requests are stored by the prebid server instance and each is
 * keyed by a placement ID. This placement ID corresponds to the tag id parameter
 * provided on the client
 *
 * @param isSticky Whether the ad is sticky - sticky ads have stored bid requests
 * containing different SSP ids to non-sticky ads
 * @param adRegion The advertising region - different regions are covered by different
 * stored bid requests
 * @returns The placement id for an ad, depending on its ad region and whether
 * it is sticky
 */
const getPlacementId = (isSticky: boolean, adRegion: AdRegion): number => {
	switch (adRegion) {
		case 'US': {
			// In the US use different placement IDs depending on whether ad is sticky
			return isSticky ? 22138171 : 7;
		}
		case 'AU':
			return 6;
		default:
			return 4;
	}
};

const realTimeConfig = (
	isSticky: boolean,
	adRegion: AdRegion,
	usePrebid: boolean,
	usePermutive: boolean,
): any => {
	const placementID = getPlacementId(isSticky, adRegion);
	const preBidServerPrefix = 'https://prebid.adnxs.com/pbs/v1/openrtb2/amp';
	const permutiveURL =
		'https://guardian.amp.permutive.com/rtc?type=doubleclick';
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

	const data = {
		urls: [
			usePrebid ? prebidURL : '',
			usePermutive ? permutiveURL : '',
		].filter((url) => url),
	};

	return JSON.stringify(data);
};

interface CommercialConfig {
	usePrebid: boolean;
	usePermutive: boolean;
}

export interface AdProps {
	isSticky?: boolean;
	adRegion: AdRegion;
	edition: Edition;
	section: string;
	contentType: string;
	config: CommercialConfig;
	commercialProperties: CommercialProperties;
}

export const Ad = ({
	isSticky = false,
	adRegion,
	edition,
	section,
	contentType,
	config,
	commercialProperties,
}: AdProps) => {
	const adSizes = isSticky ? stickySizes : inlineSizes;
	const [{ width, height }] = adSizes; // Set initial size as first element (should be the largest)
	const multiSizes = adSizes.map((e) => `${e.width}x${e.height}`).join(',');

	return (
		<ClassNames>
			{({ css, cx }) => (
				<amp-ad
					class={cx(
						css`
							${regionClasses[adRegion].styles}
						`,
					)}
					data-block-on-consent=""
					width={width}
					height={height}
					data-multi-size={multiSizes}
					data-npa-on-unknown-consent={true}
					data-loading-strategy="prefer-viewability-over-views"
					layout="fixed"
					type="doubleclick"
					json={stringify(
						adJson(commercialProperties[edition].adTargeting),
					)}
					data-slot={ampData(section, contentType)}
					rtc-config={realTimeConfig(
						isSticky,
						adRegion,
						config.usePrebid,
						config.usePermutive,
					)}
				/>
			)}
		</ClassNames>
	);
};
