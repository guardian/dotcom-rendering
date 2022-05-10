import { ABTest } from '@guardian/ab-core';

export const wellbeingGateTest: ABTest = {
	id: 'WellBeingGateTest',
	start: '2020-06-09',
	expiry: '2022-12-01',
	author: 'Mahesh Makani',
	description: '',
	audience: 0.1,
	audienceOffset: 0.0,
	successMeasure: '',
	audienceCriteria: '',
	dataLinkNames: 'WellBeingGateTest',
	idealOutcome: '',
	showForSensitive: false,
	canRun: () => true,
	variants: [
		{
			id: 'wellbeing-variant',
			test: (): void => {},
		},
	],
};
