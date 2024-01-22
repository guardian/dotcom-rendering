/**
 * Island for the web platform. Contains examples of the web-specific effects
 * that are passed to the main discussion component. These effects have
 * identical types to the apps versions, so the main discussion component
 * doesn't know or care which set of effects have been passed to it.
 */

import { css } from '@emotion/react';
import { DiscussionWithUseReducer } from './DiscussionWithUseReducer';
import { DiscussionWithUseState } from './DiscussionWithUseState';
import type { Result } from './result';

/**
 * Network request to load comments.
 */
const loadCommentsWeb = (): Promise<Result<string, string[]>> => {
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
 * Network request to post comment.
 */
const postCommentWeb = (comment: string): Promise<Result<string, string>> => {
	if (Math.random() < 0.5) {
		return Promise.resolve({ kind: 'success', value: comment });
	} else {
		return Promise.resolve({ kind: 'error', error: 'Randomly failed!' });
	}
};

const headingStyles = css`
	font-size: 3rem;
	margin-top: 1rem;
	font-weight: bold;
`;

/**
 * Both `useState` and `useReducer` examples included for demonstration.
 * In practice only one would be used, and this component becomes a wrapper
 * for injecting the web-specific effects.
 */
const DiscussionWeb = () => {
	return (
		<>
			<h2 css={headingStyles}>useState Example</h2>
			<DiscussionWithUseState
				loadComments={loadCommentsWeb}
				postComment={postCommentWeb}
			/>
			<h2 css={headingStyles}>useReducer Example</h2>
			<DiscussionWithUseReducer
				loadComments={loadCommentsWeb}
				postComment={postCommentWeb}
			/>
		</>
	);
};

export { DiscussionWeb };
