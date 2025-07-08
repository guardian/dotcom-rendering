import { isUndefined } from '@guardian/libs';
import type { FEArticle } from '../frontend/feArticle';
import {
	ArticleDesign,
	type ArticleDisplay,
	type ArticleTheme,
	decideFormat,
} from '../lib/articleFormat';
import type { ImageForAppsLightbox } from '../model/appsLightboxImages';
import { appsLightboxImages } from '../model/appsLightboxImages';
import { buildCrosswordBlock } from '../model/buildCrosswordBlock';
import { buildLightboxImages } from '../model/buildLightboxImages';
import { enhanceBlocks, enhanceMainMedia } from '../model/enhanceBlocks';
import { enhanceCommercialProperties } from '../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../model/enhanceStandfirst';
import {
	enhanceTableOfContents,
	type TableOfContentsItem,
} from '../model/enhanceTableOfContents';
import { enhancePinnedPost } from '../model/pinnedPost';
import type { FEElement, ImageBlockElement, ImageForLightbox } from './content';
import { type RenderingTarget } from './renderingTarget';

/**
 * The `ArticleDeprecated` type enhances `FEArticleType` type which defines the model received from Frontend.
 *
 * @deprecated Replaced by {@linkcode Article}.
 */
export type ArticleDeprecated = FEArticle & {
	imagesForLightbox: ImageForLightbox[];
	imagesForAppsLightbox: ImageForAppsLightbox[];
	tableOfContents?: TableOfContentsItem[];
};

export type ArticleFields = {
	frontendData: ArticleDeprecated;
	display: ArticleDisplay;
	theme: ArticleTheme;
};

export type Gallery = ArticleFields & {
	design: ArticleDesign.Gallery;
	images: ImageBlockElement[];
	mainMedia: ImageBlockElement;
};

export type OtherArticles = ArticleFields & {
	design: Exclude<ArticleDesign, ArticleDesign.Gallery>;
};

export type Article = Gallery | OtherArticles;

export const getGalleryMainMedia = (
	mainMediaElements: FEElement[],
	trailImage?: ImageBlockElement,
): ImageBlockElement => {
	const mainMedia = mainMediaElements[0];

	if (isUndefined(mainMedia)) {
		if (isUndefined(trailImage)) {
			throw new Error('No main media or trail picture found');
		}
		return trailImage;
	}

	if (
		mainMedia._type !==
		'model.dotcomrendering.pageElements.ImageBlockElement'
	) {
		throw new Error('Main media is not an image');
	}

	return mainMedia;
};

export const enhanceArticleType = (
	data: FEArticle,
	renderingTarget: RenderingTarget,
): Article => {
	const format = decideFormat(data.format);

	const imagesForLightbox = data.config.switches.lightbox
		? buildLightboxImages(data.format, data.blocks, data.mainMediaElements)
		: [];

	const enhancedBlocks = enhanceBlocks(data.blocks, format, {
		renderingTarget,
		promotedNewsletter: data.promotedNewsletter,
		imagesForLightbox,
		hasAffiliateLinksDisclaimer: !!data.affiliateLinksDisclaimer,
		audioArticleImage: data.audioArticleImage,
		tags: data.tags,
		shouldHideAds: data.shouldHideAds,
	});

	const crosswordBlock = buildCrosswordBlock(data);
	const additionalBlocks = crosswordBlock ? [crosswordBlock] : [];

	const blocks = [...enhancedBlocks, ...additionalBlocks];

	const mainMediaElements = enhanceMainMedia(
		format,
		imagesForLightbox,
		true,
		data.main,
	)(data.mainMediaElements);

	if (format.design === ArticleDesign.Gallery) {
		const design = ArticleDesign.Gallery;

		return {
			frontendData: {
				...data,
				mainMediaElements,
				blocks,
				standfirst: enhanceStandfirst(data.standfirst),
				commercialProperties: enhanceCommercialProperties(
					data.commercialProperties,
				),
				tableOfContents: data.showTableOfContents
					? enhanceTableOfContents(enhancedBlocks)
					: undefined,
				/**
				 * This function needs to run at a higher level to most other enhancers
				 * because it needs both mainMediaElements and blocks in scope
				 */
				imagesForLightbox,
				imagesForAppsLightbox: appsLightboxImages(imagesForLightbox),
			},
			design,
			display: format.display,
			theme: format.theme,
			images: blocks.flatMap((block) =>
				block.elements.filter(
					(element) =>
						element._type ===
						'model.dotcomrendering.pageElements.ImageBlockElement',
				),
			),
			mainMedia: getGalleryMainMedia(
				mainMediaElements,
				data.trailPicture,
			),
		};
	}

	return {
		design: format.design,
		display: format.display,
		theme: format.theme,
		frontendData: {
			...data,
			mainMediaElements,
			blocks,
			pinnedPost: enhancePinnedPost(
				format,
				renderingTarget,
				data.pinnedPost,
			),
			standfirst: enhanceStandfirst(data.standfirst),
			commercialProperties: enhanceCommercialProperties(
				data.commercialProperties,
			),
			tableOfContents: data.showTableOfContents
				? enhanceTableOfContents(enhancedBlocks)
				: undefined,
			/**
			 * This function needs to run at a higher level to most other enhancers
			 * because it needs both mainMediaElements and blocks in scope
			 */
			imagesForLightbox,
			imagesForAppsLightbox: appsLightboxImages(imagesForLightbox),
		},
	};
};
