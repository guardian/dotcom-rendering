import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { centreColumnDecorator } from '../../.storybook/decorators/gridDecorators';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import type { MediaAtomBlockElement } from '../types/content';
import { LoopVideoInArticle } from './LoopVideoInArticle';

const meta = {
	component: LoopVideoInArticle,
	title: 'Components/LoopVideoInArticle',
	decorators: [centreColumnDecorator],
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.tablet,
				breakpoints.wide,
			],
			// Chromatic ignores video elements by design
			disableSnapshot: true,
		},
	},
} satisfies Meta<typeof LoopVideoInArticle>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultElement: MediaAtomBlockElement = {
	_type: 'model.dotcomrendering.pageElements.MediaAtomBlockElement',
	elementId: 'mock-element-id',
	id: 'mock-video-id',
	title: 'A looping video showing nature',
	assets: [
		{
			url: 'https://uploads.guim.co.uk/2025%2F06%2F20%2Ftesting+only%2C+please+ignore--3cb22b60-2c3f-48d6-8bce-38c956907cce-3.mp4',
			mimeType: 'video/mp4',
			dimensions: {
				width: 900,
				height: 720,
			},
			aspectRatio: '5:4',
		},
	],
	posterImage: [
		{
			url: 'https://media.guim.co.uk/9bdb802e6da5d3fd249b5060f367b3a817965f0c/0_0_1800_1080/master/1800.jpg',
			width: 1800,
		},
	],
};

const defaultFormat = {
	theme: Pillar.News,
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
};

export const Default: Story = {
	name: 'Default (not main media)',
	args: {
		element: defaultElement,
		format: defaultFormat,
		isMainMedia: false,
	},
};

export const MainMedia: Story = {
	name: 'As main media',
	args: {
		element: defaultElement,
		format: defaultFormat,
		isMainMedia: true,
	},
};

export const WithoutCaption: Story = {
	name: 'Without caption',
	args: {
		element: {
			...defaultElement,
			title: undefined,
		},
		format: defaultFormat,
		isMainMedia: false,
	},
};

export const MainMediaWithoutCaption: Story = {
	name: 'Main media without caption',
	args: {
		element: {
			...defaultElement,
			title: undefined,
		},
		format: defaultFormat,
		isMainMedia: true,
	},
};

export const AspectRatio16to9: Story = {
	name: '16:9 aspect ratio',
	args: {
		element: {
			...defaultElement,
			title: 'A widescreen looping video',
			assets: [
				{
					url: 'https://uploads.guim.co.uk/2024/10/01/241001HeleneLoop_2.mp4',
					mimeType: 'video/mp4',
					dimensions: {
						width: 1920,
						height: 1080,
					},
					aspectRatio: '16:9',
				},
			],
		},
		format: defaultFormat,
		isMainMedia: false,
	},
};
