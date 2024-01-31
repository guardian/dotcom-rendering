import fetchMock from 'fetch-mock';
import { matchReport } from '../../fixtures/generated/match-report';
import { series } from '../../fixtures/generated/series';
import { storyPackage } from '../../fixtures/generated/story-package';
import { comment } from '../../fixtures/manual/comment';
import { discussion } from '../../fixtures/manual/discussion';
import { discussionNoTopComments } from '../../fixtures/manual/discussion-no-top-comments';
import { discussionWithNoComments } from '../../fixtures/manual/discussionWithNoComments';
import { discussionWithTwoComments } from '../../fixtures/manual/discussionWithTwoComments';
import { legacyDiscussionWithoutThreading } from '../../fixtures/manual/legacyDiscussionWithoutThreading';
import { mostRead } from '../../fixtures/manual/most-read';
import { mostReadGeo } from '../../fixtures/manual/most-read-geo';
import { noTopPicks } from '../../fixtures/manual/noTopPicks';
import { related } from '../../fixtures/manual/related';
import { shortDiscussion } from '../../fixtures/manual/short-discussion';
import { topPicks } from '../../fixtures/manual/topPicks';

export const mockedMessageID = '123456';

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
		url: 'https://media.guim.co.uk/0847eccb8898d4e91499f8a68c4cfdb454f91382/101_177_3650_2191/master/3650.jpg',
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

export const mockRESTCalls = (): typeof fetchMock => {
	return (
		fetchMock
			.restore()
			// Intercept Logs
			.post(/logs\.(code.dev-)?guardianapis\.com\/log/, {
				status: 204,
			})
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
			.get(
				/\/discussion\/comments\/count.*/,
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
			.get(
				/^https:\/\/discussion.theguardian.com\/discussion-api\/getCommentCounts\?/,
				{
					status: 200,
					body: {
						'/p/d8ex5': 496,
						'/p/zemg8': 11_000,
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
			)

			// Get user discussion api (used for myAccount dropdown)
			.get(
				/discussionApiUrl\/profile\/me\?strict_sanctions_check=false/,
				{
					status: 200,
					body: {
						status: 'ok',
						userProfile: {
							userId: '123',
							displayName: 'Guardian User',
							webUrl: 'https://profile.test-theguardian.com/user/id/123',
							apiUrl: 'http://discussion.test-guardianapis.com/discussion-api/profile/123',
							avatar: 'https://avatar.test-guimcode.co.uk/user/123',
							secureAvatarUrl:
								'https://avatar.test-guimcode.co.uk/user/123',
							badge: [],
							privateFields: {
								canPostComment: true,
								isPremoderated: false,
								hasCommented: false,
							},
						},
					},
				},
				{ overwriteRoutes: false },
			)
			// Get discussion 39f5z
			.get(
				/.*\/discussion.theguardian.com\/discussion-api\/discussion\/p\/39f5z\?.*/,
				{
					status: 200,
					body: discussion,
				},
				{ overwriteRoutes: false },
			)
			.get(
				/.*\/discussion\/p\/39f5z\/topcomments.*/,
				{
					status: 200,
					body: topPicks,
				},
				{ overwriteRoutes: false },
			)

			// Get discussion 39f5x
			.get(
				/.*\/discussion.theguardian.com\/discussion-api\/discussion\/p\/39f5x\?.*/,
				{
					status: 200,
					body: discussionWithNoComments,
				},
				{ overwriteRoutes: false },
			)
			.get(
				/.*\/discussion\/p\/39f5x\/topcomments.*/,
				{
					status: 200,
					body: noTopPicks,
				},
				{ overwriteRoutes: false },
			)

			// Get discussion 39f5a
			.get(
				/.*\/discussion.theguardian.com\/discussion-api\/discussion\/p\/39f5a\?.*/,
				{
					status: 200,
					body: discussionWithTwoComments,
				},
				{ overwriteRoutes: false },
			)
			.get(
				/.*\/discussion\/p\/39f5a\/topcomments.*/,
				{
					status: 200,
					body: noTopPicks,
				},
				{ overwriteRoutes: false },
			)

			// Get discussion 32255
			.get(
				/.*\/discussion.theguardian.com\/discussion-api\/discussion\/p\/32255\?.*/,
				{
					status: 200,
					body: legacyDiscussionWithoutThreading,
				},
				{ overwriteRoutes: false },
			)
			.get(
				/.*\/discussion\/p\/32255\/topcomments.*/,
				{
					status: 200,
					body: noTopPicks,
				},
				{ overwriteRoutes: false },
			)

			// Get discussion abc123
			.get(
				/.*\/discussion.theguardian.com\/discussion-api\/discussion\/p\/abc123\?.*/,
				{
					status: 200,
					body: discussion,
				},
				{ overwriteRoutes: false },
			)
			.get(
				/.*\/discussion\/p\/abc123\/topcomments.*/,
				{
					status: 200,
					body: noTopPicks,
				},
				{ overwriteRoutes: false },
			)

			// Get more replies
			.get(
				/.*discussion.theguardian.com\/discussion-api\/comment\/.*/,
				{
					status: 200,
					body: {
						status: 'ok',
						comment,
					},
				},
				{ overwriteRoutes: false },
			)

			// Recommend
			.post(
				/.*discussion.theguardian.com\/discussion-api\/comment\/.*\/recommend/,
				{
					status: 200,
					body: {
						status: 'ok',
					},
				},
				{ overwriteRoutes: false },
			)

			// Abuse form
			.post(
				/.*discussion.theguardian.com\/discussion-api\/comment\/.*\/reportAbuse/,
				{
					status: 200,
					body: {
						status: 'ok',
					},
				},
				{ overwriteRoutes: false },
			)

			// Login redirect
			.get(
				/.*profile\.theguardian\.com\/signin\?INTCMP=DOTCOM_NEWHEADER_SIGNIN/,
				{
					status: 200,
				},
				{ overwriteRoutes: false },
			)
			.post(
				/.*profile\.theguardian\.com\/actions\/signInSecondStepCurrent/,
				{
					status: 200,
				},
			)

			//https://discussion.theguardian.com/discussion-api/discussion/p/g8g7v/comment?api-key=dotcom-rendering
			// This returns a mocked error for a story 97d6eab4a98917f63bc96a7ac64f7ca7
			.post(
				/.*discussion.theguardian.com\/discussion-api\/discussion\/p\/g8g7v\/.*/,
				{
					status: 400,
					body: {
						status: 'error',
						message: 'API: Username Missing',
						errorCode: 'USERNAME_MISSING',
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

			// Return an error response if the request body includes the
			// phrase 'example.com', otherwise, return a success response.
			// For use on stories and tests involving posts to the '/email/many'
			// or '/email'
			// api endpoint eg:
			// dotcom-rendering/src/components/ManyNewsletterSignUp.stories.tsx
			.post(
				/.*api.nextgen.guardianapps.co.uk\/email[/many]{0,1}.*/,
				(url, mockRequest) => {
					const decodedBody = decodeURIComponent(
						mockRequest.body?.toString() ?? '',
					);

					return decodedBody.includes('example.com')
						? { status: 500 }
						: { status: 200 };
				},
				{ overwriteRoutes: false },
			)

			/** @see https://github.com/wheresrhys/fetch-mock/issues/618 */
			.spy('end:.hot-update.json')
	);
};
