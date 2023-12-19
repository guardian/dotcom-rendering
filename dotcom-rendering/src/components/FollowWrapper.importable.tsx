import { css } from '@emotion/react';
import { Topic } from '@guardian/bridget/Topic';
import { log } from '@guardian/libs';
import { from, space } from '@guardian/source-foundations';
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
			.catch((e) =>
				log(
					'dotcom',
					'Bridget getNotificationsClient.isFollowing Error:',
					e,
				),
			);

		void getTagClient()
			.isFollowing(topic)
			.then(setIsFollowingTag)
			.catch((e) =>
				log('dotcom', 'Bridget getTagClient.isFollowing Error:', e),
			);
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
					.catch((e) =>
						log(
							'dotcom',
							'Bridget getTagClient.unfollow Error:',
							e,
						),
					)
			: void getTagClient()
					.follow(topic)
					.then((success) => {
						success && setIsFollowingTag(true);
					})
					.catch((e) =>
						log('dotcom', 'Bridget getTagClient.follow Error:', e),
					);
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
					.catch((e) =>
						log(
							'dotcom',
							'Bridget getNotificationsClient.unfollow Error:',
							e,
						),
					)
			: void getNotificationsClient()
					.follow(topic)
					.then((success) => {
						success && setIsFollowingNotifications(true);
					})
					.catch((e) =>
						log(
							'dotcom',
							'Bridget getNotificationsClient.follow Error:',
							e,
						),
					);
	};

	return (
		<div
			css={css`
				min-height: 24px;

				${from.phablet} {
					display: inline-flex;

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
						isFollowingTag !== undefined
							? tagHandler
							: () => undefined
					}
					cssOverrides={css`
						margin-bottom: ${space[2]}px;
					`}
				/>
			)}
			<FollowNotificationsButton
				isFollowing={isFollowingNotifications ?? false}
				onClickHandler={
					isFollowingNotifications !== undefined
						? notificationsHandler
						: () => undefined
				}
				cssOverrides={css`
					margin-top: ${space[2]}px;
					${showFollowTagButton && 'margin-top: 0px;'}
				`}
			/>
		</div>
	);
};
