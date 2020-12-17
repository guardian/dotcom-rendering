import { ABTest } from '@guardian/ab-core';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { signInGateMainVariant } from '@root/src/web/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@root/src/web/experiments/tests/sign-in-gate-main-control';
import { curatedContainerTest2 } from '@frontend/web/experiments/tests/curated-container-test';
import {
    newsletterMerchUnitLighthouseControl,
    newsletterMerchUnitLighthouseVariants,
} from '@root/src/web/experiments/tests/newsletter-merch-unit-test';
import { globalEoyHeaderTest } from '@root/src/web/experiments/tests/global-eoy-header-test';

export const tests: ABTest[] = [
    abTestTest,
    signInGateMainVariant,
    signInGateMainControl,
    curatedContainerTest2,
    newsletterMerchUnitLighthouseControl,
    newsletterMerchUnitLighthouseVariants,
    globalEoyHeaderTest,
];
