import { JSDOM } from 'jsdom';

/**
 * decideCaption
 * Decides if a text element should be used to caption the preceding images
 * @param {TextBlockElement} element - The text element to examine
 * @param {Boolean} isPhotoEssay - We treat photo essays differently
 * @param {ImageBlockElement[]} imageBuffer - We use this to decide if a caption is needed or not
 * */
const decideCaption = ({
	element,
	isPhotoEssay,
	imageBuffer,
}: {
	element?: TextBlockElement;
	isPhotoEssay: boolean;
	imageBuffer: ImageBlockElement[];
}): string => {
	//  the convention: <ul><li><Caption text</li></ul>
	if (!element) return '';
	// We only set a special caption on non photo essay articles if there are more than two
	// halfWidth images in the buffer
	const countOfHalfWidthImages = imageBuffer.filter(
		(image) => image.role === 'halfWidth',
	).length;
	if (!isPhotoEssay && countOfHalfWidthImages < 2) return '';
	// Extract the caption
	const frag = JSDOM.fragment(element.html);
	if (!frag || !frag.firstElementChild) return '';
	const hasULwrapper = frag.firstElementChild.nodeName === 'UL';
	const containsLItags = frag.firstElementChild.outerHTML.includes('<li>');
	if (hasULwrapper && containsLItags) {
		// element is an essay caption
		return element.html;
	}
	return '';
};

/**
 * decideTitle
 * Decides if a text element should be used to title the preceding image
 * @param {TextBlockElement} element - The text element to examine
 * @param {Boolean} isPhotoEssay - We treat photo essays differently
 * */
const decideTitle = ({
	element,
	isPhotoEssay,
}: {
	element?: SubheadingBlockElement;
	isPhotoEssay: boolean;
}): string => {
	// Checks if this element is a 'title' based on the convention: <h2>Title text</h2>
	if (!element) return '';
	if (!isPhotoEssay) return '';
	// Extract title
	const frag = JSDOM.fragment(element.html);
	if (!frag || !frag.firstElementChild) return '';
	const isH2tag = frag.firstElementChild.nodeName === 'H2';
	if (isH2tag) {
		// element is an essay title
		return (frag.textContent && frag.textContent.trim()) || '';
	}
	return '';
};

const enhanceImage = ({
	image,
	caption,
	title,
}: {
	image: ImageBlockElement;
	caption?: string;
	title?: string;
}): ImageBlockElement => {
	const enhancedImage = { ...image };
	if (caption) {
		enhancedImage.data.caption = caption;
	}
	if (title) {
		enhancedImage.title = title;
	}
	return enhancedImage;
};

const processBuffer = ({
	imageBuffer,
	title,
	caption,
	isPhotoEssay,
}: {
	imageBuffer: ImageBlockElement[];
	title?: string;
	caption?: string;
	isPhotoEssay?: boolean;
}): CAPIElement[] => {
	function cleanCaption(image: ImageBlockElement) {
		// If a standalone caption was found we want to strip any existing captions
		// Or if this is article is a photo essay, then we always strip captions, even if that
		// leaves the image with no caption at all, we want that for photo essays
		if (caption || isPhotoEssay) {
			return {
				...image,
				data: {
					...image.data,
					caption: '',
				},
				displayCredit: false,
			};
		}
		// No special caption was found so continue with this images defaults
		return image;
	}

	const processed: CAPIElement[] = [];
	let prevHalfWidth: ImageBlockElement | null;
	imageBuffer.map(cleanCaption).forEach((image, i) => {
		const endOfBuffer = i + 1 === imageBuffer.length;
		switch (image.role) {
			case 'halfWidth':
				if (!prevHalfWidth) {
					if (endOfBuffer) {
						processed.push(enhanceImage({ image, caption, title }));
					} else {
						prevHalfWidth = image;
					}
				} else {
					const multiImage: MultiImageBlockElement = {
						_type:
							'model.dotcomrendering.pageElements.MultiImageBlockElement',
						elementId: prevHalfWidth.elementId,
						images: [prevHalfWidth, image],
					};
					if (endOfBuffer) multiImage.caption = caption;
					processed.push(multiImage);
					// Reset
					prevHalfWidth = null;
				}
				break;
			case 'inline':
			case 'immersive':
			case 'showcase':
			case 'supporting':
			case 'thumbnail':
			default:
				if (endOfBuffer) {
					processed.push(enhanceImage({ image, caption, title }));
					// Mop up any dangling halfWidth images that never had a sibling
					if (prevHalfWidth)
						processed.push(
							enhanceImage({
								image: prevHalfWidth,
								caption,
								title,
							}),
						);
				} else {
					processed.push(enhanceImage({ image }));
					// Mop up any dangling halfWidth images that never had a sibling
					if (prevHalfWidth)
						processed.push(enhanceImage({ image: prevHalfWidth }));
				}
				break;
		}
	});

	return processed;
};

