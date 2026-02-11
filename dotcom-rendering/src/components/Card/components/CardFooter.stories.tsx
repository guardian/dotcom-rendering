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
		mainMedia: {
			type: 'Gallery',
			count: '14',
		},
	},
} satisfies Story;

export const WithAudio = {
	...WithAge,
	args: {
		...WithAge.args,
		mainMedia: {
			type: 'Audio',
			duration: '12:34',
		},
	},
} satisfies Story;

export const WithVideo = {
	...WithAge,
	args: {
		...WithAge.args,
		mainMedia: {
			type: 'YoutubeVideo',
			id: 'abcdef',
			videoId: 'abcd',
			title: 'some title',
			duration: 972,
			width: 480,
			height: 288,
			origin: 'The Guardian',
			expired: false,
			image: 'https://i.guim.co.uk/img/media/e060e9b7c92433b3dfeccc98b9206778cda8b8e8/0_180_6680_4009/master/6680.jpg?width=600&quality=45&dpr=2&s=none',
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

export const WithSelfHostedVideoOnVideo = {
	...WithVideo,
	args: {
		...WithVideo.args,
		format: {
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Video,
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
