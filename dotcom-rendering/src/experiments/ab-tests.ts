import type { ABTest } from '@guardian/ab-core';
import { abTestTest } from './tests/ab-test-test';
import { adBlockAsk } from './tests/ad-block-ask';
import { auxiaSignInGate } from './tests/auxia-sign-in-gate';
import { consentlessAds } from './tests/consentless-ads';
import { fiveFourImages } from './tests/five-four-images';
import { integrateIma } from './tests/integrate-ima';
import { mpuWhenNoEpic } from './tests/mpu-when-no-epic';
import { optimiseSpacefinderInline } from './tests/optimise-spacefinder-inline';
import { signInGateMainControl } from './tests/sign-in-gate-main-control';
import { signInGateMainVariant } from './tests/sign-in-gate-main-variant';
import { userBenefitsApi } from './tests/user-benefits-api';

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
	optimiseSpacefinderInline,
	userBenefitsApi,
	auxiaSignInGate,
	fiveFourImages,
];
