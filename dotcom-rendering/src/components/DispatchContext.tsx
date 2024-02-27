import { debug } from '@guardian/libs';
import { createContext, useContext } from 'react';
import type { Dispatch } from 'react';
import type { CommentType, FilterOptions, ReplyType } from '../lib/discussion';

export type Action =
	| {
			type: 'commentsLoaded';
			comments: Array<CommentType | ReplyType>;
			isClosedForComments: boolean;
			commentCount: number;
			topLevelCommentCount: number;
	  }
	| { type: 'expandComments' }
	| {
			type: 'expandCommentReplies';
			commentId: number;
			responses: ReplyType[];
	  }
	| { type: 'addComment'; comment: CommentType }
	| { type: 'addReply'; comment: ReplyType }
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
	| { type: 'setBottomFormPreviewBody'; previewBody: string }
	| { type: 'storeShortUrlId'; shortUrlId: string }
	| { type: 'commentsLoadedFailed' };

const DispatchContext = createContext<Dispatch<Action>>(() => {
	debug(
		'dotcom',
		`The 'dispatch' function in discussion is not defined! Did you remember to include a context provider for it?`,
	);
});

export const DispatchProvider = ({
	value,
	children,
}: {
	value: Dispatch<Action>;
	children: React.ReactNode;
}) => (
	<DispatchContext.Provider value={value}>
		{children}
	</DispatchContext.Provider>
);

export const useDispatch = (): Dispatch<Action> => {
	const context = useContext(DispatchContext);
	return context;
};
