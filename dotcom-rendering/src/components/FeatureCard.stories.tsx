import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../lib/articleFormat';
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
	isExternalLink: false,
	canPlayInline: true,
	imageLoading: 'eager',
	discussionApiUrl: 'https://discussion.theguardian.com/discussion-api/',
	aspectRatio: '4:5',
	byline: 'Byline text',
	showByline: true,
	headlineSizes: { desktop: 'small' },
	showPulsingDot: false,
	showClock: false,
	imageSize: 'feature',
	collectionId: 1,
	starRatingSize: 'medium',
	isInStarRatingVariant: true,
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

const supportingContent = [
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
];

const CardWrapper = ({
	maxWidth,
	children,
}: {
	maxWidth: string;
	children: React.ReactNode;
}) => {
	return (
		<div
			css={css`
				max-width: ${maxWidth}px;
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

type FeatureCardArgsAndCustomArgs = React.ComponentProps<typeof FeatureCard> & {
	maxWidth: string;
};

const meta = {
	component: FeatureCard,
	title: 'Components/FeatureCard',
	args: { ...cardProps, maxWidth: '460' },
	render: ({ maxWidth, ...args }) => (
		<CardWrapper maxWidth={maxWidth}>
			<FeatureCard {...args} />
		</CardWrapper>
	),
} satisfies Meta<FeatureCardArgsAndCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard = {} satisfies Story;

export const Immersive = {
	args: {
		aspectRatio: '5:3',
		mobileAspectRatio: '4:5',
		imageSize: 'feature-immersive',
		maxWidth: '940',
		isImmersive: true,
		trailText:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
	},
} satisfies Story;

export const Labs = {
	args: {
		byline: undefined,
		format: {
			...cardProps.format,
			theme: ArticleSpecial.Labs,
		},
		containerPalette: 'Branded',
		branding: {
			logo: {
				src: 'https://static.theguardian.com/commercial/sponsor/22/Aug/2025/52dc0276-c2d9-405c-a686-2577c12914d4-ecover_pos_280.png',
				link: '#',
				label: 'Paid for by',
				dimensions: {
					width: 120,
					height: 60,
				},
			},
			logoForDarkBackground: {
				src: 'https://static.theguardian.com/commercial/sponsor/22/Aug/2025/52dc0276-c2d9-405c-a686-2577c12914d4-ecover_pos_280.png',
				link: '#',
				label: 'Paid for by',
				dimensions: {
					width: 120,
					height: 60,
				},
			},
			sponsorName: 'Guardian Org',
			aboutThisLink: '#about',
		},
	},
} satisfies Story;

export const LabsImmersive = {
	args: {
		...Labs.args,
		...Immersive.args,
		trailText: undefined,
	},
} satisfies Story;

export const Review = {
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
} satisfies Story;

export const ReviewImmersive = {
	args: {
		...Review.args,
		...Immersive.args,
	},
} satisfies Story;

export const SportLiveBlog = {
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
} satisfies Story;

export const SportLiveBlogImmersive = {
	args: {
		...SportLiveBlog.args,
		...Immersive.args,
	},
} satisfies Story;

export const Opinion = {
	args: {
		image: {
			src: 'https://media.guim.co.uk/e07c6b2dbd2332b89744e0548dc10f5b2dfa58e2/0_2482_6767_4058/master/6767.jpg',
			altText: 'alt text',
		},
		showQuotes: true,
		format: { ...cardProps.format, theme: Pillar.Opinion },
	},
} satisfies Story;

export const OpinionImmersive = {
	args: {
		...Opinion.args,
		...Immersive.args,
	},
} satisfies Story;

export const Podcast = {
	args: {
		format: {
			...cardProps.format,
			design: ArticleDesign.Audio,
		},
		image: {
			src: 'https://media.guim.co.uk/ecb7f0bebe473d6ef1375b5cb60b78f9466a5779/0_229_3435_2061/master/3435.jpg',
			altText: 'alt text',
		},
		mainMedia: {
			type: 'Audio',
			podcastImage: {
				src: 'https://media.guim.co.uk/be8830289638b0948b1ba4ade906e540554ada88/0_0_5000_3000/master/5000.jpg',
				altText: 'Football Weekly',
			},
			duration: '55:09',
		},
	},
} satisfies Story;

export const PodcastImmersive = {
	args: {
		...Podcast.args,
		...Immersive.args,
	},
} satisfies Story;

export const Gallery = {
	args: {
		format: {
			...cardProps.format,
			design: ArticleDesign.Gallery,
		},
		image: {
			src: 'https://media.guim.co.uk/7b500cfe9afe4e211ad771c86e66297c9c22993b/0_61_4801_2880/master/4801.jpg',
			altText: 'alt text',
		},
		mainMedia: {
			type: 'Gallery',
			count: '12',
		},
	},
} satisfies Story;

export const GalleryImmersive = {
	args: {
		...Gallery.args,
		...Immersive.args,
	},
} satisfies Story;

/**
 * A video article
 */
export const YoutubeVideo = {
	args: {
		format: {
			...cardProps.format,
			design: ArticleDesign.Video,
		},
		image: {
			src: 'https://media.guim.co.uk/7b500cfe9afe4e211ad771c86e66297c9c22993b/0_61_4801_2880/master/4801.jpg',
			altText: 'alt text',
		},
		mainMedia: {
			type: 'YoutubeVideo',
			id: 'video-id',
			videoId: 'video-id',
			height: 1080,
			width: 1920,
			origin: 'origin',
			title: 'Video Title',
			duration: 120,
			expired: false,
			image: 'https://media.guim.co.uk/f2aedd24e5414073a653f68112e0ad070c6f4a2b/254_0_7493_4500/master/7493.jpg',
		},
		canPlayInline: true,
		showVideo: true,
	},
} satisfies Story;

export const YoutubeVideoImmersive = {
	args: {
		...YoutubeVideo.args,
		...Immersive.args,
	},
} satisfies Story;

/**
 * A standard (non-video) article with a video main media
 */
export const YoutubeVideoMainMedia = {
	args: {
		...YoutubeVideo.args,
		format: {
			...YoutubeVideo.args.format,
			design: ArticleDesign.Standard,
		},
	},
} satisfies Story;

export const YoutubeVideoMainMediaImmersive = {
	args: {
		...YoutubeVideoMainMedia.args,
		...Immersive.args,
	},
} satisfies Story;

export const YoutubeVideoCannotPlayInline = {
	args: {
		...YoutubeVideo.args,
		canPlayInline: false,
	},
} satisfies Story;

export const YoutubeVideoMainMediaCannotPlayInline = {
	args: {
		...YoutubeVideoMainMedia.args,
		canPlayInline: false,
	},
} satisfies Story;

export const WithTrailText = {
	args: {
		kickerText: undefined,
		headlineText: 'Nigel Slater’s recipe for coffee cream liqueur trifle',
		image: {
			src: 'https://media.guim.co.uk/9194170f3170be3f48f1924a7434f0b69c7adb77/205_0_5825_3496/master/5825.jpg',
			altText: 'Hazelnut Tiramisu',
		},
		format: { ...cardProps.format, theme: Pillar.Lifestyle },
		byline: undefined,
		trailText:
			'Part trifle, part tiramisu… this midweek treat ticks all the right boxes',
	},
} satisfies Story;

export const WithTrailTextImmersive = {
	args: {
		...WithTrailText.args,
		...Immersive.args,
	},
} satisfies Story;

export const WithSublinks = {
	args: {
		supportingContent,
	},
} satisfies Story;

export const WithSublinksImmersive = {
	args: {
		...WithSublinks.args,
		...Immersive.args,
	},
} satisfies Story;

export const WithSublinksLabsImmersive = {
	args: {
		...WithSublinks.args,
		...Labs.args,
		...Immersive.args,
	},
} satisfies Story;
