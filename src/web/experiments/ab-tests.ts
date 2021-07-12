import { ABTest } from '@guardian/ab-core';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { signInGateMainVariant } from '@frontend/web/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@frontend/web/experiments/tests/sign-in-gate-main-control';
import {
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
} from '@frontend/web/experiments/tests/newsletter-merch-unit-test';
import { commercialPartner } from './tests/commercial-partner';

// keep in sync with ab-tests in frontend
// https://github.com/guardian/frontend/tree/main/static/src/javascripts/projects/common/modules/experiments/ab-tests.ts
export const tests: ABTest[] = [
	abTestTest,
	commercialPartner,
	signInGateMainVariant,
	signInGateMainControl,
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
];
