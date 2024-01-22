import { useEffect, useReducer } from 'react';
import { Comments } from './Comments';
import type { Result } from './result';

type State = {
	comments: string[];
	errorMessage: string | undefined;
	commentEntryText: string;
};

const initialState: State = {
	comments: [],
	errorMessage: undefined,
	commentEntryText: '',
};

type Action =
	| {
			kind: 'commentsLoaded';
			comments: string[];
	  }
	| {
			kind: 'postedComment';
			comment: string;
	  }
	| {
			kind: 'postFailed';
			error: string;
	  }
	| {
			kind: 'loadFailed';
			error: string;
	  }
	| {
			kind: 'commentEntry';
			text: string;
	  };

const reducer = (state: State, action: Action): State => {
	switch (action.kind) {
		case 'commentsLoaded':
			return {
				...state,
				comments: action.comments,
				errorMessage: undefined,
			};
		case 'postedComment':
			return {
				...state,
				comments: [...state.comments, action.comment],
				errorMessage: undefined,
			};
		case 'postFailed':
			return {
				...state,
				errorMessage: `Failed to post! ${action.error}`,
			};
		case 'loadFailed':
			return {
				...state,
				errorMessage: `Could not load comments! ${action.error}`,
			};
		case 'commentEntry':
			return {
				...state,
				commentEntryText: action.text,
				errorMessage: undefined,
			};
	}
};

type Props = {
	loadComments: () => Promise<Result<string, string[]>>;
	postComment: (comment: string) => Promise<Result<string, string>>;
};

/**
 * Represents the main discussion component that handles state and effects for
 * discussion. In practice this would probably just be called `Discussion.tsx`.
 */
const DiscussionWithUseReducer = ({ loadComments, postComment }: Props) => {
	const [{ comments, errorMessage, commentEntryText }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	const postCommentHandleResult = (): void => {
		if (commentEntryText.trim() === '') {
			dispatch({
				kind: 'postFailed',
				error: 'Please enter a comment to post!',
			});
		} else {
			postComment(commentEntryText)
				.then((result) => {
					if (result.kind === 'success') {
						dispatch({
							kind: 'postedComment',
							comment: result.value,
						});
					} else {
						dispatch({ kind: 'postFailed', error: result.error });
					}
				})
				.catch(() =>
					dispatch({ kind: 'postFailed', error: 'Unknown problem' }),
				);
		}
	};

	useEffect(() => {
		loadComments()
			.then((result) => {
				if (result.kind === 'success') {
					dispatch({
						kind: 'commentsLoaded',
						comments: result.value,
					});
				} else {
					dispatch({ kind: 'loadFailed', error: result.error });
				}
			})
			.catch(() =>
				dispatch({ kind: 'loadFailed', error: 'Unknown problem' }),
			);
	}, [loadComments]);

	return (
		<Comments
			comments={comments}
			postComment={postCommentHandleResult}
			errorMessage={errorMessage}
			commentEntryText={commentEntryText}
			commentEntryChange={(text: string) =>
				dispatch({ kind: 'commentEntry', text })
			}
		/>
	);
};

export { DiscussionWithUseReducer };
