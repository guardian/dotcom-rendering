import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../../../lib/articleFormat';
import { CardFooter as CardFooterComponent } from './CardFooter';

const meta = {
	component: CardFooterComponent,
	title: 'Components/Card Footer',
} satisfies Meta<typeof CardFooterComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithAge = {
	args: {
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Comment,
			theme: Pillar.Opinion,
		},
		age: <p>19h ago</p>,
	},
} satisfies Story;

export const WithGallery = {
	...WithAge,
	args: {
		...WithAge.args,
		mediaMetadata: {
			type: 'Gallery',
			count: '14',
		},
	},
} satisfies Story;

export const WithAudio = {
	...WithAge,
	args: {
		...WithAge.args,
		mediaMetadata: {
			type: 'Audio',
			duration: '12:34',
		},
	},
} satisfies Story;

export const WithYoutubeVideo = {
	...WithAge,
	args: {
		...WithAge.args,
		mediaMetadata: {
			type: 'YoutubeVideo',
			duration: 972,
			isLive: false,
		},
	},
} satisfies Story;

export const WithSelfHostedVideo = {
	...WithAge,
	args: {
		...WithAge.args,
		mediaMetadata: {
			type: 'SelfHostedVideo',
			duration: 254,
		},
	},
} satisfies Story;

export const WithSelfHostedVideoOnGallery = {
	...WithGallery,
	args: {
		...WithGallery.args,
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Gallery,
			theme: Pillar.Opinion,
		},
		mainMedia: {
			type: 'SelfHostedVideo',
			videoStyle: 'Loop',
			atomId: 'atom-id-123',
			sources: [
				{
					src: 'https://uploads.guim.co.uk/2026/01/09/Front_loop__Iran_TiF_Latest--64220ebf-d63d-48dd-9317-16b3b150a4ac-1.1.m3u8',
					mimeType: 'application/vnd.apple.mpegurl',
				},
			],
			height: 720,
			width: 576,
			duration: 18,
		},
	},
} satisfies Story;

export const WithSelfHostedVideoOnAudio = {
	...WithAudio,
	args: {
		...WithAudio.args,
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Audio,
			theme: Pillar.Opinion,
		},
		mainMedia: WithSelfHostedVideoOnGallery.args.mainMedia,
	},
} satisfies Story;

export const WithSelfHostedVideoOnVideo = {
	...WithVideo,
	args: {
		...WithVideo.args,
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Video,
			theme: Pillar.Opinion,
		},
		mainMedia: WithSelfHostedVideoOnGallery.args.mainMedia,
	},
} satisfies Story;

export const WithNewsletter = {
	...WithAge,
	args: {
		...WithAge.args,
		isNewsletter: true,
	},
} satisfies Story;

export const WithBranding = {
	...WithAge,
	args: {
		...WithAge.args,
		format: {
			...WithAge.args.format,
			theme: ArticleSpecial.Labs,
		},
		cardBranding: <p>Card branding</p>,
	},
} satisfies Story;
