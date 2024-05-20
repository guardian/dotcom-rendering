import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
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
		/**
		 * This will be replaced by the `formats` parameter, but it's
		 * required by the type.
		 */
		format: {
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
			theme: Pillar.Sport,
		},
		sectionLabel: 'Euro 24',
		sectionUrl: 'football/euro-24',
		guardianBaseURL: 'https://www.theguardian.com',
	},
	decorators: [centreColumnDecorator],
} satisfies Story;
