import type { BaseSchema } from 'valibot';
import {
	array,
	boolean,
	integer,
	literal,
	number,
	object,
	optional,
	picklist,
	recursive,
	safeParse,
	string,
	transform,
	unknown,
	variant,
} from 'valibot';
import type { Guard } from '../lib/guard';
import { guard } from '../lib/guard';
import type { SignedInWithCookies, SignedInWithOkta } from '../lib/identity';
import type { Result } from '../lib/result';

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

const comment: BaseSchema<CommentType> = object({
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
	responseTo: optional(
		object({
			displayName: string(),
			commentApiUrl: string(),
			isoDateTime: string(),
			date: string(),
			commentId: string(),
			commentWebUrl: string(),
		}),
	),
	responses: optional(array(recursive(() => comment))),
	metaData: optional(
		object({
			commentCount: number(),
			staffCommenterCount: number(),
			editorsPickCount: number(),
			blockedCount: number(),
			responseCount: number(),
		}),
	),
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
});

export interface CommentType {
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
		commentId: string;
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
	discussion?: {
		key: string;
		webUrl: string;
		apiUrl: string;
		title: string;
		isClosedForComments: boolean;
		isClosedForRecommendation: boolean;
	};
}

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
	'EMAIL_VERIFIED',
	'EMAIL_VERIFIED_FAIL',
	'EMAIL_NOT_VALIDATED',
] as const;

const commentErrorSchema = object({
	status: literal('error'),
	errorCode: picklist(errorCodes),
	message: string(),
});

const commentResponseSchema = variant('status', [
	commentErrorSchema,
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
): Result<
	{ code: CommentResponseErrorCodes | 'ParsingError'; message: string },
	number
> => {
	const { success, issues, output } = safeParse(commentResponseSchema, data);
	if (!success) {
		console.log(issues, output);
		return {
			kind: 'error',
			error: { code: 'ParsingError', message: 'An error occured' },
		};
	}

	return output.status === 'error'
		? {
				kind: 'error',
				error: { code: output.errorCode, message: output.message },
		  }
		: { kind: 'ok', value: output.message };
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
		return { kind: 'error', error: 'An unknown error occured' };
	}
	return output.status === 'ok'
		? { kind: 'ok', value: true }
		: { kind: 'error', error: output.message };
};

type UserNameError = {
	message: string;
	description: string;
	context: string;
};

type UserConsents = {
	id: string;
	actor: string;
	version: number;
	consented: boolean;
	timestamp: string;
	privacyPolicyVersion: number;
};

type UserGroups = {
	path: string;
	packageCode: string;
};

type UserNameUser = {
	dates: { accountCreatedDate: string };
	consents: UserConsents[];
	userGroups: UserGroups[];
	publicFields: {
		username: string;
		displayName: string;
	};
	statusFields: {
		userEmailValidated: boolean;
	};
	privateFields: {
		legacyPackages: string;
		legacyProducts: string;
		// Optional fields. See scala @ https://github.com/guardian/identity/blob/07142212b1571d5f8e0a60585c6511abb3620f8c/identity-model-play/src/main/scala/com/gu/identity/model/play/PrivateFields.scala#L5-L18
		brazeUuid?: string;
		puzzleUuid?: string;
		googleTagId?: string;
		firstName?: string;
		secondName?: string;
		registrationIp?: string;
		lastActiveIpAddress?: string;
		registrationType?: string;
		registrationPlatform?: string;
		telephoneNumber?: string;
		title?: string;
	};
	primaryEmailAddress: string;
	id: string;
	hasPassword: boolean;
};

export type UserNameResponse = {
	status: 'ok' | 'error';
	user: UserNameUser;
	errors?: UserNameError[];
};

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

export type SignedInUser = {
	profile: UserProfile;
	authStatus: SignedInWithCookies | SignedInWithOkta;
};

const discussionApiErrorSchema = object({
	status: literal('error'),
	statusCode: number(),
	message: string(),
	errorCode: optional(string()),
});

export type GetDiscussionSuccess = {
	status: 'ok';
	currentPage: number;
	pages: number;
	pageSize: number;
	orderBy: string;
	discussion: DiscussionData;
	switches?: unknown;
};

type DiscussionData = {
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
		topLevelCommentCount: number(),
		isClosedForComments: boolean(),
		isClosedForRecommendation: boolean(),
		isThreaded: boolean(),
		title: string(),
		comments: array(comment),
	}),
	switches: unknown(),
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
