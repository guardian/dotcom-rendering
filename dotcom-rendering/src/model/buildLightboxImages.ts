import { isUndefined } from '@guardian/libs';
import type { FEFormat } from '../frontend/feArticle';
import { getLargest, getMaster } from '../lib/image';
import type { Block } from '../types/blocks';
import type {
	CartoonBlockElement,
	FEElement,
	ImageBlockElement,
	ImageForLightbox,
} from '../types/content';
import {
	getCartoonImageForLightbox,
	isCartoon,
	isImage,
} from './enhance-images';

/** Used to determine if a lightbox can be created */
const THRESHOLD = 620;

/**
 * Only allow the lightbox to show images whose largest source
 * is higher than a specific threshold.
 *
 * Frontend has similar logic here:
 * https://github.com/guardian/frontend/blob/126dfcbc1aa961650b7f7ff41ee50a12782bb62e/common/app/model/content.scala#L549
 *
 */
const isLightboxable = (width: number, height: number): boolean =>
	Math.max(width, height) > THRESHOLD;

const buildLightboxImage = (
	element: ImageBlockElement | CartoonBlockElement,
): Omit<ImageForLightbox, 'position'> | undefined => {
	const allImages = isImage(element)
		? element.media.allImages
		: getCartoonImageForLightbox(element);
	const masterImage = getMaster(allImages) ?? getLargest(allImages);

	// Rare, but legacy content might not have a url that we can use with Fastly
	// so we can't include them in lightbox
	if (!masterImage) return;

	const width = parseInt(masterImage.fields.width, 10);
	const height = parseInt(masterImage.fields.height, 10);

	if (!isLightboxable(width, height)) return;

	const data = isImage(element)
		? {
				alt: element.data.alt,
				credit: element.data.credit,
				caption: element.data.caption,
				title: element.title,
				starRating: element.starRating,
		  }
		: {
				alt: element.alt,
				credit: element.credit,
				caption: element.caption,
		  };

	return {
		masterUrl: masterImage.url,
		width,
		height,
		elementId: element.elementId,
		displayCredit: element.displayCredit,
		...data,
	};
};

const isBlog = (design: FEFormat['design']) =>
	design === 'LiveBlogDesign' || design === 'DeadBlogDesign';

const getImages = (
	element: FEElement,
): (ImageBlockElement | CartoonBlockElement)[] => {
	switch (element._type) {
		case 'model.dotcomrendering.pageElements.ImageBlockElement':
			return [element];
		case 'model.dotcomrendering.pageElements.CartoonBlockElement':
			return [element];
		case 'model.dotcomrendering.pageElements.MultiImageBlockElement':
			return element.images;
		case 'model.dotcomrendering.pageElements.ListBlockElement':
			return element.items.flatMap((item) =>
				item.elements.flatMap(getImages),
			);
		case 'model.dotcomrendering.pageElements.TimelineBlockElement':
			return element.sections.flatMap((section) =>
				section.events.flatMap((event) =>
					event.body.flatMap(getImages),
				),
			);

		default:
			return [];
	}
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
): ImageForLightbox[] =>
	mainMediaElements
		.flatMap<Omit<ImageForLightbox, 'position'>>((element) => {
			if (!isImage(element) && !isCartoon(element)) return [];
			const lightboxImage = buildLightboxImage(element);
			if (!lightboxImage) return [];

			return [lightboxImage];
		})
		.concat(
			blocks.flatMap((block) =>
				block.elements.flatMap((element) =>
					getImages(element).flatMap((multiImage) => {
						const lightboxImage = buildLightboxImage(multiImage);
						if (isUndefined(lightboxImage)) return [];
						return isBlog(format.design)
							? {
									...lightboxImage,
									blockId: block.id,
									firstPublished: block.blockFirstPublished,
							  }
							: lightboxImage;
					}),
				),
			),
		)
		.map((image, index) => ({ ...image, position: index + 1 }));
