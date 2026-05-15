import preview from '../../../../.storybook/preview';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '../../../lib/articleFormat';
import { CardFooter as CardFooterComponent } from './CardFooter';

const meta = preview.meta({
	component: CardFooterComponent,
	title: 'Components/Card Footer',
});

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Comment,
	theme: Pillar.Opinion,
};

export const WithAge = meta.story({
	args: {
		format: defaultFormat,
		age: <p>19h ago</p>,
	},
});

export const WithGallery = meta.story({
	args: {
		format: defaultFormat,
		media: {
			type: 'Gallery',
			count: '14',
		},
	},
});

export const WithAudio = meta.story({
	args: {
		format: defaultFormat,
		media: {
			type: 'Audio',
			duration: '12:34',
		},
	},
});

export const WithYoutubeVideo = meta.story({
	args: {
		format: { ...defaultFormat, design: ArticleDesign.Video },
		media: {
			type: 'YoutubeVideo',
			duration: 972,
			isLive: false,
		},
	},
});

export const WithSelfHostedVideo = meta.story({
	args: {
		format: { ...defaultFormat, design: ArticleDesign.Video },
		media: {
			type: 'SelfHostedVideo',
			duration: 254,
		},
	},
});

export const WithNewsletter = meta.story({
	args: {
		format: defaultFormat,
		isNewsletter: true,
	},
});

export const WithBranding = meta.story({
	args: {
		format: {
			...defaultFormat,
			theme: ArticleSpecial.Labs,
		},
		cardBranding: <p>Card branding</p>,
	},
});
