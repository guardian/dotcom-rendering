import { css } from '@emotion/react';
import type { StoryFn } from '@storybook/react-webpack5';
import { lightDecorator } from '../../../.storybook/decorators/themeDecorator';
import preview from '../../../.storybook/preview';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../../lib/articleFormat';
import { EditorialLinkButton } from './EditorialLinkButton';
import type { EditorialLinkButtonProps } from './EditorialLinkButton';

const meta = preview.meta({
	title: 'Components/EditorialLinkButton',
	component: EditorialLinkButton,
});

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

export const WhenPrimary = meta.story({
	args: {
		priority: 'primary',
		size: 'small',
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: Template,
});
// *****************************************************************************

export const WhenSecondary = meta.story({
	args: {
		priority: 'secondary',
		size: 'small',
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: Template,
});
// *****************************************************************************

export const WhenTertiary = meta.story({
	args: {
		priority: 'tertiary',
		size: 'small',
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: Template,
});
// *****************************************************************************

export const WhenSubdued = meta.story({
	args: {
		priority: 'subdued',
		size: 'small',
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: Template,
});
// *****************************************************************************

export const WithOverrides = meta.story({
	args: {
		cssOverrides: css`
			background-color: pink;
			border: pink;
		`,
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: Template,
});
