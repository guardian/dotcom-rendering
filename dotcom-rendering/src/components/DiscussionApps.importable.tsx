import { useEffect, useState } from 'react';
import { getdiscussionClient } from '../lib/bridgetApi';
import type { Reader, UserProfile } from '../lib/discussion';
import type { CommentResponse } from '../lib/discussionApi';
import { reportAbuse as reportAbuseWeb } from '../lib/discussionApi';
import { error, ok, type Result } from '../lib/result';
import { Discussion, type Props as DiscussionProps } from './Discussion';

type Props = Omit<DiscussionProps, 'user' | 'reportAbuseUnauthenticated'>;

const onComment = async (
	shortUrl: string,
	body: string,
): Promise<CommentResponse> => {
	return getdiscussionClient()
		.comment(shortUrl, body)
		.then((response) => {
			if (response.__type == 'error') {
				return {
					kind: 'error',
					error: 'NativeError',
				};
			} else {
				if (response.response.errorCode) {
					return {
						kind: 'error',
						error: 'ApiError',
					};
				}

				return ok(Number(response.response.message));
			}
		});
};

const onReply = async (
	shortUrl: string,
	body: string,
	parentCommentId: string,
): Promise<CommentResponse> => {
	return getdiscussionClient()
		.reply(shortUrl, body, parentCommentId)
		.then((response) => {
			if (response.__type == 'error') {
				return {
					kind: 'error',
					error: 'NativeError',
				};
			} else {
				if (response.response.errorCode) {
					return {
						kind: 'error',
						error: 'ApiError',
					};
				}

				return ok(Number(response.response.message));
			}
		});
};

const onRecommend = async (commentId: string): Promise<boolean> => {
	return getdiscussionClient()
		.recommend(commentId)
		.then((response) => {
			if (response.__type === 'error') {
				return false;
			} else {
				if (response.response.statusCode === 200) return true;
				return false;
			}
		});
};
const addUsername = async (username: string): Promise<Result<string, true>> => {
	return getdiscussionClient()
		.addUsername(username)
		.then((response) => {
			if (response.__type === 'error') {
				return error('NativeError');
			} else {
				if (response.response.errorCode) {
					return error('ApiError');
				}
				return ok(true);
			}
		});
};

const reportAbuse = async ({
	commentId,
	categoryId,
	reason,
	email,
}: {
	commentId: string;
	categoryId: string;
	reason?: string;
	email?: string;
}): Promise<Result<string, true>> => {
	return getdiscussionClient()
		.reportAbuse({ commentId, categoryId, reason, email })
		.then((response) => {
			if (response.__type == 'error') {
				return error('NativeError');
			} else {
				if (response.response.errorCode) {
					return error('ApiError');
				}

				return ok(true);
			}
		});
};

const getUser = async (): Promise<Reader> => {
	return getdiscussionClient()
		.getUserProfile()
		.then((response) => {
			// TODO: I don't think we're handling a discussion API
			// error for this request in the Bridget API

			if (response.__type === 'profile') {
				const profile = response.profile;
				const userProfile = {
					userId: profile.userId,
					displayName: profile.displayName,
					webUrl: profile.webUrl,
					apiUrl: profile.apiUrl,
					avatar: profile.avatar,
					secureAvatarUrl: profile.secureAvatarUrl,
					badge: [],
				} as UserProfile;

				return {
					kind: 'Reader',
					onComment,
					onReply,
					onRecommend,
					addUsername,
					reportAbuse,
					profile: userProfile,
				};
			} else {
				// TODO: Handle the error properly
				throw error('NativeError');
			}
		});
};

export const DiscussionApps = (props: Props) => {
	const [user, setUser] = useState<Reader>();

	useEffect(() => {
		void getUser().then(setUser);
	}, [setUser]);

	return (
		<Discussion
			user={user}
			{...props}
			reportAbuseUnauthenticated={reportAbuseWeb(undefined)}
		/>
	);
};
