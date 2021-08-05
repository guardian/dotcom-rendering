import { JSDOM } from 'jsdom';

const ishalfWidthImage = (element: CAPIElement): boolean => {
	if (!element) return false;
	return (
		element._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement' &&
		element.role === 'halfWidth'
	);
};

const isMultiImage = (element: CAPIElement): boolean => {
	if (!element) return false;
	return (
		element._type ===
		'model.dotcomrendering.pageElements.MultiImageBlockElement'
	);
};

const isImage = (element: CAPIElement): boolean => {
	if (!element) return false;
	return (
		element._type === 'model.dotcomrendering.pageElements.ImageBlockElement'
	);
};

const isTitle = (element: CAPIElement): boolean => {
	if (!element) return false;
	// Checks if this element is a 'title' based on the convention: <h2>Title text</h2>
	if (
		element._type !==
		'model.dotcomrendering.pageElements.SubheadingBlockElement'
	)
		return false;
	const frag = JSDOM.fragment(element.html);
	return frag?.firstElementChild?.nodeName === 'H2';
};

const extractTitle = (element: CAPIElement): string => {
	// We cast here because we're know this element is a subheading but TS isn't sure
	const subHeading = element as SubheadingBlockElement;
	// Extract 'title' based on the convention: <h2>Title text</h2>
	const frag = JSDOM.fragment(subHeading.html);
	if (!frag || !frag.firstElementChild) return '';
	const isH2tag = frag.firstElementChild.nodeName === 'H2';
	if (isH2tag) {
		// element is an essay title
		return (frag.textContent && frag.textContent.trim()) || '';
	}
	return '';
};

const isCaption = (element: CAPIElement): boolean => {
	if (!element) return false;
	// Checks if this element is a 'caption' based on the convention: <ul><li><Caption text</li></ul>
	if (
		element._type !== 'model.dotcomrendering.pageElements.TextBlockElement'
	) {
		return false;
	}
	const frag = JSDOM.fragment(element.html);
	if (!frag || !frag.firstElementChild) return false;
	const hasULwrapper = frag.firstElementChild.nodeName === 'UL';
	const containsLItags = frag.firstElementChild.outerHTML.includes('<li>');
	return hasULwrapper && containsLItags;
};

const extractCaption = (element: CAPIElement): string => {
	// Extract 'caption' based on the convention: <ul><li><Caption text</li></ul>
	// We cast here because we're know this element is a text element but TS isn't sure
	const textElement = element as TextBlockElement;
	const frag = JSDOM.fragment(textElement.html);
	if (!frag || !frag.firstElementChild) return '';
	const hasULwrapper = frag.firstElementChild.nodeName === 'UL';
	const containsLItags = frag.firstElementChild.outerHTML.includes('<li>');
	if (hasULwrapper && containsLItags) {
		return textElement.html;
	}
	return '';
};

const constructMultiImageElement = (
	thisElement: CAPIElement,
	nextElement: CAPIElement,
): MultiImageBlockElement => {
	// We cast here because we're certain each element is an image (because of the guards we set earlier) but
	// TS isn't inferring that and needs a little help
	const first = thisElement as ImageBlockElement;
	const second = nextElement as ImageBlockElement;
	return {
		_type: 'model.dotcomrendering.pageElements.MultiImageBlockElement',
		elementId: first.elementId,
		images: [
			{
				...first,
				data: {
					...first.data,
					caption: '', // Delete any existing caption (special captions might be added later)
				},
			},
			{
				...second,
				data: {
					...second.data,
					caption: '', // ibid
				},
			},
		],
	};
};

const addMultiImageElements = (elements: CAPIElement[]): CAPIElement[] => {
	const withMultiImageElements: CAPIElement[] = [];
	elements.forEach((thisElement, i) => {
		const nextElement = elements[i + 1];
		if (ishalfWidthImage(thisElement) && ishalfWidthImage(nextElement)) {
			// Pair found. Add a multi element and remove the next entry
			withMultiImageElements.push(
				constructMultiImageElement(thisElement, nextElement),
			);
			// Remove the next element
			elements.splice(i + 1, 1);
		} else {
			// Pass through
			withMultiImageElements.push(thisElement);
		}
	});
	return withMultiImageElements;
};

const addTitles = (elements: CAPIElement[]): CAPIElement[] => {
	const withTitles: CAPIElement[] = [];
	elements.forEach((thisElement, i) => {
		const nextElement = elements[i + 1];
		const subsequentElement = elements[i + 2];
		if (isImage(thisElement) && isTitle(nextElement)) {
			// This element is an image and is immediately followed by a title
			withTitles.push({
				...thisElement,
				title: extractTitle(nextElement),
			} as ImageBlockElement);
			// Remove the element
			elements.splice(i + 1, 1);
		} else if (
			isImage(thisElement) &&
			isCaption(nextElement) &&
			isTitle(subsequentElement)
		) {
			// This element is an image, was followed by a caption, and then had a title after it
			withTitles.push({
				...thisElement,
				title: extractTitle(subsequentElement),
			} as ImageBlockElement);
			// Remove the element
			elements.splice(i + 2, 1);
		} else {
			// Pass through
			withTitles.push(thisElement);
		}
	});
	return withTitles;
};

