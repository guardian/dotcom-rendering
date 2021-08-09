import { validateAsCAPIType } from '@root/src/model/validate';
import { addDividers } from '@root/src/model/add-dividers';
import { enhanceDots } from '@root/src/model/add-dots';
import { setIsDev } from '@root/src/model/set-is-dev';
import { enhanceImages } from '@root/src/model/enhance-images';
import { enhanceInteractiveContentsElements } from '@root/src/model/enhance-interactive-contents-elements';
import { enhanceNumberedLists } from '@root/src/model/enhance-numbered-lists';
import { enhanceInteractiveAtomElements } from '@root/src/model/enhance-interactive-atom-elements';
import { enhanceBlockquotes } from '@root/src/model/enhance-blockquotes';
import { enhanceEmbeds } from '@root/src/model/enhance-embeds';

class CAPIEnhancer {
	capi: CAPIType;

	constructor(capi: CAPIType) {
		this.capi = capi;
	}

	addDividers() {
		this.capi = addDividers(this.capi);
		return this;
	}

	enhanceDots() {
		this.capi = enhanceDots(this.capi);
		return this;
	}

	enhanceInteractiveAtomElements() {
		this.capi = enhanceInteractiveAtomElements(this.capi);
		return this;
	}

	enhanceInteractiveContentsElements() {
		this.capi = enhanceInteractiveContentsElements(this.capi);
		return this;
	}

	enhanceImages() {
		this.capi = enhanceImages(this.capi);
		return this;
	}

	enhanceNumberedLists() {
		this.capi = enhanceNumberedLists(this.capi);
		return this;
	}

	enhanceBlockquotes() {
		this.capi = enhanceBlockquotes(this.capi);
		return this;
	}

	enhanceEmbeds() {
		this.capi = enhanceEmbeds(this.capi);
		return this;
	}

	validateAsCAPIType() {
		this.capi = validateAsCAPIType(this.capi);
		return this;
	}

	setIsDev() {
		this.capi = setIsDev(this.capi);
		return this;
	}
}

// IMPORTANT: the ordering of the enhancer is IMPORTANT to keep in mind
// exmaple: enhanceInteractiveContentElements needs to be before enhanceNumberedLists
// as they both effect SubheadingBlockElement
export const enhanceCAPI = (body: CAPIType): CAPIType => {
	return new CAPIEnhancer(body)
		.validateAsCAPIType()
		.addDividers()
		.enhanceInteractiveContentsElements()
		.enhanceBlockquotes()
		.enhanceDots()
		.enhanceInteractiveAtomElements()
		.enhanceImages()
		.enhanceNumberedLists()
		.enhanceEmbeds().capi;
};
