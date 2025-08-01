import type { ABTest } from '@guardian/ab-core';
import { abTestTest } from './tests/ab-test-test';
import { auxiaSignInGate } from './tests/auxia-sign-in-gate';
import { googleOneTap } from './tests/google-one-tap';
import { signInGateMainControl } from './tests/sign-in-gate-main-control';
import { signInGateMainVariant } from './tests/sign-in-gate-main-variant';
import { userBenefitsApi } from './tests/user-benefits-api';

// keep in sync with ab-tests in frontend
// https://github.com/guardian/frontend/tree/main/static/src/javascripts/projects/common/modules/experiments/ab-tests.ts
export const tests: ABTest[] = [
	abTestTest,
	signInGateMainVariant,
	signInGateMainControl,
	userBenefitsApi,
	auxiaSignInGate,
	googleOneTap,
];