const addCaptionsToImages = (elements: CAPIElement[]): CAPIElement[] => {
	const withSpecialCaptions: CAPIElement[] = [];
	elements.forEach((thisElement, i) => {
		const nextElement = elements[i + 1];
		const subsequentElement = elements[i + 2];
		if (isImage(thisElement) && isCaption(nextElement)) {
			const thisImage = thisElement as ImageBlockElement;
			withSpecialCaptions.push({
				...thisImage,
				data: {
					...thisImage.data,
					caption: extractCaption(nextElement),
				},
			} as ImageBlockElement);
			// Remove the next element
			elements.splice(i + 1, 1);
		} else if (
			isImage(thisElement) &&
			isTitle(nextElement) &&
			isCaption(subsequentElement)
		) {
			const thisImage = thisElement as ImageBlockElement;
			withSpecialCaptions.push({
				...thisImage,
				data: {
					...thisImage.data,
					caption: extractCaption(subsequentElement),
				},
			} as ImageBlockElement);
			// Remove the subsequent element
			elements.splice(i + 2, 1);
		} else {
			// Pass through
			withSpecialCaptions.push(thisElement);
		}
	});
	return withSpecialCaptions;
};

const addCaptionsToMultis = (elements: CAPIElement[]): CAPIElement[] => {
	const withSpecialCaptions: CAPIElement[] = [];
	elements.forEach((thisElement, i) => {
		const nextElement = elements[i + 1];
		const subsequentElement = elements[i + 2];
		if (isMultiImage(thisElement) && isCaption(nextElement)) {
			withSpecialCaptions.push({
				...thisElement,
				caption: extractCaption(nextElement),
			} as MultiImageBlockElement);
			// Remove the next element
			elements.splice(i + 1, 1);
		} else if (
			isMultiImage(thisElement) &&
			isTitle(nextElement) &&
			isCaption(subsequentElement)
		) {
			withSpecialCaptions.push({
				...thisElement,
				caption: extractCaption(subsequentElement),
			} as MultiImageBlockElement);
			// Remove the subsequent element
			elements.splice(i + 2, 1);
		} else {
			// Pass through
			withSpecialCaptions.push(thisElement);
		}
	});
	return withSpecialCaptions;
};

const stripCaptions = (elements: CAPIElement[]): CAPIElement[] => {
	// Remove all captions from all images
	const withoutCaptions: CAPIElement[] = [];
	elements.forEach((thisElement) => {
		if (
			thisElement._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement'
		) {
			// Remove the caption from this image
			withoutCaptions.push({
				...thisElement,
				data: {
					...thisElement.data,
					caption: '',
				},
			} as ImageBlockElement);
		} else {
			// Pass through
			withoutCaptions.push(thisElement);
		}
	});
	return withoutCaptions;
};

const removeCredit = (elements: CAPIElement[]): CAPIElement[] => {
	// Remove credit from all images
	const withoutCredit: CAPIElement[] = [];
	elements.forEach((thisElement) => {
		if (
			thisElement._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement'
		) {
			// Remove the credit from this image
			withoutCredit.push({
				...thisElement,
				data: {
					...thisElement.data,
					credit: '',
				},
			} as ImageBlockElement);
		} else {
			// Pass through
			withoutCredit.push(thisElement);
		}
	});
	return withoutCredit;
};

class Enhancer {
	elements: CAPIElement[];

	constructor(elements: CAPIElement[]) {
		this.elements = elements;
	}

	stripCaptions() {
		this.elements = stripCaptions(this.elements);
		return this;
	}

	addMultiImageElements() {
		this.elements = addMultiImageElements(this.elements);
		return this;
	}

	addTitles() {
		this.elements = addTitles(this.elements);
		return this;
	}

	addCaptionsToMultis() {
		this.elements = addCaptionsToMultis(this.elements);
		return this;
	}

	addCaptionsToImages() {
		this.elements = addCaptionsToImages(this.elements);
		return this;
	}

	removeCredit() {
		this.elements = removeCredit(this.elements);
		return this;
	}
}

const enhance = (
	elements: CAPIElement[],
	isPhotoEssay: boolean,
): CAPIElement[] => {
	if (isPhotoEssay) {
		return (
			new Enhancer(elements)
				// Photo essays by convention have all image captions removed and rely completely on
				// special captions set using the ul/li trick
				.stripCaptions()
				// By convention, photo essays don't include credit for images in the caption
				.removeCredit()
				// Replace pairs of halfWidth images with MultiImageBlockElements
				.addMultiImageElements()
				// Photo essay have a convention of adding titles to images if the subsequent block is a h2
				.addTitles()
				// If any MultiImageBlockElement is followed by a ul/l caption, delete the special caption
				// element and use the value for the multi image `caption` prop
				.addCaptionsToMultis()
				// In photo essays, we also use ul captions for normal images as well
				.addCaptionsToImages().elements
		);
	}

	return (
		new Enhancer(elements)
			// Replace pairs of halfWidth images with MultiImageBlockElements
			.addMultiImageElements()
			// If any MultiImageBlockElement is followed by a ul/l caption, delete the special caption
			// element and use the value for the multi image `caption` prop
			.addCaptionsToMultis().elements
	);
};

export const enhanceImages = (data: CAPIType): CAPIType => {
	const isPhotoEssay = data.format.design === 'PhotoEssayDesign';

	const enhancedBlocks = data.blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements, isPhotoEssay),
		};
	});

	return {
		...data,
		blocks: enhancedBlocks,
	} as CAPIType;
};
