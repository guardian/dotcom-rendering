import { type ArticleFormat } from '@guardian/libs';
import type { FEElement, ImageForLightbox, Newsletter } from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';
import { enhanceAdPlaceholders } from './enhance-ad-placeholders';
import { enhanceBlockquotes } from './enhance-blockquotes';
import { enhanceDividers } from './enhance-dividers';
import { enhanceDots } from './enhance-dots';
import { enhanceEmbeds } from './enhance-embeds';
import { enhanceH2s } from './enhance-H2s';
import { enhanceImages } from './enhance-images';
import { enhanceInteractiveContentsElements } from './enhance-interactive-contents-elements';
import { enhanceNumberedLists } from './enhance-numbered-lists';
import { enhanceTweets } from './enhance-tweets';
import { enhanceLists } from './enhanceLists';
import { insertPromotedNewsletter } from './insertPromotedNewsletter';

type Options = {
	renderingTarget: RenderingTarget;
	promotedNewsletter: Newsletter | undefined;
	imagesForLightbox: ImageForLightbox[];
};

const enhanceNewsletterSignup =
	(
		format: ArticleFormat,
		promotedNewsletter: Newsletter | undefined,
		blockId: string,
	) =>
	(elements: FEElement[]): FEElement[] =>
		promotedNewsletter !== undefined
			? insertPromotedNewsletter(
					elements,
					blockId,
					format,
					promotedNewsletter,
			  )
			: elements;

// IMPORTANT: the ordering of the enhancer is IMPORTANT to keep in mind
// example: enhanceInteractiveContentElements needs to be before enhanceNumberedLists
// as they both effect SubheadingBlockElement
export const enhanceElements = (
	elements: FEElement[],
	format: ArticleFormat,
	blockId: string,
	options: Options,
): FEElement[] =>
	[
		enhanceLists,
		enhanceDividers,
		enhanceH2s,
		enhanceInteractiveContentsElements,
		enhanceBlockquotes(format),
		enhanceDots,
		enhanceImages(format, options.imagesForLightbox),
		enhanceNumberedLists(format),
		enhanceEmbeds,
		enhanceTweets,
		enhanceNewsletterSignup(format, options.promotedNewsletter, blockId),
		enhanceAdPlaceholders(format, options.renderingTarget),
	].reduce((enhancedBlocks, enhancer) => enhancer(enhancedBlocks), elements);

export const enhanceBlocks = (
	blocks: Block[],
	format: ArticleFormat,
	options: Options,
): Block[] =>
	blocks.map((block) => ({
		...block,
		elements: enhanceElements(block.elements, format, block.id, options),
	}));
