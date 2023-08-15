import { Topic } from '@guardian/bridget/Topic';
import { useEffect, useState } from 'react';
import { notificationsClient } from '../lib/bridgetApi';
import { FollowButton } from './FollowButton';

type Props = {
	id: string;
	displayName: string;
	format: ArticleFormat;
};

export const FollowWrapper = ({ id, displayName, format }: Props) => {
	const [isFollowing, setIsFollowing] = useState<boolean>(false);
	useEffect(() => {
		const topic = new Topic({
			id,
			displayName,
			type: 'tag-contributor',
		});

		void notificationsClient
			.isFollowing(topic)
			.then(setIsFollowing)
			.catch((e) => console.error(e));
	}, [id, displayName]);

	const handler = () => {
		const topic = new Topic({
			id,
			displayName,
			type: 'tag-contributor',
		});

		isFollowing
			? void notificationsClient
					.unfollow(topic)
					.then(() => setIsFollowing(false))
					.catch((e) => console.error(e))
			: void notificationsClient
					.follow(topic)
					.then(() => setIsFollowing(true))
					.catch((e) => console.error(e));
	};
	return (
		<FollowButton
			isFollowing={isFollowing}
			displayName={displayName}
			onClickHandler={handler}
			format={format}
		/>
	);
};
