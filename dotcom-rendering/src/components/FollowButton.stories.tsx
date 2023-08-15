import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
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
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
		/>
	);
};
export const Following = () => {
	return (
		<FollowButton
			displayName="Contributor"
			isFollowing={true}
			onClickHandler={() => undefined}
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.Opinion,
			}}
		/>
	);
};
