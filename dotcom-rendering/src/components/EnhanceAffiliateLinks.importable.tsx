import { useEffect } from 'react';
import { getSkimlinksAccountId, isSkimlink } from '../lib/affiliateLinksUtils';
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
 * Code needs to be client side to get the referrer and AB test participation
 *
 * ---
 *
 * (No visual story exists as this does not render anything)
 */
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
			document.referrer.split('?')[1] || '',
		);

		const utmKeys = [
			'utm_source',
			'utm_medium',
			'utm_campaign',
			'utm_content',
			'utm_term',
		];

		const utmFromArticleURL = utmKeys
			.map((key) => {
				const value = urlParams.get(key);
				return value ? `${key}|${value}` : null;
			})
			.filter(Boolean)
			.join('|');

		console.log('utmString:', utmFromArticleURL);

		const utmFromReferrer = utmKeys
			.map((key) => {
				const value = referrerURLParams.get(key);
				return value ? `${key}|${value}` : null;
			})
			.filter(Boolean)
			.join('|');

		console.log('utmFromReferrer:', utmFromReferrer);

		const utmString = utmFromArticleURL
			? utmFromArticleURL
			: utmFromReferrer
			? utmFromReferrer
			: '';

		for (const link of allLinksOnPage) {
			if (isSkimlink(link.href)) {
				const referrerDomain =
					document.referrer === ''
						? 'none'
						: new URL(document.referrer).hostname;

				const skimlinksAccountId = getSkimlinksAccountId(link.href);

				// Skimlinks treats xcust as one long string, so we use | to separate values
				const xcustValue = `referrer|${referrerDomain}|accountId|${skimlinksAccountId}${
					abTestString ? `|abTestParticipations|${abTestString}` : ''
				}${utmString ? `|${utmString}` : ''}`;

				link.href = `${link.href}&xcust=${encodeURIComponent(
					xcustValue,
				)}`;
			}
		}
	});

	// We don’t render anything
	return null;
};
