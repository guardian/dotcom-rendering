import { css } from '@emotion/react';
import { space, textSans12, textSans15 } from '@guardian/source/foundations';
import {
	SvgCheckmark,
	SvgNotificationsOff,
	SvgNotificationsOn,
	SvgPlus,
} from '@guardian/source/react-components';
import { ToggleSwitch } from '@guardian/source-development-kitchen/react-components';
import type { ReactNode } from 'react';
import { palette } from '../palette';

type IconProps = {
	isFollowing?: boolean;
	iconIsFollowing: ReactNode;
	iconIsNotFollowing: ReactNode;
};

const FollowIcon = ({
	isFollowing,
	iconIsFollowing,
	iconIsNotFollowing,
}: IconProps) => (
	<div
		css={css`
			display: flex;
			margin: 0;
			margin-right: ${space[1]}px;

			border-radius: 100%;
			border: 1px solid ${palette('--follow-icon-fill')};

			svg {
				margin: 1px;
			}
		`}
		style={{
			backgroundColor: isFollowing
				? palette('--follow-icon-fill')
				: undefined,
			fill: isFollowing
				? palette('--follow-icon-background')
				: palette('--follow-icon-fill'),
		}}
	>
		{isFollowing ? iconIsFollowing : iconIsNotFollowing}
	</div>
);

const buttonStyles = (withExtraBottomMargin: boolean) => css`
	${textSans15}
	color: ${palette('--follow-text')};
	background: none;
	border: none;
	display: block;
	margin-left: 0;
	min-height: ${space[6]}px;
	padding: 0;
	text-align: left;
	${withExtraBottomMargin && `margin-bottom: ${space[2]}px;`}
`;

const containerStyles = css`
	display: flex;
	align-items: center;
	column-gap: 0.2em;
`;

const notificationsTextSpan = ({
	isFollowing,
}: Pick<ButtonProps, 'isFollowing'>) => (
	<span>Notifications {isFollowing ? 'on' : 'off'}</span>
);

const tagTextSpan = ({
	isFollowing,
	displayName,
}: {
	isFollowing: boolean;
	displayName?: string;
}) => (
	<span>
		{isFollowing ? 'Following' : 'Follow'} {displayName}{' '}
		{displayName && displayName.length < 21 ? 'in My Guardian' : ''}
	</span>
);

// bridget props
type ButtonProps = {
	isFollowing: boolean;
	onClickHandler: () => void;
};

export const FollowNotificationsButton = ({
	isFollowing,
	onClickHandler,
	withExtraBottomMargin = false,
}: ButtonProps & { withExtraBottomMargin?: boolean }) => {
	return (
		<button
			onClick={onClickHandler}
			type="button"
			css={[buttonStyles(withExtraBottomMargin)]}
		>
			<span css={containerStyles}>
				<FollowIcon
					isFollowing={isFollowing}
					iconIsFollowing={<SvgNotificationsOn size="xsmall" />}
					iconIsNotFollowing={<SvgNotificationsOff size="xsmall" />}
				/>
				{notificationsTextSpan({ isFollowing })}
			</span>
		</button>
	);
};

export const FollowTagButton = ({
	isFollowing,
	displayName = '',
	onClickHandler,
	withExtraBottomMargin = false,
}: ButtonProps & { displayName: string; withExtraBottomMargin?: boolean }) => {
	return (
		<button
			onClick={onClickHandler}
			type="button"
			css={[buttonStyles(withExtraBottomMargin)]}
		>
			<span css={containerStyles}>
				<FollowIcon
					isFollowing={isFollowing}
					iconIsFollowing={<SvgCheckmark size="xsmall" />}
					iconIsNotFollowing={<SvgPlus size="xsmall" />}
				/>
				{tagTextSpan({ isFollowing, displayName })}
			</span>
		</button>
	);
};

// Variant style

const containerStylesVariant = css`
	display: flex;
	column-gap: 0.2em;
	justify-content: space-between;
	width: 100%;
`;

const buttonStylesVariant = (isFollowing: boolean) => css`
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

export const FollowTagButtonVariant = ({
	isFollowing,
	onClickHandler,
}: ButtonProps) => {
	return (
		<button
			onClick={onClickHandler}
			type="button"
			css={buttonStylesVariant(isFollowing)}
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

const NotificationIconVariant = ({
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

const notificationTextStylesVariant = css`
	${textSans12}
`;

const notificationsTextSpanVariant = ({
	isFollowing,
	displayName,
}: Pick<ButtonProps, 'isFollowing'> & { displayName?: string }) => (
	<span css={notificationTextStylesVariant}>
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

const buttonStylesVariantNotification = css`
	${buttonStyles(true)}
	width: 100%;
`;

const iconTextWrapperStyles = css`
	display: flex;
	align-items: flex-start;
`;

export const FollowNotificationsButtonVariant = ({
	isFollowing,
	onClickHandler,
	displayName,
}: ButtonProps & { displayName?: string }) => {
	return (
		<div css={buttonStylesVariantNotification}>
			<div css={containerStylesVariant}>
				<div css={iconTextWrapperStyles}>
					<NotificationIconVariant
						isFollowing={isFollowing}
						iconIsFollowing={<SvgNotificationsOn size="small" />}
						iconIsNotFollowing={
							<SvgNotificationsOff size="small" />
						}
					/>
					{notificationsTextSpanVariant({ isFollowing, displayName })}
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
