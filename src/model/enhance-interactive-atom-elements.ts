import { sanitiseHTML, clean } from '@root/src/model/clean';

// Some interactives contain HTML with unclosed tags etc. To
// preserve (approximate) parity with Frontend we perform some basic
// cleaning.
export const enhance = (
	elements: CAPIElement[],
	isAmp: boolean = false,
): CAPIElement[] => {
	return elements.map((element) => {
		if (
			element._type ===
			'model.dotcomrendering.pageElements.InteractiveAtomBlockElement'
		) {
			if (isAmp) {
				element.html = element.html
					? clean(element.html)
					: element.html;
			} else {
				element.html = element.html
					? sanitiseHTML(element.html, {
							ADD_TAGS: ['iframe', 'script'],
					  })
					: element.html;
			}
		}
		return element;
	});
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
