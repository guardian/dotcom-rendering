import type { FEHostedContent } from '../frontend/feHostedContent';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
} from '../lib/articleFormat';
import { enhanceMainMedia } from '../model/enhanceBlocks';
import { enhanceCommercialProperties } from '../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../model/enhanceStandfirst';
import type { Article } from './article';

export type HostedContent = Article;

export const enhanceHostedContent = (data: FEHostedContent): HostedContent => {
	// Temporarily hard coded
	const format = {
		display: ArticleDisplay.Standard,
		design: ArticleDesign.HostedArticle,
		theme: ArticleSpecial.Labs,
	};

	const serverTime = Date.now();

	/** @todo implement blocks */
	// const enhancedBlocks = enhanceBlocks(data.blocks, format, {
	// 	renderingTarget,
	// 	promotedNewsletter: data.promotedNewsletter,
	// 	imagesForLightbox: [],
	// 	hasAffiliateLinksDisclaimer: !!data.affiliateLinksDisclaimer,
	// 	audioArticleImage: data.audioArticleImage,
	// 	tags: data.tags,
	// 	shouldHideAds: data.shouldHideAds,
	// 	pageId: data.pageId,
	// });

	const mainMediaElements = enhanceMainMedia(
		format,
		[], //imagesForLightbox
		true,
		data.main,
	)(data.mainMediaElements);

	/** @ts-expect-error -- @todo fix this! */
	return {
		design: format.design,
		display: format.display,
		theme: format.theme,
		serverTime,
		storyPackage: undefined,
		frontendData: {
			...data,
			beaconURL: '',
			mainMediaElements,
			blocks: [],
			standfirst: enhanceStandfirst(data.standfirst),
			commercialProperties: enhanceCommercialProperties(
				data.commercialProperties,
			),
			/**
			 * This function needs to run at a higher level to most other enhancers
			 * because it needs both mainMediaElements and blocks in scope
			 * @todo implement for Hosted Content pages
			 */
			imagesForLightbox: [],
			/** @todo implement for Hosted Content pages */
			imagesForAppsLightbox: [],
		},
	};
};
