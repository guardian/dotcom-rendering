import { parse } from 'valibot';
import type { CommentType, ReplyType, UserProfile } from '../lib/discussion';
import { discussionApiResponseSchema } from '../lib/discussion';
import { replaceMatchingCommentResponses } from './Discussion';

const userProfile = {
	userId: '12345678',
	displayName: 'Some reply person',
	webUrl: 'https://profile.theguardian.com/user/id/12345678',
	apiUrl: 'https://discussion.guardianapis.com/discussion-api/profile/12345678',
	avatar: 'https://avatar.guim.co.uk/user/12345678',
	secureAvatarUrl: 'https://avatar.guim.co.uk/user/12345678',
	badge: [],
} satisfies UserProfile;

const createComment = (
	id: number,
	body: string,
	responses: ReplyType[],
): CommentType => ({
	id,
	body,
	userProfile,
	responses,
	apiUrl: '',
	webUrl: '',
	date: 'something',
	isHighlighted: false,
	isoDateTime: '2024-01-01T00:00:01Z',
	numRecommends: 0,
	status: 'visible',
});

const createReply = (id: number, body: string): ReplyType => ({
	id,
	body,
	userProfile,
	apiUrl: '',
	webUrl: '',
	date: 'something',
	isHighlighted: false,
	isoDateTime: '2024-01-01T00:00:01Z',
	numRecommends: 0,
	status: 'visible',
	responseTo: {
		date: '',
		isoDateTime: '',
		displayName: '',
		commentApiUrl: '',
		commentId: '',
		commentWebUrl: '',
	},
});

describe('Discussion', () => {
	describe('Action: expandCommentReplies', () => {
		it('Will not do anything if no comment matches', () => {
			const replacer = replaceMatchingCommentResponses({
				type: 'expandCommentReplies',
				commentId: 999_999,
				responses: [
					createReply(123_001, '<p>A first reply</p>'),
					createReply(123_002, '<p>A second reply</p>'),
					createReply(123_003, '<p>A third reply</p>'),
					createReply(123_004, '<p>A fourth reply</p>'),
					createReply(123_005, '<p>A fifth reply</p>'),
					createReply(123_006, '<p>A sixth reply</p>'),
				],
			});

			const comments = [
				createComment(123_000, 'Something', []),
				createComment(234_000, 'Or other', []),
				createComment(456_000, 'Is to be said', []),
			];

			expect(comments.map(replacer)).toEqual(comments);
		});

		it('Will update responses to a matching top-level comment', () => {
			const replacer = replaceMatchingCommentResponses({
				type: 'expandCommentReplies',
				commentId: 123_000,
				responses: [
					createReply(123_100, '<p>A first reply</p>'),
					createReply(123_200, '<p>A second reply</p>'),
					createReply(123_300, '<p>A third reply</p>'),
					createReply(123_400, '<p>A fourth reply</p>'),
					createReply(123_500, '<p>A fifth reply</p>'),
					createReply(123_600, '<p>A sixth reply</p>'),
				],
			});

			const comments = [
				createComment(123_000, 'Something', []),
				createComment(234_000, 'Or other', []),
				createComment(456_000, 'Is to be said', []),
			];

			expect(comments.map(replacer)).toEqual([
				createComment(123_000, 'Something', [
					createReply(123_100, '<p>A first reply</p>'),
					createReply(123_200, '<p>A second reply</p>'),
					createReply(123_300, '<p>A third reply</p>'),
					createReply(123_400, '<p>A fourth reply</p>'),
					createReply(123_500, '<p>A fifth reply</p>'),
					createReply(123_600, '<p>A sixth reply</p>'),
				]),
				createComment(234_000, 'Or other', []),
				createComment(456_000, 'Is to be said', []),
			]);
		});
	});

	describe('Parsing comments and replies', () => {
		it('can find 4 comments at the top level', () => {
			const result = parse(discussionApiResponseSchema, {
				status: 'ok',
				currentPage: 1,
				pages: 1,
				pageSize: 4,
				orderBy: 'recommendations',
				discussion: {
					key: 'test',
					webUrl: '',
					apiUrl: '',
					commentCount: 4,
					topLevelCommentCount: 4,
					isClosedForComments: true,
					isClosedForRecommendation: true,
					isThreaded: false,
					title: '',
					comments: [
						createComment(10, 'first', []),
						createComment(20, 'second', [
							createReply(21, 'second reply'),
						]),
						createComment(30, 'third', []),
						createComment(40, 'fourth', []),
					],
				},
			});

			expect(result.status).toBe('ok');
			if (result.status !== 'ok') return;

			expect(result.discussion.comments.length).toBe(4);
		});

		it('can find 2 comments and 2 replies at the top level', () => {
			const result = parse(discussionApiResponseSchema, {
				status: 'ok',
				currentPage: 1,
				pages: 1,
				pageSize: 4,
				orderBy: 'recommendations',
				discussion: {
					key: 'test',
					webUrl: '',
					apiUrl: '',
					commentCount: 4,
					topLevelCommentCount: 4,
					isClosedForComments: true,
					isClosedForRecommendation: true,
					isThreaded: false,
					title: '',
					comments: [
						createComment(10, 'first', []),
						createComment(20, 'second', []),
						createReply(11, 'first reply'),
						createReply(21, 'second reply'),
						createReply(22, 'second reply again'),
					],
				},
			});

			expect(result.status).toBe('ok');
			if (result.status !== 'ok') return;

			const comments = result.discussion.comments.filter(
				({ responses }) => responses,
			);
			const replies = result.discussion.comments.filter(
				({ responseTo }) => responseTo,
			);
			expect(comments.length).toBe(2);
			expect(replies.length).toBe(3);
		});
	});
});
