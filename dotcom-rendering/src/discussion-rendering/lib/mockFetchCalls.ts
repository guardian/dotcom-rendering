import fetchMock from 'fetch-mock';
import { comment } from '../fixtures/comment';
import { discussion } from '../fixtures/discussion';
import { discussionWithNoComments } from '../fixtures/discussionWithNoComments';
import { discussionWithTwoComments } from '../fixtures/discussionWithTwoComments';
import { legacyDiscussionWithoutThreading } from '../fixtures/legacyDiscussionWithoutThreading';
import { noTopPicks } from '../fixtures/noTopPicks';
import { topPicks } from '../fixtures/topPicks';

export const mockedMessageID = '123456';

export const mockFetchCalls = () => {
	fetchMock
		.restore()
		// Comment count
		.get(/.*api.nextgen.guardianapps.co.uk\/discussion\/comment-counts.*/, {
			status: 200,
			body: {
				counts: [
					{
						id: '/p/ddp96',
						count: 432,
					},
				],
			},
		})
		.get(/\/discussion\/comments\/count.*/, {
			status: 200,
			body: {
				counts: [
					{
						id: '/p/ddp96',
						count: 432,
					},
				],
			},
		})
		// Get discussion 39f5z
		.get(
			/.*\/discussion.theguardian.com\/discussion-api\/discussion\/p\/39f5z\?.*/,
			{
				status: 200,
				body: discussion,
			},
		)
		.get(/.*\/discussion\/p\/39f5z\/topcomments.*/, {
			status: 200,
			body: topPicks,
		})

		// Get discussion 39f5x
		.get(
			/.*\/discussion.theguardian.com\/discussion-api\/discussion\/p\/39f5x\?.*/,
			{
				status: 200,
				body: discussionWithNoComments,
			},
		)
		.get(/.*\/discussion\/p\/39f5x\/topcomments.*/, {
			status: 200,
			body: noTopPicks,
		})

		// Get discussion 39f5a
		.get(
			/.*\/discussion.theguardian.com\/discussion-api\/discussion\/p\/39f5a\?.*/,
			{
				status: 200,
				body: discussionWithTwoComments,
			},
		)
		.get(/.*\/discussion\/p\/39f5a\/topcomments.*/, {
			status: 200,
			body: noTopPicks,
		})

		// Get discussion 32255
		.get(
			/.*\/discussion.theguardian.com\/discussion-api\/discussion\/p\/32255\?.*/,
			{
				status: 200,
				body: legacyDiscussionWithoutThreading,
			},
		)
		.get(/.*\/discussion\/p\/32255\/topcomments.*/, {
			status: 200,
			body: noTopPicks,
		})

		// Get discussion abc123
		.get(
			/.*\/discussion.theguardian.com\/discussion-api\/discussion\/p\/abc123\?.*/,
			{
				status: 200,
				body: discussion,
			},
		)
		.get(/.*\/discussion\/p\/abc123\/topcomments.*/, {
			status: 200,
			body: noTopPicks,
		})

		// Get more replies
		.get(/.*discussion.theguardian.com\/discussion-api\/comment\/.*/, {
			status: 200,
			body: {
				status: 'ok',
				comment,
			},
		})

		// Recommend
		.post(
			/.*discussion.theguardian.com\/discussion-api\/comment\/.*\/recommend/,
			{
				status: 200,
				body: {
					status: 'ok',
				},
			},
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
		)

		// Login redirect
		.get(
			/.*profile\.theguardian\.com\/signin\?INTCMP=DOTCOM_NEWHEADER_SIGNIN/,
			{
				status: 200,
			},
		)
		.post(/.*profile\.theguardian\.com\/actions\/signInSecondStepCurrent/, {
			status: 200,
		})

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
		)

		// Post comment
		.post(/.*discussion.theguardian.com\/discussion-api\/discussion\/.*/, {
			status: 200,
			body: {
				status: 'ok',
				message: mockedMessageID,
			},
		});

	return fetchMock;
};
