import { css } from '@emotion/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import {
	FollowNotificationsButton,
	FollowTagButton,
	FollowTagButtonVariant,
} from './FollowButtons';

export default {
	component: FollowTagButton,
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
			<FollowTagButtonVariant
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

const variantContainerStyles = css`
	display: flex;
	gap: 16px;
	margin-bottom: 16px;
`;

export const VariantFollowTagButtonBothStates = () => {
	return (
		<div css={variantContainerStyles}>
			<FollowTagButtonVariant
				isFollowing={false}
				onClickHandler={() => undefined}
			/>
			<FollowTagButtonVariant
				isFollowing={true}
				onClickHandler={() => undefined}
			/>
		</div>
	);
};
VariantFollowTagButtonBothStates.storyName = 'Variant Button - Both States';
VariantFollowTagButtonBothStates.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
	]),
];

export const VariantFollowTagButtonAllPillars = () => {
	return (
		<div css={variantContainerStyles}>
			<FollowTagButtonVariant
				isFollowing={false}
				onClickHandler={() => undefined}
			/>
			<FollowTagButtonVariant
				isFollowing={true}
				onClickHandler={() => undefined}
			/>
		</div>
	);
};
VariantFollowTagButtonAllPillars.storyName = 'Variant Button - All Pillars';
VariantFollowTagButtonAllPillars.decorators = [
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
