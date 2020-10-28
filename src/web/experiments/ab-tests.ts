import { ABTest } from '@guardian/ab-core';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { signInGateMainVariant } from '@root/src/web/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@root/src/web/experiments/tests/sign-in-gate-main-control';
import { signInGatePageview } from '@frontend/web/experiments/tests/sign-in-gate-pageview';
import { signInGatePageviewUs } from '@frontend/web/experiments/tests/sign-in-gate-pageview-us';
import { curatedContainerTest } from '@frontend/web/experiments/tests/curated-container-test';

export const tests: ABTest[] = [
    abTestTest,
    signInGateMainVariant,
    signInGateMainControl,
    signInGatePageview,
    signInGatePageviewUs,
    curatedContainerTest,
];
