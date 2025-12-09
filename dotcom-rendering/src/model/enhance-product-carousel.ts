import type { FEElement } from '../types/content';
import { generateId } from './enhance-H2s';

// We only want to insert the carousel in this one specific spot
const extractAtAGlanceUrls = (elements: FEElement[]): string[] =>
	elements
		.filter(
			(el): el is FEElement & { url: string } =>
				el._type ===
					'model.dotcomrendering.pageElements.LinkBlockElement' &&
				typeof (el as FEElement & { url?: unknown }).url === 'string',
		)
		.map((el) => el.url);

// Find page elements that match the URLs
const findMatchingProducts = (
	pageElements: FEElement[],
	urls: string[],
): FEElement[] =>
	pageElements.filter(
		(el): el is FEElement & { url: string } =>
			'url' in el &&
			typeof (el as FEElement & { url?: unknown }).url === 'string' &&
			urls.includes((el as FEElement & { url: string }).url),
	);

const isAtAGlance = (element: FEElement) =>
	element._type ===
		'model.dotcomrendering.pageElements.SubheadingBlockElement' &&
	generateId(element.elementId, element.html, []) === 'at-a-glance';

const isSubheadingOrDivider = (element: FEElement) =>
	// if an element is one of these then we're likely leaving the 'At a glance' section
	element._type ===
		'model.dotcomrendering.pageElements.SubheadingBlockElement' ||
	element._type === 'model.dotcomrendering.pageElements.DividerBlockElement';

const allowedPageIds = [
	'thefilter/2025/mar/02/best-air-fryers',
	'thefilter/2024/nov/21/best-coffee-machines',
];

const isEligibleForCarousel = (pageId: string) =>
	allowedPageIds.includes(pageId);

type ReducerAccumulator = {
	elements: FEElement[];
	inAtAGlanceSection: boolean;
	atAGlanceElements: FEElement[];
};

const insertCarouselPlaceholder = (elements: FEElement[]): FEElement[] => {
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

					// Extract URLs from captured At a glance elements
					const urls = extractAtAGlanceUrls(atAGlanceElements);
					console.log('All page elements:', elements);

					// Find matching products in the full page
					const matchedProducts = findMatchingProducts(
						elements,
						urls,
					);
					console.log(
						'Matched products for carousel:',
						matchedProducts,
					);
					console.log(
						'Matched products count:',
						matchedProducts.length,
					);

					// Insert carousel with matched products
					elementsToReturn.push(
						{
							_type: 'model.dotcomrendering.pageElements.ProductCarouselElement',
							matchedProducts,
						} as any,
						currentElement,
					);
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
		// Initial value for reducer function
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
