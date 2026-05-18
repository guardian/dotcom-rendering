import { useCountryCode } from './useCountryCode';

/**
 * Returns `true` when the `us-signup-hide-marketing-toggle` switch is enabled
 * **and** the user's country code has resolved to `'US'`.
 *
 * While the country code is still resolving (i.e. `undefined`) this returns
 * `false`, so the marketing toggle remains visible until we know for certain
 * the user is in the US.
 */
export const useNewsletterHideMarketingToggle = (): {
	hideMarketingToggle: boolean;
	countryCode: string | undefined;
} => {
	const countryCode = useCountryCode('newsletter-marketing-opt-in');
	const switchEnabled =
		typeof window !== 'undefined' &&
		window.guardian.config.switches['us-signup-hide-marketing-toggle'] ===
			true;

	return {
		hideMarketingToggle: switchEnabled && countryCode === 'US',
		countryCode,
	};
};
