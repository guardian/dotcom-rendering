import type { DCRFrontType } from '../types/front';
import type { DCRArticle } from '../types/frontend';
import type { RenderingTarget } from '../types/renderingTarget';
import type { DCRTagPageType } from '../types/tagPage';

/**
 * Checks the page for a number of conditions that should
 * prevent ads from being displayed.
 */
export const canRenderAds = (
	pageData: DCRArticle | DCRFrontType | DCRTagPageType,
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
