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
import { EditorialButton } from './EditorialButton';
import type { EditorialButtonProps } from './EditorialButton';

const meta = preview.meta({
	title: 'Components/EditorialButton',
	component: EditorialButton,
});

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
		`,
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: Template,
});
