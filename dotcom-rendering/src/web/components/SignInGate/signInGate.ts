import type { ABTest } from '@guardian/ab-core';

// Sign in Gate A/B Tests
import { signInGateMainControl } from '../../experiments/tests/sign-in-gate-main-control';
import { signInGateMainVariant } from '../../experiments/tests/sign-in-gate-main-variant';
import {
	signInGateMandatoryLongTestControlAunz,
	signInGateMandatoryLongTestControlEu,
	signInGateMandatoryLongTestControlNa,
	signInGateMandatoryLongTestControlUk,
	signInGateMandatoryLongTestVariantAunz,
	signInGateMandatoryLongTestVariantNa,
	signInGateMandatoryLongTestVariantEu,
	signInGateMandatoryLongTestVariantUk,
} from '../../experiments/tests/sign-in-gate-mandatory-long-test';

// Sign in Gate Types
import { signInGateComponent as gateMainControl } from './gates/main-control';
import { signInGateComponent as gateMainVariant } from './gates/main-variant';
import { signInGateMandatoryComponent as gateMainMandatoryVariant } from './gates/main-mandatory-variant';
import type { SignInGateTestMap } from './types';

/* When adding a new test, you need to add the test name to the tests array below,
   and add a entry for each variant that maps it to a SignInGateComponent in
   signInGateTestVariantToGateMapping, and in turn match each test id to an component
   id in signInGateTestIdToComponentId
*/
export const signInGateTests: ReadonlyArray<ABTest> = [
	signInGateMainVariant,
	signInGateMainControl,
	signInGateMandatoryLongTestControlAunz,
	signInGateMandatoryLongTestControlEu,
	signInGateMandatoryLongTestControlNa,
	signInGateMandatoryLongTestControlUk,
	signInGateMandatoryLongTestVariantAunz,
	signInGateMandatoryLongTestVariantNa,
	signInGateMandatoryLongTestVariantEu,
	signInGateMandatoryLongTestVariantUk,
];

export const signInGateTestVariantToGateMapping: SignInGateTestMap = {
	'main-control-4': gateMainControl,
	'main-variant-4': gateMainVariant,
	'mandatory-long-test-control-uk': gateMainVariant, // showing main dismissable gate
	'mandatory-long-test-control-na': gateMainVariant, // showing main dismissable gate
	'mandatory-long-test-control-aunz': gateMainVariant, // showing main dismissable gate
	'mandatory-long-test-control-eu': gateMainVariant, // showing main dismissable gate
	'mandatory-long-test-variant-uk': gateMainMandatoryVariant,
	'mandatory-long-test-variant-na': gateMainMandatoryVariant,
	'mandatory-long-test-variant-aunz': gateMainMandatoryVariant,
	'mandatory-long-test-variant-eu': gateMainMandatoryVariant,
};

export const signInGateTestIdToComponentId: { [key: string]: string } = {
	SignInGateMainVariant: 'main_variant_4',
	SignInGateMainControl: 'main_control_4',
	SignInGateMandatoryLongTestControlAunz: 'mandatory_long_test_control_aunz',
	SignInGateMandatoryLongTestControlEu: 'mandatory_long_test_control_eu',
	SignInGateMandatoryLongTestControlNa: 'mandatory_long_test_control_na',
	SignInGateMandatoryLongTestControlUk: 'mandatory_long_test_control_uk',
	SignInGateMandatoryLongTestVariantAunz: 'mandatory_long_test_variant_aunz',
	SignInGateMandatoryLongTestVariantNa: 'mandatory_long_test_variant_Na',
	SignInGateMandatoryLongTestVariantEu: 'mandatory_long_test_variant_eu',
	SignInGateMandatoryLongTestVariantUk: 'mandatory_long_test_variant_uk',
};
