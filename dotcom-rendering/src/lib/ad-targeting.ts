import { getCookie } from '@root/src/web/browser/cookie';

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
	const isSignedIn = (typeof window !== "undefined") && getCookie('GU_U') ? 't' : 'f';
	const customParams = {
		sens: config.isSensitive ? 't' : 'f',
		si: isSignedIn,
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
