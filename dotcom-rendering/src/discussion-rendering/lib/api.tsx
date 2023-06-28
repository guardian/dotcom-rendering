import { joinUrl } from '@guardian/libs';
import type {
	AdditionalHeadersType,
	CommentResponse,
	CommentType,
	DiscussionOptions,
	DiscussionResponse,
	OrderByType,
	ThreadsType,
	UserNameResponse,
	UserProfile,
} from '../discussionTypes';

const options = {
	// Defaults
	baseUrl: 'https://discussion.theguardian.com/discussion-api',
	apiKey: 'discussion-rendering',
	headers: {},
	idApiUrl: 'https://idapi.theguardian.com',
};

const defaultParams = {
	'api-key': options.apiKey,
};

export const initialiseApi = ({
	baseUrl,
	additionalHeaders,
	apiKey,
	idApiUrl,
}: {
	baseUrl: string;
	additionalHeaders: AdditionalHeadersType;
	apiKey: string;
	idApiUrl: string;
}) => {
	options.baseUrl = baseUrl || options.baseUrl;
	options.headers = additionalHeaders || options.headers;
	options.apiKey = apiKey || options.apiKey;
	options.idApiUrl = idApiUrl || options.idApiUrl;

	defaultParams['api-key'] = options.apiKey;
};

const objAsParams = (obj: any): string => {
	const params = Object.keys(obj)
		.map((key) => {
			return `${key}=${obj[key]}`; // type issues here cannot be avoided
		})
		.join('&');

	return '?' + params;
};

//todo: figure out the different return types and consider error handling
export const getDiscussion = (
	shortUrl: string,
	opts: {
		orderBy: OrderByType;
		pageSize: number;
		threads: ThreadsType;
		page: number;
	},
): Promise<DiscussionResponse | undefined> => {
	const apiOpts: DiscussionOptions = {
		...defaultParams,
		...{
			// Frontend uses the 'recommendations' key to store this options but the api expects
			// 'mostRecommended' so we have to map here to support both
			orderBy:
				opts.orderBy === 'recommendations'
					? 'mostRecommended'
					: opts.orderBy,
			pageSize: opts.pageSize,
			displayThreaded: opts.threads !== 'unthreaded',
			maxResponses: opts.threads === 'collapsed' ? 3 : 100,
			page: opts.page,
		},
	};
	const params = objAsParams(apiOpts);

	const url = joinUrl([options.baseUrl, 'discussion', shortUrl]) + params;

	return fetch(url, {
		headers: {
			...options.headers,
		},
	})
		.then((resp) => resp.json())
		.then((json) => {
			if (
				json.errorCode === 'DISCUSSION_ONLY_AVAILABLE_IN_LINEAR_FORMAT'
			) {
				// We need force a refetch with unthreaded set, as we don't know
				// that this discussion is only available in linear format until
				// we get the response to tell us
				return getDiscussion(shortUrl, {
					...opts,
					...{ threads: 'unthreaded' },
				});
			}
			return json;
		})
		.catch((error) => console.error(`Error fetching ${url}`, error));
};

export const preview = (body: string): Promise<string> => {
	const url =
		joinUrl([options.baseUrl, 'comment/preview']) +
		objAsParams(defaultParams);
	const data = new URLSearchParams();
	data.append('body', body);

	return fetch(url, {
		method: 'POST',
		body: data.toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
		},
	})
		.then((resp) => resp.json())
		.then((json) => json.commentBody)
		.catch((error) => console.error(`Error fetching ${url}`, error));
};

export const getProfile = (): Promise<UserProfile> => {
	const url =
		joinUrl([options.baseUrl, 'profile/me']) + objAsParams(defaultParams);

	return fetch(url, {
		credentials: 'include',
		headers: {
			...options.headers,
		},
	})
		.then((resp) => resp.json())
		.catch((error) => console.error(`Error fetching ${url}`, error));
};

