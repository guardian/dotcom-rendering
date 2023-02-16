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

type CriteoRTCParameters = { ZONE_ID: string };

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
	if (adType.isSticky) {
		return { ZONE_ID: '1709360' };
	} else {
		switch (adType.adRegion) {
			case 'UK': {
				return {
					ZONE_ID: '1709356',
				};
			}
			case 'US': {
				return {
					ZONE_ID: '1709355',
				};
			}
			case 'AU': {
				return {
					ZONE_ID: '1709354',
				};
			}
			case 'INT':
			case 'EUR': {
				return {
					ZONE_ID: '1709353',
				};
			}
		}
	}
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

	const data = {
		urls: usePermutive ? [permutiveURL] : [],
		vendors: {
			...(usePubmaticPrebid ? pubmaticConfig : {}),
			...(useCriteoPrebid ? criteoConfig : {}),
			...(useAmazon ? amazonConfig : {}),
		},
		timeoutMillis: 1000,
	};
	return JSON.stringify(data);
};
