import type { ArticleFormat } from '@guardian/libs';
import { appsLightboxImages } from '../model/appsLightboxImages';
import { buildLightboxImages } from '../model/buildLightboxImages';
import { enhanceBlocks, enhanceMainMedia } from '../model/enhanceBlocks';
import { enhanceCommercialProperties } from '../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../model/enhanceStandfirst';
import { enhanceTableOfContents } from '../model/enhanceTableOfContents';
import { validateAsArticleType } from '../model/validate';
import type { ServerSideTests } from '../types/config';
import { type DCRArticle } from '../types/frontend';
import { type RenderingTarget } from '../types/renderingTarget';
import { decideFormat } from './decideFormat';

const enhancePinnedPost = (
	format: ArticleFormat,
	renderingTarget: RenderingTarget,
	abTests: ServerSideTests,
	block?: Block,
) => {
	if (!block) return;

	return enhanceBlocks([block], format, {
		renderingTarget,
		imagesForLightbox: [],
		promotedNewsletter: undefined,
		hasAffiliateLinksDisclaimer: false,
		abTests,
	})[0];
};

export const enhanceArticleType = (
	body: unknown,
	renderingTarget: RenderingTarget,
): DCRArticle => {
	const data = validateAsArticleType(body);
	const format = decideFormat(data.format);

	const imagesForLightbox = data.config.switches.lightbox
		? buildLightboxImages(data.format, data.blocks, data.mainMediaElements)
		: [];

	const enhancedBlocks = enhanceBlocks(data.blocks, format, {
		renderingTarget,
		promotedNewsletter: data.promotedNewsletter,
		imagesForLightbox,
		hasAffiliateLinksDisclaimer: !!data.affiliateLinksDisclaimer,
		abTests: data.config.abTests,
	});

	const mainMediaElements = enhanceMainMedia(
		format,
		imagesForLightbox,
		data.main,
	)(data.mainMediaElements);

	return {
		...data,
		mainMediaElements,
		blocks: enhancedBlocks,
		pinnedPost: enhancePinnedPost(
			format,
			renderingTarget,
			data.config.abTests,
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
	};
};
