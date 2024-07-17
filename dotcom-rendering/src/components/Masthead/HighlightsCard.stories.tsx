import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { from } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { HighlightsCard } from './HighlightsCard';

const meta = {
	component: HighlightsCard,
	title: 'Components/Masthead/HighlightsCard',
	render: (args) => (
		<CardWrapper>
			<HighlightsCard {...args} />
		</CardWrapper>
	),
	args: {
		headlineText:
			'Underground cave found on moon could be ideal base for explorers',
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		showPulsingDot: true,
		kickerText: 'News',
		avatarUrl:
			'https://uploads.guim.co.uk/2017/10/06/George-Monbiot,-L.png',
		byline: 'Georges Monbiot',
	},
} satisfies Meta<typeof HighlightsCard>;

export default meta;

type Story = StoryObj<typeof HighlightsCard>;

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				width: 150px;
				flex-basis: 100%;
				${from.tablet} {
					width: 300px;
					flex-basis: 1;
				}
				margin: 10px;
			`}
		>
			{children}
		</div>
	);
};

export const Default = {};

export const WithMediaIcon: Story = {
	args: {
		showMediaIcon: true,
	},
	parameters: {},
	name: 'With Media Icon',
};
