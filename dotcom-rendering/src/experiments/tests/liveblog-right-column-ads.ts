import type { ABTest } from '@guardian/ab-core';

export const liveblogRightColumnAds: ABTest = {
	id: 'LiveblogRightColumnAds',
	author: '@commercial-dev',
	start: '2023-08-01',
	expiry: '2023-09-20',
	audience: 0 / 100,
	audienceOffset: 0 / 100,
	audienceCriteria: 'Desktop users with wide (1300px+) screens only',
	successMeasure:
		'Displaying an advert in the right-hand column on liveblog pages below the top 1000px of the content will have a significant revenue increase.',
	description:
		'Test the commercial impact of different advert display strategies in the right column on liveblog pages',
	variants: [
		{
			id: 'control',
			test: (): void => {
				/* no-op */
			},
		},
		{
			id: 'minimum-stickiness',
			test: (): void => {
				/* no-op */
			},
		},
		{
			id: 'multiple-adverts',
			test: (): void => {
				/* no-op */
			},
		},
	],
	canRun: () => window.guardian.config.page.contentType === 'LiveBlog',
};
