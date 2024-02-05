import type {
	AdditionalHeadersType,
	CommentType,
	DiscussionOptions,
	GetDiscussionSuccess,
	OrderByType,
	ThreadsType,
} from '../types/discussion';
import { Result } from './result';

type GetDiscussionError = 'ParsingError' | 'ApiError' | 'NetworkError';

// We'll need a getUser bridget method
// export const getUser = ()
export const getComments = async (
	shortUrl: string,
	opts: {
		orderBy: OrderByType;
		pageSize: number;
		threads: ThreadsType;
		page: number;
	},
): Promise<Result<GetDiscussionError, GetDiscussionSuccess>> => {
	return { kind: 'error', error: 'ApiError' };
};

export const preview = async (
	body: string,
): Promise<Result<GetDiscussionError, string>> => {
	return {
		kind: 'error',
		error: 'ApiError',
	};
};

type CommentResponse = Result<
	| 'NetworkError'
	| 'ApiError'
	| (ReturnType<typeof parseCommentResponse> & { kind: 'error' })['error'],
	number
>;

export const comment = async (
	shortUrl: string,
	body: string,
): Promise<CommentResponse> => {
	// bridget
	return { kind: 'error', error: 'ApiError' };
};

export const reply = async (
	shortUrl: string,
	body: string,
	parentCommentId: number,
): Promise<CommentResponse> => {
	// bridget
	return { kind: 'error', error: 'ApiError' };
};

export const getPicks = async (
	shortUrl: string,
): Promise<Result<GetDiscussionError, CommentType[]>> => {
	return { kind: 'error', error: 'ApiError' };
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
}): Promise<Result<string, true>> => {
	// maybe bridget
	return { kind: 'error', error: 'ApiError' };
};

export const recommend = async (commentId: number): Promise<boolean> => {
	// bridget
	return Promise.resolve(false);
};

export const addUserName = async (
	userName: string,
): Promise<Result<string, true>> => {
	// bridget
	return { kind: 'error', error: 'ApiError' };
};

export const getMoreResponses = async (
	commentId: number,
): Promise<Result<GetDiscussionError, CommentType[]>> => {
	return { kind: 'error', error: 'ApiError' };
};
