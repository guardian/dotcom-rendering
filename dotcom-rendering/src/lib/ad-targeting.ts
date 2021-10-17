import { constructQuery } from '@root/src/lib/querystring';
import { buildAdsConfigWithConsent } from '@guardian/commercial-core';
import type { AdTargetingBuilder, AdsConfigBasic, AdsConfigDisabled } from '@guardian/commercial-core';

type MaybeArray<T> = T | T[];

type CustomParams = Record<string, MaybeArray<string | number | boolean>>;

export type AdTargetingBuilderStatic = () => AdsConfigBasic | AdsConfigDisabled;

const buildCustomParamsFromCAPI = (config: ConfigType | ConfigTypeBrowser): CustomParams => {
	return {
		cc: config.edition,
		inskin: 'f',
		pa: 'f',
		s: config.section,
		sens: config.isSensitive ? 't' : 'f',
		si: 'f',
		vl: config.videoDuration || 0,
		...config.sharedAdTargeting,
	};
};

/**
 * Returns a function that will return a promise for an ad targeting object.
 * This is so we can dynamically invoke the function client side
 * and retrieve data such as consent, permutive and signed-in state
 * from the browser.
 *
 * @returns AdTargetingBuilder: () => Promise<AdsConfig>
 */
const buildAdTargeting = (
	CAPI:
		| CAPIType
		| CAPIBrowserType
		| Pick<CAPIType, 'isAdFreeUser' | 'config'>,
): AdTargetingBuilder => () =>
	buildAdsConfigWithConsent(
		CAPI.isAdFreeUser,
		CAPI.config.adUnit,
		buildCustomParamsFromCAPI(CAPI.config),
	);

/**
 * Returns a function that will return an ad targeting object.
 * This is to maintain compatibility with AMP until it is
 * also migrated to dynamic ad targeting.
 *
 * @returns () => AdsConfig
 */
 const buildAdTargetingStatic = (
	CAPI:
		| CAPIType
		| CAPIBrowserType
		| Pick<CAPIType, 'isAdFreeUser' | 'config'>,
): AdTargetingBuilderStatic => () => {
	if (CAPI.isAdFreeUser) {
		return { disableAds: true };
	}
	return {
		adTagParameters: {
			iu: CAPI.config.adUnit,
			cust_params: encodeURIComponent(constructQuery(buildCustomParamsFromCAPI(CAPI.config))),
		}
	};
};

export {
	buildAdTargeting,
	buildAdTargetingStatic,
}
