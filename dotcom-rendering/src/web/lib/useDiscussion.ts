import { useApi } from './useApi';

type DiscussionResponse = {
	status: string;
	page: number;
	pages: number;
	pageSize: number;
	orderBy: string;
	discussion: {
		key: string;
		webUrl: string;
		apiUrl: string;
		commentCount: number;
		topLevelCommentCount: number;
		isClosedForComments: boolean;
		isClosedForRecommendation: boolean;
		isThreaded: boolean;
		title: string;
		comments: CommentType[];
	};
};

type CommentType = {
	id: number;
	body: string;
	date: string;
	isoDateTime: string;
	status: string;
	webUrl: string;
	apiUrl: string;
	numResponses?: number;
	numRecommends: number;
	isHighlighted: boolean;
	userProfile: UserProfile;
	responseTo?: {
		displayName: string;
		commentApiUrl: string;
		isoDateTime: string;
		date: string;
		commentId: number;
		commentWebUrl: string;
	};
	responses?: CommentType[];
	metaData?: {
		commentCount: number;
		staffCommenterCount: number;
		editorsPickCount: number;
		blockedCount: number;
		responseCount: number;
	};
};

export const useDiscussion = (url: string) => {
	const { data } = useApi<DiscussionResponse>(url, {
		// The default for dedupingInterval is 2 seconds but we want to wait longer here because the cache time
		// for a discussion is at least 15 seconds
		dedupingInterval: 8000,
	});

	return {
		commentCount: data?.discussion?.commentCount,
		isClosedForComments: data?.discussion?.isClosedForComments,
	};
};
