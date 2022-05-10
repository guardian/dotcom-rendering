import { ABTest } from '@guardian/ab-core';

// Sign in Gate A/B Tests
import { signInGateMainVariant } from '../../experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '../../experiments/tests/sign-in-gate-main-control';
import { wellbeingGateTest } from '../../experiments/tests/wellbeing-gate';

// Sign in Gate Types
import { signInGateComponent as gateMainVariant } from './gates/main-variant';
import { signInGateComponent as gateMainControl } from './gates/main-control';
import { signInGateComponent as gateWellBeing } from './gates/wellbeing-variant';
import { SignInGateTestMap } from './types';

// component name, should always be sign-in-gate
export const componentName = 'sign-in-gate';

/* When adding a new test, you need to add the test name to the tests array below,
   and add a entry for each variant that maps it to a SignInGateComponent in
   signInGateTestVariantToGateMapping, and in turn match each test id to an component
   id in signInGateTestIdToComponentId
*/
export const signInGateTests: ReadonlyArray<ABTest> = [
	wellbeingGateTest,
	signInGateMainVariant,
	signInGateMainControl,
];

export const signInGateTestVariantToGateMapping: SignInGateTestMap = {
	'wellbeing-variant': gateWellBeing,
	'main-control-4': gateMainControl,
	'main-variant-4': gateMainVariant,
};

export const signInGateTestIdToComponentId: { [key: string]: string } = {
	wellbeingGateTest: 'wellbeing-gate',
	SignInGateMainVariant: 'main_variant_4',
	SignInGateMainControl: 'main_control_4',
};
