import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { hostedVideo } from '../../fixtures/manual/hostedVideo';
import { hostedOnwardsTrails } from '../../fixtures/manual/onwardsTrails';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import { customMockFetch } from '../lib/mockRESTCalls';
import { enhanceArticleType } from '../types/article';
import { HostedVideoLayout } from './HostedVideoLayout';

const mockOnwardsContentFetch = customMockFetch([
	{
		mockedMethod: 'GET',
		mockedUrl: `${hostedVideo.config.ajaxUrl}/${hostedVideo.config.pageId}/onward.json`,
		mockedStatus: 200,
		mockedBody: { trails: hostedOnwardsTrails },
	},
]);

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
	render: (args) => {
		global.fetch = mockOnwardsContentFetch;
		return <HostedVideoLayout {...args} />;
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
