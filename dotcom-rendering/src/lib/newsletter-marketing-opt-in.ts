type MarketingOptInType =
	| 'similar-guardian-products-optin-hidden-us'
	| 'similar-guardian-products-optin'
	| 'similar-guardian-products-optout';

/**
 * Returns the marketing opt-in value that should be submitted with the form.
 *
 * - If the toggle is hidden due to country (US soft opt-in) and the user is
 *   confirmed signed out, always submit `true`.
 * - If the user is signed in, omit marketing from the payload (`undefined`).
 * - Otherwise (signed out or auth still pending), use the user's explicit
 *   choice if set, defaulting to `true` (opted-in).
 * - If auth is `'Pending'`, defer by returning `undefined` — wait until we
 *   know the user's auth state before submitting a marketing preference.
 */
export const getEffectiveMarketingOptIn = ({
	marketingOptInHiddenForCountry,
	isSignedIn,
	marketingOptIn,
}: {
	marketingOptInHiddenForCountry: boolean;
	isSignedIn: boolean | 'Pending';
	marketingOptIn: boolean | undefined;
}): boolean | undefined => {
	// Only apply the US soft opt-in when we know the user is signed out
	if (marketingOptInHiddenForCountry && isSignedIn === false) {
		return true;
	}
	if (isSignedIn === true) {
		return undefined;
	}
	// Pending — don't submit marketing until we know auth state
	if (isSignedIn === 'Pending') {
		return undefined;
	}
	// Signed out — use explicit choice or default to opted-in
	return marketingOptIn ?? true;
};

/**
 * Returns the Ophan tracking string for the marketing opt-in outcome,
 * or `undefined` if tracking should be omitted (e.g. signed-in users).
 */
export const getMarketingOptInType = ({
	marketingOptInHiddenForCountry,
	isSignedIn,
	effectiveMarketingOptIn,
}: {
	marketingOptInHiddenForCountry: boolean;
	isSignedIn: boolean | 'Pending';
	effectiveMarketingOptIn: boolean | undefined;
}): MarketingOptInType | undefined => {
	if (isSignedIn === true) {
		return undefined;
	}
	// Only report the US hidden opt-in when we know the user is signed out
	if (marketingOptInHiddenForCountry && isSignedIn === false) {
		return 'similar-guardian-products-optin-hidden-us';
	}
	if (effectiveMarketingOptIn === undefined) {
		return undefined;
	}
	return effectiveMarketingOptIn
		? 'similar-guardian-products-optin'
		: 'similar-guardian-products-optout';
};
