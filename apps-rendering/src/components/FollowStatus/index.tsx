// ----- Imports ----- //
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

export const FollowNotificationStatus: FC<Props> = ({ isFollowing }) => {
	return (
		<>
			{isFollowing ? (
				<span className="notifications-on">
					<svg>
						<SvgNotificationsOn />{' '}
					</svg>
				</span>
			) : (
				<span className="notifications-off">
					<svg>
						<SvgNotificationsOff />
					</svg>
				</span>
			)}

			<span>
				{isFollowing ? 'Notifications on' : 'Notifications off'}
			</span>
		</>
	);
};

export const FollowTagStatus: FC<Props> = ({
	isFollowing,
	contributorName,
}) => {
	return (
		<>
			{isFollowing ? (
				<span className="tag-following">
					<svg>
						<SvgCheckmark />
					</svg>
				</span>
			) : (
				<span className="tag-not-following">
					<svg>
						<SvgPlus />
					</svg>
				</span>
			)}

			<span>
				{isFollowing ? 'Following' : 'Follow'} {contributorName}
			</span>
		</>
	);
};
