import type { ABTest } from '@guardian/ab-core';
import { bypassCommercialMetricsSampling } from '@guardian/commercial-core';
import { bypassCoreWebVitalsSampling } from '@guardian/core-web-vitals';
import { isNonNullable } from '@guardian/libs';

export const bypassMetricsSampling = (): void => {
	void bypassCommercialMetricsSampling();
	void bypassCoreWebVitalsSampling();
};

export const getClientSideABTest = (testId: string): ABTest | undefined =>
	typeof window !== 'undefined'
		? window.guardian.config.clientSideABTests?.[testId]
		: undefined;

export const getClientSideABTests = (testIds: string[]): ABTest[] =>
	testIds.map((testId) => getClientSideABTest(testId)).filter(isNonNullable);
