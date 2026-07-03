import { hostedPaletteDecorator } from '../../.storybook/decorators/themeDecorator';
import { allModes } from '../../.storybook/modes';
import preview from '../../.storybook/preview';
import { hostedGallery } from '../../fixtures/manual/hostedGallery';
import { hostedOnwardsTrails } from '../../fixtures/manual/onwardsTrails';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import { customMockFetch } from '../lib/mockRESTCalls';
import { enhanceArticleType } from '../types/article';
import { HostedGalleryLayout } from './HostedGalleryLayout';

const mockOnwardsContentFetch = customMockFetch([
	{
		mockedMethod: 'GET',
		mockedUrl: `${hostedGallery.config.ajaxUrl}/${hostedGallery.config.pageId}/onward.json`,
		mockedStatus: 200,
		mockedBody: { trails: hostedOnwardsTrails },
	},
]);

const meta = preview.meta({
	title: 'Layouts/HostedGallery',
	component: HostedGalleryLayout,
	parameters: {
		config: { darkModeAvailable: true },
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
	render: (args) => {
		global.fetch = mockOnwardsContentFetch;
		return <HostedGalleryLayout {...args} />;
	},
});

const { hostedCampaignColour = '' } =
	hostedGallery.commercialProperties.UK.branding ?? {};

const format = {
	theme: ArticleSpecial.Labs,
	design: ArticleDesign.HostedGallery,
	display: ArticleDisplay.Standard,
};

const appsHostedGallery = enhanceArticleType(hostedGallery, 'Apps');
if (appsHostedGallery.design !== ArticleDesign.HostedGallery) {
	throw new Error('Expected hosted gallery');
}
export const Apps = meta.story({
	args: {
		gallery: appsHostedGallery,
		format,
		renderingTarget: 'Apps',
	},
	parameters: {
		config: {
			renderingTarget: 'Apps',
		},
		chromatic: {
			modes: {
				'vertical mobileMedium': allModes['vertical mobileMedium'],
			},
		},
	},
	decorators: hostedPaletteDecorator(hostedCampaignColour),
});

const webHostedGallery = enhanceArticleType(hostedGallery, 'Web');
if (webHostedGallery.design !== ArticleDesign.HostedGallery) {
	throw new Error('Expected hosted gallery');
}
export const Web = meta.story({
	args: {
		gallery: webHostedGallery,
		format,
		renderingTarget: 'Web',
	},
	parameters: {
		config: {
			renderingTarget: 'Web',
		},
	},
});
