/**
 * Returns the cmp object so you don't need to import it
 *
 * The @guardian/consent-management-platform sets the window.guCmpHotFix
 * value to equal the `cmp` object.
 *
 * If this function is called before this value has been set then an error
 * is thrown allowing us to gather stats on any race conditions that could
 * exist with this pattern
 *
 * @returns the cmp object
 */
export const guCmp = () => {
	if (typeof window === 'undefined') {
		// Return a mock guCmp object to make our code server safe
		return {
			initialised: true,
			cmp: {
				showPrivacyManager: () => {},
				willShowPrivacyMessage: () => new Promise(() => {}),
			},
			onConsentChange: () => {},
			getConsentFor: () => true,
		};
	}
	if (!window.guCmpHotFix) {
		window?.guardian?.modules?.sentry?.reportError(
			new Error(
				`Tried to access window.guCmpHotFix but it was falsy: ${window.guCmpHotFix}. This is indicative of a race condition`,
			),
			'cmp',
		);
	}
	return window.guCmpHotFix;
};
