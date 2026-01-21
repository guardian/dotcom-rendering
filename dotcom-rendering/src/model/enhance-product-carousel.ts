import type { FEElement, ProductBlockElement } from '../types/content';
import { generateId } from './enhance-H2s';

/*List of page IDs eligible for product carousel enhancement.
For example thefilter/2025/jan/29/best-sunrise-alarm-clocks
Update list with actual article URLs as needed.*/

export const allowedPageIds: string[] = [];

const isEligibleForCarousel = (pageId: string) =>
	allowedPageIds.includes(pageId);

// Extract URLs from 'At a glance' section elements
export const extractAtAGlanceUrls = (elements: FEElement[]): string[] =>
	elements
		.filter(
			(el) =>
				el._type ===
				'model.dotcomrendering.pageElements.LinkBlockElement',
		)
		.map((el) => el.url);

// Find product elements which have a matching URL in their CTAs
const findMatchingProducts = (
	pageElements: FEElement[],
	urls: string[],
): ProductBlockElement[] =>
	pageElements
		.filter(
			(el) =>
				el._type ===
				'model.dotcomrendering.pageElements.ProductBlockElement',
		)
		.filter((el) => el.productCtas.some((cta) => urls.includes(cta.url)));

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

const shouldRenderCarousel = (products: ProductBlockElement[]): boolean =>
	products.length >= 2;

const insertCarouselPlaceholder = (elements: FEElement[]): FEElement[] => {
	if (!Array.isArray(elements) || elements.length === 0) return [];

	const output: FEElement[] = [];
	let inAtAGlanceSection = false;
	let atAGlanceElements: FEElement[] = [];

	// Loop through elements tracking "At a glance" section and inserting carousel if needed
	for (const element of elements) {
		if (!inAtAGlanceSection) {
			if (isAtAGlance(element)) {
				inAtAGlanceSection = true;
				atAGlanceElements = [];
			}

			output.push(element);
			continue;
		}

		// We are inside an "At a glance" section
		if (isSubheadingOrDivider(element)) {
			inAtAGlanceSection = false;

			const urls = getAtAGlanceUrls(atAGlanceElements);
			const matchedProducts = findMatchingProducts(elements, urls);

			if (shouldRenderCarousel(matchedProducts)) {
				output.push({
					_type: 'model.dotcomrendering.pageElements.ProductCarouselElement',
					matchedProducts,
				} as FEElement);
			} else {
				// Less than two products matched, so return original elements
				output.push(...atAGlanceElements);
			}

			output.push(element);
			atAGlanceElements = [];
			continue;
		}

		atAGlanceElements.push(element);
	}

	return output;
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

// Exports are for testing purposes only
export const _testOnly = {
	extractAtAGlanceUrls,
	findMatchingProducts,
	insertCarouselPlaceholder,
	allowedPageIds,
};
