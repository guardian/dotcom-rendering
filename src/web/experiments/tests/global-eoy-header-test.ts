import { ABTest } from '@guardian/ab-core';

export const GlobalEoyHeaderTestName = 'GlobalEoyHeaderTest';
export type GlobalEoyHeaderTestVariant =
	| 'control'
	| 'variant'
	| 'variant2'
	| 'notintest';

const month = new Date().getMonth() + 1; // js date month begins at 0

export const globalEoyHeaderTest: ABTest = {
	id: GlobalEoyHeaderTestName,
	start: '2020-12-02',
	expiry: '2021-02-01',
	author: 'Tom Forbes',
	description: 'Test reader revenue message in header',
	audience: 1.0,
	audienceOffset: 0,
	successMeasure: 'AV',
	idealOutcome: 'AV',
	showForSensitive: false,
	audienceCriteria: 'All',
	canRun: () => month === 12 || month === 1,
	variants: [
		{
			id: 'control',
			test: (): void => {},
		},
		{
			id: 'variant', // different heading + subheading
			test: (): void => {},
		},
		{
			id: 'variant2', // different heading only
			test: (): void => {},
		},
	],
};
