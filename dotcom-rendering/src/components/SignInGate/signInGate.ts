import type { ABTest } from '@guardian/ab-core';
// Sign in Gate A/B Tests
import { signInGateAlternativeWording } from '../../experiments/tests/sign-in-gate-alternative-wording';
import { signInGateMainControl } from '../../experiments/tests/sign-in-gate-main-control';
import { signInGateMainVariant } from '../../experiments/tests/sign-in-gate-main-variant';
// Sign in Gate Types
import { signInGateComponent as alternativeWordingControl } from './gates/alternative-wording-control';
import { signInGateComponent as alternativeWordingGuardianLive } from './gates/alternative-wording-guardian-live';
import { signInGateComponent as alternativeWordingSaturdayEdition } from './gates/alternative-wording-saturday-edition';
import { signInGateComponent as gateMainControl } from './gates/main-control';
import { signInGateComponent as gateMainVariant } from './gates/main-variant';
import type { SignInGateTestMap } from './types';

/* When adding a new test, you need to add the test name to the tests array below,
   and add a entry for each variant that maps it to a SignInGateComponent in
   signInGateTestVariantToGateMapping, and in turn match each test id to an component
   id in signInGateTestIdToComponentId
*/
export const signInGateTests: ReadonlyArray<ABTest> = [
	signInGateMainVariant,
	signInGateMainControl,
	signInGateAlternativeWording,
];

export const signInGateTestVariantToGateMapping: SignInGateTestMap = {
	'main-control-5': gateMainControl,
	'main-variant-5': gateMainVariant,
	'alternative-wording-guardian-live': alternativeWordingGuardianLive,
	'alternative-wording-saturday-edition': alternativeWordingSaturdayEdition,
	'alternative-wording-control': alternativeWordingControl,
};

// Component Id does not need to match gate test name, as ab test info passed separately to ophan
// Consider Id name relevant to the gate component or design. Use snake_case
export const signInGateTestIdToComponentId: { [key: string]: string } = {
	SignInGateMainVariant: 'main_variant_5',
	SignInGateMainControl: 'main_control_5',
	SignInGateAlternativeWording: 'alternative_wording',
};
