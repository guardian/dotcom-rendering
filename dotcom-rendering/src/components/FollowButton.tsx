import { css } from '@emotion/react';
import { remSpace, textSans } from '@guardian/source-foundations';
import {
	SvgNotificationsOff,
	SvgNotificationsOn,
} from '@guardian/source-react-components';
import { palette } from '../palette';

type IconProps = {
	isFollowing?: boolean;
};

const FollowIcon = ({ isFollowing }: IconProps) => (
	<div
		css={css`
			${isFollowing &&
			`background-color: ${palette('--follow-icon-fill')};`}
			height: 24px;
			width: 24px;
			margin: 0 0.15rem 0 0;
			${isFollowing
				? 'padding: 0.175rem 0 0  0.175rem;'
				: 'padding: 0.135rem 0 0  0.125rem;'}
			border-radius: 100%;
			${!isFollowing &&
			`border: 1px solid ${palette('--follow-icon-fill')};`}

			svg {
				fill: ${isFollowing
					? `${palette('--follow-icon-background')}`
					: `${palette('--follow-icon-fill')}`};
				height: 18px;
			}
		`}
	>
		{isFollowing ? <SvgNotificationsOn /> : <SvgNotificationsOff />}
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
		<>
			<button onClick={onClickHandler} type="button" css={buttonStyles}>
				<span css={containerStyles}>
					<FollowIcon isFollowing={isFollowing} />
					<span>
						{isFollowing ? 'Notifications on' : 'Notifications off'}
					</span>
				</span>
			</button>
		</>
	);
};
