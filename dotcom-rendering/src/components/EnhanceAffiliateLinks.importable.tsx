import { useEffect } from 'react';
import { getSkimlinksAccountId, isSkimlink } from '../lib/affiliateLinksUtils';
import { useBetaAB } from '../lib/useAB';
import { submitComponentEvent } from '../client/ophan/ophan';

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
 * Code needs to be client side to get the referrer and AB test participation
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

	// Get users server/client-side AB test participations
	const abTestParticipations = abTests?.getParticipations();

	// Reduce abTestParticipations to a comma-separated string
	const abTestString = abTestParticipations
		? Object.entries(abTestParticipations)
				.map(([key, value]) => `${key}:${value}`)
				.join(',')
		: '';

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

		const affiliateLinksOnPage = allLinksOnPage.filter((link) =>
			isSkimlink(link.href),
		);

		if (affiliateLinksOnPage.length) {
			submitComponentEvent(
				{
					action: 'DETECT',
					component: {
						componentType: 'AFFILIATE_DISCLAIMER',
					},
				},
				'Web',
			);
		}

		for (const link of affiliateLinksOnPage) {
			const referrerDomain =
				document.referrer === ''
					? 'none'
					: new URL(document.referrer).hostname;

			const skimlinksAccountId = getSkimlinksAccountId(link.href);

			// Skimlinks treats xcust as one long string, so we use | to separate values
			const xcustValue = `referrer|${referrerDomain}|accountId|${skimlinksAccountId}${
				abTestString ? `|abTestParticipations|${abTestString}` : ''
			}${utmParamsString ? `|${utmParamsString}` : ''}`;

			link.href = `${link.href}&xcust=${encodeURIComponent(xcustValue)}`;
		}
	});

	// We don’t render anything
	return null;
};
