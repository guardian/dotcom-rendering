// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	SvgCheckmark,
	SvgNotificationsOff,
	SvgNotificationsOn,
	SvgPlus,
} from '@guardian/source-react-components';

import type { FC } from 'react';

// ----- Component ----- //

interface Props {
	isFollowing: boolean;
	contributorName: string;
}

// todo background color comes from Format!
const followIconDivStyles = (isFollowing: boolean): SerializedStyles => css`
	background-color: ${isFollowing ? 'currentColor' : 'none'};
	height: 24px;
	width: 24px;
	${!isFollowing && 'border: 1px solid currentColor'};
	${isFollowing && 'padding-top: 0.15ch'};
	border-radius: 100%;
	svg {
		fill: ${isFollowing ? 'white' : 'currentColor'};
		height: 18px;
		width: 18px;
		margin-top: 2px;
	}
`;

export const FollowNotificationStatus: FC<Props> = ({
	isFollowing,
	contributorName,
}) => (
	<>
		<span css={followIconDivStyles(isFollowing)}>
			{isFollowing ? <SvgNotificationsOn /> : <SvgNotificationsOff />}
		</span>
		<span>{isFollowing ? 'Notifications on' : 'Notifications off'}</span>
	</>
);

export const FollowTagStatus: FC<Props> = ({
	isFollowing,
	contributorName,
}) => (
	<>
		<span css={followIconDivStyles(isFollowing)}>
			{isFollowing ? <SvgCheckmark /> : <SvgPlus />}
		</span>

		<span>
			{isFollowing ? 'Following' : 'Follow'} {contributorName}
		</span>
	</>
);
