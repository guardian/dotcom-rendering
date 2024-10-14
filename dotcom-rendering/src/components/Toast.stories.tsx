import { css } from '@emotion/react';
import type { Meta, StoryFn } from '@storybook/react';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/format';
import { Toast } from './Toast';
import type { ToastProps } from './Toast';

const meta: Meta<typeof Toast> = {
	title: 'Components/Toast',
	component: Toast,
};

export default meta;

const Template: StoryFn<typeof Toast> = (args: ToastProps) => {
	return (
		<div
			css={css`
				position: relative;
				height: 36px;
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

export const Default: StoryFn<typeof Toast> = Template.bind({});
Default.args = {
	count: 3,
};
Default.decorators = [lightDecorator(allThemeStandardVariations)];

// *****************************************************************************

export const Lots: StoryFn<typeof Toast> = Template.bind({});
Lots.args = {
	count: 239,
};
Lots.decorators = [lightDecorator(allThemeStandardVariations)];

// *****************************************************************************
