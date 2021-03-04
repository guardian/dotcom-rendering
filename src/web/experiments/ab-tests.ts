import { ABTest } from '@guardian/ab-core';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { signInGateMainVariant } from '@root/src/web/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@root/src/web/experiments/tests/sign-in-gate-main-control';
import { signInGateCopyOpt } from '@frontend/web/experiments/tests/sign-in-gate-copy-opt';
import { curatedContentCarouselTest } from '@frontend/web/experiments/tests/curated-content-carousel-test';
import { deeplyReadTest } from '@root/src/web/experiments/tests/deeply-read-test';
import {
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
} from '@root/src/web/experiments/tests/newsletter-merch-unit-test';
import { stickyNavTest } from '@root/src/web/experiments/tests/sticky-nav-test';

export const tests: ABTest[] = [
	abTestTest,
	signInGateMainVariant,
	signInGateMainControl,
	signInGateCopyOpt,
	curatedContentCarouselTest,
	newsletterMerchUnitLighthouseControl,
	newsletterMerchUnitLighthouseVariants,
	deeplyReadTest,
	stickyNavTest,
];
