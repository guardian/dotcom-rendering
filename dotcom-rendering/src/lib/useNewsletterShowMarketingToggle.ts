import { useCountryCode } from './useCountryCode';

/**
 * Returns `true` when the marketing toggle should be shown.
 *
 * The toggle is hidden only when the `us-signup-hide-marketing-toggle` switch
 * is enabled and the user's country code has resolved to `'US'`.
 * While the country code is still resolving (`undefined`) this still returns
 * `true`, so the toggle remains visible until we know for certain the user is
 * in the US.
 */
export const useNewsletterShowMarketingToggle = (): {
	showMarketingToggle: boolean;
	countryCode: string | undefined;
} => {
	const countryCode = useCountryCode('newsletter-marketing-opt-in');
	const switchEnabled =
		typeof window !== 'undefined' &&
		window.guardian.config.switches['us-signup-hide-marketing-toggle'] ===
			true;
	const showMarketingToggle = !(switchEnabled && countryCode === 'US');

	return {
		showMarketingToggle,
		countryCode,
	};
};
