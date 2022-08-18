const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	const enhanced: CAPIElement[] = [];
	elements.forEach((element) => {
		// If this element is a subheading, insert the element ID as its ID
		if (
			element._type ===
			'model.dotcomrendering.pageElements.SubheadingBlockElement'
		) {
			const withId = element.html.replace(
				'<h2>',
				// add ID to H2 element
				`<h2 id='${element.elementId}'>`,
			);
			enhanced.push({
				...element,
				html: withId,
			});
		} else {
			// Otherwise, do nothing
			enhanced.push(element);
		}
	});
	return enhanced;
};

export const enhanceH2s = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements),
		};
	});
