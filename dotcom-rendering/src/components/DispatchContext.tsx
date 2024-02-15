import { debug } from '@guardian/libs';
import type { Dispatch } from 'react';
import type { CommentType, FilterOptions } from '../lib/discussion';

export const DispatchContext = React.createContext<Dispatch<Action>>(() => {
	debug(
		'dotcom',
		`The 'dispatch' function in discussion is not defined! Did you remember to include a context provider for it?`,
	);
});

export type Action =
	| {
			type: 'commentsLoaded';
			comments: CommentType[];
			isClosedForComments: boolean;
			commentCount: number;
			topLevelCommentCount: number;
	  }
	| { type: 'expandComments' }
	| {
			type: 'expandCommentReplies';
			commentId: number;
			responses: CommentType[];
	  }
	| { type: 'addComment'; comment: CommentType }
	| { type: 'updateCommentPage'; commentPage: number }
	| { type: 'updateHashCommentId'; hashCommentId: number | undefined }
	| { type: 'filterChange'; filters: FilterOptions; commentPage?: number }
	| { type: 'setLoading'; loading: boolean }
	| { type: 'setPickError'; error: string }
	| { type: 'setTopFormUserMissing'; userNameMissing: boolean }
	| { type: 'setReplyFormUserMissing'; userNameMissing: boolean }
	| { type: 'setBottomFormUserMissing'; userNameMissing: boolean }
	| { type: 'setTopFormError'; error: string }
	| { type: 'setReplyFormError'; error: string }
	| { type: 'setBottomFormError'; error: string }
	| { type: 'setTopFormPreviewBody'; previewBody: string }
	| { type: 'setReplyFormPreviewBody'; previewBody: string }
	| { type: 'setBottomFormPreviewBody'; previewBody: string };
