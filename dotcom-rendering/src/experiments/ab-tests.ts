import type { ABTest } from '@guardian/ab-core';
import { abTestTest } from './tests/ab-test-test';
import { adBlockAsk } from './tests/ad-block-ask';
import { consentlessAds } from './tests/consentless-ads';
import { deeplyReadRightColumn } from './tests/deeply-read-right-column';
import { integrateIma } from './tests/integrate-ima';
import { mpuWhenNoEpic } from './tests/mpu-when-no-epic';
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
	mpuWhenNoEpic,
	adBlockAsk,
	deeplyReadRightColumn,
];
