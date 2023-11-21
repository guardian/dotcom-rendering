import { css } from '@emotion/react';
import { remSpace, space, textSans } from '@guardian/source-foundations';
import {
	SvgNotificationsOff,
	SvgNotificationsOn,
} from '@guardian/source-react-components';
import { palette } from '../palette';

type IconProps = {
	isFollowing: boolean;
};

const FollowIcon = ({ isFollowing }: IconProps) => (
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
		{isFollowing ? (
			<SvgNotificationsOn size="xsmall" />
		) : (
			<SvgNotificationsOff size="xsmall" />
		)}
	</div>
);

const buttonStyles = css`
	${textSans.small()}
	color: ${palette('--follow-text')};
	background: none;
	border: none;
	display: block;
	margin-top: ${remSpace[1]};
	margin-left: 0;
	min-height: ${remSpace[6]};
	padding: 0;
	text-align: left;
`;

const containerStyles = css`
	display: flex;
	align-items: center;
	column-gap: 0.2em;
`;

type Props = {
	isFollowing: boolean;
	onClickHandler: () => void;
};

export const FollowButton = ({ isFollowing, onClickHandler }: Props) => {
	return (
		<button onClick={onClickHandler} type="button" css={buttonStyles}>
			<span css={containerStyles}>
				<FollowIcon isFollowing={isFollowing} />
				<span>
					{isFollowing ? 'Notifications on' : 'Notifications off'}
				</span>
			</span>
		</button>
	);
};
