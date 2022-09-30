import type { AdRegion } from './region-classes';

/**
 * Type of AMP ad
 *
 * These values determine the computed RTC parameters
 */
type AdType =
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
	tagId: string;
	profileId: string;
	pubId: string;
};

/**
 * Determine the Relevant Yield tag id that is used to look up a given stored bid request
 */
const getTagId = (adType: AdType): string => {
	if (adType.isSticky || adType.adRegion === 'INT') {
		return '6214ca56243f4ff4f5aeef36_6214c723c70856442e4d79f2';
	}

	if (adType.adRegion === 'UK') {
		return '6214ca675cf18e70cbaeef37_6214c9a4b73a6613d4aeef2f';
	}

	if (adType.adRegion === 'US') {
		return '6214cb381a577cd525aeef3f_6214caacb52b565527aeef39';
	}

	// ad region is AU
	return '6214cbe6a24103508faeef45_6214cb50aac9c1160daeef40';
};

/**
 * Determine the pub id and profile id required by Pubmatic to construct an RTC vendor
 *
 */
const getPubAndProfileIds = (
	adType: AdType,
): {
	pubId: string;
	profileId: string;
} => {
	if (
		adType.isSticky ||
		adType.adRegion === 'UK' ||
		adType.adRegion === 'INT'
	) {
		return {
			profileId: '6611',
			pubId: '157207',
		};
	}

	if (adType.adRegion === 'AU') {
		return { profileId: '6697', pubId: '157203' };
	}

	// ad region is US
	return { profileId: '6696', pubId: '157206' };
};

/**
 * Compute the full set of RTC parameters from a given ad type
 */
export const getRTCParameters = (adType: AdType): RTCParameters => ({
	tagId: getTagId(adType),
	...getPubAndProfileIds(adType),
});

const permutiveURL = 'amp-script:permutiveCachedTargeting.ct';

const amazonConfig = {
	aps: { PUB_ID: '3722', PARAMS: { amp: '1' } },
};

const notUndefined = <T>(x: T | undefined): x is T => x !== undefined;

/**
 * Build a generic Real Time Config string from a possible URL,
 * optional vendors and whether to enable Permutive and Amazon
 */
export const realTimeConfig = ({
	vendors = {},
	url = undefined,
	usePermutive = false,
	useAmazon = false,
	timeoutMillis,
}: {
	vendors?: Record<string, unknown>;
	url?: string;
	usePermutive?: boolean;
	useAmazon?: boolean;
	timeoutMillis?: number;
}): string => {
	const urls = [url, usePermutive ? permutiveURL : undefined].filter(
		notUndefined,
	);

	const options = timeoutMillis ? { timeoutMillis } : {};

	const data = {
		urls,
		vendors: {
			...vendors,
			...(useAmazon ? amazonConfig : {}),
		},
		...options,
	};
	return JSON.stringify(data);
};
