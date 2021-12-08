import { addDividers } from '@root/src/model/add-dividers';
import { enhanceDots } from '@root/src/model/add-dots';
import { enhanceImages } from '@root/src/model/enhance-images';
import { enhanceInteractiveContentsElements } from '@root/src/model/enhance-interactive-contents-elements';
import { enhanceNumberedLists } from '@root/src/model/enhance-numbered-lists';
import { enhanceBlockquotes } from '@root/src/model/enhance-blockquotes';
import { enhanceEmbeds } from '@root/src/model/enhance-embeds';
import { enhancePlaceholders } from '@root/src/model/enhance-placeholders';

class BlockEnhancer {
	blocks: Block[];
	format: CAPIFormat;

	constructor(blocks: Block[], format: CAPIFormat) {
		this.blocks = blocks;
		this.format = format;
	}

	addDividers() {
		this.blocks = addDividers(this.blocks);
		return this;
	}

	enhanceDots() {
		this.blocks = enhanceDots(this.blocks);
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

	enhancePlaceholders() {
		this.blocks = enhancePlaceholders(this.blocks, this.format);
		return this;
	}
}

// IMPORTANT: the ordering of the enhancer is IMPORTANT to keep in mind
// exmaple: enhanceInteractiveContentElements needs to be before enhanceNumberedLists
// as they both effect SubheadingBlockElement
export const enhanceBlocks = (blocks: Block[], format: CAPIFormat): Block[] => {
	return new BlockEnhancer(blocks, format)
		.addDividers()
		.enhanceInteractiveContentsElements()
		.enhanceBlockquotes()
		.enhanceDots()
		.enhanceImages()
		.enhanceNumberedLists()
		.enhancePlaceholders()
		.enhanceEmbeds().blocks;
};
