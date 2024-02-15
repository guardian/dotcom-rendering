import { createContext, useContext } from 'react';
import type { Dispatch } from 'react';
import type { CommentType, FilterOptions } from '../lib/discussion';

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

const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

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

	if (context === undefined) {
		throw Error(
			'useDispatch must be used within the DispatchContext provider',
		);
	}

	return context;
};
