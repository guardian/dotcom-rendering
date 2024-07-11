import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import type { Meta, StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
	component: Avatar,
	title: 'Components/Avatar',
	decorators: [
		(storyFn, context) => {
			const format = {
				theme: context.parameters.theme || Pillar.News,
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
			};
			return splitTheme([format], { orientation: 'vertical' })(
				storyFn,
				context,
			);
		},
		(storyFn, context) => (
			<div
				style={{
					height: context.parmeters.size,
					width: context.parmeters.size,
				}}
			>
				{storyFn()}
			</div>
		),
	],
};

export default meta;

const georgesMonbiot =
	'https://uploads.guim.co.uk/2017/10/06/George-Monbiot,-L.png';
const leahHarper = 'https://uploads.guim.co.uk/2017/10/06/Leah-Harper,-L.png';
const sideLowe = 'https://uploads.guim.co.uk/2018/05/25/Sid_Lowe,_L.png';

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
	args: {
		src: georgesMonbiot,
		alt: 'The alt of the image',
		shape: 'round',
	},
	parameters: {
		theme: Pillar.Opinion,
		size: '136px',
	},
	name: 'Medium, Opinion (Rich Links)',
};

export const Large: Story = {
	args: {
		src: leahHarper,
		alt: 'The alt of the image',
	},
	parameters: {
		theme: Pillar.Lifestyle,
		size: '140px',
	},
	name: 'Large, Lifestyle (Byline image - Desktop)',
};

export const LargeNews: Story = {
	args: {
		src: leahHarper,
		alt: 'The alt of the image',
	},
	parameters: {
		theme: Pillar.News,
		size: '140px',
	},
	name: 'Large, News (Byline image - Desktop)',
};

export const LargeCulture: Story = {
	args: {
		src: leahHarper,
		alt: 'The alt of the image',
	},
	parameters: {
		theme: Pillar.Culture,
		size: '140px',
	},
	name: 'Large, Culture (Byline image - Desktop)',
};

export const SpecialReport: Story = {
	args: {
		src: leahHarper,
		alt: 'The alt of the image',
	},
	parameters: {
		theme: ArticleSpecial.SpecialReport,
		size: '140px',
	},
	name: 'Large SpecialReport',
};

export const SpecialReportAlt: Story = {
	args: {
		src: leahHarper,
		alt: 'The alt of the image',
	},
	parameters: {
		theme: ArticleSpecial.SpecialReportAlt,
		size: '140px',
	},
	name: 'Large SpecialReportAlt',
};

export const Small: Story = {
	args: {
		src: sideLowe,
		alt: 'The alt of the image',
	},
	parameters: {
		theme: Pillar.Sport,
		size: '60px',
	},
	name: 'Small, Sport (Byline image - Mobile)',
};

export const CutOutShape: Story = {
	args: {
		src: georgesMonbiot,
		alt: 'The alt of the image',
		shape: 'cutout',
	},
	parameters: {
		theme: Pillar.Opinion,
		size: '136px',
	},
	name: 'Medium, Opinion (Rich Links)',
};
