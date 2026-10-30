import { isUndefined } from '@guardian/libs';
import type { FEArticle } from '../frontend/feArticle';
import {
	ArticleDesign,
	type ArticleDisplay,
	type ArticleFormat,
	type ArticleTheme,
	decideFormat,
} from '../lib/articleFormat';
import { getPuzzleGroupPalette } from '../lib/puzzleGroupPalette';
import { isPuzzlesHubV1Enabled } from '../lib/puzzlesHubVersionExperiment';
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
export type ArticleDeprecated = Omit<FEArticle, 'affiliateLinksDisclaimer'> & {
	imagesForLightbox: ImageForLightbox[];
	imagesForAppsLightbox: ImageForAppsLightbox[];
	tableOfContents?: TableOfContentsItem[];
	affiliateLinksDisclaimerRequired: boolean;
};

export type ArticleFields = {
	frontendData: ArticleDeprecated;
	display: ArticleDisplay;
	theme: ArticleTheme;
	storyPackage: StoryPackage | undefined;
	serverTime?: number | undefined;
};

export type GalleryDesign = ArticleDesign.Gallery | ArticleDesign.HostedGallery;

export type Gallery = ArticleFields & {
	design: GalleryDesign;
	bodyElements: (ImageBlockElement | AdPlaceholderBlockElement)[];
	mainMedia?: ImageBlockElement;
};

export type OtherArticles = ArticleFields & {
	design: Exclude<ArticleDesign, GalleryDesign>;
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

/**
 * Crosswords take the colour of the crosswords group (news) instead of the
 * theme Frontend sends, but only for readers in the `puzzles-new-hub-v1`
 * experiment.
 */
const decideArticleFormat = (data: FEArticle): ArticleFormat => {
	const format = decideFormat(data.format);
	if (
		format.design === ArticleDesign.Crossword &&
		isPuzzlesHubV1Enabled(data.config)
	) {
		return { ...format, theme: getPuzzleGroupPalette('crosswords').theme };
	}
	return format;
};

export const enhanceArticleType = (
	data: FEArticle,
	renderingTarget: RenderingTarget,
): Article => {
	const format = decideArticleFormat(data);

	const serverTime = Date.now();

	const mainMediaElementsData =
		// Hosted Gallery pages do not display main media
		format.design === ArticleDesign.HostedGallery
			? []
			: data.mainMediaElements;

	const imagesForLightbox = data.config.switches.lightbox
		? buildLightboxImages(data.format, data.blocks, mainMediaElementsData)
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
		switches: data.config.switches,
		stage: data.config.stage,
	});

	const crosswordBlock = buildCrosswordBlock(data);
	const additionalBlocks = crosswordBlock ? [crosswordBlock] : [];

	const blocks = [...enhancedBlocks, ...additionalBlocks];

	const mainMediaElements = enhanceMainMedia(
		format,
		imagesForLightbox,
		true,
		data.main,
	)(mainMediaElementsData);

	const isGalleryPage = (design: ArticleDesign): design is GalleryDesign =>
		design === ArticleDesign.Gallery ||
		design === ArticleDesign.HostedGallery;

	const storyPackage = parseStoryPackage(
		data.storyPackage,
		format.design === ArticleDesign.Gallery,
	);

	const affiliateLinksDisclaimerRequired =
		data.affiliateLinksDisclaimer === 'true' ||
		(data.affiliateLinksDisclaimer as unknown) === true;

	if (isGalleryPage(format.design)) {
		const { design } = format;

		return {
			frontendData: {
				...data,
				affiliateLinksDisclaimerRequired,
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
			affiliateLinksDisclaimerRequired,
			mainMediaElements,
			blocks,
			pinnedPost: enhancePinnedPost(
				format,
				renderingTarget,
				data.pinnedPost,
				data.pageId,
				data.config.stage,
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
