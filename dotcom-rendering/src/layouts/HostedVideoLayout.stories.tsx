import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { hostedVideo } from '../../fixtures/manual/hostedVideo';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import { enhanceArticleType } from '../types/article';
import { HostedVideoLayout } from './HostedVideoLayout';

const meta = preview.meta({
	title: 'Layouts/HostedVideo',
	component: HostedVideoLayout,
	parameters: {
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
});

const format = {
	theme: ArticleSpecial.Labs,
	design: ArticleDesign.HostedVideo,
	display: ArticleDisplay.Standard,
};

export const Apps = meta.story({
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
});

export const Web = meta.story({
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
});
