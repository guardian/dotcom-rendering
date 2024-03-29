import { useEffect, useState } from 'react';
import { getdiscussionClient } from '../lib/bridgetApi';
import type { Reader, UserProfile } from '../lib/discussion';
import type { CommentResponse } from '../lib/discussionApi';
import { reportAbuse as reportAbuseWeb } from '../lib/discussionApi';
import type { Result } from '../lib/result';
import { Discussion, type Props as DiscussionProps } from './Discussion';

type Props = Omit<DiscussionProps, 'user' | 'reportAbuseUnauthenticated'>;

const onComment = async (): Promise<CommentResponse> => {
	console.log('onComment');
	return { kind: 'error', error: 'ApiError' };
};

const onReply = async (): Promise<CommentResponse> => {
	console.log('onReply');
	return { kind: 'error', error: 'ApiError' };
};

const onRecommend = async (commentId: number): Promise<boolean> => {
	return getdiscussionClient().recommend(commentId);
};
const addUsername = async (): Promise<Result<string, true>> => {
	console.log('addUsername');
	return { kind: 'error', error: 'ApiError' };
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
