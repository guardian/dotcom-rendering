import { isOneOf } from '@guardian/libs';
import type { BaseSchema, Input, Output } from 'valibot';
import {
	array,
	boolean,
	literal,
	merge,
	minLength,
	number,
	object,
	optional,
	picklist,
	safeParse,
	string,
	transform,
	undefined_,
	union,
	variant,
} from 'valibot';
import type {
	addUserName,
	comment as onComment,
	recommend as onRecommend,
	reply as onReply,
	pickComment,
	reportAbuse,
	unPickComment,
} from './discussionApi';
import { error, ok, type Result } from './result';

export type CAPIPillar =
	| 'news'
	| 'sport'
	| 'culture'
	| 'opinion'
	| 'lifestyle'
	| 'labs';

const userProfile: BaseSchema<UserProfile> = object({
	userId: string(),
	displayName: string(),
	webUrl: string(),
	apiUrl: string(),
	avatar: string(),
	secureAvatarUrl: string(),
	badge: array(object({ name: string() })),

	// only included from /profile/me endpoint
	privateFields: optional(
		object({
			canPostComment: boolean(),
			isPremoderated: boolean(),
			hasCommented: boolean(),
		}),
	),
});

export interface UserProfile {
	userId: string;
	displayName: string;
	webUrl: string;
	apiUrl: string;
	avatar: string;
	secureAvatarUrl: string;
	badge: { name: string }[];

	// only included from /profile/me endpoint
	privateFields?: {
		canPostComment: boolean;
		isPremoderated: boolean;
		hasCommented: boolean;
	};
}

export const parseUserProfile = (
	data: unknown,
): Result<'ParsingError', UserProfile> => {
	const result = safeParse(
		object({ status: literal('ok'), userProfile }),
		data,
	);
	if (!result.success) {
		return error('ParsingError');
	}
	return ok(result.output.userProfile);
};

const baseCommentSchema = object({
	id: transform(union([number(), string()]), (id) => id.toString()),
	body: string(),
	date: string(),
	isoDateTime: string(),
	status: string(),
	webUrl: string(),
	apiUrl: string(),
	numResponses: optional(number()),
	numRecommends: number(),
	isHighlighted: boolean(),
	userProfile,
	discussion: optional(
		object({
			key: string(),
			webUrl: string(),
			apiUrl: string(),
			title: string(),
			isClosedForComments: boolean(),
			isClosedForRecommendation: boolean(),
		}),
	),
	metaData: optional(
		object({
			commentCount: number(),
			staffCommenterCount: number(),
			editorsPickCount: number(),
			blockedCount: number(),
			responseCount: number(),
		}),
	),
});

export type ReplyType = Output<typeof replySchema>;

const replySchema = merge([
	baseCommentSchema,
	object({
		responses: optional(undefined_(), undefined),
		responseTo: object({
			displayName: string(),
			commentApiUrl: string(),
			isoDateTime: string(),
			date: string(),
			commentId: string(),
			commentWebUrl: string(),
		}),
	}),
]);

export type CommentType = Output<typeof commentSchema>;

const commentSchema = merge([
	baseCommentSchema,
	object({
		responses: optional(array(replySchema), []),
		responseTo: optional(undefined_(), undefined),
	}),
]);

const commentRepliesResponseSchema = variant('status', [
	object({
		status: literal('error'),
	}),
	object({
		status: literal('ok'),
		comment: commentSchema,
	}),
]);

export const parseRepliesResponse = (
	data: unknown,
): Result<'ParsingError' | 'ApiError', ReplyType[]> => {
	const result = safeParse(commentRepliesResponseSchema, data);
	if (!result.success) {
		return error('ParsingError');
	}
	if (result.output.status === 'error') {
		return error('ApiError');
	}
	return ok(result.output.comment.responses);
};

export type CommentResponseErrorCodes = (typeof errorCodes)[number];
const errorCodes = [
	'USERNAME_MISSING',
	'EMPTY_COMMENT_BODY',
	'COMMENT_TOO_LONG',
	'USER_BANNED',
	'IP_THROTTLED',
	'DISCUSSION_CLOSED',
	'PARENT_COMMENT_MODERATED',
	'COMMENT_RATE_LIMIT_EXCEEDED',
	'INVALID_PROTOCOL',
	'AUTH_COOKIE_INVALID',
	'READ-ONLY-MODE',
	'API_CORS_BLOCKED',
	'API_ERROR',
	'EMAIL_NOT_VALIDATED',
] as const;

const commentResponseSchema = variant('status', [
	object({
		status: literal('error'),
		errorCode: picklist(errorCodes),
	}),
	object({
		status: literal('ok'),
		// response.message is the id of the comment that was created on the server
		message: string(),
	}),
]);

export const parseCommentResponse = (
	data: unknown,
): Result<'ParsingError' | CommentResponseErrorCodes, string> => {
	const { success, output } = safeParse(commentResponseSchema, data);
	if (!success) {
		return error('ParsingError');
	}

	if (output.status === 'error') {
		return error(output.errorCode);
	}

	return ok(output.message);
};

