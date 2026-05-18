export type EffectiveMarketingOptInParams = {
	locationHidesToggle: boolean;
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
	locationHidesToggle,
	isSignedIn,
	marketingOptIn,
}: EffectiveMarketingOptInParams): boolean | undefined => {
	if (locationHidesToggle) {
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
