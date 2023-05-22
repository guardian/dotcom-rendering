// ----- Imports ----- //

import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { Meta, StoryObj, Decorator } from '@storybook/react';
import { HeadlineExample } from './HeadlineExample';
import { paletteDeclarations } from '../../../src/palette';

// ----- Meta ----- //

const meta: Meta<typeof HeadlineExample> = {
    title: 'components/HeadlineExample',
    component: HeadlineExample,
}

export default meta;

// ----- Decorators ----- //

/**
 * Creates storybook decorator used to wrap components in an element
 * containing the light or dark mode palette colours.
 * 
 * @param colourScheme Choose whether to use the light or dark palette.
 * @returns A decorator that wraps the component in a `div` containing the
 * palette colours as CSS custom properties.
 */
const colourSchemeDecorator = (
    colourScheme: 'light' | 'dark',
): Decorator => (Story) => (
    <div css={css(paletteDeclarations(format, colourScheme))}>
        <Story />
    </div>
)

// ----- Stories ----- //

type Story = StoryObj<typeof HeadlineExample>;

const format: ArticleFormat = {
    design: ArticleDesign.Standard,
    display: ArticleDisplay.Standard,
    theme: ArticlePillar.News,
};

export const LightHeadline: Story = {
    args: {
        text: 'A short example headline',
    },
    decorators: [ colourSchemeDecorator('light') ]
}

export const DarkHeadline: Story = {
    args: LightHeadline.args,
    decorators: [ colourSchemeDecorator('dark') ]
}
