import type { DCRFrontType } from '../types/front.ts';
import type { FEArticleType } from '../types/frontend.ts';
import type { DCRTagFrontType } from '../types/tagFront.ts';

/**
 * Checks the page for a number of conditions that should
 * prevent ads from being displayed.
 */
export const canRenderAds = (
	pageData: FEArticleType | DCRFrontType | DCRTagFrontType,
): boolean => {
	if (pageData.isAdFreeUser) {
		return false;
	}

	// DCRFrontType doesn't have a shouldHideAds property
	if ('shouldHideAds' in pageData && pageData.shouldHideAds) {
		return false;
	}

	return true;
};
