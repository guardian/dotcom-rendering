import type { CAPIElement, ImageBlockElement } from '../types/content';

export const enhanceImagesForLightbox = (
	blocks: Block[],
	mainMediaElements: CAPIElement[],
): ImageBlockElement[] | undefined => {
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
	return images;
};
