import type { FEElement, ProductBlockElement } from '../types/content';
import { generateId } from './enhance-H2s';

// List of page IDs eligible for product carousel enhancement
const allowedPageIds = [
	'thefilter/2025/mar/02/best-air-fryers',
	'thefilter/2024/nov/21/best-coffee-machines',
];

const isEligibleForCarousel = (pageId: string) =>
	allowedPageIds.includes(pageId);

// Extract URLs from 'At a glance' section elements
export const extractAtAGlanceUrls = (elements: FEElement[]): string[] =>
	elements
		.filter(
			(el): el is FEElement & { url: string } =>
				el._type ===
					'model.dotcomrendering.pageElements.LinkBlockElement' &&
				typeof (el as FEElement & { url?: unknown }).url === 'string',
		)
		.map((el) => el.url);

// Find product elements which have a matching URL in their CTAs
export const findMatchingProducts = (
	pageElements: FEElement[],
	urls: string[],
): ProductBlockElement[] =>
	pageElements.filter(
		(el): el is ProductBlockElement =>
			el._type ===
				'model.dotcomrendering.pageElements.ProductBlockElement' &&
			Array.isArray(el.productCtas) &&
			el.productCtas.some((cta) => urls.includes(cta.url)),
	);

// Only insert the carousel in this one specific spot
const isAtAGlance = (element: FEElement) =>
	element._type ===
		'model.dotcomrendering.pageElements.SubheadingBlockElement' &&
	generateId(element.elementId, element.html, []) === 'at-a-glance';

const isSubheadingOrDivider = (element: FEElement) =>
	// if an element is one of these then we're likely leaving the 'At a glance' section
	element._type ===
		'model.dotcomrendering.pageElements.SubheadingBlockElement' ||
	element._type === 'model.dotcomrendering.pageElements.DividerBlockElement';

const getAtAGlanceUrls = (elements: FEElement[]): string[] =>
	Array.from(
		new Set(
			extractAtAGlanceUrls(elements).filter((url) => url.trim() !== ''),
		),
	);

const getUniqueProductsByCta = (
	products: ProductBlockElement[],
): ProductBlockElement[] => {
	const seenUrls = new Set<string>();
	const uniqueProducts: ProductBlockElement[] = [];

	for (const product of products) {
		const productUrls = product.productCtas.map((cta) => cta.url);

		if (productUrls.every((url) => !seenUrls.has(url))) {
			uniqueProducts.push(product);
			for (const url of productUrls) seenUrls.add(url);
		}
	}

	return uniqueProducts;
};

const shouldRenderCarousel = (products: ProductBlockElement[]): boolean =>
	products.length >= 2;

type ReducerAccumulator = {
	output: FEElement[];
	inAtAGlanceSection: boolean;
	atAGlanceElements: FEElement[];
};

export const insertCarouselPlaceholder = (
	elements: FEElement[],
): FEElement[] => {
	if (!Array.isArray(elements) || elements.length === 0) return [];

	const elementsWithReducerContext = elements.reduce(
		(
			prev: ReducerAccumulator,
			currentElement: FEElement,
		): ReducerAccumulator => {
			let inAtAGlance = prev.inAtAGlanceSection;
			const elementsToReturn = prev.output;
			const atAGlanceElements = prev.atAGlanceElements;

			if (!inAtAGlance) {
				if (isAtAGlance(currentElement)) {
					inAtAGlance = true;
				}
				elementsToReturn.push(currentElement);
			} else {
				if (isSubheadingOrDivider(currentElement)) {
					inAtAGlance = false;

					const urls = getAtAGlanceUrls(atAGlanceElements);

					const matchedProducts = findMatchingProducts(
						elements,
						urls,
					);

					const uniqueProducts =
						getUniqueProductsByCta(matchedProducts);

					if (shouldRenderCarousel(uniqueProducts)) {
						elementsToReturn.push(
							{
								_type: 'model.dotcomrendering.pageElements.ProductCarouselElement',
								matchedProducts: uniqueProducts,
							} as FEElement,
							currentElement,
						);
					} else {
						//Less than two products matched, so just return the original elements
						elementsToReturn.push(
							...atAGlanceElements,
							currentElement,
						);
					}
				} else {
					atAGlanceElements.push(currentElement);
				}
			}

			return {
				output: elementsToReturn,
				inAtAGlanceSection: inAtAGlance,
				atAGlanceElements,
			};
		},
		{
			output: [],
			inAtAGlanceSection: false,
			atAGlanceElements: [],
		},
	);

	return elementsWithReducerContext.output;
};

export const enhanceProductCarousel =
	(pageId: string) =>
	(elements: FEElement[]): FEElement[] => {
		// do nothing if article is not on allow list
		if (isEligibleForCarousel(pageId)) {
			return insertCarouselPlaceholder(elements);
		}

		return elements;
	};
