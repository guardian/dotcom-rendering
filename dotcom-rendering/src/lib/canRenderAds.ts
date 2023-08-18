import type { DCRFrontType } from '../types/front';
import type { FEArticleType } from '../types/frontend';
import type { RenderingTarget } from '../types/renderingTarget';
import type { DCRTagFrontType } from '../types/tagFront';

/**
 * Checks the page for a number of conditions that should
 * prevent ads from being displayed.
 */
export const canRenderAds = (
	pageData: FEArticleType | DCRFrontType | DCRTagFrontType,
	renderingTarget?: RenderingTarget,
): boolean => {
	if (renderingTarget === 'Apps') {
		return false;
	}
	if (pageData.isAdFreeUser) {
		return false;
	}

	// DCRFrontType doesn't have a shouldHideAds property
	if ('shouldHideAds' in pageData && pageData.shouldHideAds) {
		return false;
	}

	return true;
};
