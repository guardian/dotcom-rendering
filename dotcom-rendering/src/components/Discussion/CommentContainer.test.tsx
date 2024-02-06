import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { comment } from '../../../fixtures/manual/comment';
import { mockedMessageID, mockRESTCalls } from '../../lib/mockRESTCalls';
import type { Result } from '../../lib/result';
import type { CommentType, SignedInUser } from '../../types/discussion';
import { CommentContainer } from './CommentContainer';

mockRESTCalls();

const firstCommentResponse = comment.responses[0];

const commentWithReply = {
	...comment,
	responses: [firstCommentResponse],
} satisfies CommentType;

const commentWithoutReply = {
	...comment,
	responses: [],
} satisfies CommentType;

const commentResponseError = {
	kind: 'error',
	error: 'NetworkError',
} as const satisfies Result<unknown, unknown>;

const commentResponseSuccess = {
	kind: 'ok',
	value: 123456,
} as const satisfies Result<unknown, unknown>;

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
	addUsername: () => Promise.resolve({ kind: 'ok', value: true }),
	reportAbuse: () => Promise.resolve({ kind: 'ok', value: true }),
};

describe('CommentContainer', () => {
	it('Post a comment to a root comment', async () => {
		const newCommentText = 'A brand new comment';

		// a workaround to emulating hooks outside of render
		let commentBeingRepliedTo: CommentType | undefined =
			commentWithoutReply;
		const mockSetCommentBeingRepliedTo = jest.fn(
			(newCommentBeingRepliedTo?: CommentType) => {
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
				mutes={[]}
				toggleMuteStatus={() => {}}
				onPermalinkClick={() => {}}
				showPreview={false}
				setShowPreview={() => {}}
				isCommentFormActive={true}
				setIsCommentFormActive={() => {}}
				error={''}
				setError={() => {}}
				pickError={''}
				setPickError={() => {}}
				userNameMissing={false}
				setUserNameMissing={() => {}}
				previewBody=""
				setPreviewBody={() => {}}
				body={newCommentText}
				setBody={() => {}}
				reportAbuse={() => Promise.resolve({ kind: 'ok', value: true })}
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

		// make sure the new comment appeats
		await waitFor(() => {
			expect(getByTestId(mockedMessageID)).toBeInTheDocument();
		});

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
				mutes={[]}
				toggleMuteStatus={() => {}}
				onPermalinkClick={() => {}}
				showPreview={false}
				setShowPreview={() => {}}
				isCommentFormActive={true}
				setIsCommentFormActive={() => {}}
				error={''}
				setError={() => {}}
				pickError={''}
				setPickError={() => {}}
				userNameMissing={false}
				setUserNameMissing={() => {}}
				previewBody=""
				setPreviewBody={() => {}}
				body={''}
				setBody={() => {}}
				reportAbuse={() => Promise.resolve({ kind: 'ok', value: true })}
			/>,
		);

		// make sure the comment form submit button does not appear anymore
		// note: we need to use queryByText or else we get an error
		const commentFormSubmitButton = queryByText('Post your comment');
		expect(commentFormSubmitButton).toBeNull();
	});

	it('Post a comment to a reply comment', async () => {
		const newCommentText = 'A brand new comment';

		// a workaround to emulating hooks outside of render
		let commentBeingRepliedTo: CommentType | undefined =
			firstCommentResponse;
		const mockSetCommentBeingRepliedTo = jest.fn(
			(newCommentBeingRepliedTo?: CommentType) => {
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
				mutes={[]}
				toggleMuteStatus={() => {}}
				onPermalinkClick={() => {}}
				showPreview={false}
				setShowPreview={() => {}}
				isCommentFormActive={true}
				setIsCommentFormActive={() => {}}
				error={''}
				setError={() => {}}
				pickError={''}
				setPickError={() => {}}
				userNameMissing={false}
				setUserNameMissing={() => {}}
				previewBody=""
				setPreviewBody={() => {}}
				body={newCommentText}
				setBody={() => {}}
				reportAbuse={() => Promise.resolve({ kind: 'ok', value: true })}
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

		// make sure the new comment appears
		await waitFor(() => {
			expect(getByTestId(mockedMessageID)).toBeInTheDocument();
		});

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
				mutes={[]}
				toggleMuteStatus={() => {}}
				onPermalinkClick={() => {}}
				showPreview={false}
				setShowPreview={() => {}}
				isCommentFormActive={true}
				setIsCommentFormActive={() => {}}
				error={''}
				setError={() => {}}
				pickError={''}
				setPickError={() => {}}
				userNameMissing={false}
				setUserNameMissing={() => {}}
				previewBody=""
				setPreviewBody={() => {}}
				body={''}
				setBody={() => {}}
				reportAbuse={() => Promise.resolve({ kind: 'ok', value: true })}
			/>,
		);

		// make sure the comment form submit button does not appear anymore
		// note: we need to use queryByText or else we get an error
		const commentFormSubmitButton = queryByText('Post your comment');
		expect(commentFormSubmitButton).toBeNull();
	});
});
