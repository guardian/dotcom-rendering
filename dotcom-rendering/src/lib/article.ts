import { addImageIDs } from '../model/addImageIDs';
import { appsLightboxImages } from '../model/appsLightboxImages';
import { buildLightboxImages } from '../model/buildLightboxImages';
import { addLightboxData } from '../model/enhance-images';
import { enhanceBlocks } from '../model/enhanceBlocks';
import { enhanceCommercialProperties } from '../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../model/enhanceStandfirst';
import { enhanceTableOfContents } from '../model/enhanceTableOfContents';
import { validateAsArticleType } from '../model/validate';
import { type FEArticleBadgeType } from '../types/badge';
import { type DCRArticle } from '../types/frontend';
import { type RenderingTarget } from '../types/renderingTarget';

const enhancePinnedPost = (
	format: FEFormat,
	renderingTarget: RenderingTarget,
	block?: Block,
) => {
	return block ? enhanceBlocks([block], format, renderingTarget)[0] : block;
};

const enhanceBadge = (badge?: FEArticleBadgeType) =>
	badge
		? {
				...badge,
				enhanced: {
					href: `/${badge.seriesTag}`,
					imageSrc: badge.imageUrl,
				},
		  }
		: undefined;
export const enhanceArticleType = (
	body: unknown,
	renderingTarget: RenderingTarget,
): DCRArticle => {
	const validated = validateAsArticleType(body);
	// addImageIDs needs to take account of both main media elements
	// and block elements, so it needs to be executed here
	const { mainMediaElements, blocks } = addImageIDs(validated);
	const data = {
		...validated,
		mainMediaElements,
		blocks,
	};

	const enhancedBlocks = enhanceBlocks(
		data.blocks,
		data.format,
		renderingTarget,
		{
			promotedNewsletter: data.promotedNewsletter,
		},
	);
	const enhancedMainMedia = addLightboxData(data.mainMediaElements);
	const imagesForLightbox = buildLightboxImages(
		data.format,
		enhancedBlocks,
		enhancedMainMedia,
	);
	return {
		...data,
		mainMediaElements: enhancedMainMedia,
		blocks: enhancedBlocks,
		pinnedPost: enhancePinnedPost(
			data.format,
			renderingTarget,
			data.pinnedPost,
		),
		standfirst: enhanceStandfirst(data.standfirst),
		commercialProperties: enhanceCommercialProperties(
			data.commercialProperties,
		),
		tableOfContents: data.showTableOfContents
			? enhanceTableOfContents(data.format, enhancedBlocks)
			: undefined,
		/**
		 * This function needs to run at a higher level to most other enhancers
		 * because it needs both mainMediaElements and blocks in scope
		 */
		imagesForLightbox,
		imagesForAppsLightbox: appsLightboxImages(imagesForLightbox),
		badge: enhanceBadge(data.badge),
	};
};
