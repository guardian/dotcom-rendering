import type { FEElement, ProductBlockElement } from '../types/content';
import { generateId } from './enhance-H2s';

/*List of page IDs eligible for product carousel enhancement.
For example thefilter/2025/jan/29/best-sunrise-alarm-clocks
Update list with actual article URLs as needed.*/

export type ABTestVariant = 'carousel' | 'stacked';

export const allowedPageIds: string[] = [
	'thefilter/2025/nov/18/best-pillows-tested-uk',
	'thefilter-us/2025/dec/14/best-cordless-leaf-blowers-battery-powered',
	'thefilter/2025/jan/29/best-sunrise-alarm-clocks',
	'thefilter/2025/dec/28/best-running-watches-tested-uk',
];
const isEligibleForSummary = (pageId: string) => {
	return allowedPageIds.includes(pageId);
};

const isCarouselOrStacked = (string: string) => {
	return string === 'carousel' || string === 'stacked';
};

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

const shouldRenderSummary = (products: ProductBlockElement[]): boolean =>
	products.length >= 3;

const insertSummaryPlaceholder = (
	elements: FEElement[],
	abTestVariant: ABTestVariant,
): FEElement[] => {
	const output: FEElement[] = [];
	let inAtAGlanceSection = false;
	let atAGlanceElements: FEElement[] = [];

	// Loop through elements tracking "At a glance" section and inserting carousel if needed
	for (const element of elements) {
		if (!inAtAGlanceSection) {
			if (isAtAGlance(element)) {
				inAtAGlanceSection = true;
				atAGlanceElements = [element];
				continue;
			}

			output.push(element);
			continue;
		}

		// We are inside an "At a glance" section
		if (isSubheadingOrDivider(element)) {
			inAtAGlanceSection = false;

			const urls = getAtAGlanceUrls(atAGlanceElements);
			const matchedProducts = findMatchingProducts(elements, urls);

			if (shouldRenderSummary(matchedProducts)) {
				output.push({
					_type: 'model.dotcomrendering.pageElements.ProductSummaryElement',
					matchedProducts,
					variant: abTestVariant,
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
	({
		pageId,
		serverSideABTests,
	}: {
		pageId: string;
		serverSideABTests?: Record<string, string>;
	}) =>
	(elements: FEElement[]): FEElement[] => {
		const abTestVariant =
			serverSideABTests?.['thefilter-at-a-glance-redesign'];

		// do nothing if article is not on allow list / not in the test / variant is 'control'
		if (
			abTestVariant &&
			isCarouselOrStacked(abTestVariant) &&
			isEligibleForSummary(pageId)
		) {
			return insertSummaryPlaceholder(elements, abTestVariant);
		}

		return elements;
	};

// Exports are for testing purposes only
export const _testOnly = {
	extractAtAGlanceUrls,
	findMatchingProducts,
	insertCarouselPlaceholder: insertSummaryPlaceholder,
	allowedPageIds,
};
