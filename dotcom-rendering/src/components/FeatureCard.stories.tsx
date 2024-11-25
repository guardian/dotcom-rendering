import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { type Props as CardProps, FeatureCard } from './FeatureCard';

const cardProps: CardProps = {
	linkTo: '',
	format: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	},
	headlineText: 'Headline text',
	kickerText: 'Kicker',
	webPublicationDate: new Date(Date.now() - 60 * 60 * 1000).toString(),
	image: {
		src: 'https://media.guim.co.uk/6537e163c9164d25ec6102641f6a04fa5ba76560/0_210_5472_3283/master/5472.jpg',
		altText: 'alt text',
	},
	imagePositionOnDesktop: 'top',
	isExternalLink: false,
	isPlayableMediaCard: false,
	imageLoading: 'eager',
	discussionApiUrl: 'https://discussion.theguardian.com/discussion-api/',
	absoluteServerTimes: true,
	aspectRatio: '4:5',
	byline: 'Byline text',
	showByline: true,
	headlineSizes: { desktop: 'small' },
	showPulsingDot: false,
	showClock: false,
	imageSize: 'feature',
};

const aBasicLink = {
	headline: 'Headline',
	url: 'https://www.theguardian.com',
	format: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	},
};

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				max-width: 460px;
				flex-basis: 100%;
				${from.tablet} {
					flex-basis: 1;
				}
				margin: 10px;
			`}
		>
			{children}
		</div>
	);
};

const meta = {
	component: FeatureCard,
	title: 'Components/FeatureCard',
	args: cardProps,
	render: (args) => (
		<CardWrapper>
			<FeatureCard {...args} />
		</CardWrapper>
	),
} satisfies Meta<typeof FeatureCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};

export const Review: Story = {
	args: {
		image: {
			src: 'https://media.guim.co.uk/59b7005b3ee36fcdf1215e4424fa6d141a805e3a/0_236_1365_1705/master/1365.jpg',
			altText: 'alt text',
		},
		format: { ...cardProps.format, theme: Pillar.Culture },
		byline: undefined,
		trailText:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		starRating: 3,
	},
};

export const SportLiveBlog: Story = {
	args: {
		image: {
			src: 'https://media.guim.co.uk/e9a9adba2ba6a984317eeb42ad0ef5dfbee0ed1d/0_229_4972_2984/master/4972.jpg',
			altText: 'alt text',
		},
		format: {
			...cardProps.format,
			theme: Pillar.Sport,
			design: ArticleDesign.LiveBlog,
		},
		showPulsingDot: true,
		showClock: true,
	},
};

export const Opinion: Story = {
	args: {
		image: {
			src: 'https://media.guim.co.uk/e07c6b2dbd2332b89744e0548dc10f5b2dfa58e2/0_2482_6767_4058/master/6767.jpg',
			altText: 'alt text',
		},
		showQuotes: true,
		format: { ...cardProps.format, theme: Pillar.Opinion },
	},
};

export const WithSublinks: Story = {
	args: {
		supportingContent: [
			{
				...aBasicLink,
				headline: 'Headline 1',
				kickerText: 'Kicker',
			},
			{
				...aBasicLink,
				headline: 'Headline 2',
				kickerText: 'Kicker',
				format: {
					theme: Pillar.Sport,
					design: ArticleDesign.Gallery,
					display: ArticleDisplay.Standard,
				},
			},
			{
				...aBasicLink,
				headline: 'Headline 3',
				kickerText: 'Kicker',
			},
		],
	},
};
