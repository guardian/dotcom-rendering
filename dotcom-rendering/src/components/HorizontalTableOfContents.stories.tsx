import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { HorizontalTableOfContents } from './HorizontalTableOfContents.island';

const meta = {
	component: HorizontalTableOfContents,
	title: 'Components/HorizontalTableOfContents',
	decorators: [
		(Story) => (
			<div
				css={css`
					padding: 20px;
					max-width: 660px;
				`}
			>
				<Story />
			</div>
		),
		splitTheme([
			{
				design: ArticleDesign.Standard,
				display: ArticleDisplay.Immersive,
				theme: Pillar.Lifestyle,
			},
		]),
	],
} satisfies Meta<typeof HorizontalTableOfContents>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FewSections = {
	args: {
		tableOfContents: [
			{ id: 'best-overall', title: 'Best overall' },
			{ id: 'best-budget', title: 'Best budget' },
			{ id: 'how-we-tested', title: 'How we tested' },
		],
	},
} satisfies Story;

export const ManySections = {
	args: {
		tableOfContents: [
			'Lifestyle',
			'Fashion',
			'Food & drink',
			'Beauty',
			'Home & garden',
			'Tech',
			'Outdoors',
			'Christmas gift guide',
			'Stocking fillers',
			'How we tested',
		].map((title) => ({
			id: title.toLowerCase().replace(/\W+/g, '-'),
			title,
		})),
	},
} satisfies Story;
