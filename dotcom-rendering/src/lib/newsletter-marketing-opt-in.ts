export type EffectiveMarketingOptInParams = {
	/** `true` when the marketing toggle should be shown; `false` for US soft opt-in / hidden toggle */
	showMarketingToggle: boolean;
	isSignedIn: boolean | 'Pending';
	marketingOptIn: boolean | undefined;
};

/**
 * Returns the marketing value that should be submitted.
 *
 * - If the location hides the toggle (US soft opt-in), always submit true.
 * - If explicitly signed in, omit marketing from the payload.
 * - If the user has toggled a value, use that explicit choice.
 * - If explicitly signed out and untouched, default to true.
 * - While sign-in state is pending and untouched, omit marketing.
 */
export const getEffectiveMarketingOptIn = ({
	showMarketingToggle,
	isSignedIn,
	marketingOptIn,
}: EffectiveMarketingOptInParams): boolean | undefined => {
	if (!showMarketingToggle) {
		return true;
	}

	if (isSignedIn === true) {
		return undefined;
	}

	if (marketingOptIn !== undefined) {
		return marketingOptIn;
	}

	if (isSignedIn === false) {
		return true;
	}

	return undefined;
};

/**
 * Returns the tracking string for the marketing opt-in type,
 * or `undefined` if none should be tracked (e.g. signed-in users).
 */
export const getMarketingOptInType = (
	showMarketingToggle: boolean,
	effectiveMarketingOptIn: boolean | undefined,
): string | undefined => {
	if (!showMarketingToggle) {
		return 'similar-guardian-products-optin-hidden-us';
	}
	if (effectiveMarketingOptIn === undefined) {
		return undefined;
	}
	return effectiveMarketingOptIn
		? 'similar-guardian-products-optin'
		: 'similar-guardian-products-optout';
};
