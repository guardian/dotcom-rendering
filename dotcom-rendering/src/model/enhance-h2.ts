const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	const enhancedWithIds: CAPIElement[] = [];
	elements.forEach((element) => {
		if (
			element._type ===
			'model.dotcomrendering.pageElements.SubheadingBlockElement'
		) {
			const withId = element.html.replace(
				'<h2>',
				// add ID to H2 element
				`<h2 id='${element.elementId}'>`,
			);
			enhancedWithIds.push({
				...element,
				html: withId,
			});
		}
	});
	return enhancedWithIds;
};

export const enhanceH2 = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements),
		};
	});


