// Forced AB Test Switches for Cypress testing

// AB test switches are defined in Frontend and required to be "ON" for Cypress E2E Tests to successfully run and pass.
// However, it is useful to be able to switch an AB test on/off in Frontend Admin UI without breaking tests that rely
// on those switches in another repo (DCR).

// By adding the switches here, and the state we want them to be in when we run Cypress tests, we no longer have to
// worry about the state of the switch in Frontend. In turn allowing tests to pass even if a switch has changed state
// in Frontend, e.g. a switch has been set to "OFF".

// Add switches to be a specific state in Cypress to this object
const cypressSwitches = {
	abAbTestTest: true, // Test switch, used for Cypress integration test
	abSignInGateMainControl: true,
	abSignInGateMainVariant: true,
	abSignInGateTimesOfDay: true,
};

// Function to retrieve the switches if running in Cypress
export const getCypressSwitches = (): Record<string, boolean> => {
	// If running within cypress, return the forced switches
	if (window.Cypress) return cypressSwitches;
	// Otherwise just return empty object
	return {};
};
