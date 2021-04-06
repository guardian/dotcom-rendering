import { joinUrl } from '@root/src/lib/joinUrl';

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

export const getDiscussion = async (
	ajaxUrl: string,
	shortUrl: string,
): Promise<DiscussionResponse> => {
	const url = joinUrl([ajaxUrl, 'discussion', shortUrl]);
	return fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw Error(
					response.statusText ||
						`getDiscussion | An api call returned HTTP status ${response.status}`,
				);
			}
			return response;
		})
		.then((response) => response.json())
		.then((json) => json)
		.catch((error) => {
			window.guardian.modules.sentry.reportError(error, 'get-discussion');
		});
};
