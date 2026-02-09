import { css } from '@emotion/react';
import { Topic } from '@guardian/bridget/Topic';
import { isUndefined, log } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import { useEffect, useState } from 'react';
import { getNotificationsClient, getTagClient } from '../lib/bridgetApi';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { useIsMyGuardianEnabled } from '../lib/useIsMyGuardianEnabled';
import {
	FollowNotificationsButtonVariant,
	FollowTagButtonVariant,
} from './FollowButtons';

const containerStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
	width: 100%;
`;

const notificationContainerStyles = css`
	width: 100%;
`;

type Props = {
	contributorId: string;
	displayName: string;
};

const isNotInBlockList = (tagId: string) => {
	const blockList = ['profile/anas-al-sharif'];
	return !blockList.includes(tagId);
};

/**
 * Follow button specifically for contributor profiles.
 * Always renders when the contributor profile is shown.
 */
export const ContributorProfileFollow = ({
	contributorId,
	displayName,
}: Props) => {
	const [isFollowingNotifications, setIsFollowingNotifications] = useState<
		boolean | undefined
	>(undefined);
	const [isFollowingTag, setIsFollowingTag] = useState<boolean | undefined>(
		undefined,
	);

	const isMyGuardianEnabled = useIsMyGuardianEnabled();
	const isBridgetCompatible = useIsBridgetCompatible('2.5.0');

	const shouldShowFollow =
		isBridgetCompatible &&
		isMyGuardianEnabled &&
		isNotInBlockList(contributorId);

	useEffect(() => {
		if (!shouldShowFollow) return;

		const topic = new Topic({
			id: contributorId,
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
				);
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
				);
				log('dotcom', 'Bridget getTagClient.isFollowing Error:', error);
			});
	}, [contributorId, displayName, shouldShowFollow]);

	const tagHandler = () => {
		const topic = new Topic({
			id: contributorId,
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
		}
	};

	const notificationsHandler = () => {
		const topic = new Topic({
			id: contributorId,
			displayName,
			type: 'tag-contributor',
		});

		if (isFollowingNotifications) {
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
						'briidget-getNotificationsClient-unfollow-error',
					);
					log(
						'dotcom',
						'Bridget getNotificationsClient.unfollow Error:',
						error,
					);
				});
		} else {
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

	// Don't render if feature flags aren't met
	if (!shouldShowFollow) {
		return null;
	}

	return (
		<div css={containerStyles} data-gu-name="contributor-profile-follow">
			<FollowTagButtonVariant
				isFollowing={isFollowingTag ?? false}
				onClickHandler={
					!isUndefined(isFollowingTag) ? tagHandler : () => undefined
				}
			/>
			{isFollowingTag && (
				<div css={notificationContainerStyles}>
					<FollowNotificationsButtonVariant
						isFollowing={isFollowingNotifications ?? false}
						onClickHandler={
							!isUndefined(isFollowingNotifications)
								? notificationsHandler
								: () => undefined
						}
						displayName={displayName}
					/>
				</div>
			)}
		</div>
	);
};
