import type { ABTest } from '@guardian/ab-core';
import { abTestTest } from './tests/ab-test-test.ts';
import { billboardsInMerchHigh } from './tests/billboards-in-merch-high.ts';
import { consentlessAds } from './tests/consentless-ads.ts';
import { elementsManager } from './tests/elements-manager.ts';
import { integrateIma } from './tests/integrate-ima.ts';
import { limitInlineMerch } from './tests/limit-inline-merch.ts';
import { liveblogRightColumnAds } from './tests/liveblog-right-column-ads.ts';
import { publicGoodTest } from './tests/public-good.ts';
import { signInGateCopyTestJan2023 } from './tests/sign-in-gate-copy-test-variants.ts';
import { signInGateMainControl } from './tests/sign-in-gate-main-control.ts';
import { signInGateMainVariant } from './tests/sign-in-gate-main-variant.ts';

// keep in sync with ab-tests in frontend
// https://github.com/guardian/frontend/tree/main/static/src/javascripts/projects/common/modules/experiments/ab-tests.ts
export const tests: ABTest[] = [
	abTestTest,
	signInGateMainVariant,
	signInGateMainControl,
	signInGateCopyTestJan2023,
	consentlessAds,
	integrateIma,
	billboardsInMerchHigh,
	elementsManager,
	limitInlineMerch,
	liveblogRightColumnAds,
	publicGoodTest,
];
