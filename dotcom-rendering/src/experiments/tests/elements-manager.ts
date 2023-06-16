import type { ABTest } from '@guardian/ab-core';

export const elementsManager: ABTest = {
	id: 'ElementsManager',
	author: '@commercial-dev',
	start: '2023-02-23',
	expiry: '2023-06-30',
	audience: 0 / 100,
	audienceOffset: 0 / 100,
	audienceCriteria: 'Opt in only',
	successMeasure: 'Able to serve GEM assets in ad slots on page',
	description: 'Test serving GEM assets in ad slots on page',
	variants: [
		{ id: 'control', test: (): void => {} },
		{ id: 'variant', test: (): void => {} },
	],
	canRun: () => true,
};
