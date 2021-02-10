import { ABTest } from '@guardian/ab-core';

export const abTestTest: ABTest = {
	id: 'AbTestTest',
	start: '2020-05-20',
	expiry: '2023-12-01',
	author: 'gtrufitt',
	description: 'This Test',
	audience: 0.0001, // 0.01%
	audienceOffset: 0,
	successMeasure: 'It works',
	audienceCriteria: 'Everyone',
	idealOutcome: 'It works',
	showForSensitive: true,
	canRun: () => true,
	variants: [
		{
			id: 'control',
			test: (): void => {},
			impression: (impression: () => void): void => {
				impression();
			},
			success: (success: () => void): void => {
				success();
			},
		},
		{
			id: 'variant',
			test: (): void => {},
			impression: (impression: () => void): void => {
				impression();
			},
			success: (success: () => void): void => {
				success();
			},
		},
	],
};
