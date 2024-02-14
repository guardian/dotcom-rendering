import type { CommentType, ResponseType, UserProfile } from '../lib/discussion';
import { replaceMatchingCommentResponses } from './Discussion';

describe('Discussion', () => {
	describe('Action: expandCommentReplies', () => {
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
			responses: ResponseType[],
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

		const createResponse = (id: number, body: string): ResponseType => ({
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

		it('Will not do anything if no comment matches', () => {
			const replacer = replaceMatchingCommentResponses({
				type: 'expandCommentReplies',
				commentId: 999_999,
				responses: [
					createResponse(123_001, '<p>A first reply</p>'),
					createResponse(123_002, '<p>A second reply</p>'),
					createResponse(123_003, '<p>A third reply</p>'),
					createResponse(123_004, '<p>A fourth reply</p>'),
					createResponse(123_005, '<p>A fifth reply</p>'),
					createResponse(123_006, '<p>A sixth reply</p>'),
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
					createResponse(123_100, '<p>A first reply</p>'),
					createResponse(123_200, '<p>A second reply</p>'),
					createResponse(123_300, '<p>A third reply</p>'),
					createResponse(123_400, '<p>A fourth reply</p>'),
					createResponse(123_500, '<p>A fifth reply</p>'),
					createResponse(123_600, '<p>A sixth reply</p>'),
				],
			});

			const comments = [
				createComment(123_000, 'Something', []),
				createComment(234_000, 'Or other', []),
				createComment(456_000, 'Is to be said', []),
			];

			expect(comments.map(replacer)).toEqual([
				createComment(123_000, 'Something', [
					createResponse(123_100, '<p>A first reply</p>'),
					createResponse(123_200, '<p>A second reply</p>'),
					createResponse(123_300, '<p>A third reply</p>'),
					createResponse(123_400, '<p>A fourth reply</p>'),
					createResponse(123_500, '<p>A fifth reply</p>'),
					createResponse(123_600, '<p>A sixth reply</p>'),
				]),
				createComment(234_000, 'Or other', []),
				createComment(456_000, 'Is to be said', []),
			]);
		});
	});
});
