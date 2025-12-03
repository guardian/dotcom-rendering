import type { ABTest } from '@guardian/ab-core';
import { abTestTest } from './tests/ab-test-test';
import { noAuxiaSignInGate } from './tests/no-auxia-sign-in-gate';
import { personalisedHighlights } from './tests/personalised-highlights';
import { userBenefitsApi } from './tests/user-benefits-api';

// keep in sync with ab-tests in frontend
// https://github.com/guardian/frontend/tree/main/static/src/javascripts/projects/common/modules/experiments/ab-tests.ts
export const tests: ABTest[] = [
	abTestTest,
	userBenefitsApi,
	personalisedHighlights,
	noAuxiaSignInGate,
];
