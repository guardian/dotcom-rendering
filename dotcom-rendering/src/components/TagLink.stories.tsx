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

export const ThemeVariations = {
	args: {
		sectionLabel: 'Euro 24',
		sectionUrl: 'football/euro-24',
		guardianBaseURL: 'https://www.theguardian.com',
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
	},
	decorators: [centreColumnDecorator],
} satisfies Story;
