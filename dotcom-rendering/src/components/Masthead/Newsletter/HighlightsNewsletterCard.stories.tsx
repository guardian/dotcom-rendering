import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { newsletterSignupCard } from '../../../../fixtures/manual/highlights-trails';
import {
	ArticleDesign,
	ArticleDisplay,
	Pillar,
} from '../../../lib/articleFormat';
import { HighlightsNewsletterCard } from './HighlightsNewsletterCard';

const CardWrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			width: 150px;
			flex-basis: 100%;
			${from.tablet} {
				width: 300px;
				flex-basis: auto;
			}
			margin: 10px;
			position: relative;
		`}
	>
		{children}
	</div>
);

const meta = {
	component: HighlightsNewsletterCard,
	title: 'Components/Masthead/HighlightsNewsletterCard',
	render: (args) => (
		<CardWrapper>
			<HighlightsNewsletterCard {...args} />
		</CardWrapper>
	),
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: Pillar.News,
		},
		newsletter: newsletterSignupCard.newsletterData!,
		headlineText: newsletterSignupCard.headline,
		linkTo: newsletterSignupCard.url,
		dataLinkName: 'highlights-newsletter-card | open-signup',
		image: newsletterSignupCard.image,
		imageLoading: 'eager',
		renderingTarget: 'Web',
	},
} satisfies Meta<typeof HighlightsNewsletterCard>;

export default meta;

type Story = StoryObj<typeof HighlightsNewsletterCard>;

export const Default: Story = {};
