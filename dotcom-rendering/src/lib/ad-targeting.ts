/* eslint-disable @typescript-eslint/no-unused-vars */
export const buildAdTargeting = (
	CAPI:
		| CAPIType
		| CAPIBrowserType
		| Pick<CAPIType, 'isAdFreeUser' | 'config'>,
): AdTargeting => {
	// TODO temporary workaround
	return {
		disableAds: true,
	};
	// if (CAPI.isAdFreeUser) {
	// 	return {
	// 		disableAds: true,
	// 	};
	// }
	// const { config } = CAPI;
	// const customParams = {
	// 	sens: config.isSensitive ? 't' : 'f',
	// 	si: 'f',
	// 	vl: config.videoDuration,
	// 	cc: config.edition,
	// 	s: config.section,
	// 	inskin: 'f',
	// 	...config.sharedAdTargeting,
	// 	pa: 'f',
	// };
	// return {
	// 	customParams,
	// 	adUnit: config.adUnit,
	// };
};
