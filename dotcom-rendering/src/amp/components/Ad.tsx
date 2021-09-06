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

const dfpAdUnitRoot = 'theguardian.com';

const ampData = (section: string, contentType: string): string => {
	const dfpAccountId = '59666047';

	if (section !== '') {
		return `/${dfpAccountId}/${dfpAdUnitRoot}/${section}/${contentType.toLowerCase()}/amp`;
	}

	return `/${dfpAccountId}/${dfpAdUnitRoot}/amp`;
};

const getPlacementId = (adRegion: AdRegion): number => {
	switch (adRegion) {
		case 'US':
			return 7;
		case 'AU':
			return 6;
		default:
			return 4;
	}
};

const realTimeConfig = (
	adRegion: AdRegion,
	usePrebid: boolean,
	usePermutive: boolean,
): any => {
	const placementID = getPlacementId(adRegion);
	const preBidServerPrefix = 'https://prebid.adnxs.com/pbs/v1/openrtb2/amp';
	const permutiveURL =
		'https://guardian.amp.permutive.com/rtc?type=doubleclick';

	const prebidURL = [
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
	isSticky,
	adRegion,
	edition,
	section,
	contentType,
	config,
	commercialProperties,
}: AdProps) => {
	const adSizes = isSticky ? stickySizes : inlineSizes;
	// Set Primary ad size as first element (should be the largest)
	const [{ width, height }] = adSizes;
	// Secondary ad sizes
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
						adJson(commercialProperties[edition].adTargeting),
					)}
					data-slot={ampData(section, contentType)}
					rtc-config={realTimeConfig(
						adRegion,
						config.usePrebid,
						config.usePermutive,
					)}
				/>
			)}
		</ClassNames>
	);
};
