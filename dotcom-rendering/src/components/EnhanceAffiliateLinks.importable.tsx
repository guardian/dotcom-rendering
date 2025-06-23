import { useEffect } from 'react';
import { isSkimlink } from '../lib/affiliateLinksUtils';

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
				let skimlinksAccountId: string | null = null;
				try {
					const url = new URL(link.href, window.location.origin);
					skimlinksAccountId = url.searchParams.get('id');
				} catch {
					// Invalid URL, skip id extraction
				}

				const referrerDomain =
					document.referrer === ''
						? 'none'
						: new URL(document.referrer).hostname;

				if (skimlinksAccountId) {
					link.href += `&xcust=${encodeURIComponent(
						'referrer|' +
							referrerDomain +
							'|accountID|' +
							skimlinksAccountId,
					)}`;
				}
			}
		}
	});

	return null;
};
