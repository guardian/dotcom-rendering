import type { ABTest } from '@guardian/ab-core';

export const admiralAdblockRecovery: ABTest = {
	id: 'AdmiralAdblockRecovery',
	author: '@commercial-dev',
	start: '2025-08-13',
	expiry: '2027-01-21',
	audience: 1.0,
	audienceOffset: 0,
	audienceCriteria: 'US users only',
	successMeasure: 'Reduction in ad block rate',
	description: 'Test Admiral ad blocker detection and recovery modal',
	variants: [
		{ id: 'control', test: (): void => {} },
		{ id: 'variant-detect', test: (): void => {} },
		{ id: 'variant-recover', test: (): void => {} },
	],
	canRun: () => true,
};
