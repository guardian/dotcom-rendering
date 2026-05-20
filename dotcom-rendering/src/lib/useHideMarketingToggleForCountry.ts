import { useCountryCode } from './useCountryCode';

/**
 * Returns `true` when the marketing opt-in toggle should be hidden for this
 * user's country.
 *
 * Currently implements US-only hiding, gated behind the
 * `us-signup-hide-marketing-toggle` switch. The hook name is country-agnostic
 * so future countries can be added without renaming.
 *
 * - Returns `false` while the country code is still being resolved (`undefined`).
 * - Returns `false` if the switch is off.
 * - Returns `true` only when the switch is on **and** `countryCode === 'US'`.
 */
export const useHideMarketingToggleForCountry = (): boolean => {
	const countryCode = useCountryCode('useHideMarketingToggleForCountry');
	const switchEnabled =
		window.guardian.config.switches['us-signup-hide-marketing-toggle'] ===
		true;

	return switchEnabled && countryCode === 'US';
};
