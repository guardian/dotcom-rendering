import type { ABTest } from '@guardian/ab-core';

// Sign in Gate A/B Tests
import { signInGateMainControl } from '../../experiments/tests/sign-in-gate-main-control';
import { signInGateMainVariant } from '../../experiments/tests/sign-in-gate-main-variant';
import { signInGateMandatoryLongTestRun } from '../../experiments/tests/sign-in-gate-mandatory-long-testrun';

// Sign in Gate Types
import { signInGateComponent as gateMainControl } from './gates/main-control';
import { signInGateComponent as gateMainVariant } from './gates/main-variant';
import type { SignInGateTestMap } from './types';

// component name, should always be sign-in-gate
export const componentName = 'sign-in-gate';

/* When adding a new test, you need to add the test name to the tests array below,
   and add a entry for each variant that maps it to a SignInGateComponent in
   signInGateTestVariantToGateMapping, and in turn match each test id to an component
   id in signInGateTestIdToComponentId
*/
export const signInGateTests: ReadonlyArray<ABTest> = [
	signInGateMainVariant,
	signInGateMainControl,
	signInGateMandatoryLongTestRun,
];

export const signInGateTestVariantToGateMapping: SignInGateTestMap = {
	'main-control-4': gateMainControl,
	'main-variant-4': gateMainVariant,
	'mandatory-long-testrun': gateMainVariant, // showing main gate for test run
};

export const signInGateTestIdToComponentId: { [key: string]: string } = {
	SignInGateMainVariant: 'main_variant_4',
	SignInGateMainControl: 'main_control_4',
	signInGateMandatoryLongTestRun: 'mandatory_long_testrun',
};
