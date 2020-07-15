import { ABTest } from '@guardian/ab-core';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { signInGateCentesimus } from '@frontend/web/experiments/tests/sign-in-gate-centesimus';
import { signInGatePatientia } from '@frontend/web/experiments/tests/sign-in-gate-patientia';
import { signInGateVii } from '@frontend/web/experiments/tests/sign-in-gate-vii';

export const tests: ABTest[] = [
    abTestTest,
    signInGateCentesimus,
    signInGatePatientia,
    signInGateVii,
];
