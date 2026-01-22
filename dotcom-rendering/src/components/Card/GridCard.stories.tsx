import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../lib/articleFormat';
import { GridCard } from './GridCard';
import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				max-width: 600px;
				flex-basis: 100%;
				${from.tablet} {
					flex-basis: 1;
				}
				margin: 10px;
				outline: 1px solid hotpink;
			`}
		>
			{children}
		</div>
	);
};

const meta: Meta<typeof GridCard> = {
	title: 'Components/GridCard',
	component: GridCard,
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		headlineText: 'This is a default card headline',
		image: {
			src: 'https://media.guim.co.uk/6537e163c9164d25ec6102641f6a04fa5ba76560/0_210_5472_3283/master/5472.jpg',
			altText: 'Example image',
		},
		imageLoading: 'eager',
		isExternalLink: false,
		showTopBarDesktop: true,
		showTopBarMobile: true,
		trailText:
			'The 29-year-old source behind the biggest intelligence leak in the NSA’s history explains his motives',
	},
};

export default meta;

type Story = StoryObj<typeof GridCard>;

export const Default: Story = {
	render: (args) => (
		<CardWrapper>
			<GridCard {...args} />
		</CardWrapper>
	),
};
