import { css } from '@emotion/react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
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
} satisfies Meta<typeof EditorialLinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

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
