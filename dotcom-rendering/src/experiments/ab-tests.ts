import type { ABTest } from '@guardian/ab-core';
import { abTestTest } from './tests/ab-test-test';
import { consentlessAds } from './tests/consentless-ads';
import { integrateIma } from './tests/integrate-ima';
import { signInGateMainControl } from './tests/sign-in-gate-main-control';
import { signInGateMainVariant } from './tests/sign-in-gate-main-variant';
import { signInGateTimesOfDay } from './tests/sign-in-gate-time-of-day';

// keep in sync with ab-tests in frontend
// https://github.com/guardian/frontend/tree/main/static/src/javascripts/projects/common/modules/experiments/ab-tests.ts
export const tests: ABTest[] = [
	abTestTest,
	signInGateMainVariant,
	signInGateTimesOfDay,
	signInGateMainControl,
	consentlessAds,
	integrateIma,
];
