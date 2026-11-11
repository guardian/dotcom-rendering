import { breakpoints } from '@guardian/source/foundations';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, within } from 'storybook/test';
import { allModes } from '../../.storybook/modes';
import { Audio as AudioFixture } from '../../fixtures/generated/fe-articles/Audio';
import { Recipe as RecipeFixture } from '../../fixtures/generated/fe-articles/Recipe';
import { Standard as StandardFixture } from '../../fixtures/generated/fe-articles/Standard';
import { ArticleDesign, ArticleDisplay } from '../lib/articleFormat';
import { getCurrentPillar } from '../lib/layoutHelpers';
import { extractNAV } from '../model/extract-nav';
import { enhanceArticleType } from '../types/article';
import type { MediaAtomBlockElement } from '../types/content';
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
		firstPublicationDate: '2026-10-30T09:00:00.000Z',
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

const webImmersiveArticle = enhanceArticleType(StandardFixture, 'Web');
const immersiveFormat = {
	design: webImmersiveArticle.design,
	display: ArticleDisplay.Immersive,
	theme: webImmersiveArticle.theme,
};
const immersiveNav = extractNAV(webImmersiveArticle.frontendData.nav);

export const WebImmersive: Story = {
	args: {
		renderingTarget: 'Web',
		NAV: {
			...immersiveNav,
			selectedPillar: getCurrentPillar(webImmersiveArticle.frontendData),
		},
		article: {
			...webImmersiveArticle.frontendData,
			shouldHideAds: true,
		},
		format: immersiveFormat,
	},
	parameters: {
		formats: [immersiveFormat],
		chromatic: {
			modes: {
				'light wide': allModes['light wide'],
			},
		},
	},
	play: async ({ canvasElement }) => {
		const header = within(within(canvasElement).getByRole('banner'));

		await expect(immersiveNav.subNavSections?.links.length).toBeGreaterThan(
			0,
		);
		await expect(header.getByRole('link', { name: 'News' })).toBeVisible();
		for (const link of immersiveNav.subNavSections?.links ?? []) {
			await expect(
				header.queryByRole('link', { name: link.title }),
			).not.toBeInTheDocument();
		}
	},
};

export const WebImmersiveMobile: Story = {
	args: WebImmersive.args,
	globals: {
		viewport: { value: 'mobileMedium', isRotated: false },
	},
	parameters: {
		...WebImmersive.parameters,
		chromatic: {
			modes: {
				'light mobileMedium': allModes['light mobileMedium'],
			},
		},
	},
	play: async ({ canvasElement }) => {
		const media = canvasElement.querySelector<HTMLElement>(
			'[data-gu-name="media"]',
		);
		await expect(media).not.toBeNull();
		const image = within(media!).getByRole('img');
		await expect(image).toBeVisible();
		const { width, height } = image.getBoundingClientRect();
		await expect(width).toBeGreaterThan(0);
		await expect(height).toBeCloseTo((width * 5) / 4, 0);
	},
};

const webImmersivePortraitArticle = enhanceArticleType(
	{
		...RecipeFixture,
		format: {
			...RecipeFixture.format,
			display: 'ImmersiveDisplay',
		},
		mainMediaElements: RecipeFixture.mainMediaElements.map((element) =>
			element._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement'
				? {
						...element,
						media: {
							...element.media,
							allImages: element.media.allImages.map((image) => ({
								...image,
								fields: {
									...image.fields,
									aspectRatio: `${image.fields.width}:${image.fields.height}`,
								},
							})),
						},
					}
				: element,
		),
	},
	'Web',
);
const immersivePortraitFormat = {
	design: webImmersivePortraitArticle.design,
	display: webImmersivePortraitArticle.display,
	theme: webImmersivePortraitArticle.theme,
};

const immersivePortraitModes = {
	'light mobile': allModes['light mobile'],
	'light mobileMedium': allModes['light mobileMedium'],
	'light mobileLandscape': {
		...allModes.light,
		viewport: breakpoints.mobileLandscape,
	},
	'light phablet': {
		...allModes.light,
		viewport: breakpoints.phablet,
	},
	'light tablet': {
		...allModes.light,
		viewport: breakpoints.tablet,
	},
	'light desktop': allModes['light desktop'],
	'light leftCol': allModes['light leftCol'],
	'light wide': allModes['light wide'],
};

