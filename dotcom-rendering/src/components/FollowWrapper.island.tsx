import { css } from '@emotion/react';
import { Topic } from '@guardian/bridget/Topic';
import { isUndefined, log } from '@guardian/libs';
import { from, space, textSans12 } from '@guardian/source/foundations';
import {
	SvgNotificationsOff,
	SvgNotificationsOn,
} from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import { getNotificationsClient, getTagClient } from '../lib/bridgetApi';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { useIsMyGuardianEnabled } from '../lib/useIsMyGuardianEnabled';
import { palette as schemedPalette } from '../palette';
import { FollowTagButton } from './FollowButtons';

type Props = {
	id: string;
	displayName: string;
};

const notificationTextStyles = css`
	${textSans12}
	color: ${schemedPalette('--follow-text')};
	fill: currentColor;
	display: flex;
	align-items: center;
	column-gap: ${space[1]}px;
	min-height: ${space[6]}px;
	padding: 0;
`;

const blockList = ['profile/anas-al-sharif'];

export const FollowWrapper = ({ id, displayName }: Props) => {
	const [isFollowingNotifications, setIsFollowingNotifications] = useState<
		boolean | undefined
	>(undefined);
	const [isFollowingTag, setIsFollowingTag] = useState<boolean | undefined>(
		undefined,
	);
	const isMyGuardianEnabled = useIsMyGuardianEnabled();
	const isBridgetCompatible = useIsBridgetCompatible('2.5.0');

	const showFollowTagButton =
		isBridgetCompatible && isMyGuardianEnabled && !blockList.includes(id);

	useEffect(() => {
		const topic = new Topic({
			id,
			displayName,
			type: 'tag-contributor',
		});

		void Promise.all([
			getNotificationsClient()
				.isFollowing(topic)
				.catch((error) => {
					window.guardian.modules.sentry.reportError(
						error,
						'bridget-getNotificationsClient-isFollowing-error',
					);
					log(
						'dotcom',
						'Bridget getNotificationsClient.isFollowing Error:',
						error,
					);
					return undefined;
				}),
			getTagClient()
				.isFollowing(topic)
				.catch((error) => {
					window.guardian.modules.sentry.reportError(
						error,
						'bridget-getTagClient-isFollowing-error',
					);
					log(
						'dotcom',
						'Bridget getTagClient.isFollowing Error:',
						error,
					);
					return undefined;
				}),
		]).then(([followingNotifications, followingTag]) => {
			setIsFollowingNotifications(followingNotifications);
			setIsFollowingTag(followingTag);

			// Legacy: if user has notifications on but isn't following,
			// auto-follow the tag to keep states consistent
			if (followingNotifications && !followingTag) {
				void getTagClient()
					.follow(topic)
					.then((success) => {
						if (success) {
							setIsFollowingTag(true);
						}
					})
					.catch((error) => {
						window.guardian.modules.sentry.reportError(
							error,
							'bridget-getTagClient-auto-follow-error',
						);
						log(
							'dotcom',
							'Bridget getTagClient.follow (auto) Error:',
							error,
						);
					});
			}
		});
	}, [id, displayName]);

	const tagHandler = () => {
		const topic = new Topic({
			id,
			displayName,
			type: 'tag-contributor',
		});

		if (isFollowingTag) {
			void getTagClient()
				.unfollow(topic)
				.then((success) => {
					if (success) {
						setIsFollowingTag(false);
					}
				})
				.catch((error) => {
					window.guardian.modules.sentry.reportError(
						error,
						'bridget-getTagClient-unfollow-error',
					);
					log(
						'dotcom',
						'Bridget getTagClient.unfollow Error:',
						error,
					);
				});

			// Turn off notifications when unfollowing
			void getNotificationsClient()
				.unfollow(topic)
				.then((success) => {
					if (success) {
						setIsFollowingNotifications(false);
					}
				})
				.catch((error) => {
					window.guardian.modules.sentry.reportError(
						error,
						'bridget-getNotificationsClient-unfollow-error',
					);
					log(
						'dotcom',
						'Bridget getNotificationsClient.unfollow Error:',
						error,
					);
				});
		} else {
			void getTagClient()
				.follow(topic)
				.then((success) => {
					if (success) {
						setIsFollowingTag(true);
					}
				})
				.catch((error) => {
					window.guardian.modules.sentry.reportError(
						error,
						'bridget-getTagClient-follow-error',
					);
					log('dotcom', 'Bridget getTagClient.follow Error:', error);
				});

			// Enable notifications when following
			void getNotificationsClient()
				.follow(topic)
				.then((success) => {
					if (success) {
						setIsFollowingNotifications(true);
					}
				})
				.catch((error) => {
					window.guardian.modules.sentry.reportError(
						error,
						'bridget-getNotificationsClient-follow-error',
					);
					log(
						'dotcom',
						'Bridget getNotificationsClient.follow Error:',
						error,
					);
				});
		}
	};

	return (
		<div
			css={css`
				min-height: ${space[6]}px;

				${from.phablet} {
					display: inline-flex;
					flex-direction: column;

					button:first-of-type {
						margin-right: ${space[5]}px;
					}
				}
			`}
			data-gu-name="follow"
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
			{isFollowingTag && (
				<span css={notificationTextStyles}>
					{isFollowingNotifications ? (
						<>
							<SvgNotificationsOn size="small" />
							Notifications turned on. Turn off anytime in
							Settings.
						</>
					) : (
						<>
							<SvgNotificationsOff size="small" />
							Notifications turned off. Turn on anytime in
							Settings.
						</>
					)}
				</span>
			)}
		</div>
	);
};
