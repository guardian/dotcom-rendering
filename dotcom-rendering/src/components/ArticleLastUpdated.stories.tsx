import { css } from '@emotion/react';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { palette } from '../palette';
import { ArticleLastUpdated } from './ArticleLastUpdated';

const meta = preview.meta({
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
});

export const LiveBlog = meta.story({
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.LiveBlog,
			theme: Pillar.News,
		},
		lastUpdated: 1641038370000,
	},
});

export const DeadBlog = meta.story({
	args: {
		...LiveBlog.input.args,
		format: {
			...LiveBlog.input.args.format,
			design: ArticleDesign.DeadBlog,
		},
	},
});
