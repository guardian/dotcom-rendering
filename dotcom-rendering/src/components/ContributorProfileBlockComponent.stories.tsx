import { css } from '@emotion/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { ContributorProfileBlockComponent } from './ContributorProfileBlockComponent.importable';

export default {
	component: ContributorProfileBlockComponent,
	title: 'Components/ContributorProfileBlockComponent',
};

const mockContributor = {
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

const Wrapper = ({ withBio = true }: { withBio?: boolean }) => (
	<div css={containerStyles}>
		<ContributorProfileBlockComponent
			contributorId={mockContributor.contributorId}
			displayName={mockContributor.displayName}
			avatarUrl={mockContributor.avatarUrl}
			bio={withBio ? mockContributor.bio : undefined}
		/>
	</div>
);

export const Default = () => <Wrapper />;
Default.storyName = 'Default (Opinion)';
Default.decorators = [opinionDecorator];

export const WithoutBio = () => <Wrapper withBio={false} />;
WithoutBio.storyName = 'Without Bio';
WithoutBio.decorators = [opinionDecorator];

export const AllPillars = () => <Wrapper />;
AllPillars.storyName = 'All Pillars';
AllPillars.decorators = [allPillarsDecorator];
