import { css } from '@emotion/react';
import { Topic } from '@guardian/bridget/Topic';
import { isUndefined, log } from '@guardian/libs';
import {
	palette as sourcePalette,
	space,
	textSans12,
	textSans15,
} from '@guardian/source/foundations';
import {
	SvgCheckmark,
	SvgNotificationsOn,
	SvgPlus,
} from '@guardian/source/react-components';
import {
	StraightLines,
	ToggleSwitch,
} from '@guardian/source-development-kitchen/react-components';
import { useEffect, useState } from 'react';
import { getNotificationsClient, getTagClient } from '../lib/bridgetApi';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { useIsMyGuardianEnabled } from '../lib/useIsMyGuardianEnabled';
import { palette } from '../palette';
import { isNotInBlockList } from './FollowWrapper.importable';

// -- Follow button --

type FollowButtonProps = {
	isFollowing: boolean;
	onClickHandler: () => void;
};

const followButtonStyles = (isFollowing: boolean) => css`
	${textSans15}
	display: inline-flex;
	align-items: center;
	gap: ${space[1]}px;
	padding: ${space[1] + 1}px ${space[3] + 2}px;
	border-radius: ${space[5]}px;
	border: 1px solid
		${isFollowing
			? palette('--contributor-follow-button-border-following')
			: palette('--contributor-follow-button-border')};
	background: ${isFollowing
		? 'transparent'
		: palette('--contributor-follow-accent-color')};
	color: ${isFollowing
		? palette('--contributor-follow-button-text')
		: palette('--contributor-follow-button-text-not-following')};
	font-weight: 700;
	cursor: pointer;

	svg {
		width: 24px;
		height: 24px;
		fill: ${isFollowing
			? palette('--contributor-follow-button-text')
			: palette('--contributor-follow-button-text-not-following')};
		stroke: ${isFollowing
			? palette('--contributor-follow-button-text')
			: palette('--contributor-follow-button-text-not-following')};
	}
`;

const FollowButton = ({ isFollowing, onClickHandler }: FollowButtonProps) => {
	return (
		<button
			onClick={onClickHandler}
			type="button"
			css={followButtonStyles(isFollowing)}
		>
			{isFollowing ? (
				<SvgCheckmark size="xsmall" />
			) : (
				<SvgPlus size="xsmall" />
			)}
			<span>{isFollowing ? 'Following in My Guardian' : 'Follow'}</span>
		</button>
	);
};

// -- notifications --

const notificationAlertStyles = css`
	${textSans15}
	color: ${palette('--follow-text')};
	min-height: ${space[6]}px;
	width: 100%;
`;

const notificationAlertRowStyles = css`
	display: flex;
	column-gap: ${space[6]}px;
	justify-content: space-between;
	width: 100%;
`;

const notificationIconStyles = css`
	display: flex;
	margin-right: ${space[1]}px;

	svg {
		margin-top: -${space[1] - 1}px;
		fill: currentColor;
	}
`;
const notificationLabelStyles = css`
	display: flex;
	align-items: flex-start;
	${textSans12}
`;

const toggleSwitchContainerStyles = css`
	transform: scale(1.2);
	button[aria-checked='false'] {
		background-color: ${sourcePalette.neutral[60]};
		border-color: ${sourcePalette.neutral[60]};
	}
	button[aria-checked='true']::before {
		display: none;
	}
`;

const NotificationAlert = ({
	isFollowing,
	onClickHandler,
	displayName,
}: FollowButtonProps & { displayName?: string }) => {
	return (
		<div css={notificationAlertStyles}>
			<div css={notificationAlertRowStyles}>
				<div css={notificationLabelStyles}>
					<div css={notificationIconStyles}>
						<SvgNotificationsOn size="small" />
					</div>
					<span>
						Receive an alert when {displayName ?? 'this author'}{' '}
						publishes an article
					</span>
				</div>
				<div css={toggleSwitchContainerStyles}>
					<ToggleSwitch
						checked={isFollowing}
						onClick={onClickHandler}
					/>
				</div>
			</div>
		</div>
	);
};

const followBlockStyles = css`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
`;

type FollowBlockProps = {
	contributorId: string;
	displayName: string;
};

export const ContributorFollowBlock = ({
	contributorId,
	displayName,
}: FollowBlockProps) => {
	const [isFollowingNotifications, setIsFollowingNotifications] = useState<
		boolean | undefined
	>(undefined);
	const [isFollowingContributor, setIsFollowingContributor] = useState<
		boolean | undefined
	>(undefined);

	const isMyGuardianEnabled = useIsMyGuardianEnabled();
	const isBridgetCompatible = useIsBridgetCompatible('2.5.0');

	const shouldShowFollow =
		isBridgetCompatible &&
		isMyGuardianEnabled &&
		isNotInBlockList(contributorId);

	useEffect(() => {
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
			.then(setIsFollowingContributor)
			.catch((error) => {
				window.guardian.modules.sentry.reportError(
					error,
					'bridget-getTagClient-isFollowing-error',
				);
				log('dotcom', 'Bridget getTagClient.isFollowing Error:', error);
			});
	}, [contributorId, displayName]);

	const tagHandler = () => {
		const topic = new Topic({
			id: contributorId,
			displayName,
			type: 'tag-contributor',
		});

		if (isFollowingContributor) {
			void getTagClient()
				.unfollow(topic)
				.then((success) => {
					if (success) {
						setIsFollowingContributor(false);
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
						setIsFollowingContributor(true);
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

	if (!shouldShowFollow) {
		return null;
	}

	return (
		<div css={followBlockStyles}>
			<FollowButton
				isFollowing={isFollowingContributor ?? false}
				onClickHandler={
					!isUndefined(isFollowingContributor)
						? tagHandler
						: () => undefined
				}
			/>
			{isFollowingContributor && (
				<div>
					<StraightLines
						count={1}
						color={palette('--contributor-follow-straight-lines')}
					/>
					<NotificationAlert
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
