import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../.storybook/modes';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
	type ArticleTheme,
	Pillar,
} from '../lib/format';
import { Avatar } from './Avatar';

const meta = {
	component: Avatar,
	title: 'Components/Avatar',
	decorators: [
		(Story, context) => (
			<div
				style={{
					height: context.parameters.size,
					width: context.parameters.size,
				}}
			>
				<Story />
			</div>
		),
	],
	parameters: {
		chromatic: {
			modes: {
				horizontal: allModes['vertical mobileMedium'],
			},
		},
	},
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

const standardStandardWithTheme = (theme: ArticleTheme): ArticleFormat => ({
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme,
});

export const RoundMediumOpinionTheme = {
	args: {
		src: 'https://uploads.guim.co.uk/2017/10/06/George-Monbiot,-L.png',
		alt: 'The alt of the image',
		shape: 'round',
	},
	parameters: {
		formats: [standardStandardWithTheme(Pillar.Opinion)],
		size: '136px',
	},
	name: 'Round Medium, Opinion Theme (Rich Links)',
} satisfies Story;

export const CutoutMediumOpinionTheme = {
	...RoundMediumOpinionTheme,
	args: {
		...RoundMediumOpinionTheme.args,
		shape: 'cutout',
	},
	name: 'Cutout Medium, Opinion Theme (Rich Links)',
} satisfies Story;

export const RoundLargeLifestyleTheme = {
	args: {
		src: 'https://uploads.guim.co.uk/2017/10/06/Leah-Harper,-L.png',
		alt: 'The alt of the image',
	},
	parameters: {
		formats: [standardStandardWithTheme(Pillar.Lifestyle)],
		size: '140px',
	},
	name: 'Round Large, Lifestyle Theme (Byline image - Desktop)',
} satisfies Story;

export const RoundLargeNewsTheme: Story = {
	...RoundLargeLifestyleTheme,
	parameters: {
		...RoundLargeLifestyleTheme.parameters,
		formats: [standardStandardWithTheme(Pillar.News)],
	},
	name: 'Round Large, News Theme (Byline image - Desktop)',
} satisfies Story;

export const RoundLargeCultureTheme: Story = {
	...RoundLargeLifestyleTheme,
	parameters: {
		...RoundLargeLifestyleTheme.parameters,
		formats: [standardStandardWithTheme(Pillar.Culture)],
	},
	name: 'Round Large, Culture Theme (Byline image - Desktop)',
} satisfies Story;

export const RoundLargeSpecialReportTheme: Story = {
	...RoundLargeLifestyleTheme,
	parameters: {
		...RoundLargeLifestyleTheme.parameters,
		formats: [standardStandardWithTheme(ArticleSpecial.SpecialReport)],
	},
	name: 'Round Large, SpecialReport Theme (Byline image - Desktop)',
} satisfies Story;

export const RoundLargeSpecialReportAltTheme: Story = {
	...RoundLargeLifestyleTheme,
	parameters: {
		...RoundLargeLifestyleTheme.parameters,
		formats: [standardStandardWithTheme(ArticleSpecial.SpecialReportAlt)],
	},
	name: 'Round Large, SpecialReportAlt Theme (Byline image - Desktop)',
} satisfies Story;

export const RoundSmallSportTheme = {
	args: {
		src: 'https://uploads.guim.co.uk/2018/05/25/Sid_Lowe,_L.png',
		alt: 'The alt of the image',
	},
	parameters: {
		formats: [standardStandardWithTheme(Pillar.Sport)],
		size: '60px',
	},
	name: 'Round Small, Sport Theme (Byline image - Mobile)',
} satisfies Story;