const enhance = (
	elements: CAPIElement[],
	isPhotoEssay: boolean,
): CAPIElement[] => {
	let imageBuffer: ImageBlockElement[] = [];
	const enhanced: CAPIElement[] = [];

	elements.forEach((element, i) => {
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.ImageBlockElement':
				// Buffer image in an array for processing later
				imageBuffer.push(element);
				break;
			case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
				if (imageBuffer.length > 0) {
					const nextTextBlock = elements[i + 1] as TextBlockElement;
					const nextCaption = decideCaption({
						element: nextTextBlock,
						isPhotoEssay,
						imageBuffer,
					});
					const title = decideTitle({
						element,
						isPhotoEssay,
					});

					enhanced.push(
						...processBuffer({
							imageBuffer,
							caption: nextCaption,
							title,
							isPhotoEssay,
						}),
					);
					imageBuffer = [];
					// If this subheading block wasn't a title, pass it through
					if (!title) enhanced.push(element);
					// If we extracted the caption from the next element, remove it
					if (nextCaption) elements.splice(i, 1);
				} else {
					// If there are no images in the imageBuffer, pass this H2 block through
					enhanced.push(element);
				}

				break;
			case 'model.dotcomrendering.pageElements.TextBlockElement':
				const caption = decideCaption({
					element,
					isPhotoEssay,
					imageBuffer,
				});

				if (caption && imageBuffer.length > 0) {
					const nextSubheading = elements[
						i + 1
					] as SubheadingBlockElement;
					const nextTitle = decideTitle({
						element: nextSubheading,
						isPhotoEssay,
					});
					// So we have a caption and an imageBuffer too. Process the buffer using
					// this caption
					enhanced.push(
						...processBuffer({
							caption,
							imageBuffer,
							title: nextTitle,
							isPhotoEssay,
						}),
					);
					imageBuffer = [];
					// If we extracted the title from the next element, remove it
					if (nextTitle) elements.splice(i, 1);
				} else if (caption && imageBuffer.length === 0) {
					// This text element is a caption but there's no buffer to use it on.
					if (isPhotoEssay) {
						// For photo essays we only allow stand alone ul/li elements
						// as part of an image imageBuffer so delete this element
						elements.splice(i, 1);
					} else {
						// For all other articles, pass this ul li element through untouched
						enhanced.push(element);
					}
					// TODO: Take this ul/li string and use it to overwrite the
					// caption of the *previous* element. This is how Frontend works
				} else if (!caption && imageBuffer.length > 0) {
					const nextSubheading = elements[
						i + 1
					] as SubheadingBlockElement;
					const nextTitle = decideTitle({
						element: nextSubheading,
						isPhotoEssay,
					});
					// We have a buffer but no caption to use with it
					enhanced.push(
						...processBuffer({
							imageBuffer,
							title: nextTitle,
							isPhotoEssay,
						}),
					);
					imageBuffer = [];
					// If we extracted the title from the next element, remove it
					if (nextTitle) elements.splice(i, 1);
					// And we now pass this non caption text through
					enhanced.push(element);
				} else if (!caption && imageBuffer.length === 0) {
					// This text element is not a caption, nor is there any imageBuffer, so just pass it through
					enhanced.push(element);
				}
				break;
			default:
				// The element is something other than an image, textblock or subheading. If
				// we have an image imageBuffer process it without any caption or title and then
				// pass through this element unchanged
				if (imageBuffer.length > 0) {
					enhanced.push(
						...processBuffer({
							imageBuffer,
							isPhotoEssay,
						}),
					);
					imageBuffer = [];
				}

				enhanced.push(element);
				break;
		}
	});
	// If imageBuffer still has something in it, add it here. This could happen if the
	// last element was an image
	if (imageBuffer.length > 0) {
		enhanced.push(
			...processBuffer({
				imageBuffer,
				isPhotoEssay,
			}),
		);
		imageBuffer = [];
	}
	return enhanced;
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
