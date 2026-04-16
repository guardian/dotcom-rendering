import { useEffect } from 'react';
import { buildXcustValueForAffiliateLink } from '../lib/affiliateLinksUtils';
import { useBetaAB } from '../lib/useAB';

/**
 * Add custom parameters to skimlink URLs:
 * - Referrer
 * - Skimlinks account ID
 * - AB test participations
 * - UTM parameters (from page URL or referrer URL):
 *   - utm_source
 *   - utm_medium
 *   - utm_campaign
 *   - utm_content
 *   - utm_term
 *
 * ## Why does this need to be an Island?
 *
 * Code needs to be client side to get the referrer
 *
 * ---
 *
 * (No visual story exists as this does not render anything)
 */

// Helper to extract UTM parameters from URLSearchParams
function getUtmString(params: URLSearchParams, keys: string[]): string {
	return keys
		.map((key) => {
			const value = params.get(key);
			return value ? `${key}|${value}` : null;
		})
		.filter(Boolean)
		.join('|');
}

const utmKeys = [
	'utm_source',
	'utm_medium',
	'utm_campaign',
	'utm_content',
	'utm_term',
];

export const EnhanceAffiliateLinks = () => {
	const abTests = useBetaAB();

	// Get users server & client-side AB test participations
	const abTestParticipations = abTests?.getParticipations();

	useEffect(() => {
		const allLinksOnPage = [...document.querySelectorAll('a')];

		const urlParams = new URLSearchParams(window.location.search);

		const referrerURLParams = new URLSearchParams(
			document.referrer.split('?')[1] ?? '',
		);

		const utmParamsFromArticleURL = getUtmString(urlParams, utmKeys);

		const utmParamsFromReferrer = getUtmString(referrerURLParams, utmKeys);

		/* Selects UTM parameters from the article URL if present;
		 otherwise it falls back to UTM parameters from the referrer URL if those exist.
		 If neither are present it returns an empty string.*/
		const utmParamsString =
			utmParamsFromArticleURL && utmParamsFromArticleURL.trim() !== ''
				? utmParamsFromArticleURL
				: utmParamsFromReferrer && utmParamsFromReferrer.trim() !== ''
				? utmParamsFromReferrer
				: '';
		const referrerDomain =
			document.referrer === ''
				? 'none'
				: new URL(document.referrer).hostname;

		for (const link of allLinksOnPage) {
			const xcustResult = buildXcustValueForAffiliateLink({
				url: link.href,
				abTestParticipations,
				utmParamsString,
				referrerDomain,
				xcustComponentId: link.getAttribute('data-x-cust-component-id'),
			});

			if (!xcustResult.ok) {
				if (xcustResult.error === 'InvalidUrl') {
					window.guardian.modules.sentry.reportError(
						new Error(
							`Invalid URL in affiliate link: ${link.href}`,
						),
						'enhance-affiliate-links',
					);
				}
				continue;
			}

			const parsedLinkUrl = new URL(link.href);
			parsedLinkUrl.searchParams.set('xcust', xcustResult.value);
			link.href = parsedLinkUrl.toString();
		}
	});

	// We don’t render anything
	return null;
};
