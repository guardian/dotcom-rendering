import type { FootballData } from '../footballDataPage';
import type { ArticleDeprecated } from '../types/article';
import type { Front } from '../types/front';
import type { RenderingTarget } from '../types/renderingTarget';
import type { TagPage } from '../types/tagPage';

/**
 * Checks the page for a number of conditions that should
 * prevent ads from being displayed.
 */
export const canRenderAds = (
	pageData: ArticleDeprecated | Front | TagPage | FootballData,
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
