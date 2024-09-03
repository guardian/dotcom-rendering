import { css } from '@emotion/react';
import { Topic } from '@guardian/bridget/Topic';
import { isUndefined, log } from '@guardian/libs';
import { from, space } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { getNotificationsClient } from '../lib/bridgetApi';
import { FollowNotificationsButton } from './FollowButtons';

type Props = {
	id: string;
	displayName: string;
};

export const LiveblogNotifications = ({ id, displayName }: Props) => {
	const [isFollowingNotifications, setIsFollowingNotifications] = useState<
		boolean | undefined
	>(undefined);

	useEffect(() => {
		const topic = new Topic({
			id,
			displayName,
			type: 'content',
		});

		void getNotificationsClient()
			.isFollowing(topic)
			.then(setIsFollowingNotifications)
			.catch((error) => {
				window.guardian.modules.sentry.reportError(
					error,
					'bridget-getNotificationsClient-isFollowing-error',
				),
					log(
						'dotcom',
						'Bridget getNotificationsClient.isFollowing Error:',
						error,
					);
			});
	}, [id, displayName]);

	const notificationsHandler = () => {
		const topic = new Topic({
			id,
			displayName,
			type: 'content',
		});

		isFollowingNotifications
			? void getNotificationsClient()
					.unfollow(topic)
					.then((success) => {
						success && setIsFollowingNotifications(false);
					})
					.catch((error) => {
						window.guardian.modules.sentry.reportError(
							error,
							'briidget-getNotificationsClient-unfollow-error',
						),
							log(
								'dotcom',
								'Bridget getNotificationsClient.unfollow Error:',
								error,
							);
					})
			: void getNotificationsClient()
					.follow(topic)
					.then((success) => {
						success && setIsFollowingNotifications(true);
					})
					.catch((error) => {
						window.guardian.modules.sentry.reportError(
							error,
							'bridget-getNotificationsClient-follow-error',
						),
							log(
								'dotcom',
								'Bridget getNotificationsClient.follow Error:',
								error,
							);
					});
	};

	return (
		<div
			css={css`
				margin-top: ${space[3]}px;
				min-height: ${space[6]}px;

				${from.phablet} {
					display: inline-flex;
					flex-direction: column;

					button:first-of-type {
						margin-right: ${space[5]}px;
					}
				}
			`}
		>
			<FollowNotificationsButton
				isFollowing={isFollowingNotifications ?? false}
				onClickHandler={
					!isUndefined(isFollowingNotifications)
						? notificationsHandler
						: () => undefined
				}
			/>
		</div>
	);
};
