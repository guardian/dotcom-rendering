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
	args: { assignedPage: 'front' },
} satisfies Story;

export const Article = {
	args: { assignedPage: 'article' },
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
