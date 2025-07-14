import { matchReport } from '../../fixtures/generated/match-report';
import { series } from '../../fixtures/generated/series';
import { storyPackage } from '../../fixtures/generated/story-package';
import { comment } from '../../fixtures/manual/comment';
import { contributionsHeaderResponse } from '../../fixtures/manual/contributionsHeader';
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
import { getAuxiaMock } from '../../fixtures/manual/sign-in-gate';
import { topPicks } from '../../fixtures/manual/topPicks';

const createMockResponse = (status: number, body?: any): Promise<Response> => {
	return Promise.resolve(new Response(JSON.stringify(body), { status }));
};

export const mockFetch: typeof global.fetch = (
	input: RequestInfo | URL,
	requestInit?: RequestInit,
): Promise<Response> => {
	const url = new Request(input).url;

	switch (true) {
		case /logs\.(code\.dev-)?guardianapis\.com\/log/.test(url) &&
			requestInit?.method === 'POST':
			return createMockResponse(200);
		case /.*api\.nextgen\.guardianapps\.co\.uk\/most-read-geo.*/.test(url):
			return createMockResponse(200, mostReadGeo);
		// Comment count
		case /.*api\.nextgen\.guardianapps\.co\.uk\/discussion\/comment-counts.*/.test(
			url,
		):
			return createMockResponse(200, {
				counts: [
					{
						id: '/p/4k83z',
						count: 432,
					},
				],
			});
		case /\/discussion\/comments\/count.*/.test(url):
			return createMockResponse(200, {
				counts: [
					{
						id: '/p/4k83z',
						count: 432,
					},
				],
			});
		case url.startsWith(
			'https://discussion.theguardian.com/discussion-api/getCommentCounts?',
		):
			return createMockResponse(200, {
				'/p/d8ex5': 496,
				'/p/zemg8': 11_000,
			});
		case url.startsWith(
			'https://discussion.theguardian.com/discussion-api/getCommentCounts?short-urls=/p/d8ex5',
		):
			return createMockResponse(200, {
				'/p/d8ex5': 496,
			});
		// Most read by category
		case /.*api\.nextgen\.guardianapps\.co\.uk\/most-read.*/.test(url):
			return createMockResponse(200, mostRead);
		// Related
		case /.*api\.nextgen\.guardianapps\.co\.uk\/related.*/.test(url):
			return createMockResponse(200, related);
		// Popular in tag
		case /.*api\.nextgen\.guardianapps\.co\.uk\/popular-in-tag.*/.test(url):
			return createMockResponse(200, related);
		// Series
		case /.*api\.nextgen\.guardianapps\.co\.uk\/series.*/.test(url):
			return createMockResponse(200, series);
		// Story package
		case /.*api\.nextgen\.guardianapps\.co\.uk\/story-package.*/.test(url):
			return createMockResponse(200, storyPackage);
		// Rich link
		case /.*api\.nextgen\.guardianapps\.co\.uk\/embed\/card.*/.test(url):
			return createMockResponse(200, richLinkCard);
		// Get 'short' discussion - top comments
		case /.*discussion\.theguardian\.com\/discussion-api\/discussion\/p\/4v8kk\/topcomments/.test(
			url,
		):
			return createMockResponse(200, discussionNoTopComments);
		// Get 'short' discussion
		case /.*discussion\.theguardian\.com\/discussion-api\/discussion\/p\/4v8kk/.test(
			url,
		):
			return createMockResponse(200, shortDiscussion);
		// Get country code
		case /.*api\.nextgen\.guardianapps\.co\.uk\/geolocation.*/.test(url):
			return createMockResponse(200, { country: 'GB' });
		// Match report data
		case /.*api\.nextgen\.guardianapps\.co\.uk\/football\/api.*/.test(url):
			return createMockResponse(200, matchReport);
		// Get user discussion api (used for myAccount dropdown)
		case url.includes(
			'discussionApiUrl/profile/me?strict_sanctions_check=false',
		):
			return createMockResponse(200, {
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
			});
		// Get discussion 39f5z
		case /.*\/discussion\.theguardian\.com\/discussion-api\/discussion\/p\/39f5z\?.*/.test(
			url,
		):
			return createMockResponse(200, discussion);
		case /.*\/discussion\/p\/39f5z\/topcomments.*/.test(url):
			return createMockResponse(200, topPicks);
		// Get discussion 39f5x
		case /.*\/discussion\.theguardian\.com\/discussion-api\/discussion\/p\/39f5x\?.*/.test(
			url,
		):
			return createMockResponse(200, discussionWithNoComments);
		case /.*\/discussion\/p\/39f5x\/topcomments.*/.test(url):
			return createMockResponse(200, noTopPicks);
		// Get discussion 39f5a
		case /.*\/discussion\.theguardian\.com\/discussion-api\/discussion\/p\/39f5a\?.*/.test(
			url,
		):
			return createMockResponse(200, discussionWithTwoComments);
		case /.*\/discussion\/p\/39f5a\/topcomments.*/.test(url):
			return createMockResponse(200, noTopPicks);
		// Get discussion 32255
		case /.*\/discussion\.theguardian\.com\/discussion-api\/discussion\/p\/32255\?.*/.test(
			url,
		):
			return createMockResponse(200, legacyDiscussionWithoutThreading);
		case /.*\/discussion\/p\/32255\/topcomments.*/.test(url):
			return createMockResponse(200, noTopPicks);
		// Get discussion abc123
		case /.*\/discussion\.theguardian\.com\/discussion-api\/discussion\/p\/abc123\?.*/.test(
			url,
		):
			return createMockResponse(200, discussion);
		case /.*\/discussion\/p\/abc123\/topcomments.*/.test(url):
			return createMockResponse(200, noTopPicks);
		// Get more replies
		case /.*discussion\.theguardian\.com\/discussion-api\/comment\/.*/.test(
			url,
		):
			return createMockResponse(200, {
				status: 'ok',
				comment,
			});
		// Recommend
		case /.*discussion\.theguardian\.com\/discussion-api\/comment\/.*\/recommend/.test(
			url,
		) && requestInit?.method === 'POST':
			return createMockResponse(200, {
				status: 'ok',
			});
		// Abuse form
		case /.*discussion\.theguardian\.com\/discussion-api\/comment\/.*\/reportAbuse/.test(
			url,
		) && requestInit?.method === 'POST':
			return createMockResponse(200, {
				status: 'ok',
			});
		// Login redirect
		case /.*profile\.theguardian\.com\/signin\?INTCMP=DOTCOM_NEWHEADER_SIGNIN/.test(
			url,
		):
			return createMockResponse(200);
		case /.*profile\.theguardian\.com\/actions\/signInSecondStepCurrent/.test(
			url,
		) && requestInit?.method === 'POST':
			return createMockResponse(200);
		// This returns a mocked error for a story 97d6eab4a98917f63bc96a7
		case /.*discussion\.theguardian\.com\/discussion-api\/discussion\/p\/g8g7v\/.*/.test(
			url,
		) && requestInit?.method === 'POST':
			return createMockResponse(400, {
				status: 'error',
				message: 'API: Username Missing',
				errorCode: 'USERNAME_MISSING',
			});
		// Get discussion
		case /.*discussion\.theguardian\.com\/discussion-api\/discussion\/.*/.test(
			url,
		):
			return createMockResponse(200, discussion);
		case /.*contributions\.(code\.dev-)?guardianapis\.com\/header/.test(
			url,
		) && requestInit?.method === 'POST':
			return createMockResponse(200, contributionsHeaderResponse);
		// Get contributions header
		case /.*contributions\.(code\.dev-)?guardianapis\.com\/header/.test(
			url,
		):
			return createMockResponse(200, contributionsHeaderResponse);
		// Get Ophan
		case /.*ophan\.theguardian\.com\/img\/.*/.test(url):
			return createMockResponse(200);

		// LatestLinks mock (for e.g., /live-blog/test.json?rendered=false)
		case /.*api\.nextgen\.guardianapps\.co\.uk\/.*\.json\?rendered=false/.test(
			url,
		):
			return createMockResponse(200, {
				blocks: [
					{
						id: 'block-1',
						title: '',
						publishedDateTime: Date.now(),
						lastUpdatedDateTime: Date.now(),
						body: 'This is the first mocked live update.',
					},
					{
						id: 'block-2',
						title: '',
						publishedDateTime: Date.now(),
						lastUpdatedDateTime: Date.now(),
						body: 'Another mocked update just in.',
					},
					{
						id: 'block-3',
						title: '',
						publishedDateTime: Date.now(),
						lastUpdatedDateTime: Date.now(),
						body: 'A third update to test spacing.',
					},
				],
			});
		// Return an error response if the request body includes the
		// phrase 'example.com', otherwise, return a success response.
		// For use on stories and tests involving posts to the '/email/many'
		// or '/email' api endpoint eg:
		case /.*api\.nextgen\.guardianapps\.co\.uk\/email[/many]{0,1}.*/.test(
			url,
		) && requestInit?.method === 'POST':
			const decodedBody = decodeURIComponent(
				requestInit?.body?.toString() ?? '',
			);
			const exampleDomainRegex = /\bexample\.com\b/;
			return exampleDomainRegex.test(decodedBody)
				? createMockResponse(500)
				: createMockResponse(200);
		case /.*contributions\.(code\.dev-)?guardianapis\.com\/auxia\/get-treatments/.test(
			url,
		) && requestInit?.method === 'POST':
			return createMockResponse(
				200,
				getAuxiaMock(requestInit.body?.toString() ?? ''),
			);
		case /.*contributions\.(code\.dev-)?guardianapis\.com\/auxia\/log-treatment-interaction/.test(
			url,
		) && requestInit?.method === 'POST':
			return createMockResponse(200);
		default:
			console.log(`could not find url ${requestInit?.method} ${url}`);
			return Promise.resolve(
				new Response(JSON.stringify({ error: 'Not Found' }), {
					status: 404,
				}),
			);
	}
};

export const customMockFetch =
	(
		mockedUrlsParams: Array<{
			mockedMethod: string;
			mockedUrl: string | RegExp;
			mockedStatus: number;
			mockedBody?: any;
		}>,
	) =>
	(
		input: RequestInfo | URL,
		requestInit?: RequestInit,
	): Promise<Response> => {
		const url = new Request(input).url;

		for (const {
			mockedMethod,
			mockedUrl,
			mockedStatus,
			mockedBody,
		} of mockedUrlsParams) {
			const urlMatches =
				typeof mockedUrl === 'string'
					? url === mockedUrl
					: mockedUrl.test(url);

			// Check if the current mockedUrl matches the input URL and method
			if (
				urlMatches &&
				(mockedMethod !== 'GET'
					? requestInit?.method === mockedMethod
					: true)
			) {
				return createMockResponse(mockedStatus, mockedBody);
			}
		}

		return Promise.resolve(
			new Response(JSON.stringify({ error: 'Not Found' }), {
				status: 404,
			}),
		);
	};

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
