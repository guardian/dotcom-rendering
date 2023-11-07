import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { FollowNotificationsButton, FollowTagButton } from './FollowButtons';

export default {
	component: FollowNotificationsButton,
	title: 'Components/FollowStatus',
};

export const FollowComponentButtonsFalse = () => {
	return (
		<>
			<FollowNotificationsButton
				isFollowing={false}
				onClickHandler={() => undefined}
			/>
			<FollowTagButton
				isFollowing={false}
				displayName={'John Doe'}
				onClickHandler={() => undefined}
			/>
		</>
	);
};
FollowComponentButtonsFalse.decorators = [
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	},
];

export const FollowComponentButtonsTrue = () => {
	return (
		<>
			<FollowTagButton
				isFollowing={true}
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
FollowComponentButtonsTrue.decorators = [
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	},
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
