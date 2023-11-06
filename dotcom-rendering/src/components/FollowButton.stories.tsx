import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { FollowButton } from './FollowButton';

export default {
	component: FollowButton,
	title: 'Components/FollowStatus',
};

export const NotFollowing = () => {
	return (
		<FollowButton
			displayName="Contributor"
			isFollowing={false}
			onClickHandler={() => undefined}
		/>
	);
};
NotFollowing.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
	]),
];

export const Following = () => {
	return (
		<FollowButton
			displayName="Contributor"
			isFollowing={true}
			onClickHandler={() => undefined}
		/>
	);
};
Following.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Opinion,
		},
	]),
];
