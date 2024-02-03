import type { CommentType, UserProfile } from '../lib/discussion';
import { replaceMatchingCommentResponses } from './Discussion';

describe('Discussion', () => {
	describe('Action: expandCommentReplies', () => {
		it('Will not do anything if no comment matches', () => {
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
				responses?: CommentType[],
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

			const replacer = replaceMatchingCommentResponses({
				type: 'expandCommentReplies',
				commentId: 999_999,
				responses: [
					createComment(123_001, '<p>A first reply</p>'),
					createComment(123_002, '<p>A second reply</p>'),
					createComment(123_003, '<p>A third reply</p>'),
					createComment(123_004, '<p>A fourth reply</p>'),
					createComment(123_005, '<p>A fifth reply</p>'),
					createComment(123_006, '<p>A sixth reply</p>'),
				],
			});

			const comments = [
				createComment(123_000, 'Something'),
				createComment(234_000, 'Or other'),
				createComment(456_000, 'Is to be said'),
			];

			expect(comments.map(replacer)).toEqual(comments);
		});

		it('Will update responses to a matching top-level comment', () => {
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
				responses?: CommentType[],
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

			const replacer = replaceMatchingCommentResponses({
				type: 'expandCommentReplies',
				commentId: 123_000,
				responses: [
					createComment(123_100, '<p>A first reply</p>'),
					createComment(123_200, '<p>A second reply</p>'),
					createComment(123_300, '<p>A third reply</p>'),
					createComment(123_400, '<p>A fourth reply</p>'),
					createComment(123_500, '<p>A fifth reply</p>'),
					createComment(123_600, '<p>A sixth reply</p>'),
				],
			});

			const comments = [
				createComment(123_000, 'Something'),
				createComment(234_000, 'Or other'),
				createComment(456_000, 'Is to be said'),
			];

			expect(comments.map(replacer)).toEqual([
				createComment(123_000, 'Something', [
					createComment(123_100, '<p>A first reply</p>'),
					createComment(123_200, '<p>A second reply</p>'),
					createComment(123_300, '<p>A third reply</p>'),
					createComment(123_400, '<p>A fourth reply</p>'),
					createComment(123_500, '<p>A fifth reply</p>'),
					createComment(123_600, '<p>A sixth reply</p>'),
				]),
				createComment(234_000, 'Or other'),
				createComment(456_000, 'Is to be said'),
			]);
		});

		it('Will update responses to a matching nested comment', () => {
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
				responses?: CommentType[],
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

			const replacer = replaceMatchingCommentResponses({
				type: 'expandCommentReplies',
				commentId: 234_200,
				responses: [
					createComment(234_210, 'Even if I tried'),
					createComment(234_220, 'Even if I wanted to'),
					createComment(234_230, 'Dig deep'),
					createComment(234_240, 'And deeper'),
				],
			});

			const comments = [
				createComment(123_000, 'Something', [
					createComment(123_100, 'But not anything'),
				]),
				createComment(234_000, 'Or other', [
					createComment(234_100, 'Well said'),
					createComment(
						234_200,
						'Could not have said better myself',
						[
							createComment(234_210, 'Even if I tried'),
							createComment(234_220, 'Even if I wanted to'),
						],
					),
					createComment(234_300, 'Word to live by'),
				]),
				createComment(456_000, 'Is to be said'),
			];

			expect(comments.map(replacer)).toEqual([
				createComment(123_000, 'Something', [
					createComment(123_100, 'But not anything'),
				]),
				createComment(234_000, 'Or other', [
					createComment(234_100, 'Well said'),
					createComment(
						234_200,
						'Could not have said better myself',
						[
							createComment(234_210, 'Even if I tried'),
							createComment(234_220, 'Even if I wanted to'),
							createComment(234_230, 'Dig deep'),
							createComment(234_240, 'And deeper'),
						],
					),
					createComment(234_300, 'Word to live by'),
				]),
				createComment(456_000, 'Is to be said'),
			]);
		});
	});
});