const abuseResponseSchema = variant('status', [
	object({
		status: literal('error'),
		message: string(),
	}),
	object({
		status: literal('ok'),
	}),
]);

export const parseAbuseResponse = (data: unknown): Result<string, true> => {
	const { success, output } = safeParse(abuseResponseSchema, data);
	if (!success) {
		return error('An unknown error occured');
	}
	return output.status === 'ok' ? ok(true) : error(output.message);
};

export const postUsernameResponseSchema = variant('status', [
	object({
		status: literal('error'),
		errors: array(
			object({
				message: string(),
			}),
			[minLength(1)],
		),
	}),
	object({
		status: literal('ok'),
	}),
]);

const orderBy = ['newest', 'oldest', 'recommendations'] as const;
export const isOrderBy = isOneOf(orderBy);
export type OrderByType = (typeof orderBy)[number];

const threads = ['collapsed', 'expanded', 'unthreaded'] as const;
export const isThreads = isOneOf(threads);
export type ThreadsType = (typeof threads)[number];

const pageSize = [25, 50, 100] as const;
export const isPageSize = isOneOf(pageSize);
export type PageSizeType = (typeof pageSize)[number];
export interface FilterOptions {
	orderBy: OrderByType;
	pageSize: PageSizeType;
	threads: ThreadsType;
}

type UserFields = {
	profile: UserProfile;
	onComment: ReturnType<typeof onComment>;
	onReply: ReturnType<typeof onReply>;
	onRecommend: ReturnType<typeof onRecommend>;
	addUsername: ReturnType<typeof addUserName>;
	reportAbuse: ReturnType<typeof reportAbuse>;
};

export type Reader = UserFields & {
	kind: 'Reader';
};

export type Staff = UserFields & {
	kind: 'Staff';
	onPick: ReturnType<typeof pickComment>;
	onUnpick: ReturnType<typeof unPickComment>;
};

export type SignedInUser = Reader | Staff;

const discussionApiErrorSchema = object({
	status: literal('error'),
	statusCode: number(),
	message: string(),
	errorCode: optional(string()),
});

export type GetDiscussionSuccess = Output<typeof discussionApiSuccessSchema>;

const discussionApiSuccessSchema = object({
	status: literal('ok'),
	currentPage: number(),
	pages: number(),
	pageSize: number(),
	orderBy: string(),
	discussion: object({
		key: string(),
		webUrl: string(),
		apiUrl: string(),
		commentCount: number(),
		topLevelCommentCount: optional(number(), 0),
		isClosedForComments: boolean(),
		isClosedForRecommendation: boolean(),
		isThreaded: boolean(),
		title: string(),
		comments: array(union([replySchema, commentSchema])),
	}),
});

export const discussionApiResponseSchema = variant('status', [
	discussionApiErrorSchema,
	discussionApiSuccessSchema,
]);

export type GetDiscussionResponse = Input<typeof discussionApiResponseSchema>;

export interface DiscussionOptions {
	orderBy: string;
	pageSize: number;
	displayThreaded: boolean;
	maxResponses: number;
	page: number;
	'api-key': string;
}

export type AdditionalHeadersType = { [key: string]: string };

export type DropdownOptionType = {
	value: string;
	title: string;
	disabled?: boolean;
	isActive?: boolean;
};

export const pickResponseSchema = object({
	status: literal('ok'),
	statusCode: literal(200),
	message: string(),
});

const recommendResponseSchema = object({
	status: literal('ok'),
	statusCode: literal(200),
});

export const parseRecommendResponse = (
	data: unknown,
): Result<'ParsingError', true> => {
	const { success } = safeParse(recommendResponseSchema, data);
	return success ? ok(true) : error('ParsingError');
};

export type CommentFormProps = {
	userNameMissing: boolean;
	error: string;
	previewBody: string;
};

export const getCommentContextResponseSchema = object({
	status: literal('ok'),
	commentId: number(),
	commentAncestorId: number(),
	discussionKey: string(),
	discussionWebUrl: string(),
	discussionApiUrl: string(),
	orderBy: picklist(orderBy),
	pageSize: picklist(pageSize),
	page: number(),
});

/** for development purposes only! */
export const stubUser = {
	kind: 'Reader',
	addUsername: () => Promise.resolve(error('This is a stub user')),
	onComment: () =>
		Promise.resolve(
			ok(
				String(
					Number.MAX_SAFE_INTEGER - Math.ceil(Math.random() * 12_000),
				),
			),
		),
	onRecommend: () => Promise.resolve(true),
	onReply: () => Promise.resolve(error('API_ERROR')),
	reportAbuse: () => Promise.resolve(error('Invalid')),
	profile: {
		userId: 'stub-user-000',
		displayName: 'Stub User',
		webUrl: '',
		apiUrl: '',
		avatar: '',
		secureAvatarUrl: '',
		badge: [],
		privateFields: {
			canPostComment: true,
			isPremoderated: false,
			hasCommented: true,
		},
	},
} satisfies Reader;
