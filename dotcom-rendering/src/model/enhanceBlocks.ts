import type { Newsletter } from '../types/content';
import { enhanceBlockquotes } from './enhance-blockquotes';
import { enhanceDividers } from './enhance-dividers';
import { enhanceDots } from './enhance-dots';
import { enhanceEmbeds } from './enhance-embeds';
import { enhanceH2s } from './enhance-H2s';
import { enhanceH3s } from './enhance-H3s';
import { enhanceImages } from './enhance-images';
import { enhanceInteractiveContentsElements } from './enhance-interactive-contents-elements';
import { enhanceNumberedLists } from './enhance-numbered-lists';
import { enhanceRecipes } from './enhance-recipes';
import { enhanceTweets } from './enhance-tweets';
import { insertPromotedNewsletter } from './insertPromotedNewsletter';

class BlockEnhancer {
	blocks: Block[];

	format: CAPIFormat;

	options: Options;

	constructor(blocks: Block[], format: CAPIFormat, options: Options) {
		this.blocks = blocks;
		this.format = format;
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

	enhanceH3s() {
		this.blocks = enhanceH3s(this.blocks, this.format);
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

	enhanceRecipes(isRecipe: boolean) {
		if (isRecipe) this.blocks = enhanceRecipes(this.blocks);
		return this;
	}
}

type Options = {
	isRecipe: boolean;
	promotedNewsletter: Newsletter | undefined;
};

// IMPORTANT: the ordering of the enhancer is IMPORTANT to keep in mind
// example: enhanceInteractiveContentElements needs to be before enhanceNumberedLists
// as they both effect SubheadingBlockElement
export const enhanceBlocks = (
	blocks: Block[],
	format: CAPIFormat,
	options?: Options,
): Block[] => {
	const { isRecipe = false, promotedNewsletter } = options ?? {};

	return new BlockEnhancer(blocks, format, { isRecipe, promotedNewsletter })
		.enhanceDividers()
		.enhanceH3s()
		.enhanceH2s()
		.enhanceInteractiveContentsElements()
		.enhanceBlockquotes()
		.enhanceDots()
		.enhanceImages()
		.enhanceNumberedLists()
		.enhanceEmbeds()
		.enhanceTweets()
		.enhanceRecipes(isRecipe)
		.enhanceNewsletterSignup().blocks;
};
