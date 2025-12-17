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

type ReducerAccumulator = {
	elements: FEElement[];
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
			const elementsToReturn = prev.elements;
			const atAGlanceElements = prev.atAGlanceElements;

			if (!inAtAGlance) {
				if (isAtAGlance(currentElement)) {
					inAtAGlance = true;
				}
				elementsToReturn.push(currentElement);
			} else {
				if (isSubheadingOrDivider(currentElement)) {
					inAtAGlance = false;

					// Filter out duplicate and empty URLs
					const urls = Array.from(
						new Set(
							extractAtAGlanceUrls(atAGlanceElements).filter(
								(url) => url.trim() !== '',
							),
						),
					);

					const matchedProducts = findMatchingProducts(
						elements,
						urls,
					);

					if (matchedProducts.length >= 2) {
						// Insert carousel with matched products
						elementsToReturn.push(
							{
								_type: 'model.dotcomrendering.pageElements.ProductCarouselElement',
								matchedProducts,
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
				elements: elementsToReturn,
				inAtAGlanceSection: inAtAGlance,
				atAGlanceElements,
			};
		},
		{
			elements: [],
			inAtAGlanceSection: false,
			atAGlanceElements: [],
		},
	);

	return elementsWithReducerContext.elements;
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
