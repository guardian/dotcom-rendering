import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import type { ToastProps } from './Toast';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
	title: 'Components/Toast',
	component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: StoryFn<typeof Toast> = (args: ToastProps) => {
	return (
		<div
			css={css`
				position: relative;
				height: ${space[9]}px;
			`}
		>
			<Toast {...args} />
		</div>
	);
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

export const Default = {
	args: {
		count: 3,
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	// @ts-expect-error: ToDo: find out why this type is wrong (see EditorialLinkButton)
	render: Template,
} satisfies Story;

// *****************************************************************************

export const Lots = {
	args: {
		count: 239,
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	// @ts-expect-error: ToDo: find out why this type is wrong (see EditorialLinkButton)
	render: Template,
} satisfies Story;

// *****************************************************************************
