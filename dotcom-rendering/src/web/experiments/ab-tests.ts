import { ABTest } from '@guardian/ab-core';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { signInGateMainVariant } from '@frontend/web/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@frontend/web/experiments/tests/sign-in-gate-main-control';
import {
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
} from '@frontend/web/experiments/tests/newsletter-merch-unit-test';
import { refreshConfiantBlockedAds } from './tests/refresh-confiant-blocked-ads';

// keep in sync with ab-tests in frontend
// https://github.com/guardian/frontend/tree/main/static/src/javascripts/projects/common/modules/experiments/ab-tests.ts
export const tests: ABTest[] = [
	abTestTest,
	signInGateMainVariant,
	signInGateMainControl,
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
	refreshConfiantBlockedAds,
];
