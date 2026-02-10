import { css } from '@emotion/react';
import { Topic } from '@guardian/bridget/Topic';
import { isUndefined, log } from '@guardian/libs';
import { space, textSans12, textSans15 } from '@guardian/source/foundations';
import {
	SvgCheckmark,
	SvgNotificationsOff,
	SvgNotificationsOn,
	SvgPlus,
} from '@guardian/source/react-components';
import { ToggleSwitch } from '@guardian/source-development-kitchen/react-components';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { getNotificationsClient, getTagClient } from '../lib/bridgetApi';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { useIsMyGuardianEnabled } from '../lib/useIsMyGuardianEnabled';
import { palette } from '../palette';
import { isNotInBlockList } from './FollowWrapper.importable';

// -- Follow button --

type ButtonProps = {
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
			? palette('--follow-button-border-following')
			: palette('--follow-button-border')};
	background: ${isFollowing
		? 'transparent'
		: palette('--follow-accent-color')};
	color: ${isFollowing
		? palette('--follow-button-text')
		: palette('--follow-button-text-not-following')};
	font-weight: 700;
	cursor: pointer;

	svg {
		width: 24px;
		height: 24px;
		fill: ${isFollowing
			? palette('--follow-button-text')
			: palette('--follow-button-text-not-following')};
		stroke: ${isFollowing
			? palette('--follow-button-text')
			: palette('--follow-button-text-not-following')};
	}
`;

const FollowTagButton = ({ isFollowing, onClickHandler }: ButtonProps) => {
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
			<span>{isFollowing ? 'Following' : 'Follow'} in My Guardian</span>
		</button>
	);
};

// -- Notifications toggle --

type IconProps = {
	isFollowing?: boolean;
	iconIsFollowing: ReactNode;
	iconIsNotFollowing: ReactNode;
};

const NotificationIcon = ({
	isFollowing,
	iconIsFollowing,
	iconIsNotFollowing,
}: IconProps) => (
	<div
		css={css`
			display: flex;
			margin: 0;
			margin-right: ${space[1]}px;

			svg {
				margin-top: -${space[1] - 1}px;
			}
		`}
		style={{
			fill: palette('--follow-icon-variant-fill'),
		}}
	>
		{isFollowing ? iconIsFollowing : iconIsNotFollowing}
	</div>
);

const notificationsTextSpan = ({
	isFollowing,
	displayName,
}: {
	isFollowing: boolean;
	displayName?: string;
}) => (
	<span
		css={css`
			${textSans12}
		`}
	>
		{isFollowing
			? 'Notifications on'
			: `Receive an alert when ${
					displayName ?? 'this author'
			  } publishes an article`}
	</span>
);

const toggleSwitchStyles = css`
	[aria-checked='false'] {
		background-color: ${palette(
			'--follow-button-border-following',
		)} !important;
		border-color: ${palette('--follow-button-border-following')} !important;
	}
	[aria-checked='true'] {
		background-color: ${palette('--follow-button-border')} !important;
		border-color: ${palette('--follow-button-border')} !important;
	}
`;

const notificationRowStyles = css`
	${textSans15}
	color: ${palette('--follow-text')};
	background: none;
	border: none;
	display: block;
	margin-left: 0;
	min-height: ${space[6]}px;
	padding: 0;
	text-align: left;
	margin-bottom: ${space[2]}px;
	width: 100%;
`;

const notificationRowContainerStyles = css`
	display: flex;
	column-gap: 0.2em;
	justify-content: space-between;
	width: 100%;
`;

const iconTextWrapperStyles = css`
	display: flex;
	align-items: flex-start;
`;

const FollowNotificationsButton = ({
	isFollowing,
	onClickHandler,
	displayName,
}: ButtonProps & { displayName?: string }) => {
	return (
		<div css={notificationRowStyles}>
			<div css={notificationRowContainerStyles}>
				<div css={iconTextWrapperStyles}>
					<NotificationIcon
						isFollowing={isFollowing}
						iconIsFollowing={<SvgNotificationsOn size="small" />}
						iconIsNotFollowing={
							<SvgNotificationsOff size="small" />
						}
					/>
					{notificationsTextSpan({ isFollowing, displayName })}
				</div>
				<div>
					<ToggleSwitch
						checked={isFollowing}
						onClick={onClickHandler}
						cssOverrides={toggleSwitchStyles}
					/>
				</div>
			</div>
		</div>
	);
};

// -- Card layout --

const containerStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[2]}px;
	width: 100%;
	align-items: flex-start;
`;

const notificationContainerStyles = css`
	width: 100%;
`;

type Props = {
	contributorId: string;
	displayName: string;
};

export const ContributorFollowCard = ({
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
	}, [contributorId, displayName]);

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

	if (!shouldShowFollow) {
		return null;
	}

	return (
		<div css={containerStyles} data-gu-name="contributor-follow-card">
			<FollowTagButton
				isFollowing={isFollowingTag ?? false}
				onClickHandler={
					!isUndefined(isFollowingTag) ? tagHandler : () => undefined
				}
			/>
			{isFollowingTag && (
				<div css={notificationContainerStyles}>
					<FollowNotificationsButton
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
