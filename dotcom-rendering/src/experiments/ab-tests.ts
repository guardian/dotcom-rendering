import type { ABTest } from '@guardian/ab-core';
import { abTestTest } from './tests/ab-test-test';
import { billboardsInMerchHigh } from './tests/billboards-in-merch-high';
import { consentlessAds } from './tests/consentless-ads';
import { eagerPrebid } from './tests/eager-prebid';
import { elementsManager } from './tests/elements-manager';
import { integrateIma } from './tests/integrate-ima';
import { signInGateMainControl } from './tests/sign-in-gate-main-control';
import { signInGateMainVariant } from './tests/sign-in-gate-main-variant';

// keep in sync with ab-tests in frontend
// https://github.com/guardian/frontend/tree/main/static/src/javascripts/projects/common/modules/experiments/ab-tests.ts
export const tests: ABTest[] = [
	abTestTest,
	signInGateMainVariant,
	signInGateMainControl,
	consentlessAds,
	integrateIma,
	billboardsInMerchHigh,
	elementsManager,
	eagerPrebid,
];
