const buildAdTargetingFromCAPI = (config: ConfigType | ConfigTypeBrowser): AdTargeting => {
	const customParams = {
		sens: config.isSensitive ? 't' : 'f',
		si: 'f',
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

/**
 * Optimistically try to get pageAdTargeting from window.
 * This is set by the commercial bundle and has extra properties
 * set such as consent and permutive that are derived client side.
 * @returns a function i.e. () => AdTargeting
 */
const buildAdTargetingFromWindow = () =>
	window?.guardian?.config?.page?.pageAdTargeting ?? {};

const buildAdTargeting = (
	CAPI:
		| CAPIType
		| CAPIBrowserType
		| Pick<CAPIType, 'isAdFreeUser' | 'config'>,
): () => AdTargeting => {
	if (CAPI.isAdFreeUser) {
		return () => ({
			disableAds: true,
		});
	}
	return () => ({
		...buildAdTargetingFromCAPI(CAPI.config),
		...buildAdTargetingFromWindow
	});
};

export { buildAdTargeting }