export const comment = (
	shortUrl: string,
	body: string,
): Promise<CommentResponse> => {
	const url =
		joinUrl([options.baseUrl, 'discussion', shortUrl, 'comment']) +
		objAsParams(defaultParams);
	const data = new URLSearchParams();
	data.append('body', body);

	return fetch(url, {
		method: 'POST',
		body: data.toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
		},
		credentials: 'include',
	}).then((resp) => resp.json());
};

export const reply = (
	shortUrl: string,
	body: string,
	parentCommentId: number,
): Promise<CommentResponse> => {
	const url =
		joinUrl([
			options.baseUrl,
			'discussion',
			shortUrl,
			'comment',
			parentCommentId.toString(),
			'reply',
		]) + objAsParams(defaultParams);
	const data = new URLSearchParams();
	data.append('body', body);

	return fetch(url, {
		method: 'POST',
		body: data.toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
		},
		credentials: 'include',
	}).then((resp) => resp.json());
};

//todo: come back and parse the response properly and set a proper return type for the error case
export const getPicks = (
	shortUrl: string,
): Promise<CommentType[] | undefined> => {
	const url =
		joinUrl([options.baseUrl, 'discussion', shortUrl, 'topcomments']) +
		objAsParams(defaultParams);

	return fetch(url, {
		headers: {
			...options.headers,
		},
	})
		.then((resp) => resp.json())
		.then((json) => json.discussion.comments)
		.catch((error) => console.error(`Error fetching ${url}`, error));
};

export const reportAbuse = ({
	commentId,
	categoryId,
	email,
	reason,
}: {
	commentId: number;
	categoryId: number;
	reason?: string;
	email?: string;
}): Promise<CommentResponse> => {
	const url =
		joinUrl([
			options.baseUrl,
			'comment',
			commentId.toString(),
			'reportAbuse',
		]) + objAsParams(defaultParams);

	const data = new URLSearchParams();
	data.append('categoryId', categoryId.toString());
	email && data.append('email', email.toString());
	reason && data.append('reason', reason);

	return fetch(url, {
		method: 'POST',
		body: data.toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
		},
	}).then((resp) => resp.json());
};

export const recommend = (commentId: number): Promise<boolean> => {
	const url =
		joinUrl([
			options.baseUrl,
			'comment',
			commentId.toString(),
			'recommend',
		]) + objAsParams(defaultParams);

	return fetch(url, {
		method: 'POST',
		credentials: 'include',
		headers: {
			...options.headers,
		},
	}).then((resp) => resp.ok);
};

export const addUserName = (userName: string): Promise<UserNameResponse> => {
	const url = options.idApiUrl + `/user/me` + objAsParams(defaultParams);

	return fetch(url, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify({
			publicFields: {
				username: userName,
				displayName: userName,
			},
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((resp) => resp.json())
		.catch((error) => console.error(`Error fetching ${url}`, error));
};

export const pickComment = (commentId: number): Promise<CommentResponse> => {
	const url =
		joinUrl([
			options.baseUrl,
			'comment',
			commentId.toString(),
			'highlight',
		]) + objAsParams(defaultParams);

	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
		},
		credentials: 'include',
	})
		.then((resp) => resp.json())
		.catch((error) => console.error(`Error fetching ${url}`, error));
};

export const unPickComment = (commentId: number): Promise<CommentResponse> => {
	const url =
		joinUrl([
			options.baseUrl,
			'comment',
			commentId.toString(),
			'unhighlight',
		]) + objAsParams(defaultParams);

	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
		},
		credentials: 'include',
	})
		.then((resp) => resp.json())
		.catch((error) => console.error(`Error fetching ${url}`, error));
};

export const getMoreResponses = (
	commentId: number,
): Promise<{
	status: 'ok' | 'error';
	comment: CommentType;
}> => {
	const url =
		joinUrl([options.baseUrl, 'comment', commentId.toString()]) +
		objAsParams({
			...defaultParams,
			...{
				displayThreaded: true,
				displayResponses: true,
			},
		});

	return fetch(url, {
		headers: {
			...options.headers,
		},
	})
		.then((resp) => resp.json())
		.catch((error) => console.error(`Error fetching ${url}`, error));
};
