import type { CAPIElement, ImageBlockElement } from '../types/content';

export const enhanceImagesForLightbox = (
	blocks: Block[],
	mainMediaElements: CAPIElement[],
): ImageBlockElement[] => {
	const images: ImageBlockElement[] = [];
	mainMediaElements.forEach((element) => {
		if (
			element._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement'
		) {
			images.push(element);
		}
	});
	blocks.forEach((block) => {
		block.elements.forEach((element) => {
			switch (element._type) {
				case 'model.dotcomrendering.pageElements.ImageBlockElement': {
					images.push(element);
					break;
				}
				case 'model.dotcomrendering.pageElements.MultiImageBlockElement': {
					element.images.forEach((image) => {
						images.push(image);
					});
					break;
				}
				default:
					break;
			}
		});
	});
	// On some articles the main media is repeated as an element in the article body so
	// we deduplicate the array here
	const alreadySeen: string[] = [];
	const uniqueImages: ImageBlockElement[] = [];
	images.forEach((image) => {
		const imageId = image.media.allImages[0]?.url.split('/')[3];
		if (!imageId) {
			// It's unlikely that we would not have an imageId here but if we do we fail
			// open, passing the image through
			uniqueImages.push(image);
			return;
		}
		if (!alreadySeen.includes(imageId)) {
			uniqueImages.push(image);
			alreadySeen.push(imageId);
		}
	});
	return uniqueImages;
};
