import { css } from '@emotion/react';
import { Topic } from '@guardian/bridget/Topic';
import { useEffect, useState } from 'react';
import { getNotificationsClient, getTagClient } from '../lib/bridgetApi';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { useIsMyGuardianEnabled } from '../lib/useIsMyGuardianEnabled';
import { FollowNotificationsButton, FollowTagButton } from './FollowButtons';

type Props = {
	id: string;
	displayName: string;
};

export const FollowWrapper = ({ id, displayName }: Props) => {
	const [isFollowingNotifications, setIsFollowingNotifications] = useState<
		boolean | undefined
	>(undefined);
	const [isFollowingTag, setIsFollowingTag] = useState<boolean | undefined>(
		undefined,
	);
	const [showFollowTagButton, setShowFollowTagButton] =
		useState<boolean>(false);

	const isMyGuardianEnabled = useIsMyGuardianEnabled();
	const isBridgetCompatible = useIsBridgetCompatible('2.5.0');
	isBridgetCompatible && isMyGuardianEnabled && setShowFollowTagButton(true);

	useEffect(() => {
		const topic = new Topic({
			id,
			displayName,
			type: 'tag-contributor',
		});

		void getNotificationsClient()
			.isFollowing(topic)
			.then(setIsFollowingNotifications)
			.catch((e) => console.error(e));

		void getTagClient()
			.isFollowing(topic)
			.then(setIsFollowingTag)
			.catch((e) => console.error(e));
	}, [id, displayName]);

	const tagHandler = () => {
		const topic = new Topic({
			id,
			displayName,
			type: 'tag-contributor',
		});

		isFollowingTag
			? void getTagClient()
					.unfollow(topic)
					.then(() => setIsFollowingTag(false))
					.catch((e) => console.error(e))
			: void getTagClient()
					.follow(topic)
					.then(() => setIsFollowingTag(true))
					.catch((e) => console.error(e));
	};

	const notificationsHandler = () => {
		const topic = new Topic({
			id,
			displayName,
			type: 'tag-contributor',
		});

		isFollowingNotifications
			? void getNotificationsClient()
					.unfollow(topic)
					.then(() => setIsFollowingNotifications(false))
					.catch((e) => console.error(e))
			: void getNotificationsClient()
					.follow(topic)
					.then(() => setIsFollowingNotifications(true))
					.catch((e) => console.error(e));
	};

	return (
		<div
			css={css`
				min-height: 24px;
			`}
		>
			{showFollowTagButton && (
				<FollowTagButton
					isFollowing={isFollowingTag ?? false}
					displayName={displayName}
					onClickHandler={
						isFollowingTag !== undefined
							? tagHandler
							: () => undefined
					}
				/>
			)}
			<FollowNotificationsButton
				isFollowing={isFollowingNotifications ?? false}
				displayName={displayName}
				onClickHandler={
					isFollowingNotifications !== undefined
						? notificationsHandler
						: () => undefined
				}
			/>
		</div>
	);
};
