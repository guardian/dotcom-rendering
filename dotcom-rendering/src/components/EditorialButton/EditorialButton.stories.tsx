import { css } from '@emotion/react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { lightDecorator } from '../../../.storybook/decorators/themeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../../lib/articleFormat';
import { EditorialButton } from './EditorialButton';
import type { EditorialButtonProps } from './EditorialButton';

const meta: Meta<typeof EditorialButton> = {
	title: 'Components/EditorialButton',
	component: EditorialButton,
} satisfies Meta<typeof EditorialButton>;

export default meta;

type Story = StoryObj<typeof meta>;

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

export const WhenPrimary = {
	args: {
		priority: 'primary',
		size: 'small',
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: Template,
} satisfies Story;
// *****************************************************************************

export const WhenSecondary = {
	args: {
		priority: 'secondary',
		size: 'small',
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: Template,
} satisfies Story;
// *****************************************************************************

export const WhenTertiary = {
	args: {
		priority: 'tertiary',
		size: 'small',
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: Template,
} satisfies Story;
// *****************************************************************************

export const WhenSubdued = {
	args: {
		priority: 'subdued',
		size: 'small',
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: Template,
} satisfies Story;
// *****************************************************************************

export const WithOverrides = {
	args: {
		cssOverrides: css`
			background-color: pink;
		`,
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: Template,
} satisfies Story;
