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

/**
 * The properties required by different Prebid URLS / vendors
 *
 * These can be computed from the Config type above
 */
export type RTCParameters = {
	PROFILE_ID: string;
	PUB_ID: string;
};

/**
 * Determine the pub id and profile id required by Pubmatic to construct an RTC vendor
 *
 */
export const pubmaticRtcParameters = (adType: AdType): RTCParameters => {
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

const permutiveURL = 'amp-script:permutiveCachedTargeting.ct';

const amazonConfig = {
	aps: { PUB_ID: '3722', PARAMS: { amp: '1' } },
};

/**
 * Build a generic Real Time Config string from a possible URL,
 * optional vendors and whether to enable Permutive and Amazon
 */
export const realTimeConfig = (
	usePrebid: boolean,
	usePermutive: boolean,
	useAmazon: boolean,
	adType: AdType,
): string => {
	const pubmaticConfig = {
		openwrap: pubmaticRtcParameters(adType),
	};

	const data = {
		urls: usePermutive ? [permutiveURL] : [],
		vendors: {
			...(usePrebid ? pubmaticConfig : {}),
			...(useAmazon ? amazonConfig : {}),
		},
		timeoutMillis: 1000,
	};
	return JSON.stringify(data);
};
