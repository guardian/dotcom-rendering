import { css } from '@emotion/react';
import { Topic } from '@guardian/bridget/Topic';
import { useEffect, useState } from 'react';
import { getNotificationsClient, getTagClient } from '../lib/bridgetApi';
import { FollowNotificationsButton, FollowTagButton } from './FollowButtons';

type Props = {
	id: string;
	displayName: string;
	format: ArticleFormat;
};

export const FollowWrapper = ({ id, displayName, format }: Props) => {
	const [isFollowingNotifications, setIsFollowingNotifications] = useState<
		boolean | undefined
	>(undefined);
	const [isFollowingTag, setIsFollowingTag] = useState<boolean | undefined>(
		undefined,
	);
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
			<FollowTagButton
				isFollowing={isFollowingTag ?? false}
				displayName={displayName}
				onClickHandler={
					isFollowingTag !== undefined ? tagHandler : () => undefined
				}
				format={format}
			/>
			<FollowNotificationsButton
				isFollowing={isFollowingNotifications ?? false}
				displayName={displayName}
				onClickHandler={
					isFollowingNotifications !== undefined
						? notificationsHandler
						: () => undefined
				}
				format={format}
			/>
		</div>
	);
};
