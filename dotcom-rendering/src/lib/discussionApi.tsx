import { isObject, isString, joinUrl } from '@guardian/libs';
import { safeParse } from 'valibot';
import type {
	AdditionalHeadersType,
	CommentType,
	DiscussionOptions,
	GetDiscussionSuccess,
	OrderByType,
	ThreadsType,
} from '../types/discussion';
import {
	discussionApiResponseSchema,
	parseAbuseResponse,
	parseCommentRepliesResponse,
	parseCommentResponse,
	pickResponseSchema,
	postUsernameResponseSchema,
} from '../types/discussion';
import type { SignedInWithCookies, SignedInWithOkta } from './identity';
import { getOptionsHeadersWithOkta } from './identity';
import { fetchJSON } from './json';
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

type GetDiscussionError = 'ParsingError' | 'ApiError' | 'NetworkError';

//todo: figure out the different return types and consider error handling
export const getDiscussion = async (
	shortUrl: string,
	opts: {
		orderBy: OrderByType;
		pageSize: number;
		threads: ThreadsType;
		page: number;
	},
): Promise<Result<GetDiscussionError, GetDiscussionSuccess>> => {
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

	const jsonResult = await fetchJSON(url, { headers: options.headers });

	if (jsonResult.kind === 'error') return jsonResult;

	const result = safeParse(discussionApiResponseSchema, jsonResult.value);
	if (!result.success) {
		return { kind: 'error', error: 'ParsingError' };
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

export const preview = async (
	body: string,
): Promise<Result<GetDiscussionError, string>> => {
	const url =
		joinUrl(options.baseUrl, 'comment/preview') +
		objAsParams(defaultParams);
	const data = new URLSearchParams();
	data.append('body', body);

	const jsonResult = await fetchJSON(url, {
		method: 'POST',
		body: data.toString(),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...options.headers,
		},
	});

	if (jsonResult.kind === 'error') return jsonResult;

	return isObject(jsonResult.value) && isString(jsonResult.value.commentBody)
		? { kind: 'ok', value: jsonResult.value.commentBody }
		: {
				kind: 'error',
				error: 'ParsingError',
		  };
};

type CommentResponse = Result<
	| 'NetworkError'
	| 'ApiError'
	| (ReturnType<typeof parseCommentResponse> & { kind: 'error' })['error'],
	number
>;

export const comment =
	(authStatus: SignedInWithCookies | SignedInWithOkta) =>
	async (shortUrl: string, body: string): Promise<CommentResponse> => {
		const url =
			joinUrl(options.baseUrl, 'discussion', shortUrl, 'comment') +
			objAsParams(defaultParams);
		const data = new URLSearchParams();
		data.append('body', body);

		const authOptions = getOptionsHeadersWithOkta(authStatus);

		const jsonResult = await fetchJSON(url, {
			method: 'POST',
			body: data.toString(),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...options.headers,
				...authOptions.headers,
			},
			credentials: authOptions.credentials,
		});

		if (jsonResult.kind === 'error') return jsonResult;

		return parseCommentResponse(jsonResult.value);
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

		const jsonResult = await fetchJSON(url, {
			method: 'POST',
			body: data.toString(),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...options.headers,
				...authOptions.headers,
			},
			credentials: authOptions.credentials,
		});

		if (jsonResult.kind === 'error') return jsonResult;

		return parseCommentResponse(jsonResult.value);
	};

export const getPicks = async (
	shortUrl: string,
): Promise<Result<GetDiscussionError, CommentType[]>> => {
	const url =
		joinUrl(options.baseUrl, 'discussion', shortUrl, 'topcomments') +
		objAsParams(defaultParams);

	const jsonResult = await fetchJSON(url, {
		headers: {
			...options.headers,
		},
	});

	if (jsonResult.kind === 'error') return jsonResult;

	const result = safeParse(discussionApiResponseSchema, jsonResult.value);

	if (!result.success) {
		return { kind: 'error', error: 'ParsingError' };
	}
	if (result.output.status === 'error') {
		return { kind: 'error', error: 'ApiError' };
	}

	return { kind: 'ok', value: result.output.discussion.comments };
};

