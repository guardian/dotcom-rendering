import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import { allModes } from '../../.storybook/modes';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/format';
import { palette } from '../palette';
import { ArticleLastUpdated } from './ArticleLastUpdated';

const meta = {
	component: ArticleLastUpdated,
	title: 'Components/Article Last Updated',
	decorators: (Story) => (
		<div
			css={css`
				background: ${palette('--standfirst-background')};
			`}
		>
			<Story />
		</div>
	),
	parameters: {
		chromatic: {
			modes: {
				vertical: allModes.splitVertical,
			},
		},
	},
} satisfies Meta<typeof ArticleLastUpdated>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LiveBlog = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.LiveBlog,
			theme: Pillar.News,
		},
		lastUpdated: 1641038370000,
	},
} satisfies Story;

export const DeadBlog = {
	args: {
		...LiveBlog.args,
		format: {
			...LiveBlog.args.format,
			design: ArticleDesign.DeadBlog,
		},
	},
} satisfies Story;
