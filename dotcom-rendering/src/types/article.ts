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
import { logger } from '../server/lib/logging';
import { parse as parseStoryPackage, type StoryPackage } from '../storyPackage';
import type {
	AdPlaceholderBlockElement,
	FEElement,
	ImageBlockElement,
	ImageForLightbox,
} from './content';
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
	storyPackage: StoryPackage | undefined;
	serverTime?: number | undefined;
};

export type Gallery = ArticleFields & {
	design: ArticleDesign.Gallery;
	bodyElements: (ImageBlockElement | AdPlaceholderBlockElement)[];
	mainMedia?: ImageBlockElement;
};

export type OtherArticles = ArticleFields & {
	design: Exclude<ArticleDesign, ArticleDesign.Gallery>;
};

export type Article = Gallery | OtherArticles;

export const getGalleryMainMedia = (
	mainMediaElements: FEElement[],
	trailImage?: ImageBlockElement,
): ImageBlockElement | undefined => {
	const mainMedia = mainMediaElements[0];

	if (isUndefined(mainMedia)) {
		if (isUndefined(trailImage)) {
			logger.warn('No main media or trail picture found');
		}
		return trailImage;
	}

	if (
		mainMedia._type !==
		'model.dotcomrendering.pageElements.ImageBlockElement'
	) {
		logger.warn('Main media is not an image');
		return;
	}

	return mainMedia;
};

export const enhanceArticleType = (
	data: FEArticle,
	renderingTarget: RenderingTarget,
): Article => {
	const format = decideFormat(data.format);

	const serverTime = Date.now();

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
		pageId: data.pageId,
		serverSideABTests: data.config.serverSideABTests,
		byline: data.byline,
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

	const storyPackage = parseStoryPackage(
		data.storyPackage,
		format.design === ArticleDesign.Gallery,
	);

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
			serverTime,
			bodyElements: blocks.flatMap((block) =>
				block.elements.filter(
					(element) =>
						element._type ===
							'model.dotcomrendering.pageElements.ImageBlockElement' ||
						element._type ===
							'model.dotcomrendering.pageElements.AdPlaceholderBlockElement',
				),
			),
			mainMedia: getGalleryMainMedia(
				mainMediaElements,
				data.trailPicture,
			),
			storyPackage,
		};
	}

	return {
		design: format.design,
		display: format.display,
		theme: format.theme,
		storyPackage,
		serverTime,
		frontendData: {
			...data,
			mainMediaElements,
			blocks,
			pinnedPost: enhancePinnedPost(
				format,
				renderingTarget,
				data.pinnedPost,
				data.pageId,
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
