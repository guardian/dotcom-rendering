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
		media: {
			type: 'Gallery',
			count: '14',
		},
	},
} satisfies Story;

export const WithAudio = {
	...WithAge,
	args: {
		...WithAge.args,
		media: {
			type: 'Audio',
			duration: '12:34',
		},
	},
} satisfies Story;

export const WithYoutubeVideo = {
	...WithAge,
	args: {
		...WithAge.args,
		media: {
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
		media: {
			type: 'SelfHostedVideo',
			duration: 254,
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
