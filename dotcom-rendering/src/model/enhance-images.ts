import { JSDOM } from 'jsdom';
import { getLargest, getMaster } from '../lib/image';
import type {
	CartoonBlockElement,
	FEElement,
	ImageBlockElement,
	ImageForLightbox,
	MultiImageBlockElement,
	SubheadingBlockElement,
	TextBlockElement,
} from '../types/content';

interface HalfWidthImageBlockElement extends ImageBlockElement {
	role: 'halfWidth';
}

const isHalfWidthImage = (
	element?: FEElement,
): element is HalfWidthImageBlockElement => {
	if (!element) return false;
	return (
		element._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement' &&
		element.role === 'halfWidth'
	);
};

const isMultiImage = (
	element?: FEElement,
): element is MultiImageBlockElement => {
	if (!element) return false;
	return (
		element._type ===
		'model.dotcomrendering.pageElements.MultiImageBlockElement'
	);
};

export const isImage = (element?: FEElement): element is ImageBlockElement => {
	if (!element) return false;
	return (
		element._type === 'model.dotcomrendering.pageElements.ImageBlockElement'
	);
};

export const isCartoon = (
	element?: FEElement,
): element is CartoonBlockElement => {
	if (!element) return false;
	return (
		element._type ===
		'model.dotcomrendering.pageElements.CartoonBlockElement'
	);
};

const isTitle = (element?: FEElement): element is SubheadingBlockElement => {
	if (!element) return false;
	// Checks if this element is a 'title' based on the convention: <h2>Title text</h2>
	if (
		element._type !==
		'model.dotcomrendering.pageElements.SubheadingBlockElement'
	)
		return false;
	const frag = JSDOM.fragment(element.html);
	return frag.firstElementChild?.nodeName === 'H2';
};

const extractTitle = (element: SubheadingBlockElement): string => {
	// We cast here because we're know this element is a subheading but TS isn't sure
	const subHeading = element;
	// Extract 'title' based on the convention: <h2>Title text</h2>
	const frag = JSDOM.fragment(subHeading.html);
	if (!frag.firstElementChild) return '';
	const isH2tag = frag.firstElementChild.nodeName === 'H2';
	if (isH2tag) {
		// element is an essay title
		return frag.textContent?.trim() ?? '';
	}
	return '';
};

const isCaption = (element?: FEElement): element is TextBlockElement => {
	if (!element) return false;
	// Checks if this element is a 'caption' based on the convention: <ul><li><Caption text</li></ul>
	if (
		element._type !== 'model.dotcomrendering.pageElements.TextBlockElement'
	) {
		return false;
	}
	const frag = JSDOM.fragment(element.html);
	if (!frag.firstElementChild) return false;
	const hasULwrapper = frag.firstElementChild.nodeName === 'UL';
	const containsLItags = frag.firstElementChild.outerHTML.includes('<li>');
	return hasULwrapper && containsLItags;
};

const extractCaption = (element: TextBlockElement): string => {
	// Extract 'caption' based on the convention: <ul><li><Caption text</li></ul>
	// We cast here because we're know this element is a text element but TS isn't sure
	const textElement = element;
	const frag = JSDOM.fragment(textElement.html);
	if (!frag.firstElementChild) return '';
	const hasULwrapper = frag.firstElementChild.nodeName === 'UL';
	const containsLItags = frag.firstElementChild.outerHTML.includes('<li>');
	if (hasULwrapper && containsLItags) {
		return textElement.html;
	}
	return '';
};

const constructMultiImageElement = (
	first: ImageBlockElement,
	second: ImageBlockElement,
): MultiImageBlockElement => {
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

const addMultiImageElements = (elements: FEElement[]): FEElement[] => {
	const withMultiImageElements: FEElement[] = [];
	for (const [i, thisElement] of elements.entries()) {
		const nextElement = elements[i + 1];
		if (isHalfWidthImage(thisElement) && isHalfWidthImage(nextElement)) {
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
	}
	return withMultiImageElements;
};

const addTitles = (elements: FEElement[]): FEElement[] => {
	const withTitles: FEElement[] = [];
	for (const [i, thisElement] of elements.entries()) {
		const nextElement = elements[i + 1];
		const subsequentElement = elements[i + 2];
		if (isImage(thisElement) && isTitle(nextElement)) {
			// This element is an image and is immediately followed by a title
			withTitles.push({
				...thisElement,
				title: extractTitle(nextElement),
			});
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
			});
			// Remove the element
			elements.splice(i + 2, 1);
		} else {
			// Pass through
			withTitles.push(thisElement);
		}
	}
	return withTitles;
};

const addCaptionsToImages = (elements: FEElement[]): FEElement[] => {
	const withSpecialCaptions: FEElement[] = [];
	for (const [i, thisElement] of elements.entries()) {
		const nextElement = elements[i + 1];
		const subsequentElement = elements[i + 2];
		if (isImage(thisElement) && isCaption(nextElement)) {
			const thisImage = thisElement;
			withSpecialCaptions.push({
				...thisImage,
				data: {
					...thisImage.data,
					caption: extractCaption(nextElement),
				},
			});
			// Remove the next element
			elements.splice(i + 1, 1);
		} else if (
			isImage(thisElement) &&
			isTitle(nextElement) &&
			isCaption(subsequentElement)
		) {
			const thisImage = thisElement;
			withSpecialCaptions.push({
				...thisImage,
				data: {
					...thisImage.data,
					caption: extractCaption(subsequentElement),
				},
			});
			// Remove the subsequent element
			elements.splice(i + 2, 1);
		} else {
			// Pass through
			withSpecialCaptions.push(thisElement);
		}
	}
	return withSpecialCaptions;
};

