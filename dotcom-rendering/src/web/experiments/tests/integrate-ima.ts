import type { ABTest } from '@guardian/ab-core';

export const integrateIMA: ABTest = {
	id: 'IntegrateIMA',
	start: '2022-07-14',
	expiry: '2022-12-31',
	author: 'Zeke Hunter-Green',
	description:
		'Test the commercial impact of replacing YouTube ads with Interactive Media Ads on first-party videos',
	audience: 5 / 100,
	audienceOffset: 30 / 100,
	audienceCriteria: 'Opt in',
	successMeasure:
		'IMA integration works as expected without adversely affecting pages with videos',
	canRun: () => true,
	variants: [
		{
			id: 'variant',
			test: (): void => {},
		},
	],
};
