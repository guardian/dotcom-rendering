import type { BaseSchema, Output } from 'valibot';
import {
	array,
	boolean,
	integer,
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
import type { Guard } from './guard';
import { guard } from './guard';
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

const baseCommentSchema = object({
	id: number(),
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

export type ResponseType = Output<typeof responseSchema>;

const responseSchema = merge([
	baseCommentSchema,
	object({
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
		responses: optional(array(responseSchema), []),
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

export const parseCommentRepliesResponse = (
	data: unknown,
): Result<'ParsingError' | 'ApiError', ResponseType[]> => {
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

const postCommentResponseSchema = variant('status', [
	object({
		status: literal('error'),
		errorCode: picklist(errorCodes),
	}),
	object({
		status: literal('ok'),
		message: transform(
			string(),
			// response.errorCode is the id of the comment that was created on the server
			// it is returned as a string, so we need to cast to an number to be compatible
			(input) => Number(input),
			number([integer()]),
		),
	}),
]);

export const parseCommentResponse = (
	data: unknown,
): Result<'ParsingError' | CommentResponseErrorCodes, number> => {
	const { success, output } = safeParse(postCommentResponseSchema, data);
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
export const isOrderBy = guard(orderBy);
export type OrderByType = Guard<typeof orderBy>;

const threads = ['collapsed', 'expanded', 'unthreaded'] as const;
export const isThreads = guard(threads);
export type ThreadsType = Guard<typeof threads>;

const pageSize = [25, 50, 100] as const;
export const isPageSize = guard(pageSize);
export type PageSizeType = Guard<typeof pageSize>;
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
		comments: array(union([commentSchema, responseSchema])),
	}),
});

export const discussionApiResponseSchema = variant('status', [
	discussionApiErrorSchema,
	discussionApiSuccessSchema,
]);

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
			ok(Number.MAX_SAFE_INTEGER - Math.ceil(Math.random() * 12_000)),
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
