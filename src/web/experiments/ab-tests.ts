import { ABTest } from '@guardian/ab-core';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { signInGateMainVariant } from '@root/src/web/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@root/src/web/experiments/tests/sign-in-gate-main-control';
import { signInGatePatientia } from '@frontend/web/experiments/tests/sign-in-gate-patientia';
import { signInGateDismissWindow } from '@frontend/web/experiments/tests/sign-in-gate-dismiss-window';

export const tests: ABTest[] = [
    abTestTest,
    signInGateMainVariant,
    signInGateMainControl,
    signInGatePatientia,
    signInGateDismissWindow,
];
