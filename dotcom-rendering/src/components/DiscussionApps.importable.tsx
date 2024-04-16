import {
	DiscussionResponseType,
	GetUserProfileResponseType,
} from '@guardian/bridget';
import { useEffect, useState } from 'react';
import { getDiscussionClient } from '../lib/bridgetApi';
import {
	parseCommentResponse,
	type Reader,
	type UserProfile,
} from '../lib/discussion';
import type { CommentResponse } from '../lib/discussionApi';
import { reportAbuse as reportAbuseWeb } from '../lib/discussionApi';
import { error, type Result } from '../lib/result';
import { Discussion, type Props as DiscussionProps } from './Discussion';

type Props = Omit<DiscussionProps, 'user' | 'reportAbuseUnauthenticated'>;

const onComment = async (
	discussionShortUrl: string,
	body: string,
): Promise<CommentResponse> =>
	getDiscussionClient()
		.comment(discussionShortUrl, body)
		.then((apiResponse) => {
			if (
				apiResponse.__type ===
				DiscussionResponseType.DiscussionResponseWithError
			) {
				return error('ApiError');
			}

			if (apiResponse.response.status === 'error') {
				return parseCommentResponse({
					status: apiResponse.response.status,
					errorCode: apiResponse.response.errorCode,
				});
			}

			return parseCommentResponse({
				status: apiResponse.response.status,
				message: apiResponse.response.message,
			});
		});

const onReply = async (
	discussionShortUrl: string,
	body: string,
	parentCommentId: string,
): Promise<CommentResponse> =>
	getDiscussionClient()
		.reply(discussionShortUrl, body, parentCommentId)
		.then((apiResponse) => {
			if (
				apiResponse.__type ===
				DiscussionResponseType.DiscussionResponseWithError
			) {
				return error('ApiError');
			}

			if (apiResponse.response.status === 'error') {
				return parseCommentResponse({
					status: apiResponse.response.status,
					errorCode: apiResponse.response.errorCode,
				});
			}

			const parsedResponse = parseCommentResponse({
				status: apiResponse.response.status,
				message: apiResponse.response.message,
			});
			return parsedResponse;
		});

const onRecommend = async (commentId: string): Promise<boolean> => {
	return getDiscussionClient()
		.recommend(commentId)
		.then(
			(discussionApiResponse) =>
				// eslint-disable-next-line no-underscore-dangle -- we don't have control over this name! It comes from the compiled Thrift models
				discussionApiResponse.__type ===
					DiscussionResponseType.DiscussionResponseWithResponse &&
				discussionApiResponse.response.statusCode === 200,
		);
};

const addUsername = async (): Promise<Result<string, true>> =>
	error('Unimplemented');

/***
 *  Currently we are using the web handler for both authenticated and unauthenticated users.
 *  Once we have knowlege of if the user is authenticated from bridget, we can implement an apps-specific function below, to allow us to send user data to analytics.
 */
// const reportAbuse = async (): Promise<Result<string, true>> => {
// 	console.log('reportAbuse');
// 	return { kind: 'error', error: 'ApiError' };
// };

export const DiscussionApps = (props: Props) => {
	const [user, setUser] = useState<Reader>();

	useEffect(() => {
		void getDiscussionClient()
			.getUserProfile()
			.then((userProfile) => {
				if (
					userProfile.__type ===
					GetUserProfileResponseType.GetUserProfileResponseWithError
				) {
					return undefined;
				}

				const profile = {
					userId: userProfile.profile.userId,
					displayName: userProfile.profile.displayName,
					webUrl: userProfile.profile.webUrl,
					apiUrl: userProfile.profile.apiUrl,
					avatar: userProfile.profile.avatar,
					secureAvatarUrl: userProfile.profile.secureAvatarUrl,
					badge: userProfile.profile.badge.map(({ name }) => ({
						name,
					})),
					privateFields: {
						canPostComment: userProfile.profile.canPostComment,
						hasCommented: userProfile.profile.hasCommented,
						isPremoderated: userProfile.profile.isPremoderated,
					},
				} satisfies UserProfile;

				return {
					kind: 'Reader',
					onComment,
					onReply,
					onRecommend,
					addUsername,
					reportAbuse: reportAbuseWeb(undefined),
					profile,
				} satisfies Reader;
			})
			.then(setUser);
	}, [setUser]);

	return (
		<Discussion
			user={user}
			{...props}
			reportAbuseUnauthenticated={reportAbuseWeb(undefined)}
		/>
	);
};
