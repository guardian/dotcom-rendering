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
		headlineText: 'Running a takeaway kitchen in an Iraqi border town',
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		kickerText: 'News',
		byline: '',
		image: {
			src: 'https://media.guim.co.uk/569f45834d7be5211a6c0e4ccb9acc9ed562ffa5/0_256_3840_2304/master/3840.jpg',
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
