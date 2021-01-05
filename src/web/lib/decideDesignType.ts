import { ArticleModel } from '@root/src/amp/types/ArticleModel';

export const decideDesignType = (
	CAPI: CAPIType | CAPIBrowserType | ArticleModel,
): DesignType => {
	if (CAPI.designType === 'Immersive') return 'Article';
	if (CAPI.designType === 'SpecialReport') return 'Article';
	if (CAPI.designType === 'GuardianLabs') return 'AdvertisementFeature';
	return CAPI.designType;
};
