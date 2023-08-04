import type { ABTest } from '@guardian/ab-core';
// Sign in Gate A/B Tests
import { signInGateCopyTestJan2023 } from '../../experiments/tests/sign-in-gate-copy-test-variants.ts';
import { signInGateMainControl } from '../../experiments/tests/sign-in-gate-main-control.ts';
import { signInGateMainVariant } from '../../experiments/tests/sign-in-gate-main-variant.ts';
// Sign in Gate Types
import { signInGateComponent as gateMainControl } from './gates/main-control.ts';
import { signInGateComponent as gateMainVariant } from './gates/main-variant.tsx';
import { signInGateCopyTestJan2023Component } from './gates/sign-in-gate-copy-test-jan2023.tsx';
import type { SignInGateTestMap } from './types.tsx';

/* When adding a new test, you need to add the test name to the tests array below,
   and add a entry for each variant that maps it to a SignInGateComponent in
   signInGateTestVariantToGateMapping, and in turn match each test id to an component
   id in signInGateTestIdToComponentId
*/
export const signInGateTests: ReadonlyArray<ABTest> = [
	signInGateMainVariant,
	signInGateMainControl,
	signInGateCopyTestJan2023,
];

export const signInGateTestVariantToGateMapping: SignInGateTestMap = {
	'main-control-4': gateMainControl,
	'main-variant-4': gateMainVariant,
	'quick-and-easy': signInGateCopyTestJan2023Component,
	'take-a-moment': signInGateCopyTestJan2023Component,
	'sign-in-copy-control': gateMainVariant,
};

// Component Id does not need to match gate test name, as ab test info passed separately to ophan
// Consider Id name relevant to the gate component or design. Use snake_case
export const signInGateTestIdToComponentId: { [key: string]: string } = {
	SignInGateMainVariant: 'main_variant_4',
	SignInGateMainControl: 'main_control_4',
	SignInGateCopyTestJan2023: 'sign_in_gate_copy_test_jan2023',
};
