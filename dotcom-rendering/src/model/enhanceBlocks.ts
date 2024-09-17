import { type ArticleFormat, isUndefined } from '@guardian/libs';
import type {
	FEElement,
	ImageBlockElement,
	ImageForLightbox,
	Newsletter,
} from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';
import { enhanceAdPlaceholders } from './enhance-ad-placeholders';
import { enhanceBlockquotes } from './enhance-blockquotes';
import { enhanceDisclaimer } from './enhance-disclaimer';
import { enhanceDividers } from './enhance-dividers';
import { enhanceDots } from './enhance-dots';
import { enhanceEmbeds } from './enhance-embeds';
import { enhanceH2s } from './enhance-H2s';
import { enhanceElementsImages, enhanceImages } from './enhance-images';
import { enhanceInteractiveContentsElements } from './enhance-interactive-contents-elements';
import { enhanceNumberedLists } from './enhance-numbered-lists';
import { enhanceTweets } from './enhance-tweets';
import { enhanceGuVideos } from './enhance-videos';
import { enhanceLists } from './enhanceLists';
import { enhanceTimeline } from './enhanceTimeline';
import { insertPromotedNewsletter } from './insertPromotedNewsletter';

type Options = {
	renderingTarget: RenderingTarget;
	promotedNewsletter: Newsletter | undefined;
	imagesForLightbox: ImageForLightbox[];
	hasAffiliateLinksDisclaimer: boolean;
	audioArticleImage?: ImageBlockElement;
};

const enhanceNewsletterSignup =
	(
		format: ArticleFormat,
		promotedNewsletter: Newsletter | undefined,
		blockId: string,
	) =>
	(elements: FEElement[]): FEElement[] =>
		!isUndefined(promotedNewsletter)
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
	(format: ArticleFormat, blockId: string, options: Options) =>
	(elements: FEElement[]): FEElement[] =>
		[
			enhanceLists(enhanceElements(format, blockId, options)),
			enhanceTimeline(enhanceElements(format, blockId, options)),
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
			enhanceAdPlaceholders(format, options.renderingTarget),
			enhanceDisclaimer(options.hasAffiliateLinksDisclaimer),
		].reduce(
			(enhancedBlocks, enhancer) => enhancer(enhancedBlocks),
			elements,
		);

export const enhanceMainMedia =
	(
		format: ArticleFormat,
		imagesForLightbox: ImageForLightbox[],
		isMainMedia: boolean,
		mediaHTML: string,
	) =>
	(elements: FEElement[]): FEElement[] => {
		return [
			enhanceElementsImages(format, isMainMedia, imagesForLightbox),
			enhanceGuVideos(format, mediaHTML),
		].reduce(
			(enhancedBlocks, enhancer) => enhancer(enhancedBlocks),
			elements,
		);
	};

export const enhanceBlocks = (
	blocks: Block[],
	format: ArticleFormat,
	options: Options,
): Block[] => {
	let additionalElement: FEElement;
	if (options.audioArticleImage) {
		options.audioArticleImage._type =
			'model.dotcomrendering.pageElements.ImageBlockElement';
		additionalElement = options.audioArticleImage;
	}
	return blocks.map((block) => ({
		...block,
		elements: enhanceElements(
			format,
			block.id,
			options,
		)([...block.elements, additionalElement]),
	}));
};
