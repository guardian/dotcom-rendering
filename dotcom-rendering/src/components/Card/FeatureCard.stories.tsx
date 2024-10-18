import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { Meta } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../../lib/articleFormat';
import { FeatureCard } from './FeatureCard';

const meta = {
	component: FeatureCard,
	title: 'Components/FeatureCard',
	render: (args) => (
		<CardWrapper>
			<FeatureCard {...args} />
		</CardWrapper>
	),
	args: {
		linkTo: '',
		headlineText: 'Underground cave found on moon could be ideal base',
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.Sport,
		},
		kickerText: 'News',
		byline: 'Georges Monbiot',
		image: {
			src: 'https://media.guim.co.uk/6537e163c9164d25ec6102641f6a04fa5ba76560/0_210_5472_3283/master/5472.jpg',
			altText: 'alt text',
		},
		imageLoading: 'eager',
	},
} satisfies Meta<typeof FeatureCard>;

export default meta;

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
				position: relative;
			`}
		>
			{children}
		</div>
	);
};

export const Default = {};