const addCaptionsToMultis = (elements: FEElement[]): FEElement[] => {
	const withSpecialCaptions: FEElement[] = [];
	for (const [i, thisElement] of elements.entries()) {
		const nextElement = elements[i + 1];
		const subsequentElement = elements[i + 2];
		if (isMultiImage(thisElement) && isCaption(nextElement)) {
			withSpecialCaptions.push({
				...thisElement,
				caption: extractCaption(nextElement),
			});
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
			});
			// Remove the subsequent element
			elements.splice(i + 2, 1);
		} else {
			// Pass through
			withSpecialCaptions.push(thisElement);
		}
	}
	return withSpecialCaptions;
};

const stripCaptions = (elements: FEElement[]): FEElement[] =>
	// Remove all captions from all images
	elements.map<FEElement>((thisElement) => {
		if (
			thisElement._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement'
		) {
			// Remove the caption from this image
			return {
				...thisElement,
				data: {
					...thisElement.data,
					caption: '',
				},
			};
		} else {
			// Pass through
			return thisElement;
		}
	});

const removeCredit = (elements: FEElement[]): FEElement[] =>
	// Remove credit from all images
	elements.map<FEElement>((thisElement) => {
		if (
			thisElement._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement'
		) {
			// Remove the credit from this image
			return {
				...thisElement,
				data: {
					...thisElement.data,
					credit: '',
				},
			};
		} else {
			// Pass through
			return thisElement;
		}
	});

const addImagePositions = <E extends FEElement>(
	elements: E[],
	imagesForLightbox: ImageForLightbox[],
): E[] =>
	elements.map<E>((element) => {
		if (isMultiImage(element)) {
			return {
				...element,
				images: addImagePositions(element.images, imagesForLightbox),
			};
		}

		if (!isImage(element) && !isCartoon(element)) {
			return element;
		}

		const allImages = isImage(element)
			? element.media.allImages
			: element.variants.flatMap((variant) => variant.images);

		const image = getMaster(allImages) ?? getLargest(allImages);

		const position = imagesForLightbox.find(
			({ masterUrl }) => image?.url === masterUrl,
		)?.position;

		return position === undefined ? element : { ...element, position };
	});

class Enhancer {
	elements: FEElement[];

	constructor(elements: FEElement[]) {
		this.elements = elements;
	}

	/**
	 * Photo essays by convention have all image captions removed and rely completely on
	 * special captions set using the `ul`/`li` trick
	 */
	stripCaptions() {
		this.elements = stripCaptions(this.elements);
		return this;
	}

	/**
	 * Replace pairs of halfWidth images with MultiImageBlockElements
	 */
	addMultiImageElements() {
		this.elements = addMultiImageElements(this.elements);
		return this;
	}

	/**
	 * Photo essay have a convention of adding titles to images if the subsequent block is a h2
	 */
	addTitles() {
		this.elements = addTitles(this.elements);
		return this;
	}

	/**
	 * If any MultiImageBlockElement is followed by a ul/l caption, delete the special caption
	 * element and use the value for the multi image `caption` prop
	 */
	addCaptionsToMultis() {
		this.elements = addCaptionsToMultis(this.elements);
		return this;
	}

	/**
	 * In photo essays, we also use ul captions for normal images as well
	 */
	addCaptionsToImages() {
		this.elements = addCaptionsToImages(this.elements);
		return this;
	}

	/**
	 * By convention, photo essays don't include credit for images in the caption
	 */
	removeCredit() {
		this.elements = removeCredit(this.elements);
		return this;
	}

	/**
	 * This function adds the position property to each image
	 * element.
	 *
	 * This value is used to add an id which means we can add a hash to
	 * the url, such as #img-2, letting us navigate to that image.
	 *
	 * We also use this id to open lightbox when the page is loaded
	 * with an image hash present on the url
	 *
	 */
	addImagePositions(imagesForLightbox: ImageForLightbox[]) {
		this.elements = addImagePositions(this.elements, imagesForLightbox);
		return this;
	}
}

type Options = { isPhotoEssay: boolean; imagesForLightbox: ImageForLightbox[] };

const enhance = (
	elements: FEElement[],
	{ isPhotoEssay, imagesForLightbox }: Options,
): FEElement[] => {
	if (isPhotoEssay) {
		return new Enhancer(elements)
			.stripCaptions()
			.removeCredit()
			.addMultiImageElements()
			.addTitles()
			.addCaptionsToMultis()
			.addCaptionsToImages()
			.addImagePositions(imagesForLightbox).elements;
	}

	return (
		new Enhancer(elements)
			// Replace pairs of halfWidth images with MultiImageBlockElements
			.addMultiImageElements()
			// If any MultiImageBlockElement is followed by a ul/l caption, delete the special caption
			// element and use the value for the multi image `caption` prop
			.addCaptionsToMultis()
			.addImagePositions(imagesForLightbox).elements
	);
};

export const enhanceImages = (
	blocks: Block[],
	format: FEFormat,
	imagesForLightbox: ImageForLightbox[],
): Block[] => {
	const isPhotoEssay = format.design === 'PhotoEssayDesign';

	return blocks.map((block: Block) => {
		return {
			...block,
			elements: enhance(block.elements, {
				isPhotoEssay,
				imagesForLightbox,
			}),
		};
	});
};

export const enhanceElementsImages = (
	elements: FEElement[],
	format: FEFormat,
	imagesForLightbox: ImageForLightbox[],
): FEElement[] =>
	enhance(elements, {
		isPhotoEssay:
			format.design === 'PhotoEssayDesign' && format.theme !== 'Labs',
		imagesForLightbox,
	});
