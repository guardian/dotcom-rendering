import { JSDOM } from 'jsdom';

const getCaption = (element?: TextBlockElement): string => {
	// Checks if this element is a 'caption' based on the convention: <ul><li><Caption text</li></ul>
	if (!element) return '';
	const frag = JSDOM.fragment(element.html);
	if (!frag || !frag.firstChild || !frag.firstElementChild) return '';
	const hasULwrapper = frag.firstChild.nodeName === 'UL';
	const containsLItags = frag.firstElementChild.outerHTML.includes('<li>');
	if (hasULwrapper && containsLItags) {
		// element is an essay caption
		return element.html;
	}
	return '';
};

const getTitle = (element?: SubheadingBlockElement): string => {
	// Checks if this element is a 'title' based on the convention: <h2>Title text</h2>
	if (!element) return '';
	const frag = JSDOM.fragment(element.html);
	if (!frag || !frag.firstChild) return '';
	const isH2tag = frag.firstChild.nodeName === 'H2';
	if (isH2tag) {
		// element is an essay title
		return (frag.textContent && frag.textContent.trim()) || '';
	}
	return '';
};

const enhanceImages = (elements: CAPIElement[]): CAPIElement[] => {
	let buffer: ImageBlockElement[] = [];
	const enhanced: CAPIElement[] = [];

	const addImage = ({
		image,
		caption,
		title,
	}: {
		image: ImageBlockElement;
		caption?: string;
		title?: string;
	}) => {
		const imageToAdd = { ...image };
		if (caption) {
			imageToAdd.data.caption = caption;
		}
		if (title) {
			imageToAdd.title = title;
		}
		enhanced.push(imageToAdd);
	};

	const addMultiImage = ({
		images,
		caption,
	}: {
		images: ImageBlockElement[];
		caption?: string;
	}) => {
		enhanced.push({
			_type: 'model.dotcomrendering.pageElements.MultiImageBlockElement',
			elementId: images[0].elementId,
			images,
			caption,
		});
	};

	const processBuffer = ({
		bufferToProcess,
		title,
		caption,
	}: {
		bufferToProcess: ImageBlockElement[];
		title?: string;
		caption?: string;
	}) => {
		if (bufferToProcess.length === 1) {
			// Then we can simply pass the image through
			addImage({ image: bufferToProcess[0] });
			buffer = [];
			return;
		}
		function cleanCaption(image: ImageBlockElement) {
			// If a standalone caption or title was found we want to strip any existing captions
			if (caption || title) {
				return {
					...image,
					data: {
						...image.data,
						caption: '',
					},
					displayCredit: false,
				};
			}
			// No special caption was found so contiinue with this images defaults
			return image;
		}

		let prevHalfWidth: ImageBlockElement | null;
		bufferToProcess.map(cleanCaption).forEach((image, i) => {
			switch (image.role) {
				case 'halfWidth':
					if (!prevHalfWidth) {
						if (i === buffer.length - 1) {
							addImage({ image, caption, title });
						} else {
							prevHalfWidth = image;
						}
					} else {
						if (i === buffer.length - 1) {
							addMultiImage({
								images: [prevHalfWidth, image],
								caption,
							});
						} else {
							addMultiImage({ images: [prevHalfWidth, image] });
						}
						prevHalfWidth = null;
					}
					break;
				case 'inline':
				case 'immersive':
				case 'showcase':
				case 'supporting':
				case 'thumbnail':
				default:
					if (i === buffer.length - 1) {
						addImage({ image, caption, title });
					} else {
						addImage({ image });
					}
					break;
			}
		});
		buffer = [];
	};

	elements.forEach((element, i) => {
		/**
		 * What is nextTitle and nextCaption?
		 *
		 * This is for when an image has both a caption AND a title. Because
		 * the caption and the title are each represente by separate blocks,
		 * when we find a caption or title we need to be able to read ahead
		 * in the array to check if there is a corresponding title or caption.
		 *
		 */
		const nextTextBlock = elements[i + 1] as TextBlockElement;
		const nextSubheading = elements[i + 1] as SubheadingBlockElement;
		const nextCaption = getCaption(nextTextBlock);
		const nextTitle = getTitle(nextSubheading);

		switch (element._type) {
			case 'model.dotcomrendering.pageElements.ImageBlockElement':
				// Buffer image in an array for processing later
				buffer.push(element);
				break;
			case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
				if (buffer.length === 0) {
					// If there are no images in the buffer pass this H2 block through
					enhanced.push(element);
					break;
				}

				processBuffer({
					bufferToProcess: buffer,
					caption: nextCaption,
					title: getTitle(element),
				});
				// If this subheading block wasn't a title, pass it through
				if (!getTitle(element)) enhanced.push(element);
				// If we extracted the caption from the next element, remove it
				if (nextCaption) elements.splice(i, 1);
				break;
			case 'model.dotcomrendering.pageElements.TextBlockElement':
				const caption = getCaption(element);
				if (buffer.length === 0) {
					// If there are no images in the buffer, pass it through
					if (caption) {
						enhanced.push({
							_type:
								'model.dotcomrendering.pageElements.CaptionBlockElement',
							elementId: element.elementId,
							captionText: element.html,
						});
					} else {
						enhanced.push(element);
					}
					break;
				}

				processBuffer({
					caption,
					bufferToProcess: buffer,
					title: nextTitle,
				});
				// If this text block block wasn't a caption, pass it through
				if (!caption) enhanced.push(element);
				// If we extracted the title from the next element, remove it
				if (nextTitle) elements.splice(i, 1);
				break;
			default:
				// The element is something other than an image, textblock or subheading. If
				// we have an image buffer process it without any caption or title and then
				// pass through this element unchanged
				if (buffer.length > 0) {
					processBuffer({
						bufferToProcess: buffer,
					});
				}

				enhanced.push(element);
				break;
		}
	});
	// If buffer still has something in it, add it here. This could happen if the
	// last image(s) were not folllowed by any caption elements
	if (buffer.length > 0) {
		processBuffer({
			bufferToProcess: buffer,
		});
	}
	return enhanced;
};

export const enhancePhotoEssay = (data: CAPIType): CAPIType => {
	const enhancedBlocks = data.blocks.map((block: Block) => {
		return {
			...block,
			elements: enhanceImages(block.elements),
		};
	});

	return {
		...data,
		designType: 'PhotoEssay',
		blocks: enhancedBlocks,
	} as CAPIType;
};
