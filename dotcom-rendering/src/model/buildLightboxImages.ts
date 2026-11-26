import type { FEFormat } from '../frontend/feArticle';
import { getLargest, getMaster } from '../lib/image';
import type { Block } from '../types/blocks';
import type {
	CartoonBlockElement,
	FEElement,
	ImageBlockElement,
	ImageForLightbox,
	ProductBlockElement,
	ProductCta,
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

/**
 * Carried down through a product's content while looking for its images, so
 * that every image belonging to a product (its own card photo and any images
 * nested in its review body) can share the same CTAs and caption.
 */
type ProductContext = {
	ctas?: ProductCta[];
	/** Falls back to the product's own caption when a body image has none of its own */
	caption?: string;
};

const buildLightboxImage = (
	element: ImageBlockElement | CartoonBlockElement,
	productContext?: ProductContext,
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
				caption: element.data.caption || productContext?.caption,
				title: element.title,
				starRating: element.starRating,
			}
		: {
				alt: element.alt,
				credit: element.credit,
				caption: element.caption || productContext?.caption,
			};

	return {
		masterUrl: masterImage.url,
		width,
		height,
		elementId: element.elementId,
		displayCredit: element.displayCredit,
		...data,
		...(productContext?.ctas ? { productCtas: productContext.ctas } : {}),
	};
};

const isBlog = (design: FEFormat['design']) =>
	design === 'LiveBlogDesign' || design === 'DeadBlogDesign';

/**
 * Recursively finds every lightbox-eligible image reachable from an element,
 * in document order.
 *
 * For a ProductBlockElement, this means its body content images followed by
 * its own card photo (matching the order they render on the page), with both
 * carrying that product's CTAs and (as a fallback) its caption — keeping a
 * product's images adjacent to each other in the final lightbox order,
 * rather than grouped by image "kind".
 */
const getLightboxImages = (
	element: FEElement,
	productContext?: ProductContext,
): Omit<ImageForLightbox, 'position'>[] => {
	switch (element._type) {
		case 'model.dotcomrendering.pageElements.ImageBlockElement':
		case 'model.dotcomrendering.pageElements.CartoonBlockElement': {
			const image = buildLightboxImage(element, productContext);
			return image ? [image] : [];
		}
		case 'model.dotcomrendering.pageElements.MultiImageBlockElement':
			return element.images.flatMap((image) =>
				getLightboxImages(image, productContext),
			);
		case 'model.dotcomrendering.pageElements.ListBlockElement':
			return element.items.flatMap((item) =>
				item.elements.flatMap((el) =>
					getLightboxImages(el, productContext),
				),
			);
		case 'model.dotcomrendering.pageElements.TimelineBlockElement':
			return element.sections.flatMap((section) =>
				section.events.flatMap((event) =>
					event.body.flatMap((el) =>
						getLightboxImages(el, productContext),
					),
				),
			);
		case 'model.dotcomrendering.pageElements.ProductBlockElement': {
			const ownContext: ProductContext = {
				ctas:
					element.productCtas.length > 0
						? element.productCtas
						: undefined,
				caption: element.image?.caption,
			};
			const contentImages = element.content.flatMap((el) =>
				getLightboxImages(el, ownContext),
			);
			const cardImage = buildProductLightboxImage(element);
			return cardImage ? [...contentImages, cardImage] : contentImages;
		}

		default:
			return [];
	}
};

const buildProductLightboxImage = (
	element: ProductBlockElement,
): Omit<ImageForLightbox, 'position'> | undefined => {
	const { image, productCtas } = element;
	if (!image) return;

	if (!isLightboxable(image.width, image.height)) return;

	return {
		masterUrl: image.url,
		width: image.width,
		height: image.height,
		elementId: element.elementId,
		displayCredit: image.displayCredit,
		alt: image.alt,
		credit: image.credit,
		caption: image.caption,
		...(productCtas.length > 0 ? { productCtas } : {}),
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
					getLightboxImages(element).map((lightboxImage) =>
						isBlog(format.design)
							? {
									...lightboxImage,
									blockId: block.id,
									firstPublished: block.blockFirstPublished,
								}
							: lightboxImage,
					),
				),
			),
		)
		.map((image, index) => ({ ...image, position: index + 1 }));
