import { randomUUID } from 'node:crypto';
import { ArticleDesign, type ArticleFormat } from '@guardian/libs';
import { decideFormat } from '../lib/decideFormat';
import type { ImageForAppsLightbox } from '../model/appsLightboxImages';
import { appsLightboxImages } from '../model/appsLightboxImages';
import { buildLightboxImages } from '../model/buildLightboxImages';
import { enhanceBlocks, enhanceMainMedia } from '../model/enhanceBlocks';
import { enhanceCommercialProperties } from '../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../model/enhanceStandfirst';
import { enhanceTableOfContents } from '../model/enhanceTableOfContents';
import { validateAsArticleType } from '../model/validate';
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

export interface TableOfContents {
	items: TableOfContentsItem[];
}

export interface TableOfContentsItem {
	id: string;
	title: string;
}

const enhancePinnedPost = (
	format: ArticleFormat,
	renderingTarget: RenderingTarget,
	block?: Block,
): Block | undefined => {
	if (!block) return;

	return enhanceBlocks([block], format, {
		renderingTarget,
		imagesForLightbox: [],
		promotedNewsletter: undefined,
		hasAffiliateLinksDisclaimer: false,
	})[0];
};

export const enhanceCrossword = (article: Article): Article => {
	if (article.frontendData.crossword) {
		const element = {
			_type: 'model.dotcomrendering.pageElements.CrosswordElement' as const,
			crossword: article.frontendData.crossword,
		};
		return {
			...article,
			format: { ...article.format, design: ArticleDesign.Crossword },
			frontendData: {
				...article.frontendData,
				blocks: [
					{
						id: randomUUID(),
						elements: [element],
						attributes: {
							pinned: false,
							keyEvent: false,
							summary: false,
						},
						primaryDateLine: article.frontendData.webPublicationDateDisplay,
						secondaryDateLine:
							article.frontendData.webPublicationSecondaryDateDisplay,
					},
				],
			}
		};
	}

	throw new TypeError('article did not contain a crossword');
};

export const enhanceArticleType = (
	body: unknown,
	renderingTarget: RenderingTarget,
): Article => {
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
