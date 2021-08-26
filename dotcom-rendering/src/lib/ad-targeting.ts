export const buildAdTargeting = (
	CAPI:
		| CAPIType
		| CAPIBrowserType
		| Pick<CAPIType, 'isAdFreeUser' | 'config'>,
	isSignedIn: boolean = false,
): AdTargeting => {
	if (CAPI.isAdFreeUser) {
		return {
			disableAds: true,
		};
	}
	const { config } = CAPI;
	const customParams = {
		sens: config.isSensitive ? 't' : 'f',
		si: isSignedIn ? 't' : 'f',
		vl: config.videoDuration,
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
