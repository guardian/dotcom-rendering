import { ABTest } from '@guardian/ab-core';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { signInGateMainVariant } from '@frontend/web/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@frontend/web/experiments/tests/sign-in-gate-main-control';
import {
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
} from '@frontend/web/experiments/tests/newsletter-merch-unit-test';
import { signInGateUsMandatory } from '@root/src/web/experiments/tests/sign-in-gate-us-mandatory';

// keep in sync with ab-tests in frontend
// https://github.com/guardian/frontend/tree/main/static/src/javascripts/projects/common/modules/experiments/ab-tests.ts
export const tests: ABTest[] = [
	abTestTest,
	signInGateMainVariant,
	signInGateMainControl,
	signInGateUsMandatory,
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
];
