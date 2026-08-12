import type { FEArticle } from '../frontend/feArticle';

/** Checks if given article requires an affiliate disclaimer */
export const requiresAffiliateDisclaimer = (
	// Currently we receive boolean as string from Frontend but should handle future upstream change
	affiliateLinksDisclaimer: FEArticle['affiliateLinksDisclaimer'] | boolean,
): boolean => {
	if (typeof affiliateLinksDisclaimer === 'string') {
		return affiliateLinksDisclaimer.toLowerCase() === 'true';
	}
	return affiliateLinksDisclaimer === true;
};
