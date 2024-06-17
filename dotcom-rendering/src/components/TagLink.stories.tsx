import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { type Meta, type StoryObj } from '@storybook/react';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { TagLink } from './TagLink';

const meta = {
	component: TagLink,
	title: 'Components/TagLink',
} satisfies Meta<typeof TagLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		sectionLabel: 'Euro 24',
		sectionUrl: 'football/euro-24',
		guardianBaseURL: 'https://www.theguardian.com',
		isMatch: false,
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
	decorators: [centreColumnDecorator],
} satisfies Story;

export const MatchLiveBlog = {
	args: {
		sectionLabel: 'Euro 24',
		sectionUrl: 'football/euro-24',
		guardianBaseURL: 'https://www.theguardian.com',
		isMatch: true,
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
	decorators: [centreColumnDecorator],
} satisfies Story;
