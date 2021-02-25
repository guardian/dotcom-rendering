// Check if the block contains a dot, replace with an empty span with a bullet attribute
const hasDots = (element: CAPIElement): boolean => {
	if (element._type !== 'model.dotcomrendering.pageElements.TextBlockElement')
		return false;

	if (element.html.includes('•')) {
		element.html = element.html.replace(
			new RegExp('[•]', 'g'),
			'<span data-dcr-style="bullet"></span>',
		);
		return true;
	}

	return false;
};

const checkForDots = (elements: CAPIElement[]): CAPIElement[] => {
	// Loop over elements and check if a dot is in the TextBlockElement
	const enhanced: CAPIElement[] = [];
	elements.forEach((element) => {
		if (
			element._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			hasDots(element)
		) {
			enhanced.push({
				...element,
			});
		} else {
			enhanced.push(element);
		}
	});
	return enhanced;
};

// On rare occasions the standfirst uses dots so it is also checked
const checkStandFirstForDots = (standFirst: string) => {
	if (standFirst.includes('•')) {
		return standFirst.replace(
			new RegExp('[•]', 'g'),
			'<span data-dcr-style="bullet"></span>',
		);
	}
	return standFirst;
};

export const addDots = (data: CAPIType): CAPIType => {
	data.standfirst = checkStandFirstForDots(data.standfirst);
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
