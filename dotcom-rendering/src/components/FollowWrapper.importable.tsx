import { css } from '@emotion/react';
import { Topic } from '@guardian/bridget/Topic';
import { useEffect, useState } from 'react';
import { getNotificationsClient } from '../lib/bridgetApi';
import { useGetBridgetVersion } from '../lib/getBridgetVersion';
import { FollowButton } from './FollowButton';

type Props = {
	id: string;
	displayName: string;
	format: ArticleFormat;
};

export const FollowWrapper = ({ id, displayName, format }: Props) => {
	// For testing
	useGetBridgetVersion();
	const [isFollowing, setIsFollowing] = useState<boolean | undefined>(
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
			? void getNotificationsClient()
					.unfollow(topic)
					.then(() => setIsFollowing(false))
					.catch((e) => console.error(e))
			: void getNotificationsClient()
					.follow(topic)
					.then(() => setIsFollowing(true))
					.catch((e) => console.error(e));
	};
	return (
		<div
			css={css`
				min-height: 24px;
			`}
		>
			<FollowButton
				isFollowing={isFollowing ?? false}
				displayName={displayName}
				onClickHandler={
					isFollowing !== undefined ? handler : () => undefined
				}
				format={format}
			/>
		</div>
	);
};
