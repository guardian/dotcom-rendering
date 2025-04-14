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

const meta: Meta<typeof Toast> = {
	title: 'Components/Toast',
	component: Toast,
	decorators: [
		(Story) => (
			<div
				css={css`
					position: relative;
					height: ${space[9]}px;
				`}
			>
				{Story()}
			</div>
		),
		lightDecorator(allThemeStandardVariations),
	],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		count: 3,
	},
} satisfies Story;

// *****************************************************************************

export const Lots = {
	args: {
		count: 239,
	},
} satisfies Story;

// *****************************************************************************
