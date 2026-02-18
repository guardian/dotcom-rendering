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

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Comment,
	theme: Pillar.Opinion,
};

export const WithAge = {
	args: {
		format: defaultFormat,
		age: <p>19h ago</p>,
	},
} satisfies Story;

export const WithGallery = {
	args: {
		format: defaultFormat,
		media: {
			type: 'Gallery',
			count: '14',
		},
	},
} satisfies Story;

export const WithAudio = {
	args: {
		format: defaultFormat,
		media: {
			type: 'Audio',
			duration: '12:34',
		},
	},
} satisfies Story;

export const WithYoutubeVideo = {
	args: {
		format: { ...defaultFormat, design: ArticleDesign.Video },
		media: {
			type: 'YoutubeVideo',
			duration: 972,
			isLive: false,
		},
	},
} satisfies Story;

export const WithSelfHostedVideo = {
	args: {
		format: { ...defaultFormat, design: ArticleDesign.Video },
		media: {
			type: 'SelfHostedVideo',
			duration: 254,
		},
	},
} satisfies Story;

export const WithNewsletter = {
	args: {
		format: defaultFormat,
		isNewsletter: true,
	},
} satisfies Story;

export const WithBranding = {
	args: {
		format: {
			...defaultFormat,
			theme: ArticleSpecial.Labs,
		},
		cardBranding: <p>Card branding</p>,
	},
} satisfies Story;
