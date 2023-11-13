// ----- Imports ----- //

import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { paletteDeclarations } from '../palette';
import { HeadlineExample } from './HeadlineExample';

// ----- Meta ----- //

const meta: Meta<typeof HeadlineExample> = {
	title: 'components/HeadlineExample',
	component: HeadlineExample,
};

export default meta;

// ----- Decorators ----- //

/**
 * Creates storybook decorator used to wrap components in an element
 * containing the light or dark mode palette colours.
 *
 * @param colourScheme Choose whether to use the light or darPerformanceNavigation.type palette.
 * @returns A decorator that wraps the component in a `div` containing the
 * palette colours as CSS custom properties.
 */
const colourSchemeDecorator =
	(colourScheme: 'light' | 'dark') =>
	(format: ArticleFormat): Decorator =>
	(Story) =>
		(
			<div css={css(paletteDeclarations(format, colourScheme))}>
				<Story />
			</div>
		);

const lightMode = colourSchemeDecorator('light');
const darkMode = colourSchemeDecorator('dark');

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
