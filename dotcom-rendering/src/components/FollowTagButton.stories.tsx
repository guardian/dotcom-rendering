import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { FollowTagButton } from './FollowTagButton';

export default {
	component: FollowTagButton,
	title: 'Components/FollowTagButton',
	args: {
		isFollowing: false,
	},
};

export const Default = ({ isFollowing }: { isFollowing: boolean }) => {
	return (
		<FollowTagButton
			isFollowing={isFollowing}
			displayName={'John Doe'}
			onClickHandler={() => undefined}
		/>
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
