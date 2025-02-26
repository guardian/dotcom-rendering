import { FEFootballDataPage } from '../feFootballDataPage';
import type { ArticleDeprecated } from '../types/article';
import type { DCRFrontType } from '../types/front';
import type { RenderingTarget } from '../types/renderingTarget';
import type { TagPage } from '../types/tagPage';

/**
 * Checks the page for a number of conditions that should
 * prevent ads from being displayed.
 */
export const canRenderAds = (
	pageData: ArticleDeprecated | DCRFrontType | TagPage | FEFootballDataPage, // TODO: we need to use DCR type instead of FEFootballDataPage
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
