import { css } from '@emotion/react';
import { Topic } from '@guardian/bridget/Topic';
import { isUndefined, log } from '@guardian/libs';
import { from, space } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { getNotificationsClient, getTagClient } from '../lib/bridgetApi';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { useIsMyGuardianEnabled } from '../lib/useIsMyGuardianEnabled';
import { FollowNotificationsButton, FollowTagButton } from './FollowButtons';

type Props = {
	id: string;
	displayName: string;
};

export const FollowWrapper = ({ id, displayName }: Props) => {
	const [isFollowingNotifications, setIsFollowingNotifications] = useState<
		boolean | undefined
	>(undefined);
	const [isFollowingTag, setIsFollowingTag] = useState<boolean | undefined>(
		undefined,
	);
	const [showFollowTagButton, setShowFollowTagButton] =
		useState<boolean>(false);

	const isMyGuardianEnabled = useIsMyGuardianEnabled();
	const isBridgetCompatible = useIsBridgetCompatible('2.5.0');
	isBridgetCompatible && isMyGuardianEnabled && setShowFollowTagButton(true);

	useEffect(() => {
		const topic = new Topic({
			id,
			displayName,
			type: 'tag-contributor',
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

		void getTagClient()
			.isFollowing(topic)
			.then(setIsFollowingTag)
			.catch((error) => {
				window.guardian.modules.sentry.reportError(
					error,
					'bridget-getTagClient-isFollowing-error',
				),
					log(
						'dotcom',
						'Bridget getTagClient.isFollowing Error:',
						error,
					);
			});
	}, [id, displayName]);

	const tagHandler = () => {
		const topic = new Topic({
			id,
			displayName,
			type: 'tag-contributor',
		});

		isFollowingTag
			? void getTagClient()
					.unfollow(topic)
					.then((success) => {
						success && setIsFollowingTag(false);
					})
					.catch((error) => {
						window.guardian.modules.sentry.reportError(
							error,
							'bridget-getTagClient-unfollow-error',
						),
							log(
								'dotcom',
								'Bridget getTagClient.unfollow Error:',
								error,
							);
					})
			: void getTagClient()
					.follow(topic)
					.then((success) => {
						success && setIsFollowingTag(true);
					})
					.catch((error) => {
						window.guardian.modules.sentry.reportError(
							error,
							'bridget-getTagClient-follow-error',
						),
							log(
								'dotcom',
								'Bridget getTagClient.follow Error:',
								error,
							);
					});
	};

	const notificationsHandler = () => {
		const topic = new Topic({
			id,
			displayName,
			type: 'tag-contributor',
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
				min-height: 24px;

				${from.phablet} {
					display: inline-flex;
					flex-direction: column;

					button:first-of-type {
						margin-right: ${space[5]}px;
					}
				}
			`}
		>
			{showFollowTagButton && (
				<FollowTagButton
					isFollowing={isFollowingTag ?? false}
					displayName={displayName}
					onClickHandler={
						!isUndefined(isFollowingTag)
							? tagHandler
							: () => undefined
					}
					withExtraBottomMargin={true}
				/>
			)}
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
