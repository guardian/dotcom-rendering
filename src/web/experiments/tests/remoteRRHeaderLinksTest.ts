import { ABTest } from '@guardian/ab-core';

export const remoteRRHeaderLinksTestName = 'RemoteRRHeaderLinksTest';

export const remoteRRHeaderLinksTest: ABTest = {
	id: remoteRRHeaderLinksTestName,
	start: '2021-04-10',
	expiry: '2021-12-01',
	author: 'Tom Forbes',
	description:
		'Use the dotcom-components service for serving the Reader Revenue header links',
	audience: 1,
	audienceOffset: 0.0,
	successMeasure: 'AV is not worse',
	audienceCriteria: 'all pageviews',
	dataLinkNames: 'RRHeaderLinks',
	idealOutcome: 'AV is not worse',
	showForSensitive: true,
	canRun: () => true,
	variants: [
		{
			id: 'control',
			test: (): void => {},
		},
		{
			id: 'remote',
			test: (): void => {},
		},
	],
};
