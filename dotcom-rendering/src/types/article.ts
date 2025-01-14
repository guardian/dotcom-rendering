import { type ArticleFormat, decideFormat } from '../lib/articleFormat';
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
import type { Block } from './blocks';
import type { ImageForLightbox } from './content';
import type { FEArticleType } from './frontend';
import { type RenderingTarget } from './renderingTarget';

/**
 * The `ArticleDeprecated` type enhances `FEArticleType` type which defines the model received from Frontend.
 *
 * @deprecated Replaced by {@linkcode Article}.
 */
export type ArticleDeprecated = FEArticleType & {
	imagesForLightbox: ImageForLightbox[];
	imagesForAppsLightbox: ImageForAppsLightbox[];
	tableOfContents?: TableOfContentsItem[];
};

export type Article = {
	format: ArticleFormat;
	frontendData: ArticleDeprecated;
};

export const enhanceArticleType = (
	data: FEArticleType,
	renderingTarget: RenderingTarget,
): Article => {
	const format = decideFormat(data.format);

	const crosswordBlock: Block | undefined = buildCrosswordBlock(data);

	const additionalBlocks: Block[] = crosswordBlock ? [crosswordBlock] : [];

	const imagesForLightbox = data.config.switches.lightbox
		? buildLightboxImages(data.format, data.blocks, data.mainMediaElements)
		: [];

	const enhancedBlocks = enhanceBlocks(data.blocks, format, {
		renderingTarget,
		promotedNewsletter: data.promotedNewsletter,
		imagesForLightbox,
		hasAffiliateLinksDisclaimer: !!data.affiliateLinksDisclaimer,
		audioArticleImage: data.audioArticleImage,
		additionalBlocks,
		tags: data.tags,
	});

	const mainMediaElements = enhanceMainMedia(
		format,
		imagesForLightbox,
		true,
		data.main,
	)(data.mainMediaElements);

	return {
		format,
		frontendData: {
			...data,
			mainMediaElements,
			blocks: enhancedBlocks,
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
