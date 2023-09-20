/**
 * We may wish to use different parameters (placement ids, zone ids, etc)
 * in four distinct geographical regions
 */
export const advertisingRegions = ['UK', 'US', 'AU', 'ROW'] as const;

export type AdvertisingRegion = (typeof advertisingRegions)[number];

/**
 * Type of AMP ad
 *
 * These values determine the computed RTC parameters
 */
export type AdType =
	| { isSticky: true }
	| {
			isSticky?: false;
			adRegion: AdvertisingRegion;
	  };

type PubmaticRTCParameters = {
	PROFILE_ID: string;
	PUB_ID: string;
};

type CriteoRTCParameters = { ZONE_ID: string };

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
		adType.adRegion === 'ROW'
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
			case 'ROW': {
				return {
					ZONE_ID: '1709353',
				};
			}
		}
	}
};

export const ozoneRTCParameters = (
	adType: AdType,
	id: string,
): OzoneRTCParameters => {
	const rowPlacementId = '1500000083';
	const ukPlacementId = '0420420507';

	const placementId =
		adType.isSticky || adType.adRegion === 'UK'
			? ukPlacementId
			: rowPlacementId;

	return {
		PUBLISHER_ID: 'OZONEGMG0001',
		SITE_ID: '4204204209',
		TAG_ID: '1000000000',
		PLACEMENT_ID: placementId,
		AD_UNIT_CODE: id,
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
	id: string,
	adType: AdType,
): string => {
	const pubmaticConfig = {
		openwrap: pubmaticRtcParameters(adType),
	};

	const criteoConfig = {
		criteo: criteoRTCParamters(adType),
	};

	const ozoneConfig = {
		ozone: ozoneRTCParameters(adType, id),
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
