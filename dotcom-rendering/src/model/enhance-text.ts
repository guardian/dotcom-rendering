const makeEmpty = (elements: CAPIElement[]): CAPIElement[] => {
	// Loop over elements and check if a dot is in the TextBlockElement
	const enhanced: CAPIElement[] = [];
	elements.forEach((element) => {
		if (
			element._type ===
			'model.dotcomrendering.pageElements.TextBlockElement'
		) {
			element.html = '';
			enhanced.push(element);
		}
	});
	return enhanced;
};

export const enhanceText = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) => {
		return {
			...block,
			elements: makeEmpty(block.elements),
		};
	});
