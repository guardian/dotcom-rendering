import { useEffect, useState } from 'react';
import { getdiscussionClient } from '../lib/bridgetApi';
import type { Reader, UserProfile } from '../lib/discussion';
import type { CommentResponse } from '../lib/discussionApi';
import { reportAbuse as reportAbuseWeb } from '../lib/discussionApi';
import { ok, error, type Result } from '../lib/result';
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

/***
 *  Currently we are using the web handler for both authenticated and unauthenticated users.
 *  Once we have knowlege of if the user is authenticated from bridget, we can implement an apps-specific function below, to allow us to send user data to analytics.
 */
// const reportAbuse = async (): Promise<Result<string, true>> => {
// 	console.log('reportAbuse');
// 	return { kind: 'error', error: 'ApiError' };
// };

const mockedProfile: UserProfile = {
	userId: 'userId',
	displayName: 'displayName',
	webUrl: 'webUrl',
	apiUrl: 'apiUrl',
	avatar: 'avatar',
	secureAvatarUrl: 'secureAvatarUrl',
	badge: [],
};

const getUser = async (): Promise<Reader> => {
	return {
		kind: 'Reader',
		onComment,
		onReply,
		onRecommend,
		addUsername,
		reportAbuse: reportAbuseWeb(undefined),
		profile: mockedProfile,
	};
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
