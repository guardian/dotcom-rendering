import { css } from '@emotion/react';
import { mocked } from 'storybook/test';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { getNotificationsClient, getTagClient } from '../lib/bridgetApi';
import { useIsBridgetCompatible } from '../lib/useIsBridgetCompatible';
import { useIsMyGuardianEnabled } from '../lib/useIsMyGuardianEnabled';
import { ContributorFollowBlockComponent } from './ContributorFollowBlockComponent.importable';

const opinionFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Comment,
	theme: Pillar.Opinion,
};

export default {
	component: ContributorFollowBlockComponent,
	title: 'Components/ContributorFollowBlockComponent',
	async beforeEach() {
		mocked(useIsMyGuardianEnabled).mockReturnValue(true);
		mocked(useIsBridgetCompatible).mockReturnValue(true);
	},
	parameters: {
		formats: [opinionFormat],
	},
};

const contributorData = {
	contributorId: 'profile/george-monbiot',
	displayName: 'George Monbiot',
	avatarUrl:
		'https://i.guim.co.uk/img/uploads/2017/10/06/George-Monbiot,-L.png?width=300&quality=85&auto=format&fit=max&s=b4786b498dac53ea736ef05160a2a172',
	bio: '<p>George Monbiot is a Guardian columnist and author of The Invisible Doctrine: The Secret History of Neoliberalism</p>',
};

const containerStyles = css`
	max-width: 620px;
	padding: 16px;
`;

const mockBridgetClients = (
	isFollowingTag: boolean,
	isFollowingNotifications: boolean,
) => {
	mocked(getTagClient).mockReturnValue({
		isFollowing: () => Promise.resolve(isFollowingTag),
		follow: () => Promise.resolve(true),
		unfollow: () => Promise.resolve(true),
	} as unknown as ReturnType<typeof getTagClient>);
	mocked(getNotificationsClient).mockReturnValue({
		isFollowing: () => Promise.resolve(isFollowingNotifications),
		follow: () => Promise.resolve(true),
		unfollow: () => Promise.resolve(true),
	} as unknown as ReturnType<typeof getNotificationsClient>);
};

const ContributorFollowBlockStory = () => (
	<div css={containerStyles}>
		<ContributorFollowBlockComponent
			contributorId={contributorData.contributorId}
			displayName={contributorData.displayName}
			avatarUrl={contributorData.avatarUrl}
			bio={contributorData.bio}
		/>
	</div>
);

export const NotFollowing = () => <ContributorFollowBlockStory />;
NotFollowing.storyName = 'Not Following';
NotFollowing.beforeEach = () => {
	mockBridgetClients(false, false);
};

export const Following = () => <ContributorFollowBlockStory />;
Following.storyName = 'Following';
Following.beforeEach = () => {
	mockBridgetClients(true, false);
};

export const FollowingWithNotifications = () => <ContributorFollowBlockStory />;
FollowingWithNotifications.storyName = 'Following with Notifications';
FollowingWithNotifications.beforeEach = () => {
	mockBridgetClients(true, true);
};

export const AllPillars = () => <ContributorFollowBlockStory />;
AllPillars.storyName = 'All Pillars';
AllPillars.parameters = {
	formats: [
		opinionFormat,
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: Pillar.News,
		},
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: Pillar.Sport,
		},
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: Pillar.Culture,
		},
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: Pillar.Lifestyle,
		},
	],
};
AllPillars.beforeEach = () => {
	mockBridgetClients(false, false);
};
