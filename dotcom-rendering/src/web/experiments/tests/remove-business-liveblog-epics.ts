import type { ABTest } from '@guardian/ab-core';

export const removeBusinessLiveblogEpics: ABTest = {
	id: 'RemoveBusinessLiveblogEpics',
	start: '2023-05-24',
	expiry: '2023-07-10',
	author: '@commercial-dev',
	description:
		'Test the commercial impact of removing contribution epics on business liveblogs',
	audience: 0 / 100,
	audienceOffset: 0 / 100,
	audienceCriteria: 'Opt in',
	successMeasure: 'Ad revenue increases on business liveblogs',
	canRun: () => true,
	variants: [
		{
			id: 'control',
			test: (): void => {
				/* no-op */
			},
		},
		{
			id: 'variant',
			test: (): void => {
				/* no-op */
			},
		},
	],
};
