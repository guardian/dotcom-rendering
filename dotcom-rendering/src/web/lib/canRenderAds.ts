import type { DCRFrontType } from '../../types/front';
import type { FEArticleType } from '../../types/frontend';

/**
 * Checks the page for a number of conditions that should
 * prevent ads from being displayed.
 */
export const canRenderAds = (
	pageData: FEArticleType | DCRFrontType,
): boolean => {
	if (process.env.LHCI_BUILD_CONTEXT__CURRENT_HASH) {
		return true;
	}

	if (pageData.isAdFreeUser) {
		return false;
	}

	// DCRFrontType doesn't have a shouldHideAds property
	if ('shouldHideAds' in pageData && pageData.shouldHideAds) {
		return false;
	}

	if (pageData.config.abTests.poorDeviceConnectivityVariant === 'variant') {
		return false;
	}

	return true;
};
