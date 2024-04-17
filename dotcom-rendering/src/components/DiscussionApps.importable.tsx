import { DiscussionServiceResponseType } from '@guardian/bridget';
import { useEffect, useState } from 'react';
import { safeParse } from 'valibot';
import { getDiscussionClient } from '../lib/bridgetApi';
import {
	parseCommentResponse,
	parseUserProfile,
	type Reader,
	recommmendResponseSchema,
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
				DiscussionServiceResponseType.DiscussionServiceResponseWithError
			) {
				return error('ApiError');
			}

			const result = parseCommentResponse(
				JSON.parse(apiResponse.response),
			);
			if (result.kind === 'error') {
				window.guardian.modules.sentry.reportError(
					Error(`Failed parseCommentResponse: ${result.error}`),
					'discussion',
				);
			}
			return result;
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
				DiscussionServiceResponseType.DiscussionServiceResponseWithError
			) {
				return error('ApiError');
			}

			const result = parseCommentResponse(
				JSON.parse(apiResponse.response),
			);
			if (result.kind === 'error') {
				window.guardian.modules.sentry.reportError(
					Error(`Failed parseCommentResponse: ${result.error}`),
					'discussion',
				);
			}
			return result;
		});

const onRecommend = async (commentId: string): Promise<boolean> => {
	return getDiscussionClient()
		.recommend(commentId)
		.then((discussionApiResponse) => {
			if (
				// eslint-disable-next-line no-underscore-dangle -- we don't have control over this name! It comes from the compiled Thrift models
				discussionApiResponse.__type !==
				DiscussionServiceResponseType.DiscussionServiceResponseWithResponse
			) {
				return false;
			}

			return safeParse(
				recommmendResponseSchema,
				JSON.parse(discussionApiResponse.response),
			).success;
		});
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
					DiscussionServiceResponseType.DiscussionServiceResponseWithError
				) {
					return undefined;
				}

				const profileResult = parseUserProfile(
					JSON.parse(userProfile.response),
				);

				if (profileResult.kind === 'ok') {
					setUser({
						kind: 'Reader',
						onComment,
						onReply,
						onRecommend,
						addUsername,
						reportAbuse: reportAbuseWeb(undefined),
						profile: profileResult.value,
					});
				}
			});
	}, [setUser]);

	return (
		<Discussion
			user={user}
			{...props}
			reportAbuseUnauthenticated={reportAbuseWeb(undefined)}
		/>
	);
};
