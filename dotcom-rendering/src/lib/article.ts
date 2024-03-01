import { randomUUID } from 'node:crypto';
import type { ArticleFormat } from '@guardian/libs';
import { appsLightboxImages } from '../model/appsLightboxImages';
import { buildLightboxImages } from '../model/buildLightboxImages';
import { enhanceBlocks, enhanceMainMedia } from '../model/enhanceBlocks';
import { enhanceCommercialProperties } from '../model/enhanceCommercialProperties';
import { enhanceStandfirst } from '../model/enhanceStandfirst';
import { enhanceTableOfContents } from '../model/enhanceTableOfContents';
import { validateAsArticleType } from '../model/validate';
import { type DCRArticle } from '../types/frontend';
import { type RenderingTarget } from '../types/renderingTarget';
import { decideFormat } from './decideFormat';

const enhancePinnedPost = (
	format: ArticleFormat,
	renderingTarget: RenderingTarget,
	block?: Block,
) => {
	if (!block) return;

	return enhanceBlocks([block], format, {
		renderingTarget,
		imagesForLightbox: [],
		promotedNewsletter: undefined,
		hasAffiliateLinksDisclaimer: false,
	})[0];
};

export const enhanceCrossword = (article: DCRArticle): DCRArticle => {
	if (article.crossword) {
		const element = {
			_type: 'model.dotcomrendering.pageElements.CrosswordElement' as const,
			crossword: article.crossword,
		};
		return {
			...article,
			format: { ...article.format, design: 'InteractiveDesign' },
			blocks: [
				{
					id: randomUUID(),
					elements: [element],
					attributes: {
						pinned: false,
						keyEvent: false,
						summary: false,
					},
					primaryDateLine: article.webPublicationDateDisplay,
					secondaryDateLine:
						article.webPublicationSecondaryDateDisplay,
				},
			],
			crossword: undefined,
		};
	}

	throw new TypeError('article did not contain a crossword');
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
	});

	const mainMediaElements = enhanceMainMedia(
		format,
		imagesForLightbox,
		true,
		data.main,
	)(data.mainMediaElements);

	return {
		...data,
		mainMediaElements,
		blocks: enhancedBlocks,
		pinnedPost: enhancePinnedPost(format, renderingTarget, data.pinnedPost),
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
