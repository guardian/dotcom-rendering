import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { FollowNotificationsButton, FollowTagButton } from './FollowButtons';

export default {
	component: [FollowNotificationsButton, FollowTagButton],
	title: 'Components/FollowStatusButtons',
};

export const NotFollowing = () => {
	return (
		<>
			<FollowTagButton
				displayName="Contributor"
				isFollowing={false}
				onClickHandler={() => undefined}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
			/>
			<FollowNotificationsButton
				displayName="Contributor"
				isFollowing={false}
				onClickHandler={() => undefined}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
			/>
		</>
	);
};
export const Following = () => {
	return (
		<>
			<FollowTagButton
				displayName="Contributor"
				isFollowing={true}
				onClickHandler={() => undefined}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
			/>
			<FollowNotificationsButton
				displayName="Contributor"
				isFollowing={true}
				onClickHandler={() => undefined}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
			/>
		</>
	);
};
