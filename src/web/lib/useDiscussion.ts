import { useApi } from '@root/src/web/lib/api';

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
	const { data, loading, error } = useApi<DiscussionResponse>(url);

	if (loading || error)
		return {
			commentCount: undefined,
			isClosedForComments: true,
		};

	return {
		commentCount: data?.discussion?.commentCount,
		isClosedForComments: data?.discussion?.isClosedForComments,
	};
};
