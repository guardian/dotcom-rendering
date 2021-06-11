const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	let updatedElements: CAPIElement[] = elements;

	const hasInteractiveContentBlockElement = elements.find((element) => {
		if (
			element._type ===
				'model.dotcomrendering.pageElements.InteractiveBlockElement' &&
			element?.scriptUrl ===
				'https://uploads.guim.co.uk/2019/03/20/boot.js'
		) {
			return true;
		}
		return false;
	});

	if (hasInteractiveContentBlockElement) {
		// We want to record all `SubheadingBlockElement` to construct the interactive content block
		const subheadingLinks: SubheadingBlockElement[] = [];
		updatedElements = elements.map((thisElement) => {
			if (
				thisElement._type ===
				'model.dotcomrendering.pageElements.SubheadingBlockElement'
			) {
				const enhancedSubheading = {
					...thisElement,
					html: thisElement.html.replace(
						'<h2>',
						// add ID to H2 element
						`<h2 id='${thisElement.elementId}'>`,
					),
				};
				subheadingLinks.push(enhancedSubheading);
				return enhancedSubheading;
			}
			return thisElement;
		});

		// replace interactive content block
		updatedElements = updatedElements.map((element) => {
			if (
				element._type ===
					'model.dotcomrendering.pageElements.InteractiveBlockElement' &&
				element?.scriptUrl ===
					'https://uploads.guim.co.uk/2019/03/20/boot.js'
			) {
				return {
					_type:
						'model.dotcomrendering.pageElements.InteractiveContentBlockElement',
					elementId: element.elementId,
					subheadingLinks,
				};
			}
			return element;
		});

		return updatedElements;
	}

	return updatedElements;
};

export const enhanceInteractiveContentElements = (data: CAPIType): CAPIType => {
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
