import type { Newsletter } from '../types/content';
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
import { validateAsBlock } from './validate';

class BlockEnhancer {
	blocks: Block[];

	format: FEFormat;

	renderingTarget: RenderingTarget;

	options: Options;

	constructor(
		blocks: Block[],
		format: FEFormat,
		renderingTarget: RenderingTarget,
		options: Options,
	) {
		this.blocks = blocks;
		this.format = format;
		this.renderingTarget = renderingTarget;
		this.options = options;
	}

	enhanceNewsletterSignup() {
		if (this.options.promotedNewsletter) {
			this.blocks = insertPromotedNewsletter(
				this.blocks,
				this.format,
				this.options.promotedNewsletter,
			);
		}
		return this;
	}

	enhanceAdPlaceholders() {
		if (
			this.renderingTarget === 'Apps' &&
			!(this.format.design === 'LiveBlogDesign') &&
			!(this.format.design === 'DeadBlogDesign')
		) {
			this.blocks = enhanceAdPlaceholders(this.blocks);
		}
		return this;
	}

	enhanceDividers() {
		this.blocks = enhanceDividers(this.blocks);
		return this;
	}

	enhanceDots() {
		this.blocks = enhanceDots(this.blocks);
		return this;
	}

	enhanceH2s() {
		this.blocks = enhanceH2s(this.blocks);
		return this;
	}

	enhanceInteractiveContentsElements() {
		this.blocks = enhanceInteractiveContentsElements(this.blocks);
		return this;
	}

	enhanceImages() {
		this.blocks = enhanceImages(this.blocks, this.format);
		return this;
	}

	enhanceNumberedLists() {
		this.blocks = enhanceNumberedLists(this.blocks, this.format);
		return this;
	}

	enhanceBlockquotes() {
		this.blocks = enhanceBlockquotes(this.blocks, this.format);
		return this;
	}

	enhanceEmbeds() {
		this.blocks = enhanceEmbeds(this.blocks);
		return this;
	}

	enhanceTweets() {
		this.blocks = enhanceTweets(this.blocks);
		return this;
	}
}

type Options = {
	promotedNewsletter: Newsletter | undefined;
};

// TODO - add consideration of rendering target / platform
// so that we can add app-only enhancers

// IMPORTANT: the ordering of the enhancer is IMPORTANT to keep in mind
// example: enhanceInteractiveContentElements needs to be before enhanceNumberedLists
// as they both effect SubheadingBlockElement
export const enhanceBlocks = (
	blocks: Block[],
	format: FEFormat,
	renderingTarget: RenderingTarget,
	options?: Options,
): Block[] => {
	const { promotedNewsletter } = options ?? {};

	for (const block of blocks) validateAsBlock(block);
	return new BlockEnhancer(blocks, format, renderingTarget, {
		promotedNewsletter,
	})
		.enhanceDividers()
		.enhanceH2s()
		.enhanceInteractiveContentsElements()
		.enhanceBlockquotes()
		.enhanceDots()
		.enhanceImages()
		.enhanceNumberedLists()
		.enhanceEmbeds()
		.enhanceTweets()
		.enhanceNewsletterSignup()
		.enhanceAdPlaceholders().blocks;
};
