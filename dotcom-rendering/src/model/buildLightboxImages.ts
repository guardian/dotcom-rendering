import { getLargest, getMaster } from '../components/ImageComponent';
import type { EnhancedImageForLightbox, FEElement } from '../types/content';

/**
 * Only allow the lightbox to show images that have a source with a width greater
 * than 620 pixels.
 *
 * Frontend has similar logic here:
 * https://github.com/guardian/frontend/blob/126dfcbc1aa961650b7f7ff41ee50a12782bb62e/common/app/model/content.scala#L549
 *
 */
const isLightboxable = (image: EnhancedImageForLightbox): boolean => {
	const masterImage =
		getMaster(image.media.allImages) ?? getLargest(image.media.allImages);
	const fields = masterImage?.fields;
	if (!fields) return false; // Unlikely
	const { width, height } = fields;
	const orientation =
		parseInt(width, 10) > parseInt(height, 10) ? 'horizontal' : 'portrait';
	switch (orientation) {
		case 'horizontal':
			// If any width is above 620 we allow this image in lightbox
			return image.media.allImages.some(
				(mediaImg) => parseInt(mediaImg.fields.width, 10) > 620,
			);
		case 'portrait':
			// If any height is above 620 we allow this image in lightbox
			return image.media.allImages.some(
				(mediaImg) => parseInt(mediaImg.fields.height, 10) > 620,
			);
	}
};

/**
 * Generates a new array of lightbox images. Does not mutate.
 *
 * We decide this array, prior to rendering, because we create and
 * insert the lightbox html in the dom at page load and to do this
 * we need to know which images we want the lightbox to contain.
 *
 * This enhancer needs to run at a higher level to most other enhancers
 * because it need both mainMediaElements and blocks in scope. Most other
 * enhancers just have blocks in scope.
 */
export const buildLightboxImages = (
	format: FEFormat,
	blocks: Block[],
	mainMediaElements: FEElement[],
): EnhancedImageForLightbox[] => {
	const images: EnhancedImageForLightbox[] = [];
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
			let imageElement: EnhancedImageForLightbox;
			switch (element._type) {
				case 'model.dotcomrendering.pageElements.ImageBlockElement': {
					imageElement = { ...element };
					if (
						format.design === 'LiveBlogDesign' ||
						format.design === 'DeadBlogDesign'
					) {
						imageElement.blockId = block.id;
						imageElement.firstPublished = block.blockFirstPublished;
					}
					images.push(imageElement);
					break;
				}
				case 'model.dotcomrendering.pageElements.MultiImageBlockElement': {
					element.images.forEach((multiImage) => {
						imageElement = { ...multiImage };
						if (
							format.design === 'LiveBlogDesign' ||
							format.design === 'DeadBlogDesign'
						) {
							imageElement.blockId = block.id;
							imageElement.firstPublished =
								block.blockFirstPublished;
						}
						images.push(imageElement);
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
	const uniqueImages: EnhancedImageForLightbox[] = [];
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
	return uniqueImages.filter(isLightboxable);
};
