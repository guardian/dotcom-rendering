import type { ABTest } from '@guardian/ab-core';

export const confiantSDKUpdateTest: ABTest = {
	id: 'ConfiantSDKUpdate',
	start: '2022-10-04',
	expiry: '2022-10-30',
	author: 'Jake Lee Kennedy',
	description: 'Test the new Confiant SDK, to share with the Confiant team',
	audience: 0,
	audienceOffset: 0,
	audienceCriteria: 'Opt in',
	successMeasure: 'No change/improved ad load times',
	canRun: () => true,
	variants: [
		{
			id: 'variant',
			test: (): void => {
				//
			},
		},
	],
};
