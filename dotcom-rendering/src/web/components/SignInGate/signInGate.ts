import type { ABTest } from '@guardian/ab-core';

// Sign in Gate A/B Tests
import { signInGateMainControl } from '../../experiments/tests/sign-in-gate-main-control';
import { signInGateMainVariant } from '../../experiments/tests/sign-in-gate-main-variant';

// Sign in Gate Types
import { signInGateComponent as gateMainControl } from './gates/main-control';
import { signInGateComponent as gateMainVariant } from './gates/main-variant';
import type { SignInGateTestMap } from './types';
import { signInGateCopyTestJan2023 } from './gates/sign-in-gate-copy-test-jan2023';
import { signInGateCopyTestVariants } from '../../experiments/tests/sign-in-gate-copy-test-variants';

/* When adding a new test, you need to add the test name to the tests array below,
   and add a entry for each variant that maps it to a SignInGateComponent in
   signInGateTestVariantToGateMapping, and in turn match each test id to an component
   id in signInGateTestIdToComponentId
*/
export const signInGateTests: ReadonlyArray<ABTest> = [
	signInGateMainVariant,
	signInGateMainControl,
	signInGateCopyTestVariants,
];

export const signInGateTestVariantToGateMapping: SignInGateTestMap = {
	'main-control-4': gateMainControl,
	'main-variant-4': gateMainVariant,
	'sign-in-gate-copy-1': signInGateCopyTestJan2023,
	'sign-in-gate-copy-2': signInGateCopyTestJan2023,
	'sign-in-gate-copy-3': signInGateCopyTestJan2023,
};

// Component Id does not need to match gate test name, as ab test info passed separately to ophan
// Consider Id name relevant to the gate component or design. Use snake_case
export const signInGateTestIdToComponentId: { [key: string]: string } = {
	SignInGateMainVariant: 'main_variant_4',
	SignInGateMainControl: 'main_control_4',
	SignInGateCopyVariant: 'sign_in_gate_copy_variant',
};
