import { useEffect } from 'react';
import { getSkimlinksAccountId, isSkimlink } from '../lib/affiliateLinksUtils';

/**
 * Add custom parameters to skimlink URLs:
 * - referrer
 * - Skimlinks account ID
 *
 * ## Why does this need to be an Island?
 *
 * Code needs to be client side to get the referrer and AB test participation
 *
 * ---
 *
 * (No visual story exists as this does not render anything)
 */
export const EnhanceAffiliateLinks = () => {
	useEffect(() => {
		const allLinksOnPage = [...document.querySelectorAll('a')];

		for (const link of allLinksOnPage) {
			if (isSkimlink(link.href)) {
				const referrerDomain =
					document.referrer === ''
						? 'none'
						: new URL(document.referrer).hostname;

				const skimlinksAccountId = getSkimlinksAccountId(link.href);

				// Skimlinks treats xcust as one long string, so we use | to separate values
				const xcustValue = `referrer|${referrerDomain}|accountId|${skimlinksAccountId}`;

				link.href = `${link.href}&xcust=${encodeURIComponent(xcustValue)}`;

			}
		}
	});

	// We don’t render anything
	return null;
};
