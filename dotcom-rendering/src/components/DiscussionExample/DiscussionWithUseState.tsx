import { useEffect, useState } from 'react';
import { Comments } from './Comments';
import type { Result } from './result';

type Props = {
	loadComments: () => Promise<Result<string, string[]>>;
	postComment: (comment: string) => Promise<Result<string, string>>;
};

/**
 * Represents the main discussion component that handles state and effects for
 * discussion. In practice this would probably just be called `Discussion.tsx`.
 */
const DiscussionWithUseState = ({ loadComments, postComment }: Props) => {
	const [comments, setComments] = useState<string[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const [commentEntryText, setCommentEntryText] = useState<string>('');

	const postCommentHandleResult = (): void => {
		if (commentEntryText.trim() === '') {
			setErrorMessage('Please enter a comment to post!');
		} else {
			postComment(commentEntryText)
				.then((result) => {
					if (result.kind === 'success') {
						setErrorMessage(undefined);
						setComments([...comments, result.value]);
					} else {
						setErrorMessage(`Failed to post! ${result.error}`);
					}
				})
				.catch(() =>
					setErrorMessage('Failed to post! Unknown problem'),
				);
		}
	};

	const handleCommentEntry = (text: string) => {
		setErrorMessage(undefined);
		setCommentEntryText(text);
	};

	useEffect(() => {
		loadComments()
			.then((result) => {
				if (result.kind === 'success') {
					setErrorMessage(undefined);
					setComments(result.value);
				} else {
					setErrorMessage(`Could not load comments! ${result.error}`);
				}
			})
			.catch(() =>
				setErrorMessage('Could not load comments! Unknown problem'),
			);
	}, [loadComments]);

	return (
		<Comments
			comments={comments}
			postComment={postCommentHandleResult}
			errorMessage={errorMessage}
			commentEntryText={commentEntryText}
			commentEntryChange={handleCommentEntry}
		/>
	);
};

export { DiscussionWithUseState };
