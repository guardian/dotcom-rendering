import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { allModes } from '../../.storybook/modes';
import { Audio as AudioFixture } from '../../fixtures/generated/fe-articles/Audio';
import { ArticleDesign } from '../lib/articleFormat';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { extractNAV } from '../model/extract-nav';
import { enhanceArticleType } from '../types/article';
import { AudioLayout } from './AudioLayout';

const meta = {
	title: 'Layouts/Audio',
	component: AudioLayout,
} satisfies Meta<typeof AudioLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

const appsArticle = enhanceArticleType(AudioFixture, 'Apps');

if (appsArticle.design !== ArticleDesign.Audio) {
	throw new Error(
		`Expected ArticleDesign.Audio, got: ${String(appsArticle.design)}`,
	);
}

export const Apps: Story = {
	args: {
		renderingTarget: 'Apps',
		article: appsArticle.frontendData,
		format: {
			design: appsArticle.design,
			display: appsArticle.display,
			theme: appsArticle.theme,
		},
	},
	parameters: {
		formats: [
			{
				design: appsArticle.design,
				display: appsArticle.display,
				theme: appsArticle.theme,
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

const webArticle = enhanceArticleType(AudioFixture, 'Web');

if (webArticle.design !== ArticleDesign.Audio) {
	throw new Error(
		`Expected ArticleDesign.Audio, got: ${String(webArticle.design)}`,
	);
}

export const Web: Story = {
	args: {
		renderingTarget: 'Web',
		NAV: {
			...extractNAV(webArticle.frontendData.nav),
			selectedPillar: getCurrentPillar(webArticle.frontendData),
		},
		article: webArticle.frontendData,
		format: {
			design: webArticle.design,
			display: webArticle.display,
			theme: webArticle.theme,
		},
	},
	parameters: {
		formats: [
			{
				design: webArticle.design,
				display: webArticle.display,
				theme: webArticle.theme,
			},
		],
		chromatic: {
			modes: {
				'light leftCol': allModes['light leftCol'],
			},
		},
	},
};
