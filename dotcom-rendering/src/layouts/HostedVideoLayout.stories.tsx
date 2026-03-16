import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { hostedVideo } from '../../fixtures/manual/hostedVideo';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import { enhanceArticleType } from '../types/article';
import { HostedVideoLayout } from './HostedVideoLayout';

const meta = {
	title: 'Layouts/HostedVideo',
	component: HostedVideoLayout,
	parameters: {
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
} satisfies Meta<typeof HostedVideoLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

const format = {
	theme: ArticleSpecial.Labs,
	design: ArticleDesign.HostedVideo,
	display: ArticleDisplay.Standard,
};

export const Apps = {
	args: {
		content: enhanceArticleType(hostedVideo, 'Apps'),
		format,
		renderingTarget: 'Apps',
	},
	parameters: {
		config: {
			renderingTarget: 'Apps',
			darkModeAvailable: true,
		},
		chromatic: {
			modes: {
				'light mobileMedium': allModes['light mobileMedium'],
			},
		},
	},
} satisfies Story;

export const Web = {
	args: {
		content: enhanceArticleType(hostedVideo, 'Web'),
		format,
		renderingTarget: 'Web',
	},
	parameters: {
		config: {
			renderingTarget: 'Web',
		},
	},
} satisfies Story;
