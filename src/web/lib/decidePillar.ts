import { ArticleModel } from '@root/src/amp/types/ArticleModel';

export const decidePillar = (
	CAPI: CAPIType | CAPIBrowserType | ArticleModel,
): CAPIPillar => {
	// We override the pillar to be opinion on Comment news pieces
	if (CAPI.designType === 'Comment' && CAPI.pillar === 'news')
		return 'opinion';
	return CAPI.pillar;
};
