// ----- Imports ----- //
import {
	SvgCheckmark,
	SvgNotificationsOff,
	SvgNotificationsOn,
	SvgPlus,
} from '@guardian/source/react-components';

// ----- Component ----- //

interface Props {
	isFollowing: boolean;
	contributorName: string;
}

export const FollowNotificationStatus = ({ isFollowing }: Props) => {
	return (
		<>
			{isFollowing ? (
				<span className="notifications-on">
					<object>
						<SvgNotificationsOn size="xsmall" />
					</object>
				</span>
			) : (
				<span className="notifications-off">
					<object>
						<SvgNotificationsOff size="xsmall" />
					</object>
				</span>
			)}

			<span>
				{isFollowing ? 'Notifications on' : 'Notifications off'}
			</span>
		</>
	);
};

export const FollowTagStatus = ({ isFollowing, contributorName }: Props) => {
	return (
		<>
			{isFollowing ? (
				<span className="tag-following">
					<object>
						<SvgCheckmark size="xsmall" />
					</object>
				</span>
			) : (
				<span className="tag-not-following">
					<object>
						<SvgPlus size="xsmall" />
					</object>
				</span>
			)}

			<span>
				{isFollowing ? 'Following' : 'Follow'} {contributorName}
			</span>
		</>
	);
};
