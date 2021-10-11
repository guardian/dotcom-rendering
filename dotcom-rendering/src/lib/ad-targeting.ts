import { getPermutivePFPSegments } from '@guardian/commercial-core';
import { getCookie } from '@root/src/web/browser/cookie';
import { canUseDom } from './can-use-dom';

type CustomParams = AdTargetingEnabled['customParams'];

const buildCustomParamsFromCAPI = (config: ConfigType | ConfigTypeBrowser): CustomParams => {
	return {
		cc: config.edition,
		inskin: 'f',
		pa: 'f',
		s: config.section,
		sens: config.isSensitive ? 't' : 'f',
		si: 'f',
		vl: config.videoDuration,
		...config.sharedAdTargeting,
	};
};

const buildCustomParamsFromBrowser = (): CustomParams =>
	canUseDom() ?
		{
			permutive: getPermutivePFPSegments(),
			si: getCookie('GU_U') ? 't' : 'f',
		}
		: {};

/**
 * Returns a function that will return an ad targeting object.
 * This is so we can invoke the function client side and
 * retrieve data from the browser.
 *
 * @returns AdTargetingBuilder: () => AdTargeting
 */
const buildAdTargeting = (
	CAPI:
		| CAPIType
		| CAPIBrowserType
		| Pick<CAPIType, 'isAdFreeUser' | 'config'>,
): AdTargetingBuilder => () => {

	if (CAPI.isAdFreeUser) {
		return { disableAds: true };
	}

	const customParamsFromCAPI = buildCustomParamsFromCAPI(CAPI.config);
	const customParamsFromBrowser = buildCustomParamsFromBrowser();
	const mergedCustomParams = { ...customParamsFromCAPI, ...customParamsFromBrowser };

	return {
		adUnit: CAPI.config.adUnit,
		customParams: mergedCustomParams,
	};
};

export { buildAdTargeting }
