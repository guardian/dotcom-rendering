const inlineImages = (elements: CAPIElement[]): CAPIElement[] => {
	// Inline all images
	// Why?
	// Because previously, in lagacy times when we used Frontend to render these articles,
	// we positioned images as thumbnails, off to the left. But more recent designs call for
	// images to be inline. This enhancer helps with legacy content still using `thumbnail`
	const inlined: CAPIElement[] = [];
	elements.forEach((thisElement) => {
		if (
			thisElement._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement'
		) {
			// Inline this image
			inlined.push({
				...thisElement,
				role: 'inline',
			} as ImageBlockElement);
		} else {
			// Pass through
			inlined.push(thisElement);
		}
	});
	return inlined;
};

class Enhancer {
	elements: CAPIElement[];

	constructor(elements: CAPIElement[]) {
		this.elements = elements;
	}

	inlineImages() {
		this.elements = inlineImages(this.elements);
		return this;
	}
}

const enhance = (elements: CAPIElement[]): CAPIElement[] => {
	return (
		new Enhancer(elements)
			// Always use role `inline` for images
			.inlineImages().elements
	);
};

export const enhanceNumberedLists = (data: CAPIType): CAPIType => {
	const isNumberedList = data.format.display === 'NumberedListDisplay';

	if (!isNumberedList) {
		return data;
	}

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
