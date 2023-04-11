import type { ABTest } from '@guardian/ab-core';
import { getTest } from '../SetABTests.importable';
// Sign in Gate Types
import { signInGateComponent as gateMainControl } from './gates/main-control';
import { signInGateComponent as gateMainVariant } from './gates/main-variant';
import { signInGateCopyTestJan2023Component } from './gates/sign-in-gate-copy-test-jan2023';
import type { SignInGateTestMap } from './types';

/* When adding a new test, you need to add the test name to the tests array below,
   and add a entry for each variant that maps it to a SignInGateComponent in
   signInGateTestVariantToGateMapping, and in turn match each test id to an component
   id in signInGateTestIdToComponentId
*/
export const signInGateTests: ReadonlyArray<ABTest> = [
	// For now this part of the API becomes clunkier
	// But we can do some work on this later
	getTest('SignInGateMainVariant'),
	getTest('SignInGateMainControl'),
	getTest('SignInGateCopyTestJan2023'),
].filter((test): test is ABTest => test !== undefined);

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
