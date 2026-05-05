import type { ABTest } from '@guardian/ab-core';
import { abTestTest } from './tests/ab-test-test';
import { noAuxiaSignInGate } from './tests/no-auxia-sign-in-gate';

export const tests: ABTest[] = [abTestTest, noAuxiaSignInGate];
