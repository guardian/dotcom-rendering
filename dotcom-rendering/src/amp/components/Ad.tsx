import type { CommercialProperties } from '../../types/commercial';
import type { EditionId } from '../../web/lib/edition';
import { adJson, stringify } from '../lib/ad-json';
import type { RTCParameters } from '../lib/real-time-config';
import { realTimeConfig } from '../lib/real-time-config';

// Largest size first
const inlineSizes = [
	{ width: 320, height: 480 }, // Picnic story
	{ width: 300, height: 250 }, // MPU
	{ width: 250, height: 250 }, // Square
] as const;

// Note: amp-sticky-ad has max height of 100
const stickySizes = [{ width: 320, height: 50 }] as const; // Mobile Leaderboard

const dfpAdUnitRoot = 'theguardian.com';

const ampData = (section: string, contentType: string): string => {
	const dfpAccountId = '59666047';

	if (section !== '') {
		return `/${dfpAccountId}/${dfpAdUnitRoot}/${section}/${contentType.toLowerCase()}/amp`;
	}

	return `/${dfpAccountId}/${dfpAdUnitRoot}/amp`;
};

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

const pubmaticRealTimeConfig = (
	usePrebid: boolean,
	usePermutive: boolean,
	useAmazon: boolean,
	{ profileId, pubId }: RTCParameters,
): string => {
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
};

interface CommercialConfig {
	usePrebid: boolean;
	usePermutive: boolean;
	useAmazon: boolean;
}

export interface BaseAdProps {
	editionId: EditionId;
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
	editionId,
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

	const rtcConfig = pubmaticRealTimeConfig(
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
					...commercialProperties[editionId].adTargeting,
					...mapAdTargeting(adTargeting),
				]),
			)}
			data-slot={ampData(section, contentType)}
			rtc-config={rtcConfig}
		/>
	);
};
