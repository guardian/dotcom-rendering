import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { comment } from '../../../fixtures/manual/comment';
import type {
	CommentType,
	ReplyType,
	SignedInUser,
} from '../../lib/discussion';
import { jestMockFetch } from '../../lib/mockRESTCallsInJest';
import { error, ok } from '../../lib/result';
import { CommentContainer } from './CommentContainer';

const mockedCommentID = '123456';

const firstCommentResponse = comment.responses[0];

const commentWithReply = {
	...comment,
	responses: [firstCommentResponse],
};

const commentWithoutReply = {
	...comment,
	responses: [],
} satisfies CommentType;

const commentResponseError = error<'NetworkError', string>('NetworkError');

const commentResponseSuccess = ok<'NetworkError', string>(mockedCommentID);

const aUser: SignedInUser = {
	kind: 'Reader',
	profile: {
		userId: 'abc123',
		displayName: 'Jane Smith',
		webUrl: '',
		apiUrl: '',
		avatar: '',
		secureAvatarUrl: '',
		badge: [],
		privateFields: {
			canPostComment: true,
			isPremoderated: false,
			hasCommented: true,
		},
	},
	onComment: () => Promise.resolve(commentResponseError),
	onReply: () => Promise.resolve(commentResponseSuccess),
	onRecommend: () => Promise.resolve(true),
	addUsername: () => Promise.resolve(ok(true)),
	reportAbuse: () => Promise.resolve(ok(true)),
};

