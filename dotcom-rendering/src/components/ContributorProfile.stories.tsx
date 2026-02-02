import { css } from '@emotion/react';
import {
	headlineBold17,
	space,
	textEgyptian14,
} from '@guardian/source/foundations';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { palette } from '../palette';
import { Avatar } from './Avatar';
import { ContributorProfile } from './ContributorProfile.importable';
import { FollowTagButtonPill } from './FollowButtons';

export default {
	component: ContributorProfile,
	title: 'Components/ContributorProfile',
};

// Mock contributor data
const mockContributor = {
	id: 'profile/george-monbiot',
	displayName: 'George Monbiot',
	avatarUrl: 'https://i.guim.co.uk/img/uploads/2025/05/21/George_Monbiot.png',
	bio: `<p>A Guardian columnist, and author of The Invisible Doctrine: The Secret History of Neoliberalism (with Peter Hutchison)</p>`,
	bioText:
		'A Guardian columnist, and author of The Invisible Doctrine: The Secret History of Neoliberalism (with Peter Hutchison)',
};

const longBio = `<p>Marina Hyde is a Guardian columnist. She has won multiple awards for her writing, including the British Press Awards' Columnist of the Year in 2022. Her work covers politics, sport, and celebrity culture with a distinctive satirical edge.</p><p>She is also the author of several books and appears regularly on podcasts discussing current affairs.</p>`;

// Shared styles
const containerStyles = css`
	max-width: 400px;
	padding: 16px;
`;

const opinionDecorator = splitTheme([
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Comment,
		theme: Pillar.Opinion,
	},
]);

const allPillarsDecorator = splitTheme([
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Comment,
		theme: Pillar.News,
	},
	{
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Comment,
		theme: Pillar.Opinion,
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
]);

// Component stories
export const WithAvatarAndBio = () => (
	<div css={containerStyles}>
		<ContributorProfile
			id={mockContributor.id}
			displayName={mockContributor.displayName}
			avatarUrl={mockContributor.avatarUrl}
			bio={mockContributor.bio}
		/>
	</div>
);
WithAvatarAndBio.storyName = 'With Avatar and Bio';
WithAvatarAndBio.decorators = [opinionDecorator];

export const WithoutAvatar = () => (
	<div css={containerStyles}>
		<ContributorProfile
			id={mockContributor.id}
			displayName={mockContributor.displayName}
			bio={mockContributor.bio}
		/>
	</div>
);
WithoutAvatar.storyName = 'Without Avatar';
WithoutAvatar.decorators = [opinionDecorator];

export const AllPillars = () => (
	<div css={containerStyles}>
		<ContributorProfile
			id={mockContributor.id}
			displayName={mockContributor.displayName}
			avatarUrl={mockContributor.avatarUrl}
			bio={mockContributor.bio}
		/>
	</div>
);
AllPillars.storyName = 'All Pillars';
AllPillars.decorators = [allPillarsDecorator];

export const LongBio = () => (
	<div css={containerStyles}>
		<ContributorProfile
			id="profile/marina-hyde"
			displayName="Marina Hyde"
			avatarUrl={mockContributor.avatarUrl}
			bio={longBio}
		/>
	</div>
);
LongBio.storyName = 'Long Bio';
LongBio.decorators = [opinionDecorator];

const previewContainerStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[3]}px;
`;

const previewTopRowStyles = css`
	display: flex;
	flex-direction: row;
	gap: ${space[3]}px;
`;

const previewAvatarContainerStyles = css`
	width: 80px;
	height: 80px;
	flex-shrink: 0;
`;

const previewContentStyles = css`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const previewTitleStyles = css`
	${headlineBold17};
	color: ${palette('--byline-anchor')};
	margin: 0 0 ${space[1]}px;
`;

const previewBioStyles = css`
	${textEgyptian14};
	font-weight: 500;
	line-height: 1.3;
	letter-spacing: -0.01em;
	color: ${palette('--article-text')};
	margin: 0;
`;

const ProfilePreview = ({ isFollowing }: { isFollowing: boolean }) => (
	<div css={containerStyles}>
		<div css={previewContainerStyles}>
			<div css={previewTopRowStyles}>
				<div css={previewAvatarContainerStyles}>
					<Avatar
						src={mockContributor.avatarUrl}
						alt={mockContributor.displayName}
						shape="round"
						imageSize="small"
					/>
				</div>
				<div css={previewContentStyles}>
					<h3 css={previewTitleStyles}>
						{mockContributor.displayName}
					</h3>
					<p css={previewBioStyles}>{mockContributor.bioText}</p>
				</div>
			</div>
			<div>
				<FollowTagButtonPill
					isFollowing={isFollowing}
					onClickHandler={() => undefined}
				/>
			</div>
		</div>
	</div>
);

export const VisualPreviewWithButton = () => (
	<ProfilePreview isFollowing={false} />
);
VisualPreviewWithButton.storyName = 'With Follow Button (Follow)';
VisualPreviewWithButton.decorators = [opinionDecorator];

export const VisualPreviewFollowingState = () => (
	<ProfilePreview isFollowing={true} />
);
VisualPreviewFollowingState.storyName = 'With Follow Button (Following)';
VisualPreviewFollowingState.decorators = [opinionDecorator];

export const VisualPreviewAllPillars = () => (
	<ProfilePreview isFollowing={false} />
);
VisualPreviewAllPillars.storyName = 'With Follow Button (All Pillars)';
VisualPreviewAllPillars.decorators = [allPillarsDecorator];
