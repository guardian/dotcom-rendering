import { css } from '@emotion/react';
import type { Meta, StoryFn } from '@storybook/react';
import { lightDecorator } from '../../../.storybook/decorators/themeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../../lib/format';
import { EditorialLinkButton } from './EditorialLinkButton';
import type { EditorialLinkButtonProps } from './EditorialLinkButton';

const meta: Meta<typeof EditorialLinkButton> = {
	title: 'Components/EditorialLinkButton',
	component: EditorialLinkButton,
};

export default meta;

const Template: StoryFn<typeof EditorialLinkButton> = (
	args: EditorialLinkButtonProps,
) => {
	// Providing any value for cssOverrides, even undefined, overrides the custom styles
	// for the editorial button so only pass through if it's defined
	const { cssOverrides, ...rest } = args;
	const props = rest as EditorialLinkButtonProps;

	if (cssOverrides) {
		props.cssOverrides = cssOverrides;
	}

	return <EditorialLinkButton {...props}>Click me</EditorialLinkButton>;
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

export const WhenPrimary: StoryFn<typeof EditorialLinkButton> = Template.bind(
	{},
);
WhenPrimary.args = {
	priority: 'primary',
	size: 'small',
};
WhenPrimary.decorators = [lightDecorator(allThemeStandardVariations)];

// *****************************************************************************

export const WhenSecondary: StoryFn<typeof EditorialLinkButton> = Template.bind(
	{},
);
WhenSecondary.args = {
	priority: 'secondary',
	size: 'small',
};
WhenSecondary.decorators = [lightDecorator(allThemeStandardVariations)];

// *****************************************************************************

export const WhenTertiary: StoryFn<typeof EditorialLinkButton> = Template.bind(
	{},
);
WhenTertiary.args = {
	priority: 'tertiary',
	size: 'small',
};
WhenTertiary.decorators = [lightDecorator(allThemeStandardVariations)];

// *****************************************************************************

export const WhenSubdued: StoryFn<typeof EditorialLinkButton> = Template.bind(
	{},
);
WhenSubdued.args = {
	priority: 'subdued',
	size: 'small',
};
WhenSubdued.decorators = [lightDecorator(allThemeStandardVariations)];

// *****************************************************************************

export const WithOverrides: StoryFn<typeof EditorialLinkButton> = Template.bind(
	{},
);
WithOverrides.args = {
	cssOverrides: css`
		background-color: pink;
	`,
};
WithOverrides.decorators = [lightDecorator(allThemeStandardVariations)];
