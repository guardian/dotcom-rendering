import { Recipe as RecipeFixture } from '../../../fixtures/generated/fe-articles/Recipe';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
} from '../../lib/articleFormat';
import { enhanceArticleType } from '../../types/article';
import type { ArticleDeprecated } from '../../types/article';
import type { MediaAtomBlockElement } from '../../types/content';
import { getLayoutType, getMainMediaInfo } from '../lib/articleArrangements';
import { deriveArticleGridLayout as deriveLayout } from './deriveArticleGridLayout';

const deriveArticleGridLayout = ({
	article,
	format,
}: {
	article: ArticleDeprecated;
	format: ArticleFormat;
}) => {
	const { mainMediaAspectRatio, mainMediaOrientation } =
		getMainMediaInfo(article);
	return deriveLayout({
		article,
		format,
		layoutType: getLayoutType(format, mainMediaOrientation),
		mainMediaAspectRatio,
		hasPageSkin: false,
	});
};

const enhancedRecipe = enhanceArticleType(RecipeFixture, 'Web');
const article = enhancedRecipe.frontendData;
const immersiveFormat = {
	design: enhancedRecipe.design,
	display: ArticleDisplay.Immersive,
	theme: enhancedRecipe.theme,
};

const mediaAtom = ({
	aspectRatio,
	videoPlayerFormat,
}: {
	aspectRatio: string;
	videoPlayerFormat: MediaAtomBlockElement['videoPlayerFormat'];
}): MediaAtomBlockElement => ({
	_type: 'model.dotcomrendering.pageElements.MediaAtomBlockElement',
	elementId: 'test-media-atom',
	id: 'test-media-atom',
	assets: [
		{
			url: 'https://uploads.guim.co.uk/test.mp4',
			mimeType: 'video/mp4',
			aspectRatio,
		},
	],
	videoPlayerFormat,
});

describe('deriveArticleGridLayout', () => {
	it.each([
		{ display: ArticleDisplay.Standard, required: false, expected: false },
		{ display: ArticleDisplay.Standard, required: true, expected: false },
		{ display: ArticleDisplay.Immersive, required: false, expected: false },
		{ display: ArticleDisplay.Immersive, required: true, expected: true },
	])(
		'places an affiliate disclaimer above the standfirst only for immersive articles ($display, $required)',
		({ display, required, expected }) => {
			const layout = deriveArticleGridLayout({
				article: {
					...article,
					affiliateLinksDisclaimerRequired: required,
				},
				format: { ...immersiveFormat, display },
			});

			expect(layout.hasImmersiveAffiliateDisclaimer).toBe(expected);
		},
	);

	it.each([
		{
			name: 'portrait image',
			mainMediaElements: article.mainMediaElements.map((element) =>
				element._type ===
				'model.dotcomrendering.pageElements.ImageBlockElement'
					? {
							...element,
							media: {
								...element.media,
								allImages: element.media.allImages.map(
									(image) => ({
										...image,
										fields: {
											...image.fields,
											aspectRatio: '4:5',
										},
									}),
								),
							},
						}
					: element,
			),
			expectedLayout: 'immersivePortrait',
			usesImmersiveImageProportions: true,
		},
		{
			name: 'landscape image',
			mainMediaElements: article.mainMediaElements.map((element) =>
				element._type ===
				'model.dotcomrendering.pageElements.ImageBlockElement'
					? {
							...element,
							media: {
								...element.media,
								allImages: element.media.allImages.map(
									(image) => ({
										...image,
										fields: {
											...image.fields,
											aspectRatio: '5:4',
										},
									}),
								),
							},
						}
					: element,
			),
			expectedLayout: 'immersiveLandscape',
			usesImmersiveImageProportions: true,
		},
		{
			name: 'portrait loop',
			mainMediaElements: [
				mediaAtom({
					aspectRatio: '9:16',
					videoPlayerFormat: 'Loop',
				}),
			],
			expectedLayout: 'immersivePortrait',
			usesImmersiveImageProportions: true,
		},
		{
			name: 'portrait cinemagraph',
			mainMediaElements: [
				mediaAtom({
					aspectRatio: '9:16',
					videoPlayerFormat: 'Cinemagraph',
				}),
			],
			expectedLayout: 'immersivePortrait',
			usesImmersiveImageProportions: true,
		},
		{
			name: 'default portrait video',
			mainMediaElements: [
				mediaAtom({
					aspectRatio: '9:16',
					videoPlayerFormat: 'Default',
				}),
			],
			expectedLayout: 'immersivePortrait',
			usesImmersiveImageProportions: false,
		},
	])(
		'classifies $name',
		({
			mainMediaElements,
			expectedLayout,
			usesImmersiveImageProportions,
		}) => {
			const layout = deriveArticleGridLayout({
				article: {
					...article,
					mainMediaElements,
				},
				format: immersiveFormat,
			});

			expect(layout.layoutType).toBe(expectedLayout);
			expect(layout.usesImmersiveImageProportions).toBe(
				usesImmersiveImageProportions,
			);
		},
	);

	it('uses the interactive top hat layout for showcase interactives', () => {
		const layout = deriveArticleGridLayout({
			article,
			format: {
				...immersiveFormat,
				design: ArticleDesign.Interactive,
				display: ArticleDisplay.Showcase,
			},
		});

		expect(layout.layoutType).toBe('interactiveTopHat');
		expect(layout.isInteractiveTopHat).toBe(true);
		expect(layout.isImmersive).toBe(false);
	});

	it('falls back to immersive landscape when main media is missing', () => {
		const layout = deriveArticleGridLayout({
			article: {
				...article,
				mainMediaElements: [],
			},
			format: immersiveFormat,
		});

		expect(layout.layoutType).toBe('immersiveLandscape');
		expect(layout.mainMediaAspectRatio).toBeUndefined();
		expect(layout.usesImmersiveImageProportions).toBe(false);
	});
});
