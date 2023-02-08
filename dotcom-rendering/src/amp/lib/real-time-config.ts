import type { AdRegion } from './region-classes';

/**
 * Type of AMP ad
 *
 * These values determine the computed RTC parameters
 */
export type AdType =
	| { isSticky: true }
	| {
			isSticky?: false;
			adRegion: AdRegion;
	  };

type PubmaticRTCParameters = {
	PROFILE_ID: string;
	PUB_ID: string;
};

type CriteoRTCParameters = { NETWORK_ID: string };

type OzoneRTCParameters = {
	PUBLISHER_ID: string;
	SITE_ID: string;
	TAG_ID: string;
	PLACEMENT_ID: string;
	AD_UNIT_CODE: string;
};

/**
 * Determine the pub id and profile id required by Pubmatic to construct an RTC vendor
 *
 */
export const pubmaticRtcParameters = (
	adType: AdType,
): PubmaticRTCParameters => {
	if (
		adType.isSticky ||
		adType.adRegion === 'UK' ||
		adType.adRegion === 'INT'
	) {
		return {
			PROFILE_ID: '6611',
			PUB_ID: '157207',
		};
	}

	if (adType.adRegion === 'AU') {
		return { PROFILE_ID: '6697', PUB_ID: '157203' };
	}

	// ad region is US
	return { PROFILE_ID: '6696', PUB_ID: '157206' };
};

export const criteoRTCParamters = (adType: AdType): CriteoRTCParameters => {
	// TODO set these to true values
	return {
		NETWORK_ID: 'xxxx',
	};
};

export const ozoneRTCParameters = (adType: AdType): OzoneRTCParameters => {
	// TODO set these to true values
	return {
		PUBLISHER_ID: 'xxxx',
		SITE_ID: 'xxxx',
		TAG_ID: 'xxxx',
		PLACEMENT_ID: 'xxxx',
		AD_UNIT_CODE: 'xxxx',
	};
};

const permutiveURL = 'amp-script:permutiveCachedTargeting.ct';

const amazonConfig = {
	aps: { PUB_ID: '3722', PARAMS: { amp: '1' } },
};

/**
 * Build a generic Real Time Config string from a possible URL,
 * optional vendors and whether to enable Permutive and Amazon
 */
export const realTimeConfig = (
	usePubmaticPrebid: boolean,
	useCriteoPrebid: boolean,
	useOzonePrebid: boolean,
	usePermutive: boolean,
	useAmazon: boolean,
	adType: AdType,
): string => {
	const pubmaticConfig = {
		openwrap: pubmaticRtcParameters(adType),
	};

	const criteoConfig = {
		criteo: criteoRTCParamters(adType),
	};

	const ozoneConfig = {
		ozone: ozoneRTCParameters(adType),
	};

	const data = {
		urls: usePermutive ? [permutiveURL] : [],
		vendors: {
			...(usePubmaticPrebid ? pubmaticConfig : {}),
			...(useCriteoPrebid ? criteoConfig : {}),
			...(useOzonePrebid ? ozoneConfig : {}),
			...(useAmazon ? amazonConfig : {}),
		},
		timeoutMillis: 1000,
	};
	return JSON.stringify(data);
};
