import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import { Toast } from './Toast';

const meta = {
	title: 'Components/Toast',
	component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

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
		onClick: () => {},
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: (args) => (
		<div
			css={css`
				position: relative;
				height: ${space[9]}px;
			`}
		>
			<Toast {...args} />
		</div>
	),
} satisfies Story;

// *****************************************************************************

export const Lots = {
	args: {
		count: 239,
		onClick: () => {},
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: Default.render,
} satisfies Story;

// *****************************************************************************
