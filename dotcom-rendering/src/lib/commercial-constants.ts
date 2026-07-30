import type { ABTestAPI } from '../experiments/lib/ab-tests';

/**
 * The maximum number of fronts-banner ads that can be inserted on any front.
 * fronts-banner ads are inserted from the desktop breakpoint.
 */
export const MAX_FRONTS_BANNER_ADS = 8;

export const getMaxFrontsBannerAds = (
	abTests: ABTestAPI | undefined,
): number => {
	const isInVariantAdLimitGroup =
		abTests?.isUserInTestGroup(
			'commercial-fronts-ad-increase-ad-limit',
			'variant',
		) ?? false;

	return isInVariantAdLimitGroup ? 16 : MAX_FRONTS_BANNER_ADS;
};

/**
 * The maximum number of ads that can be inserted on any mobile front.
 * Mobile ads on fronts are inserted up until the tablet breakpoint.
 */
export const MAX_FRONTS_MOBILE_ADS = 10;
