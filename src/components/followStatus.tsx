// ----- Imports ----- //

import type { FC } from 'react';

// ----- Component ----- //

interface Props {
	isFollowing: boolean;
}

type IconProps = Props;

const FollowIcon: FC<IconProps> = ({ isFollowing }) => {
	if (isFollowing) {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="following-icon"
				viewBox="0 0 24 24"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm2.159-17.027c0 1.667-1.518 3.034-2.806 3.034-1.147 0-2.788-1.367-2.788-3.034 0-1.666 1.023-2.633 2.788-2.633s2.806.967 2.806 2.633zm2.012 3.667l-.76.7.795.75.741.716L20 9.924l-.741-.716-2.312 2.183-.776-.75zm-2.683.867a12.282 12.282 0 00-2.135-.167c-1.553 0-2.824.2-4.235.65l-.724.683-1.394 5 .688.667h11.294l.724-.667-.777-2.733c-1.8-.3-3.247-1.7-3.44-3.433z"
				/>
			</svg>
		);
	} else {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="follow-icon"
				viewBox="0 0 24 24"
			>
				<circle cx="12" cy="12" r="12" />
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M11.167 9.833c1.216 0 2.65-1.366 2.65-3.033 0-1.667-.984-2.633-2.65-2.633-1.667 0-2.634.966-2.634 2.633s1.55 3.033 2.634 3.033zm6.5 3.667h-1v-2.167H14.5v-1h2.167V8.167h1v2.166h2.166v1h-2.166V13.5zm-6.5-2.333c.716 0 1.4.05 2.016.166.184 1.734 1.55 3.134 3.25 3.434l.734 2.733-.684.667H5.817l-.65-.667 1.316-5 .684-.683c1.333-.45 2.533-.65 4-.65z"
				/>
			</svg>
		);
	}
};

const FollowStatus: FC<Props> = ({ isFollowing }) => (
	<>
		<FollowIcon isFollowing={isFollowing} />{' '}
		<span>{isFollowing ? 'Following' : 'Follow'}</span>{' '}
	</>
);

// ----- Exports ----- //

export default FollowStatus;
