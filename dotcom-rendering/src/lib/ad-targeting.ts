export const buildAdTargeting = (
	CAPI:
		| CAPIType
		| CAPIBrowserType
		| Pick<CAPIType, 'isAdFreeUser' | 'config'>,
): AdTargeting => {
	if (CAPI.isAdFreeUser) {
		return {
			disableAds: true,
		};
	}
	const { config } = CAPI;
	const customParams = {
		sens: config.isSensitive ? 't' : 'f',
		si: 'f',
		vl: config.videoDuration || 0,
		cc: config.edition,
		s: config.section,
		inskin: 'f',
		...config.sharedAdTargeting,
		pa: 'f',
	};
	return {
		customParams,
		adUnit: config.adUnit,
	};
};
