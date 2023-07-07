import { randomUUID } from 'node:crypto';
import { getLargest, getMaster } from '../components/ImageComponent';
import type {
	FEElement,
	ImageBlockElement,
	ImageForLightbox,
} from '../types/content';

type Orientation = 'horizontal' | 'portrait';

/**
 * Only allow the lightbox to show images that have a source with a width greater
 * than 620 pixels.
 *
 * Frontend has similar logic here:
 * https://github.com/guardian/frontend/blob/126dfcbc1aa961650b7f7ff41ee50a12782bb62e/common/app/model/content.scala#L549
 *
 */
const isLightboxable = (
	element: ImageBlockElement,
	orientation: Orientation,
): boolean => {
	switch (orientation) {
		case 'horizontal':
			// If any width is above 620 we allow this image in lightbox
			return element.media.allImages.some(
				(mediaImg) => parseInt(mediaImg.fields.width, 10) > 620,
			);
		case 'portrait':
			// If any height is above 620 we allow this image in lightbox
			return element.media.allImages.some(
				(mediaImg) => parseInt(mediaImg.fields.height, 10) > 620,
			);
	}
};

/**
 * Older legacy images use a different url format so we need to use a different
 * approach when extracting the id of the image
 */
const decideImageId = (image: ImageForLightbox): string | undefined => {
	const url = new URL(image.masterUrl);
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

const buildLightboxImage = (
	element: ImageBlockElement,
): ImageForLightbox | undefined => {
	const masterImage =
		getMaster(element.media.allImages) ??
		getLargest(element.media.allImages);

	// Rare, but legacy content might not have a url that we can use with Fastly
	// so we can't include them in lightbox
	if (!masterImage) return;

	const width = parseInt(masterImage.fields.width, 10);
	const height = parseInt(masterImage.fields.height, 10);

	const orientation = width >= height ? 'horizontal' : 'portrait';
	if (!isLightboxable(element, orientation)) return;

	return {
		masterUrl: masterImage.url,
		position: element.position,
		width,
		height,
		elementId: element.elementId,
		alt: element.data.alt,
		credit: element.lightbox?.credit ?? element.data.credit,
		caption: element.lightbox?.caption ?? element.data.caption,
		displayCredit: element.displayCredit,
		title: element.title,
		starRating: element.starRating,
	};
};

/**
 * Reads the elements array and returns a new array of data based on the
 * ImageBlockElement elements that it finds. It does not mutate. This new
 * array only contain the information that lightbox needs and is a lot
 * smaller.
 *
 * Takes ImageBlockElement (enormous)
 * Returns ImageForLightbox (small)
 *
 * Smaller is good here because the result of this function is being passed
 * to an island which means it gets serialized to the DOM and adds to page
 * weight. By passing the data through this transformer we take a 90Kb
 * object and return a 3Kb one!
 */
export const buildLightboxImages = (
	format: FEFormat,
	blocks: Block[],
	mainMediaElements: FEElement[],
): ImageForLightbox[] => {
	const lightboxImages: ImageForLightbox[] = [];
	mainMediaElements.forEach((element) => {
		if (
			element._type ===
			'model.dotcomrendering.pageElements.ImageBlockElement'
		) {
			const lightboxImage = buildLightboxImage(element);
			if (lightboxImage) lightboxImages.push(lightboxImage);
		}
	});
	blocks.forEach((block) => {
		block.elements.forEach((element) => {
			switch (element._type) {
				case 'model.dotcomrendering.pageElements.ImageBlockElement': {
					const lightboxImage = buildLightboxImage(element);
					if (lightboxImage === undefined) break;
					if (
						format.design === 'LiveBlogDesign' ||
						format.design === 'DeadBlogDesign'
					) {
						lightboxImage.blockId = block.id;
						lightboxImage.firstPublished =
							block.blockFirstPublished;
					}
					lightboxImages.push(lightboxImage);
					break;
				}
				case 'model.dotcomrendering.pageElements.MultiImageBlockElement': {
					element.images.forEach((multiImage) => {
						const lightboxImage = buildLightboxImage(multiImage);
						if (lightboxImage === undefined) return;
						if (
							format.design === 'LiveBlogDesign' ||
							format.design === 'DeadBlogDesign'
						) {
							lightboxImage.blockId = block.id;
							lightboxImage.firstPublished =
								block.blockFirstPublished;
						}
						lightboxImages.push(lightboxImage);
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
	return [
		...new Map(
			lightboxImages.map<[string, ImageForLightbox]>((image) => [
				decideImageId(image) ?? randomUUID(),
				image,
			]),
		).values(),
	];
};
