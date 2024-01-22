/**
 * Island for the apps platform. Contains examples of the apps-specific effects
 * that are passed to the main discussion component. These effects have
 * identical types to the web versions, so the main discussion component
 * doesn't know or care which set of effects have been passed to it.
 */

import { DiscussionWithUseReducer } from './DiscussionWithUseReducer';
import { DiscussionWithUseState } from './DiscussionWithUseState';
import type { Result } from './result';

/**
 * Bridget or network request to load comments.
 */
const loadCommentsApps = (): Promise<Result<string, string[]>> => {
	if (Math.random() < 0.5) {
		return Promise.resolve({
			kind: 'success',
			value: ['Comment about an article'],
		});
	} else {
		return Promise.resolve({ kind: 'error', error: 'Randomly failed!' });
	}
};

/**
 * Bridget request to post comment.
 */
const postCommentApps = (comment: string): Promise<Result<string, string>> => {
	if (Math.random() < 0.5) {
		return Promise.resolve({ kind: 'success', value: comment });
	} else {
		return Promise.resolve({ kind: 'error', error: 'Randomly failed!' });
	}
};

/**
 * Both `useState` and `useReducer` examples included for demonstration.
 * In practice only one would be used, and this component becomes a wrapper
 * for injecting the apps-specific effects.
 */
const DiscussionApps = () => {
	return (
		<>
			<DiscussionWithUseState
				loadComments={loadCommentsApps}
				postComment={postCommentApps}
			/>
			<DiscussionWithUseReducer
				loadComments={loadCommentsApps}
				postComment={postCommentApps}
			/>
		</>
	);
};

export { DiscussionApps };
