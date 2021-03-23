import { ABTest } from '@guardian/ab-core';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { signInGateMainVariant } from '@root/src/web/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@root/src/web/experiments/tests/sign-in-gate-main-control';
import { deeplyReadTest } from '@root/src/web/experiments/tests/deeply-read-test';
import {
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
} from '@root/src/web/experiments/tests/newsletter-merch-unit-test';
import { stickyNavTest } from '@root/src/web/experiments/tests/sticky-nav-test';
import { signInGateMandoryTest } from '@root/src/web/experiments/tests/sign-in-gate-mandatory';

export const tests: ABTest[] = [
	abTestTest,
	signInGateMainVariant,
	signInGateMainControl,
	signInGateMandoryTest,
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
	deeplyReadTest,
	stickyNavTest,
];
