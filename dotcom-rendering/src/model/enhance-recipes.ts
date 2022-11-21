const applyArithmetic = (elements: CAPIElement[]): CAPIElement[] => {
	// Loop over elements and check if a dot is in the TextBlockElement
	const enhanced: CAPIElement[] = [];
	// const reg = new RegExp('^[0-9]+$');

	elements.forEach((element) => {
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.TextBlockElement':
				{
					element.html = '';
					enhanced.push(element);
				}
				break;
			default:
				enhanced.push(element);
		}
	});
	return enhanced;
};

export const enhanceRecipes = (
	blocks: Block[],
	format: CAPIFormat,
): Block[] => {
	const isRecipe = format.design === 'FeatureDesign';

	if (!isRecipe) {
		return blocks;
	}

	return blocks.map((block: Block) => {
		return {
			...block,
			elements: applyArithmetic(block.elements),
		};
	});
};
