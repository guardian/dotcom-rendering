import type { SportDataPage } from '../sportDataPage';
import type { ArticleDeprecated } from '../types/article';
import type { Front } from '../types/front';
import type { TagPage } from '../types/tagPage';

/**
 * Checks the page for a number of conditions that should
 * prevent ads from being displayed.
 */
export const canRenderAds = (
	pageData: ArticleDeprecated | Front | TagPage | SportDataPage,
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
