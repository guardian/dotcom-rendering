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
