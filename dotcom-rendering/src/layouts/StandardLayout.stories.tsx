import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { allModes } from '../../.storybook/modes';
import { Audio as AudioFixture } from '../../fixtures/generated/fe-articles/Audio';
import { Standard as StandardFixture } from '../../fixtures/generated/fe-articles/Standard';
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
		article: {
			...webAudioArticle.frontendData,
			shouldHideAds: true,
		},
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

const webInteractiveArticle = enhanceArticleType(
	{
		...StandardFixture,
		contentType: 'Interactive',
		firstPublicationDate: '2026-10-01T09:00:00.000Z',
		format: {
			...StandardFixture.format,
			design: 'InteractiveDesign',
		},
	},
	'Web',
);

export const WebInteractive: Story = {
	args: {
		renderingTarget: 'Web',
		NAV: {
			...extractNAV(webInteractiveArticle.frontendData.nav),
			selectedPillar: getCurrentPillar(
				webInteractiveArticle.frontendData,
			),
		},
		article: {
			...webInteractiveArticle.frontendData,
			shouldHideAds: true,
		},
		format: {
			design: webInteractiveArticle.design,
			display: webInteractiveArticle.display,
			theme: webInteractiveArticle.theme,
		},
		isInInteractiveLayoutTest: true,
	},
	parameters: {
		formats: [
			{
				design: webInteractiveArticle.design,
				display: webInteractiveArticle.display,
				theme: webInteractiveArticle.theme,
			},
		],
		chromatic: {
			modes: {
				'light wide': allModes['light wide'],
			},
		},
	},
};

export const WebInteractiveMobile: Story = {
	args: WebInteractive.args,
	globals: {
		viewport: { value: 'mobileMedium', isRotated: false },
	},
	parameters: {
		...WebInteractive.parameters,
		chromatic: {
			modes: {
				'light mobileMedium': allModes['light mobileMedium'],
			},
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const homeLink = await canvas.findByRole(
			'link',
			{ name: /The Guardian - Back to home/ },
			{ timeout: 5_000 },
		);
		const logo = homeLink.querySelector('svg');

		await expect(logo).not.toBeNull();
		await expect(window.getComputedStyle(logo!).width).toBe('130px');
	},
};
