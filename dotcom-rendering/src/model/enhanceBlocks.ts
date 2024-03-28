import { type ArticleFormat } from '@guardian/libs';
import type { ServerSideTests } from '../types/config';
import type { FEElement, ImageForLightbox, Newsletter } from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';
import { enhanceAdPlaceholders } from './enhance-ad-placeholders';
import { enhanceAdPlaceholders as enhanceAdPlaceholders_AB_TEST_CONTROL } from './enhance-ad-placeholders_AB_TEST_CONTROL';
import { enhanceBlockquotes } from './enhance-blockquotes';
import { enhanceDisclaimer } from './enhance-disclaimer';
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
	hasAffiliateLinksDisclaimer: boolean;
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
export const enhanceElements =
	(
		format: ArticleFormat,
		blockId: string,
		abTests: ServerSideTests,
		options: Options,
	) =>
	(elements: FEElement[]): FEElement[] => {
		return [
			enhanceLists(enhanceElements(format, blockId, abTests, options)),
			enhanceDividers,
			enhanceH2s,
			enhanceInteractiveContentsElements,
			enhanceBlockquotes(format),
			enhanceDots,
			enhanceImages(format, options.imagesForLightbox),
			enhanceNumberedLists(format),
			enhanceEmbeds,
			enhanceTweets,
			enhanceNewsletterSignup(
				format,
				options.promotedNewsletter,
				blockId,
			),
			abTests.commercialMegaTestControl === 'control'
				? enhanceAdPlaceholders_AB_TEST_CONTROL(
						format,
						options.renderingTarget,
				  )
				: enhanceAdPlaceholders(format, options.renderingTarget),
			enhanceDisclaimer(options.hasAffiliateLinksDisclaimer),
		].reduce(
			(enhancedBlocks, enhancer) => enhancer(enhancedBlocks),
			elements,
		);
	};

export const enhanceBlocks = (
	blocks: Block[],
	format: ArticleFormat,
	abTests: ServerSideTests,
	options: Options,
): Block[] =>
	blocks.map((block) => ({
		...block,
		elements: enhanceElements(
			format,
			block.id,
			abTests,
			options,
		)(block.elements),
	}));
