// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { darkMode, lightMode } from '../lib/decorators';
import { HeadlineExample } from './HeadlineExample';

// ----- Meta ----- //

const meta: Meta<typeof HeadlineExample> = {
	title: 'components/HeadlineExample',
	component: HeadlineExample,
};

export default meta;

// ----- Stories ----- //

type Story = StoryObj<typeof HeadlineExample>;

const articleFormat: ArticleFormat = {
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme: ArticlePillar.News,
};

export const LightHeadline: Story = {
	args: {
		text: 'A short example headline',
	},
	decorators: [lightMode(articleFormat)],
};

export const DarkHeadline: Story = {
	args: LightHeadline.args,
	decorators: [darkMode(articleFormat)],
};
