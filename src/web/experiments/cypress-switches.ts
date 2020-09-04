// switches to force to on (or off) when running within cypress tests

// forced switches here
const cypressSwitches = {
    abAbTestTest: true, // Test switch, used for Cypress integration test
    abSignInGateMainControl: true,
    abSignInGateMainVariant: true,
    abSignInGatePatientia: false,
};

export const getCypressSwitches = () => {
    // if running within cypress, return the forced switches
    if (window.Cypress) return cypressSwitches;
    // otherwise just return empty object
    return {};
};
