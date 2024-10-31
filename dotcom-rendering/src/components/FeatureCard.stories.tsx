import { css } from '@emotion/react';
import { breakpoints, from } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { Props as CardProps, FeatureCard } from './FeatureCard';

const cardProps: CardProps = {
	linkTo: '',
	format: {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.Standard,
		theme: Pillar.News,
	},
	headlineText: 'Headline text',
	trailText:
		'The 29-year-old source behind the biggest intelligence leak in the NSA’s history explains his motives',
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
	headlineSizes: { desktop: 'medium' },
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
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
		},
	},
	args: {},
	render: (args) => (
		<CardWrapper>
			<FeatureCard {...args} />
		</CardWrapper>
	),
} satisfies Meta<typeof FeatureCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Feature: Story = {
	name: 'Feature story',
	args: {
		...cardProps,
	},
};

export const FeatureSubs: Story = {
	name: 'Feature story with sub links',
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
		...cardProps,
	},
};
