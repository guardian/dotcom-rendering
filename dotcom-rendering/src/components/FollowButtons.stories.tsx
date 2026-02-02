import { css } from '@emotion/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import {
	FollowNotificationsButton,
	FollowTagButton,
	FollowTagButtonPill,
} from './FollowButtons';

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
			<FollowTagButtonPill
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

const pillContainerStyles = css`
	display: flex;
	gap: 16px;
	margin-bottom: 16px;
`;

export const FollowTagButtonPillBothStates = () => {
	return (
		<div css={pillContainerStyles}>
			<FollowTagButtonPill
				isFollowing={false}
				onClickHandler={() => undefined}
			/>
			<FollowTagButtonPill
				isFollowing={true}
				onClickHandler={() => undefined}
			/>
		</div>
	);
};
FollowTagButtonPillBothStates.storyName = 'Pill Button - Both States';
FollowTagButtonPillBothStates.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
	]),
];

export const FollowTagButtonPillAllPillars = () => {
	return (
		<div css={pillContainerStyles}>
			<FollowTagButtonPill
				isFollowing={false}
				onClickHandler={() => undefined}
			/>
			<FollowTagButtonPill
				isFollowing={true}
				onClickHandler={() => undefined}
			/>
		</div>
	);
};
FollowTagButtonPillAllPillars.storyName = 'Pill Button - All Pillars';
FollowTagButtonPillAllPillars.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Opinion,
		},
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Sport,
		},
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Culture,
		},
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Lifestyle,
		},
	]),
];