describe('CommentContainer', () => {
	beforeEach(() => {
		jestMockFetch();
	});

	it('Post a comment to a root comment', async () => {
		const newCommentText = 'A brand new comment';

		// a workaround to emulating hooks outside of render
		let commentBeingRepliedTo: CommentType | ReplyType | undefined =
			commentWithoutReply;
		const mockSetCommentBeingRepliedTo = jest.fn(
			(newCommentBeingRepliedTo?: CommentType | ReplyType) => {
				commentBeingRepliedTo = newCommentBeingRepliedTo;
			},
		);

		// https://stackoverflow.com/a/52335414
		Element.prototype.scrollIntoView = () => {};

		const { getByTestId, queryByText, getByText, rerender } = render(
			<CommentContainer
				shortUrl=""
				comment={commentWithoutReply}
				user={aUser}
				threads="collapsed"
				commentBeingRepliedTo={commentBeingRepliedTo}
				setCommentBeingRepliedTo={mockSetCommentBeingRepliedTo}
				isClosedForComments={false}
				isClosedForRecommendations={false}
				mutes={[]}
				toggleMuteStatus={() => {}}
				onPermalinkClick={() => {}}
				error={''}
				setError={() => {}}
				userNameMissing={false}
				setUserNameMissing={() => {}}
				previewBody=""
				setPreviewBody={() => {}}
				reportAbuse={() => Promise.resolve(ok(true))}
				expandCommentReplies={(id, responses) => {
					if (commentBeingRepliedTo?.id !== id) return;
					if (!commentBeingRepliedTo.responses) return;
					commentBeingRepliedTo.responses = responses;
				}}
				isExpanded={true}
			/>,
		);

		// expect Comment Form to be present
		expect(getByText('Post your comment')).toBeInTheDocument();

		// add comment to textarea
		fireEvent.change(getByTestId('comment-input'), {
			target: { value: newCommentText },
		});

		// Submit form
		fireEvent.click(getByText('Post your comment'));

		// make sure mock function has been called
		await waitFor(() =>
			expect(mockSetCommentBeingRepliedTo).toHaveBeenCalledTimes(1),
		);

		// rerender with updated commentBeingRepliedTo
		rerender(
			<CommentContainer
				shortUrl=""
				comment={commentWithoutReply}
				user={aUser}
				threads="collapsed"
				commentBeingRepliedTo={commentBeingRepliedTo}
				setCommentBeingRepliedTo={mockSetCommentBeingRepliedTo}
				isClosedForComments={false}
				isClosedForRecommendations={false}
				mutes={[]}
				toggleMuteStatus={() => {}}
				onPermalinkClick={() => {}}
				error={''}
				setError={() => {}}
				userNameMissing={false}
				setUserNameMissing={() => {}}
				previewBody=""
				setPreviewBody={() => {}}
				reportAbuse={() => Promise.resolve(ok(true))}
				expandCommentReplies={() => {}}
				isExpanded={true}
			/>,
		);

		// make sure the new comment appears
		await waitFor(() => {
			expect(getByTestId(mockedCommentID)).toBeInTheDocument();
		});

		// make sure the comment form submit button does not appear anymore
		// note: we need to use queryByText or else we get an error
		const commentFormSubmitButton = queryByText('Post your comment');
		expect(commentFormSubmitButton).toBeNull();
	});

	it('Post a comment to a reply comment', async () => {
		const newCommentText = 'A brand new comment';

		// a workaround to emulating hooks outside of render
		let commentBeingRepliedTo: CommentType | ReplyType | undefined =
			firstCommentResponse;
		const mockSetCommentBeingRepliedTo = jest.fn(
			(newCommentBeingRepliedTo?: CommentType | ReplyType) => {
				commentBeingRepliedTo = newCommentBeingRepliedTo;
			},
		);

		// https://stackoverflow.com/a/52335414
		Element.prototype.scrollIntoView = () => {};

		const { getByTestId, queryByText, getByText, rerender } = render(
			<CommentContainer
				shortUrl=""
				comment={commentWithReply}
				user={aUser}
				threads="collapsed"
				commentBeingRepliedTo={commentBeingRepliedTo}
				setCommentBeingRepliedTo={mockSetCommentBeingRepliedTo}
				isClosedForComments={false}
				isClosedForRecommendations={false}
				mutes={[]}
				toggleMuteStatus={() => {}}
				onPermalinkClick={() => {}}
				error={''}
				setError={() => {}}
				userNameMissing={false}
				setUserNameMissing={() => {}}
				previewBody=""
				setPreviewBody={() => {}}
				reportAbuse={() => Promise.resolve(ok(true))}
				expandCommentReplies={(id, responses) => {
					if (commentBeingRepliedTo?.id !== id) return;
					if (!commentBeingRepliedTo.responses) return;
					commentBeingRepliedTo.responses = responses;
				}}
				isExpanded={true}
			/>,
		);

		// expect Comment Form to be present
		expect(getByText('Post your comment')).toBeInTheDocument();

		// add comment to textarea
		fireEvent.change(getByTestId('comment-input'), {
			target: { value: newCommentText },
		});

		// Submit form
		fireEvent.click(getByText('Post your comment'));

		// make sure mock function has been called
		await waitFor(() =>
			expect(mockSetCommentBeingRepliedTo).toHaveBeenCalledTimes(1),
		);

		// rerender with updated commentBeingRepliedTo
		rerender(
			<CommentContainer
				shortUrl=""
				comment={commentWithoutReply}
				user={aUser}
				threads="collapsed"
				commentBeingRepliedTo={commentBeingRepliedTo}
				setCommentBeingRepliedTo={mockSetCommentBeingRepliedTo}
				isClosedForComments={false}
				isClosedForRecommendations={false}
				mutes={[]}
				toggleMuteStatus={() => {}}
				onPermalinkClick={() => {}}
				error={''}
				setError={() => {}}
				userNameMissing={false}
				setUserNameMissing={() => {}}
				previewBody=""
				setPreviewBody={() => {}}
				reportAbuse={() => Promise.resolve(ok(true))}
				expandCommentReplies={() => {}}
				isExpanded={true}
			/>,
		);

		// make sure the new comment appears
		await waitFor(() => {
			expect(getByTestId(mockedCommentID)).toBeInTheDocument();
		});

		// make sure the comment form submit button does not appear anymore
		// note: we need to use queryByText or else we get an error
		const commentFormSubmitButton = queryByText('Post your comment');
		expect(commentFormSubmitButton).toBeNull();
	});
});
