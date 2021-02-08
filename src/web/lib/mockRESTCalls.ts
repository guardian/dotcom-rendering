import fetchMock from 'fetch-mock';

import { richLinkCard } from '@root/fixtures/card';
import { mockTab1, responseWithTwoTabs } from '@root/fixtures/mostViewed';
import { series } from '@root/fixtures/series';
import { commentCount } from '@root/fixtures/commentCounts';
import { discussion } from '@root/fixtures/discussion';
import { storypackage } from '@root/fixtures/storypackage';
import { matchreport } from '@root/fixtures/matchreport';

export const mockRESTCalls = () =>
	fetchMock
		.restore()
		// Most read by Geo
		.get(
			/.*api.nextgen.guardianapps.co.uk\/most-read-geo.*/,
			{
				status: 200,
				body: mockTab1,
			},
			{ overwriteRoutes: false },
		)
		// Comment count
		.get(
			/.*api.nextgen.guardianapps.co.uk\/discussion\/comment-counts.*/,
			{
				status: 200,
				body: commentCount,
			},
			{ overwriteRoutes: false },
		)
		// Most read by category
		.get(
			/.*api.nextgen.guardianapps.co.uk\/most-read.*/,
			{
				status: 200,
				body: responseWithTwoTabs,
			},
			{ overwriteRoutes: false },
		)
		// Series
		.get(
			/.*api.nextgen.guardianapps.co.uk\/series.*/,
			{
				status: 200,
				body: series,
			},
			{ overwriteRoutes: false },
		)
		// Story package
		.get(
			/.*api.nextgen.guardianapps.co.uk\/story-package.*/,
			{
				status: 200,
				body: storypackage,
			},
			{ overwriteRoutes: false },
		)
		// Rich link
		.get(
			/.*api.nextgen.guardianapps.co.uk\/embed\/card.*/,
			{
				status: 200,
				body: richLinkCard,
			},
			{ overwriteRoutes: false },
		)
		// Article share count
		.get(
			/.*api.nextgen.guardianapps.co.uk\/sharecount.*/,
			{
				status: 200,
				body: {
					path:
						'money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
					share_count: 273,
					refreshStatus: true,
				},
			},
			{ overwriteRoutes: false },
		)
		// Get discussion
		.get(
			/.*discussion.theguardian.com\/discussion-api\/discussion\/.*/,
			{
				status: 200,
				body: discussion,
			},
			{ overwriteRoutes: false },
		)
		// Get country code
		.get(
			/.*api.nextgen.guardianapps.co.uk\/geolocation.*/,
			{
				status: 200,
				body: { country: 'GB' },
			},
			{ overwriteRoutes: false },
		)
		// Match report data
		.get(
			/.*api.nextgen.guardianapps.co.uk\/football\/api.*/,
			{
				status: 200,
				body: matchreport,
			},
			{ overwriteRoutes: false },
		);