const assertImmersivePortraitFooter = async (canvasElement: HTMLElement) => {
	const media = canvasElement.querySelector<HTMLElement>(
		'[data-gu-name="media"]',
	);
	const standfirst = canvasElement.querySelector<HTMLElement>(
		'[data-gu-name="standfirst"]',
	);
	const metadata = canvasElement.querySelector<HTMLElement>(
		'[data-gu-name="meta"]',
	);

	await expect(media).not.toBeNull();
	await expect(standfirst).not.toBeNull();
	await expect(metadata).not.toBeNull();
	await expect(standfirst!.parentElement).toBe(media!.parentElement);
	await expect(metadata!.parentElement).toBe(media!.parentElement);

	const view = canvasElement.ownerDocument.defaultView;
	if (view == null) throw new Error('Expected a window for the story canvas');

	if (view.innerWidth >= breakpoints.leftCol) {
		const centreRuleStyles = view.getComputedStyle(standfirst!, '::before');
		const mediaRect = media!.getBoundingClientRect();
		const standfirstRect = standfirst!.getBoundingClientRect();
		const metadataRect = metadata!.getBoundingClientRect();

		await expect(centreRuleStyles.width).toBe('1px');
		await expect(
			Math.abs(standfirstRect.top - metadataRect.top),
		).toBeLessThan(1);
		await expect(
			Math.abs(standfirstRect.bottom - mediaRect.bottom),
		).toBeLessThan(1);
		await expect(
			Math.abs(metadataRect.bottom - mediaRect.bottom),
		).toBeLessThan(1);
	}
};

export const WebImmersivePortrait: Story = {
	args: {
		renderingTarget: 'Web',
		NAV: {
			...extractNAV(webImmersivePortraitArticle.frontendData.nav),
			selectedPillar: getCurrentPillar(
				webImmersivePortraitArticle.frontendData,
			),
		},
		article: {
			...webImmersivePortraitArticle.frontendData,
			shouldHideAds: true,
		},
		format: immersivePortraitFormat,
	},
	parameters: {
		formats: [immersivePortraitFormat],
		chromatic: {
			modes: immersivePortraitModes,
		},
	},
	play: async ({ canvasElement }) => {
		await assertImmersivePortraitFooter(canvasElement);
	},
};

const portraitImage =
	webImmersivePortraitArticle.frontendData.mainMediaElements.find(
		(element) =>
			element._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement',
	);

if (
	portraitImage?._type !==
	'model.dotcomrendering.pageElements.ImageBlockElement'
) {
	throw new Error(
		'Expected the immersive portrait fixture to contain an image',
	);
}

const posterImage = portraitImage.media.allImages[0];

if (posterImage == null) {
	throw new Error('Expected the immersive portrait image to have a source');
}

const portraitLoop: MediaAtomBlockElement = {
	_type: 'model.dotcomrendering.pageElements.MediaAtomBlockElement',
	elementId: 'immersive-portrait-loop',
	id: 'immersive-portrait-loop',
	assets: [
		{
			url: 'https://uploads.guim.co.uk/2026/08/27/Video__David_Newby._Styling__Melanie_Wilkinson--0a23361a-3cb6-4e45-84b8-d2a4921a89b7-1.0_480w_q8.mp4',
			mimeType: 'video/mp4',
			aspectRatio: '9:16',
		},
	],
	posterImage: [
		{
			url: posterImage.url,
			width: Number(posterImage.fields.width),
		},
	],
	videoPlayerFormat: 'Loop',
};

export const WebImmersivePortraitLoop: Story = {
	args: {
		...WebImmersivePortrait.args,
		article: {
			...webImmersivePortraitArticle.frontendData,
			shouldHideAds: true,
			mainMediaElements: [portraitLoop],
		},
	},
	parameters: {
		...WebImmersivePortrait.parameters,
		chromatic: {
			modes: {
				'light mobileMedium': allModes['light mobileMedium'],
				'light tablet': {
					...allModes.light,
					viewport: breakpoints.tablet,
				},
				'light desktop': allModes['light desktop'],
				'light wide': allModes['light wide'],
			},
		},
	},
	play: async ({ canvasElement }) => {
		await assertImmersivePortraitFooter(canvasElement);

		const video = canvasElement.querySelector<HTMLVideoElement>('video');
		await expect(video).not.toBeNull();

		const view = canvasElement.ownerDocument.defaultView;
		if (view == null) {
			throw new Error('Expected a window for the story canvas');
		}

		const videoStyles = view.getComputedStyle(video!);
		await expect(videoStyles.objectFit).toBe('cover');
		await expect(videoStyles.objectPosition).toBe('50% 0%');

		if (view.innerWidth >= breakpoints.tablet) {
			const media = canvasElement.querySelector<HTMLElement>(
				'[data-gu-name="media"]',
			);
			await expect(media).not.toBeNull();
			const { width, height } = media!.getBoundingClientRect();
			const heightRatio =
				view.innerWidth >= breakpoints.leftCol ? 5 / 4 : 16 / 9;
			await expect(Math.abs(height - width * heightRatio)).toBeLessThan(
				1,
			);
		}
	},
};

const immersiveWeekendReadFormat = {
	...immersivePortraitFormat,
	design: ArticleDesign.WeekendEssay,
};

export const WebImmersivePortraitWeekendRead: Story = {
	args: {
		...WebImmersivePortrait.args,
		article: {
			...webImmersivePortraitArticle.frontendData,
			shouldHideAds: true,
			format: {
				...webImmersivePortraitArticle.frontendData.format,
				design: 'WeekendEssayDesign',
			},
		},
		format: immersiveWeekendReadFormat,
	},
	parameters: {
		...WebImmersivePortrait.parameters,
		formats: [immersiveWeekendReadFormat],
		chromatic: {
			modes: immersivePortraitModes,
		},
	},
};
