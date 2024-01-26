import { joinUrl } from '@guardian/libs';
import { safeParse } from 'valibot';
import type {
	AdditionalHeadersType,
	CommentResponse,
	CommentType,
	DiscussionOptions,
	DiscussionSuccess,
	OrderByType,
	ThreadsType,
	UserNameResponse,
} from '../types/discussion';
import { discussionApiResponseSchema } from '../types/discussion';
import type { SignedInWithCookies, SignedInWithOkta } from './identity';
import { getOptionsHeadersWithOkta } from './identity';
import type { Result } from './result';

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
	options.headers = additionalHeaders;
	options.apiKey = apiKey || options.apiKey;
	options.idApiUrl = idApiUrl || options.idApiUrl;

	defaultParams['api-key'] = options.apiKey;
};

const objAsParams = (obj: any): string => {
	const params = Object.keys(obj)
		.map((key) => {
			// TODO: Refactor this for better typesafety. See https://github.com/guardian/dotcom-rendering/pull/8057/commits/da4667399d4a7726589f1944ac60380f1f3f36e1
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions -- type issues here cannot be avoided with this implementation
			return `${key}=${obj[key]}`;
		})
		.join('&');

	return '?' + params;
};

type GetDiscussionError = 'Parsing error' | 'ApiError' | 'NetworkError';

//todo: figure out the different return types and consider error handling
export const getDiscussion = async (
	shortUrl: string,
	opts: {
		orderBy: OrderByType;
		pageSize: number;
		threads: ThreadsType;
		page: number;
	},
): Promise<Result<GetDiscussionError, DiscussionSuccess>> => {
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

	const url = joinUrl(options.baseUrl, 'discussion', shortUrl) + params;

	const json = (await fetch(url, {
		headers: {
			...options.headers,
		},
	})
		.then((r) => r.json())
		.catch(() => undefined)) as unknown;

	if (!json) return { kind: 'error', error: 'NetworkError' };

	const result = safeParse(discussionApiResponseSchema, json);
	if (!result.success) {
		return { kind: 'error', error: 'Parsing error' };
	}
	if (
		result.output.status === 'error' &&
		// We need force a refetch with unthreaded set, as we don't know
		// that this discussion is only available in linear format until
		// we get the response to tell us
		result.output.errorCode === 'DISCUSSION_ONLY_AVAILABLE_IN_LINEAR_FORMAT'
	) {
		return getDiscussion(shortUrl, {
			...opts,
			...{ threads: 'unthreaded' },
		});
	}
	if (result.output.status === 'error') {
		return {
			kind: 'error',
			error: 'ApiError',
		};
	}

	return { kind: 'ok', value: result.output };
};

export const preview = async (body: string): Promise<string> => {
	const url =
		joinUrl(options.baseUrl, 'comment/preview') +
		objAsParams(defaultParams);
	const data = new URLSearchParams();
	data.append('body', body);

	const resp = await fetch(url, {
		method: 'POST',
		body: data.toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
		},
	});
	const json = await resp.json();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- YOLO
	return json.commentBody;
};

export const comment =
	(authStatus: SignedInWithCookies | SignedInWithOkta) =>
	async (shortUrl: string, body: string): Promise<CommentResponse> => {
		const url =
			joinUrl(options.baseUrl, 'discussion', shortUrl, 'comment') +
			objAsParams(defaultParams);
		const data = new URLSearchParams();
		data.append('body', body);

		const authOptions = getOptionsHeadersWithOkta(authStatus);

		const resp = await fetch(url, {
			method: 'POST',
			body: data.toString(),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...options.headers,
				...authOptions.headers,
			},
			credentials: authOptions.credentials,
		});

		return resp.json();
	};

export const reply =
	(authStatus: SignedInWithCookies | SignedInWithOkta) =>
	async (
		shortUrl: string,
		body: string,
		parentCommentId: number,
	): Promise<CommentResponse> => {
		const url =
			joinUrl(
				options.baseUrl,
				'discussion',
				shortUrl,
				'comment',
				parentCommentId.toString(),
				'reply',
			) + objAsParams(defaultParams);
		const data = new URLSearchParams();
		data.append('body', body);
		const authOptions = getOptionsHeadersWithOkta(authStatus);

		const resp = await fetch(url, {
			method: 'POST',
			body: data.toString(),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...options.headers,
				...authOptions.headers,
			},
			credentials: authOptions.credentials,
		});

		return resp.json();
	};

