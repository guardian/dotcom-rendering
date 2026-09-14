import { css } from '@emotion/react';
import { palette as sourcePalette, space } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
	ArticleDesign,
	ArticleDisplay,
	Pillar,
} from '../../../lib/articleFormat';
import type { CustomSubnav } from '../../../types/customSubnav';
import { CustomSubNav } from './CustomSubNav';

const customSubNav: CustomSubnav = {
	id: 'us-politics',
	header: {
		headerText: 'US politics',
		copy: '',
		dotcomPath: '/us-news/us-politics',
	},
	format: 'large',
	links: [
		{
			linkText: 'Trump administration',
			dotcomPath: '/us-news/trump-administration',
		},
		{ linkText: 'US Congress', dotcomPath: '/us-news/us-congress' },
		{ linkText: 'US supreme court', dotcomPath: '/law/us-supreme-court' },
		{
			linkText: 'US elections 2024',
			dotcomPath: '/us-news/us-elections-2024',
		},
		{ linkText: 'US immigration', dotcomPath: '/us-news/usimmigration' },
	],
	pages: [],
};

/** Distinct images per breakpoint so it's obvious which one is being served. */
const customSubNavWithImages: CustomSubnav = {
	...customSubNav,
	images: [
		{
			breakpoint: 'mobile',
			platforms: ['web'],
			imageSrc:
				'https://media.guim.co.uk/6537e163c9164d25ec6102641f6a04fa5ba76560/0_210_5472_3283/master/5472.jpg?width=740&height=140&quality=85&fit=crop&s=none',
		},
		{
			breakpoint: 'tablet',
			platforms: ['web'],
			imageSrc:
				'https://media.guim.co.uk/56b42eef576bc04c820da710459acd91082bb37b/0_0_6720_4480/6720.jpg?width=980&height=140&quality=85&fit=crop&s=none',
		},
		{
			breakpoint: 'desktop',
			platforms: ['web'],
			imageSrc:
				'https://media.guim.co.uk/c981848745e482e03e23b2ec9402e1f5c5bee6a6/102_73_3282_1848/2000.jpg?width=1300&height=140&quality=85&fit=crop&s=none',
		},
	],
};

const meta = {
	component: CustomSubNav,
	title: 'Components/Masthead/Titlepiece/CustomSubNav',
	decorators: [
		(Story) => (
			<div
				css={css`
					background-color: ${sourcePalette.brand[400]};
					padding: ${space[3]}px;
				`}
			>
				<Story />
			</div>
		),
	],
	render: (args) => <CustomSubNav {...args} />,
	args: {
		customSubNav,
		currentNavLink: 'US Congress',
		hasPageSkin: false,
	},
} satisfies Meta<typeof CustomSubNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Front = {
	args: { renderingPage: 'front' },
} satisfies Story;

/** On fronts, a web image is shown per breakpoint; resize the viewport to switch between mobile/tablet/desktop. */
export const FrontWithImage = {
	args: {
		renderingPage: 'front',
		customSubNav: customSubNavWithImages,
	},
} satisfies Story;

export const Article = {
	args: { renderingPage: 'article' },
	parameters: {
		formats: [
			{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Standard,
				theme: Pillar.News,
			},
		],
	},
} satisfies Story;
