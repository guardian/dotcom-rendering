import { useState } from 'react';
import { useCountryCode } from './useCountryCode';

/**
 * Returns `true` when the `usNewsletterHideMarketingToggle` switch is enabled
 * **and** the user's country code has resolved to `'US'`.
 *
 * While the country code is still resolving (i.e. `undefined`) this returns
 * `false`, so the marketing toggle remains visible until we know for certain
 * the user is in the US.
 */
export const useUSNewsletterHideMarketingToggle = (): {
	usHideMarketingToggle: boolean;
	countryCode: string | undefined;
} => {
	const countryCode = useCountryCode('newsletter-marketing-opt-in');
	// Initialise synchronously from the config so there is no render where
	// switchEnabled is false before the effect runs (avoiding a one-frame
	// flash of the marketing toggle for US users).
	const [switchEnabled] = useState(
		() =>
			window.guardian.config.switches.usNewsletterHideMarketingToggle ===
			true,
	);

	return {
		usHideMarketingToggle: switchEnabled && countryCode === 'US',
		countryCode,
	};
};
