import { useEffect } from 'react';

/**
 * Add custom parameters to skimlink URLs:
 * - referrer
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
		const allSkimlinksOnPage = [
			...document.querySelectorAll('a[href*="go.skimresources"]'),
		];

		for (const skimlink of allSkimlinksOnPage) {
			if (!(skimlink instanceof HTMLAnchorElement)) return;

			const referrerDomain =
				document.referrer === ''
					? 'none'
					: new URL(document.referrer).hostname;
			// Skimlinks treats xcust as one long string, so we use | to separate values
			skimlink.href += encodeURIComponent(
				'xcust=referrer|' + referrerDomain,
			);
		}
	});

	// We don’t render anything
	return null;
};
