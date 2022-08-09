import type { ABTest } from '@guardian/ab-core';

export const deeplyReadArticleFooterTest: ABTest = {
	id: 'DeeplyReadArticleFooter',
	start: '2022-08-09',
	expiry: '2022-10-10',
	author: 'Joshua Lieberman and Daniel Clifton',
	description:
		'Add new section to the article footer onwards that shows deeply read articles',
	audience: 1,
	audienceOffset: 0,
	successMeasure: 'Recirculation metrics are not worse',
	audienceCriteria: 'all pageviews',
	dataLinkNames: 'DeeplyReadFooterLinks',
	idealOutcome: 'AV is not worse',
	showForSensitive: true,
	canRun: (): boolean => true,
	variants: [
		{
			id: 'control',
			test: (): void => {},
		},
		{
			id: 'variant',
			test: (): void => {},
		},
	],
};
