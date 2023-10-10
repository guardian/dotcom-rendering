import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { FollowNotificationsButton, FollowTagButton } from './FollowButtons';

export default {
	component: [FollowNotificationsButton, FollowTagButton],
	title: 'Components/FollowStatusButtons',
	argTypes: {
		theme: {
			description: 'Pillar theme',
			options: [0, 1, 2, 3, 4],
			mapping: [
				Pillar.News,
				Pillar.Opinion,
				Pillar.Sport,
				Pillar.Culture,
				Pillar.Lifestyle,
			],
			control: {
				type: 'inline-radio',
				labels: Object.values(Pillar),
			},
		},
	},
	args: {
		isFollowing: false,
		theme: Pillar.News,
	},
};

export const FollowStatusButtons = (args: {
	isFollowing: boolean;
	theme: Pillar;
}) => {
	return (
		<>
			<FollowTagButton
				displayName="Contributor"
				isFollowing={args.isFollowing}
				onClickHandler={() => undefined}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: args.theme,
				}}
			/>
			<FollowNotificationsButton
				displayName="Contributor"
				isFollowing={args.isFollowing}
				onClickHandler={() => undefined}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: args.theme,
				}}
			/>
		</>
	);
};
