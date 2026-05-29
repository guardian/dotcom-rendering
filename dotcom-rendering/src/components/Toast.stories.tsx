import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import { lightDecorator } from '../../.storybook/decorators/themeDecorator';
import preview from '../../.storybook/preview';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
import { Toast } from './Toast';

const meta = preview.meta({
	title: 'Components/Toast',
	component: Toast,
});

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

export const Default = meta.story({
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
});

// *****************************************************************************

export const Lots = meta.story({
	args: {
		count: 239,
		onClick: () => {},
	},
	decorators: [lightDecorator(allThemeStandardVariations)],
	render: Default.input.render,
});

// *****************************************************************************
