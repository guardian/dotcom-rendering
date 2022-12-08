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
	profileId: string;
	pubId: string;
};

/**
 * Determine the pub id and profile id required by Pubmatic to construct an RTC vendor
 *
 */
export const getRTCParameters = (adType: AdType): RTCParameters => {
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