//todo: come back and parse the response properly and set a proper return type for the error case
export const getPicks = async (
	shortUrl: string,
): Promise<CommentType[] | undefined> => {
	const url =
		joinUrl(options.baseUrl, 'discussion', shortUrl, 'topcomments') +
		objAsParams(defaultParams);

	const resp = await fetch(url, {
		headers: {
			...options.headers,
		},
	});

	const json = await resp.json();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- YOLO
	return json.discussion.comments;
};

export const reportAbuse = async ({
	commentId,
	categoryId,
	email,
	reason,
	authStatus,
}: {
	commentId: number;
	categoryId: number;
	reason?: string;
	email?: string;
	authStatus?: SignedInWithCookies | SignedInWithOkta;
}): Promise<CommentResponse> => {
	const url =
		joinUrl(
			options.baseUrl,
			'comment',
			commentId.toString(),
			'reportAbuse',
		) + objAsParams(defaultParams);

	const data = new URLSearchParams();
	data.append('categoryId', categoryId.toString());
	email && data.append('email', email.toString());
	reason && data.append('reason', reason);

	const authOptions = authStatus
		? getOptionsHeadersWithOkta(authStatus)
		: undefined;

	const resp = await fetch(url, {
		method: 'POST',
		body: data.toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
			...authOptions?.headers,
		},
		credentials: authOptions?.credentials,
	});

	return resp.json();
};

export const recommend =
	(authStatus: SignedInWithCookies | SignedInWithOkta) =>
	async (commentId: number): Promise<boolean> => {
		const url =
			joinUrl(
				options.baseUrl,
				'comment',
				commentId.toString(),
				'recommend',
			) + objAsParams(defaultParams);

		const authOptions = getOptionsHeadersWithOkta(authStatus);

		return fetch(url, {
			method: 'POST',
			headers: {
				...options.headers,
				...(authOptions.headers !== undefined
					? authOptions.headers
					: {}),
			},
			credentials: authOptions.credentials,
		}).then((resp) => resp.ok);
	};

export const addUserName = async (
	authStatus: SignedInWithCookies | SignedInWithOkta,
	userName: string,
): Promise<UserNameResponse> => {
	const url = options.idApiUrl + `/user/me/username`;
	const authOptions = getOptionsHeadersWithOkta(authStatus);

	const resp = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({
			publicFields: {
				username: userName,
				displayName: userName,
			},
		}),
		headers: {
			'Content-Type': 'application/json',
			...authOptions.headers,
		},
		credentials: authOptions.credentials,
	});

	return resp.json();
};

export const pickComment = async (
	authStatus: SignedInWithCookies | SignedInWithOkta,
	commentId: number,
): Promise<CommentResponse> => {
	const url =
		joinUrl(options.baseUrl, 'comment', commentId.toString(), 'highlight') +
		objAsParams(defaultParams);

	const authOptions = getOptionsHeadersWithOkta(authStatus);
	const resp = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
			...(authOptions.headers !== undefined ? authOptions.headers : {}),
		},
		credentials: authOptions.credentials,
	});

	return resp.json();
};

export const unPickComment = async (
	authStatus: SignedInWithCookies | SignedInWithOkta,
	commentId: number,
): Promise<CommentResponse> => {
	const url =
		joinUrl(
			options.baseUrl,
			'comment',
			commentId.toString(),
			'unhighlight',
		) + objAsParams(defaultParams);
	const authOptions = getOptionsHeadersWithOkta(authStatus);

	const resp = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
			...authOptions.headers,
		},
		credentials: authOptions.credentials,
	});

	return resp.json();
};

export const getMoreResponses = async (
	commentId: number,
): Promise<{
	status: 'ok' | 'error';
	comment: CommentType;
}> => {
	const url =
		joinUrl(options.baseUrl, 'comment', commentId.toString()) +
		objAsParams({
			...defaultParams,
			...{
				displayThreaded: true,
				displayResponses: true,
			},
		});

	const resp = await fetch(url, {
		headers: {
			...options.headers,
		},
	});

	return resp.json();
};
