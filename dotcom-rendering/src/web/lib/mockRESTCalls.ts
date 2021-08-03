import fetchMock from 'fetch-mock';

import { mostRead } from '@root/fixtures/manual/most-read';
import { mostReadGeo } from '@root/fixtures/manual/most-read-geo';
import { related } from '@root/fixtures/manual/related';
import { discussion } from '@root/fixtures/manual/discussion';
import { shortDiscussion } from '@root/fixtures/manual/short-discussion';
import { discussionNoTopComments } from '@root/fixtures/manual/discussion-no-top-comments';

import { series } from '@root/fixtures/generated/series';
import { storyPackage } from '@root/fixtures/generated/story-package';
import { matchReport } from '@root/fixtures/generated/match-report';

const richLinkCard = {
	tags: [
		{
			id: 'music/eminem',
			type: 'Keyword',
			title: 'Eminem',
		},
		{
			id: 'music/music',
			type: 'Keyword',
			title: 'Music',
		},
		{
			id: 'music/hip-hop',
			type: 'Keyword',
			title: 'Hip-hop',
		},
		{
			id: 'music/rap',
			type: 'Keyword',
			title: 'Rap',
		},
		{
			id: 'culture/culture',
			type: 'Keyword',
			title: 'Culture',
		},
		{
			id: 'us-news/donaldtrump',
			type: 'Keyword',
			title: 'Donald Trump',
		},
		{
			id: 'us-news/trump-administration',
			type: 'Keyword',
			title: 'Trump administration',
		},
		{
			id: 'us-news/secret-service',
			type: 'Keyword',
			title: 'Secret Service',
		},
		{
			id: 'type/article',
			type: 'Type',
			title: 'Article',
		},
		{
			id: 'tone/news',
			type: 'Tone',
			title: 'News',
		},
		{
			id: 'profile/ben-beaumont-thomas',
			type: 'Contributor',
			title: 'Ben Beaumont-Thomas',
		},
		{
			id: 'publication/theguardian',
			type: 'Publication',
			title: 'The Guardian',
		},
		{
			id: 'theguardian/mainsection',
			type: 'NewspaperBook',
			title: 'Main section',
		},
		{
			id: 'theguardian/mainsection/international',
			type: 'NewspaperBookSection',
			title: 'International',
		},
		{
			id: 'tracking/commissioningdesk/uk-culture',
			type: 'Tracking',
			title: 'UK Culture',
		},
	],
	cardStyle: 'news',
	thumbnailUrl:
		'https://i.guim.co.uk/img/media/0847eccb8898d4e91499f8a68c4cfdb454f91382/101_177_3650_2191/master/3650.jpg?width=460&quality=85&auto=format&fit=max&s=ca06880ab92aee625f7b6f691bf3e8c5',
	imageAsset: {
		index: 2,
		fields: {
			displayCredit: 'true',
			source: 'RMV/REX/Shutterstock',
			photographer: 'RMV/REX/Shutterstock',
			isMaster: 'true',
			altText: 'Eminem performing at Bonnaroo festival in June.',
			height: '2191',
			credit: 'Photograph: RMV/REX/Shutterstock',
			mediaId: '0847eccb8898d4e91499f8a68c4cfdb454f91382',
			width: '3650',
		},
		mediaType: 'Image',
		url:
			'https://media.guim.co.uk/0847eccb8898d4e91499f8a68c4cfdb454f91382/101_177_3650_2191/master/3650.jpg',
	},
	headline: 'Eminem attacks Donald Trump on surprise album Kamikaze',
	contentType: 'Article',
	contributorImage:
		'https://i.guim.co.uk/img/uploads/2017/10/06/Ben-Beaumont-Thomas,-L.png?width=173&quality=85&auto=format&fit=max&s=e5b75fdef4eecc5eba2db1966e9b5d93',
	url: '/music/2018/aug/31/eminem-donald-trump-surprise-album-kamikaze',
	pillar: 'culture',
	format: {
		design: 'ArticleDesign',
		theme: 'CulturePillar',
		display: 'StandardDisplay',
	},
};

export const mockRESTCalls = (): void => {
	fetchMock
		.restore()
		// Most read by Geo
		.get(
			/.*api.nextgen.guardianapps.co.uk\/most-read-geo.*/,
			{
				status: 200,
				body: mostReadGeo,
			},
			{ overwriteRoutes: false },
		)
		// Comment count
		.get(
			/.*api.nextgen.guardianapps.co.uk\/discussion\/comment-counts.*/,
			{
				status: 200,
				body: {
					counts: [
						{
							id: '/p/4k83z',
							count: 432,
						},
					],
				},
			},
			{ overwriteRoutes: false },
		)
		// Most read by category
		.get(
			/.*api.nextgen.guardianapps.co.uk\/most-read.*/,
			{
				status: 200,
				body: mostRead,
			},
			{ overwriteRoutes: false },
		)
		// Related
		.get(
			/.*api.nextgen.guardianapps.co.uk\/related.*/,
			{
				status: 200,
				body: related,
			},
			{ overwriteRoutes: false },
		)
		// Popular in tag
		.get(
			/.*api.nextgen.guardianapps.co.uk\/popular-in-tag.*/,
			{
				status: 200,
				body: related,
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
				body: storyPackage,
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
		// Get 'short' discussion - top comments
		.get(
			/.*discussion.theguardian.com\/discussion-api\/discussion\/p\/4v8kk\/topcomments/,
			{
				status: 200,
				body: discussionNoTopComments,
			},
			{ overwriteRoutes: false },
		)
		// Get 'short' discussion
		.get(
			/.*discussion.theguardian.com\/discussion-api\/discussion\/p\/4v8kk/,
			{
				status: 200,
				body: shortDiscussion,
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
				body: matchReport,
			},
			{ overwriteRoutes: false },
		);
};
