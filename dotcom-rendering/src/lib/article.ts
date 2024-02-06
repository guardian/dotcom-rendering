import { appsLightboxImages } from '../model/appsLightboxImages';
import { buildLightboxImages } from '../model/buildLightboxImages';
import { enhanceElementsImages } from '../model/enhance-images';
import { enhanceBlocks } from '../model/enhanceBlocks';
import { enhanceCommercialProperties } from '../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../model/enhanceStandfirst';
import { enhanceTableOfContents } from '../model/enhanceTableOfContents';
import { validateAsArticleType } from '../model/validate';
import { type DCRArticle } from '../types/frontend';
import { type RenderingTarget } from '../types/renderingTarget';

const enhancePinnedPost = (
	format: FEFormat,
	renderingTarget: RenderingTarget,
	block?: Block,
) => {
	if (!block) return;
	return enhanceBlocks([block], format, {
		renderingTarget,
		imagesForLightbox: [],
		promotedNewsletter: undefined,
	})[0];
};

export const enhanceArticleType = (
	body: unknown,
	renderingTarget: RenderingTarget,
): DCRArticle => {
	const data = validateAsArticleType(body);

	const imagesForLightbox = data.config.switches.lightbox
		? buildLightboxImages(data.format, data.blocks, data.mainMediaElements)
		: [];

	const enhancedBlocks = enhanceBlocks(data.blocks, data.format, {
		renderingTarget,
		promotedNewsletter: data.promotedNewsletter,
		imagesForLightbox,
	});

	const mainMediaElements = enhanceElementsImages(
		data.mainMediaElements,
		data.format,
		imagesForLightbox,
	);

	return {
		...data,
		mainMediaElements,
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
	};
};
