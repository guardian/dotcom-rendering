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

// Wraps the last dot in a footer
const transformLastDot = (element: string): string => {
	const modified = `<footer>${element}</footer>`;
	return modified.replace(
		new RegExp('[•]', 'g'),
		'<span data-dcr-style="bullet"></span>',
	);
};

const checkForDots = (elements: CAPIElement[]): CAPIElement[] => {
	// Loop over elements and check if a dot is in the TextBlockElement
	const enhanced: CAPIElement[] = [];
	elements.map((element, i) => {
		if (
			element._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			element.html.includes('•')
		) {
			if (elements.length - 1 === i) {
				enhanced.push({
					...element,
					html: transformLastDot(element.html),
				});
			} else {
				enhanced.push({
					...element,
					html: transformDot(element.html),
				});
			}
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
