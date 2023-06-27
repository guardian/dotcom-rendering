import {
	CommentType,
	DiscussionResponse,
	FilterOptions,
	OrderByType,
	ThreadsType,
	UserProfile,
} from '../discussionTypes';

interface OrderBy {
	type: 'SET_ORDER_BY';
	orderBy: OrderByType;
}

interface PageSize {
	type: 'SET_PAGE_SIZE';
	pageSize: number;
}

interface Threads {
	type: 'SET_THREADS';
	threads: ThreadsType;
}

interface Discussion {
	type: 'SET_DISCUSSION';
	discussion: DiscussionResponse;
}

interface PostComment {
	type: 'POST_COMMENT';
	body: string;
}

interface Body {
	type: 'SET_BODY';
	body: string;
}

interface Preview {
	type: 'SET_PREVIEW';
	body: string;
}

interface ShowPreview {
	type: 'SET_SHOW_PREVIEW';
	showPreview: boolean;
}

interface StaffPicks {
	type: 'SET_STAFF_PICKS';
	staffPicks: CommentType[];
}

interface Profile {
	type: 'SET_PROFILE';
	profile: UserProfile;
}

type Action =
	| OrderBy
	| PageSize
	| Threads
	| Discussion
	| PostComment
	| Body
	| Preview
	| ShowPreview
	| StaffPicks
	| Profile;

interface State {
	shortUrl: string;
	filters: FilterOptions;
	discussion?: DiscussionResponse;
	staffPicks?: CommentType[];
	body?: string;
	previewBody?: string;
	showPreview?: boolean;
	profile?: UserProfile;
}

export const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'SET_ORDER_BY':
			return {
				...state,
				filters: { ...state.filters, orderBy: action.orderBy },
			};
		case 'SET_PAGE_SIZE':
			return {
				...state,
				filters: { ...state.filters, pageSize: action.pageSize },
			};
		case 'SET_THREADS':
			return {
				...state,
				filters: { ...state.filters, threads: action.threads },
			};
		case 'SET_DISCUSSION':
			return {
				...state,
				discussion: action.discussion,
			};
		case 'SET_BODY':
			return {
				...state,
				body: action.body,
			};
		case 'SET_PREVIEW':
			return {
				...state,
				previewBody: action.body,
				showPreview: true,
			};
		case 'SET_SHOW_PREVIEW':
			return {
				...state,
				showPreview: action.showPreview,
			};
		case 'POST_COMMENT':
			return state; // eventually we should display the new comment or a success message
		case 'SET_STAFF_PICKS':
			return {
				...state,
				staffPicks: action.staffPicks,
			};
		case 'SET_PROFILE':
			return {
				...state,
				profile: action.profile,
			};
	}
};
