import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { Audio as AudioFixture } from '../../fixtures/generated/fe-articles/Audio';
import { ArticleDesign } from '../lib/articleFormat';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { extractNAV } from '../model/extract-nav';
import { enhanceArticleType } from '../types/article';
import { StandardLayout } from './StandardLayout';

const meta = {
	title: 'Layouts/Standard',
	component: StandardLayout,
} satisfies Meta<typeof StandardLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

const appsAudioArticle = enhanceArticleType(AudioFixture, 'Apps');

if (appsAudioArticle.design !== ArticleDesign.Audio) {
	throw new Error(
		`Expected ArticleDesign.Audio, got: ${String(appsAudioArticle.design)}`,
	);
}

export const AppsAudio: Story = {
	args: {
		renderingTarget: 'Apps',
		article: appsAudioArticle.frontendData,
		format: {
			design: appsAudioArticle.design,
			display: appsAudioArticle.display,
			theme: appsAudioArticle.theme,
		},
	},
	parameters: {
		formats: [
			{
				design: appsAudioArticle.design,
				display: appsAudioArticle.display,
				theme: appsAudioArticle.theme,
			},
		],
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
};

const webAudioArticle = enhanceArticleType(AudioFixture, 'Web');

if (webAudioArticle.design !== ArticleDesign.Audio) {
	throw new Error(
		`Expected ArticleDesign.Audio, got: ${String(webAudioArticle.design)}`,
	);
}

export const WebAudio: Story = {
	args: {
		renderingTarget: 'Web',
		NAV: {
			...extractNAV(webAudioArticle.frontendData.nav),
			selectedPillar: getCurrentPillar(webAudioArticle.frontendData),
		},
		article: webAudioArticle.frontendData,
		format: {
			design: webAudioArticle.design,
			display: webAudioArticle.display,
			theme: webAudioArticle.theme,
		},
	},
	parameters: {
		formats: [
			{
				design: webAudioArticle.design,
				display: webAudioArticle.display,
				theme: webAudioArticle.theme,
			},
		],
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
};
