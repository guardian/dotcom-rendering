import type { ABTest } from '@guardian/ab-core';

// Sign in Gate A/B Tests
import { signInGateMainControl } from '../../experiments/tests/sign-in-gate-main-control';
import { signInGateMainVariant } from '../../experiments/tests/sign-in-gate-main-variant';
import {
	signInGateMandatoryLongBucketingTestRun,
	signInGateMandatoryLongBucketingTestRunEu,
	signInGateMandatoryLongBucketingTestRunNa,
	signInGateMandatoryLongBucketingTestRunUk,
} from '../../experiments/tests/sign-in-gate-mandatory-long-testrun';

// Sign in Gate Types
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
	signInGateMandatoryLongBucketingTestRun,
	signInGateMandatoryLongBucketingTestRunEu,
	signInGateMandatoryLongBucketingTestRunNa,
	signInGateMandatoryLongBucketingTestRunUk,
];

export const signInGateTestVariantToGateMapping: SignInGateTestMap = {
	'main-control-4': gateMainControl,
	'main-variant-4': gateMainVariant,
	'mandatory-long-bucketing-testrun': gateMainVariant, // showing main gate for test run
	'mandatory-long-bucketing-testrun-uk': gateMainVariant, // showing main gate for test run
	'mandatory-long-bucketing-testrun-na': gateMainVariant, // showing main gate for test run
	'mandatory-long-bucketing-testrun-eu': gateMainVariant, // showing main gate for test run
};

export const signInGateTestIdToComponentId: { [key: string]: string } = {
	SignInGateMainVariant: 'main_variant_4',
	SignInGateMainControl: 'main_control_4',
	SignInGateMandatoryLongBucketingTestRun: 'mandatory_long_bucketing_testrun',
	SignInGateMandatoryLongBucketingTestRunUk:
		'mandatory_long_bucketing_testrun_uk',
	SignInGateMandatoryLongBucketingTestRunNa:
		'mandatory_long_bucketing_testrun_na',
	SignInGateMandatoryLongBucketingTestRunEu:
		'mandatory_long_bucketing_testrun_eu',
};
