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
import {
	FollowNotificationsButtonVariant,
	FollowTagButtonVariant,
} from './FollowButtons';
import { FollowContributorProfile } from './FollowContributorProfile.importable';

export default {
	component: FollowContributorProfile,
	title: 'Components/FollowContributorProfile',
};

const mockContributor = {
	id: 'profile/george-monbiot',
	displayName: 'George Monbiot',
	avatarUrl: 'https://i.guim.co.uk/img/uploads/2025/05/21/George_Monbiot.png',
	bio: `<p>A Guardian columnist, and author of The Invisible Doctrine: The Secret History of Neoliberalism (with Peter Hutchison)</p>`,
	bioText:
		'A Guardian columnist, and author of The Invisible Doctrine: The Secret History of Neoliberalism (with Peter Hutchison)',
};

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

const contributorContainerStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${space[3]}px;
`;

const topRowStyles = css`
	display: flex;
	flex-direction: row;
	gap: ${space[3]}px;
`;

const avatarContainerStyles = css`
	width: 80px;
	height: 80px;
	flex-shrink: 0;
`;

const contentStyles = css`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const titleStyles = css`
	${headlineBold17};
	color: ${palette('--byline-anchor')};
	margin: 0 0 ${space[1]}px;
`;

const bioStyles = css`
	${textEgyptian14};
	font-weight: 500;
	line-height: 1.3;
	letter-spacing: -0.01em;
	color: ${palette('--article-text')};
	margin: 0;
`;

const Wrapper = ({ isFollowing }: { isFollowing: boolean }) => (
	<div css={containerStyles}>
		<div css={contributorContainerStyles}>
			<div css={topRowStyles}>
				<div css={avatarContainerStyles}>
					<Avatar
						src={mockContributor.avatarUrl}
						alt={mockContributor.displayName}
						shape="round"
						imageSize="small"
					/>
				</div>
				<div css={contentStyles}>
					<h3 css={titleStyles}>{mockContributor.displayName}</h3>
					<p css={bioStyles}>{mockContributor.bioText}</p>
				</div>
			</div>
			<div>
				<FollowTagButtonVariant
					isFollowing={isFollowing}
					onClickHandler={() => undefined}
				/>
			</div>
			<div>
				{isFollowing && (
					<div>
						<FollowNotificationsButtonVariant
							isFollowing={false}
							onClickHandler={() => undefined}
						/>
						<FollowNotificationsButtonVariant
							isFollowing={true}
							onClickHandler={() => undefined}
						/>
					</div>
				)}
			</div>
		</div>
	</div>
);

export const ContributorFollow = () => <Wrapper isFollowing={false} />;
ContributorFollow.storyName = 'Follow';
ContributorFollow.decorators = [opinionDecorator];

export const ContributorFollowing = () => <Wrapper isFollowing={true} />;
ContributorFollowing.storyName = 'Following';
ContributorFollowing.decorators = [opinionDecorator];

export const ContributorAllPillars = () => <Wrapper isFollowing={false} />;
ContributorAllPillars.storyName = 'All Pillars';
ContributorAllPillars.decorators = [allPillarsDecorator];
