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
		parseInt(width, 10) >= parseInt(height, 10) ? 'horizontal' : 'portrait';
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
 * Older legacy images use a different url format so we need to use a different
 * approach when extracting the id of the image
 */
const decideImageId = (image: EnhancedImageForLightbox): string | undefined => {
	const firstImageUrl = image.media.allImages[0]?.url;
	if (!firstImageUrl) return;
	const url = new URL(firstImageUrl);
	switch (url.hostname) {
		case 'media.guim.co.uk': {
			// E.g.
			// https://media.guim.co.uk/be634f340e477a975c7352f289c4353105ba9e67/288_121_3702_2221/140.jpg
			// This bit                 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
			return url.pathname.split('/')[1];
		}
		case 'i.guim.co.uk':
		case 'uploads.guim.co.uk':
		case 'static-secure.guim.co.uk':
		case 'static.guim.co.uk':
			// E.g.
			// https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/5/26/1432666797165/59de49e2-553f-4b52-b7ac-09bda7f63e4b-220x132.jpeg
			// This bit                                                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
			return url.pathname.split('/').reverse()[0];
		default:
			return;
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
	// On gallery articles the main media is often repeated as an element in the article body so
	// we deduplicate the array here
	const alreadySeen: string[] = [];
	let uniqueImages: EnhancedImageForLightbox[] = [];
	images.forEach((image) => {
		const imageId = decideImageId(image);
		if (!imageId) {
			// It's unlikely that we would not have an imageId here but if we do we fail
			// open, passing the image through
			uniqueImages.push(image);
			return;
		}
		if (alreadySeen.includes(imageId)) {
			// Replace the element with the duplicated one. We do this because we want to favour
			// the higher quality body images you get with galleries.
			uniqueImages = uniqueImages.filter(
				(thisImage) => decideImageId(thisImage) !== imageId,
			);
			uniqueImages.push(image);
		} else {
			// This image is not duplicated so we pass it through
			uniqueImages.push(image);
			alreadySeen.push(imageId);
		}
	});
	return uniqueImages.filter(isLightboxable);
};
