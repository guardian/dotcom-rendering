import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { FollowNotificationsButton, FollowTagButton } from './FollowButtons';

export default {
	component: [FollowNotificationsButton, FollowTagButton],
	title: 'Components/FollowStatus',
	args: {
		isFollowing: false,
	},
};

export const Default = ({ isFollowing }: { isFollowing: boolean }) => {
	return (
		<>
			<FollowTagButton
				isFollowing={isFollowing}
				displayName={'John Doe'}
				onClickHandler={() => undefined}
			/>
			<FollowNotificationsButton
				isFollowing={isFollowing}
				onClickHandler={() => undefined}
			/>
		</>
	);
};

Default.storyName = 'FollowStatus';
Default.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
	]),
];

export const NotificationsButtonBothStates = () => {
	return (
		<>
			<FollowNotificationsButton
				isFollowing={false}
				onClickHandler={() => undefined}
			/>
			<FollowNotificationsButton
				isFollowing={true}
				onClickHandler={() => undefined}
			/>
		</>
	);
};
NotificationsButtonBothStates.decorators = [splitTheme()];

export const FollowContributorBothStates = () => {
	return (
		<>
			<FollowTagButton
				isFollowing={false}
				displayName={'John Doe'}
				onClickHandler={() => undefined}
			/>
			<FollowTagButton
				isFollowing={true}
				displayName={'John Doe'}
				onClickHandler={() => undefined}
			/>
		</>
	);
};
FollowContributorBothStates.decorators = [splitTheme()];
