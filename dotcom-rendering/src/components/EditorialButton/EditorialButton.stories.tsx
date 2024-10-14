import { css } from '@emotion/react';
import type { Meta, StoryFn } from '@storybook/react';
import { lightDecorator } from '../../../.storybook/decorators/themeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../../lib/format';
import { EditorialButton } from './EditorialButton';
import type { EditorialButtonProps } from './EditorialButton';

const meta: Meta<typeof EditorialButton> = {
	title: 'Components/EditorialButton',
	component: EditorialButton,
};

export default meta;

const Template: StoryFn<typeof EditorialButton> = (
	args: EditorialButtonProps,
) => {
	// Providing any value for cssOverrides, even undefined, overrides the custom styles
	// for the editorial button so only pass through if it's defined
	const { cssOverrides, ...rest } = args;
	const props = rest as EditorialButtonProps;

	if (cssOverrides) {
		props.cssOverrides = cssOverrides;
	}

	return <EditorialButton {...props}>Click me</EditorialButton>;
};

const pillars = [
	Pillar.News,
	Pillar.Sport,
	Pillar.Culture,
	Pillar.Lifestyle,
	Pillar.Opinion,
	ArticleSpecial.SpecialReport,
	ArticleSpecial.Labs,
];

const allThemeStandardVariations = pillars.map((theme) => ({
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme,
}));

export const WhenPrimary: StoryFn<typeof EditorialButton> = Template.bind({});
WhenPrimary.args = {
	priority: 'primary',
	size: 'small',
};
WhenPrimary.decorators = [lightDecorator(allThemeStandardVariations)];

// *****************************************************************************

export const WhenSecondary: StoryFn<typeof EditorialButton> = Template.bind({});
WhenSecondary.args = {
	priority: 'secondary',
	size: 'small',
};
WhenSecondary.decorators = [lightDecorator(allThemeStandardVariations)];

// *****************************************************************************

export const WhenTertiary: StoryFn<typeof EditorialButton> = Template.bind({});
WhenTertiary.args = {
	priority: 'tertiary',
	size: 'small',
};
WhenTertiary.decorators = [lightDecorator(allThemeStandardVariations)];

// *****************************************************************************

export const WhenSubdued: StoryFn<typeof EditorialButton> = Template.bind({});
WhenSubdued.args = {
	priority: 'subdued',
	size: 'small',
};
WhenSubdued.decorators = [lightDecorator(allThemeStandardVariations)];

// *****************************************************************************

export const WithOverrides: StoryFn<typeof EditorialButton> = Template.bind({});
WithOverrides.args = {
	cssOverrides: css`
		background-color: pink;
	`,
};
WithOverrides.decorators = [lightDecorator(allThemeStandardVariations)];
