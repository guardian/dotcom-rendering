import { sanitiseHTML } from '@root/src/model/clean';

// Some interactives contain HTML with unclosed tags etc. To
// preserve (approximate) parity with Frontend we perform some basic
// cleaning.
const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	elements.map((element) => {
		if (
			element._type ===
			'model.dotcomrendering.pageElements.InteractiveAtomBlockElement'
		)
			element.html = element.html
				? sanitiseHTML(element.html)
				: element.html;
		return element;
	});

	return elements;
};

export const enhanceInteractiveAtomElements = (data: CAPIType): CAPIType => {
	const enhancedBlocks = data.blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements),
		};
	});

	return {
		...data,
		blocks: enhancedBlocks,
	} as CAPIType;
};
