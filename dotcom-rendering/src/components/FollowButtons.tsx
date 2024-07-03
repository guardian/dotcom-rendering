import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { space, textSans15 } from '@guardian/source/foundations';
import {
	SvgCheckmark,
	SvgNotificationsOff,
	SvgNotificationsOn,
	SvgPlus,
} from '@guardian/source/react-components';
import { palette } from '../palette';

type IconProps = {
	isFollowing?: boolean;
	iconIsFollowing: EmotionJSX.Element;
	iconIsNotFollowing: EmotionJSX.Element;
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
		{isFollowing ? 'Following' : 'Follow'} {displayName}
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
