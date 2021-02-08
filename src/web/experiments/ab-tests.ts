import { ABTest } from '@guardian/ab-core';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { signInGateMainVariant } from '@root/src/web/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@root/src/web/experiments/tests/sign-in-gate-main-control';
import { signInGateDesignOpt } from '@frontend/web/experiments/tests/sign-in-gate-design-opt';
import { curatedContainerTest2 } from '@frontend/web/experiments/tests/curated-container-test';
import { deeplyReadTest } from '@root/src/web/experiments/tests/deeply-read-test';
import {
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
} from '@root/src/web/experiments/tests/newsletter-merch-unit-test';

export const tests: ABTest[] = [
	abTestTest,
	signInGateMainVariant,
	signInGateMainControl,
	signInGateDesignOpt,
	curatedContainerTest2,
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
	deeplyReadTest,
];
