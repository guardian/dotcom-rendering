import { type ArticleFormat } from '@guardian/libs';
import type { ImageForLightbox, Newsletter } from '../types/content';
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
import { insertPromotedNewsletter } from './insertPromotedNewsletter';

type Options = {
	renderingTarget: RenderingTarget;
	promotedNewsletter: Newsletter | undefined;
	imagesForLightbox: ImageForLightbox[];
};

const enhanceNewsletterSignup =
	(format: ArticleFormat, promotedNewsletter: Newsletter | undefined) =>
	(blocks: Block[]): Block[] =>
		promotedNewsletter !== undefined
			? insertPromotedNewsletter(blocks, format, promotedNewsletter)
			: blocks;

// IMPORTANT: the ordering of the enhancer is IMPORTANT to keep in mind
// example: enhanceInteractiveContentElements needs to be before enhanceNumberedLists
// as they both effect SubheadingBlockElement
export const enhanceBlocks = (
	blocks: Block[],
	format: ArticleFormat,
	options: Options,
): Block[] =>
	[
		enhanceDividers,
		enhanceH2s,
		enhanceInteractiveContentsElements,
		enhanceBlockquotes(format),
		enhanceDots,
		enhanceImages(format, options.imagesForLightbox),
		enhanceNumberedLists(format),
		enhanceEmbeds,
		enhanceTweets,
		enhanceNewsletterSignup(format, options.promotedNewsletter),
		enhanceAdPlaceholders(format, options.renderingTarget),
	].reduce((prevBlocks, enhancer) => enhancer(prevBlocks), blocks);
