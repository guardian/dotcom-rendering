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
						<SvgNotificationsOn size="xsmall" />
					</svg>
				</span>
			) : (
				<span className="notifications-off">
					<svg>
						<SvgNotificationsOff size="xsmall" />
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
						<SvgCheckmark size="xsmall" />
					</svg>
				</span>
			) : (
				<span className="tag-not-following">
					<svg>
						<SvgPlus size="xsmall" />
					</svg>
				</span>
			)}

			<span>
				{isFollowing ? 'Following' : 'Follow'} {contributorName}
			</span>
		</>
	);
};