export const reportAbuse =
	(authStatus?: SignedInWithCookies | SignedInWithOkta) =>
	async ({
		commentId,
		categoryId,
		email,
		reason,
	}: {
		commentId: number;
		categoryId: number;
		reason?: string;
		email?: string;
	}): Promise<Result<string, true>> => {
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

		const jsonResult = await fetchJSON(url, {
			method: 'POST',
			body: data.toString(),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...options.headers,
				...authOptions?.headers,
			},
			credentials: authOptions?.credentials,
		});

		if (jsonResult.kind === 'error') {
			return {
				kind: 'error',
				error: 'An unknown error occured',
			};
		}

		return parseAbuseResponse(jsonResult.value);
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

export const addUserName =
	(authStatus: SignedInWithCookies | SignedInWithOkta) =>
	async (userName: string): Promise<Result<string, true>> => {
		const url = options.idApiUrl + `/user/me/username`;
		const authOptions = getOptionsHeadersWithOkta(authStatus);

		const jsonResult = await fetchJSON(url, {
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

		if (jsonResult.kind === 'error') {
			return jsonResult;
		}

		const result = safeParse(postUsernameResponseSchema, jsonResult.value);

		if (!result.success) {
			return { kind: 'error', error: 'An unknown error occured' };
		}
		if (result.output.status === 'error') {
			return {
				kind: 'error',
				error: result.output.errors
					.map(({ message }) => message)
					.join('\n'),
			};
		}

		return { kind: 'ok', value: true };
	};

export const pickComment =
	(authStatus: SignedInWithCookies | SignedInWithOkta) =>
	async (commentId: number): Promise<Result<GetDiscussionError, true>> => {
		const url =
			joinUrl(
				options.baseUrl,
				'comment',
				commentId.toString(),
				'highlight',
			) + objAsParams(defaultParams);

		const authOptions = getOptionsHeadersWithOkta(authStatus);
		const jsonResult = await fetchJSON(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...options.headers,
				...authOptions.headers,
			},
			credentials: authOptions.credentials,
		});

		if (jsonResult.kind === 'error') return jsonResult;

		const result = safeParse(pickResponseSchema, jsonResult.value);

		if (!result.success) return { kind: 'error', error: 'ParsingError' };

		return { kind: 'ok', value: true };
	};

export const unPickComment =
	(authStatus: SignedInWithCookies | SignedInWithOkta) =>
	async (commentId: number): Promise<Result<GetDiscussionError, false>> => {
		const url =
			joinUrl(
				options.baseUrl,
				'comment',
				commentId.toString(),
				'unhighlight',
			) + objAsParams(defaultParams);

		const authOptions = getOptionsHeadersWithOkta(authStatus);
		const jsonResult = await fetchJSON(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				...options.headers,
				...authOptions.headers,
			},
			credentials: authOptions.credentials,
		});

		if (jsonResult.kind === 'error') return jsonResult;

		const result = safeParse(pickResponseSchema, jsonResult.value);

		if (!result.success) return { kind: 'error', error: 'ParsingError' };

		return { kind: 'ok', value: false };
	};

export const getMoreResponses = async (
	commentId: number,
): Promise<Result<GetDiscussionError, CommentType[]>> => {
	const url =
		joinUrl(options.baseUrl, 'comment', commentId.toString()) +
		objAsParams({
			...defaultParams,
			...{
				displayThreaded: true,
				displayResponses: true,
			},
		});

	const jsonResult = await fetchJSON(url, {
		headers: {
			...options.headers,
		},
	});

	if (jsonResult.kind === 'error') return jsonResult;

	return parseCommentRepliesResponse(jsonResult.value);
};
