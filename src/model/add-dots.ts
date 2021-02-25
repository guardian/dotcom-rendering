// Check if the block contains a dot
const hasDots = (element: CAPIElement): boolean => {
	if (element._type !== 'model.dotcomrendering.pageElements.TextBlockElement')
		return false;

	if (element.html.includes('•')) {
		return true;
	}
	return false;
};

// Replace dot with empty span
const transformDot = (element: string): string => {
	if (element.includes('•')) {
		element = element.replace(
			new RegExp('[•]', 'g'),
			'<span data-dcr-style="bullet"></span>',
		);
	}
	return element;
};

const checkForDots = (elements: CAPIElement[]): CAPIElement[] => {
	// Loop over elements and check if a dot is in the TextBlockElement
	const enhanced: CAPIElement[] = [];
	elements.map((element) => {
		if (
			element._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			hasDots(element)
		) {
			enhanced.push({
				...element,
				html: transformDot(element.html),
			});
		} else {
			enhanced.push(element);
		}
	});
	return enhanced;
};

export const addDots = (data: CAPIType): CAPIType => {
	data.standfirst = transformDot(data.standfirst);
	const enhancedBlocks = data.blocks.map((block: Block) => {
		return {
			...block,
			elements: checkForDots(block.elements),
		};
	});

	return {
		...data,
		blocks: enhancedBlocks,
	} as CAPIType;
};
