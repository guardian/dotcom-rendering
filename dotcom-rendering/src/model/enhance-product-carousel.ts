import type { FEElement, ProductBlockElement } from '../types/content';
import { generateId } from './enhance-H2s';

/**
 * This file contains logic used specifically for an A/B test that replaces
 * the "At a glance" section with a product carousel on selected articles.
 * If the experiment is successful, this logic may be refactored or relocated
 * further up the rendering pipeline.
 */

export type ABTestVariant = 'carousel' | 'stacked';

/**
 * List of page IDs eligible for product carousel enhancement.
 * For example thefilter/2025/jan/29/best-sunrise-alarm-clocks
 * Update list with actual article URLs as needed.
 */
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
	// A subheading or divider signals the end of the "At a glance" section
	element._type ===
		'model.dotcomrendering.pageElements.SubheadingBlockElement' ||
	element._type === 'model.dotcomrendering.pageElements.DividerBlockElement';

const getAtAGlanceUrls = (elements: FEElement[]): string[] =>
	Array.from(
		new Set(
			extractAtAGlanceUrls(elements).filter((url) => url.trim() !== ''),
		),
	);

// A carousel is only rendered when at least 3 matching products are found
const shouldRenderSummary = (products: ProductBlockElement[]): boolean =>
	products.length >= 3;

/**
 * Iterates through the page elements and conditionally replaces the
 * "At a glance" section with a ProductCarouselElement.
 *
 * High-level flow:
 *
 * - When we encounter the "At a glance" subheading, we treat this as the start
 *   of the section and begin collecting its elements.
 *
 * - We continue collecting elements until we reach either:
 *   - another SubheadingBlockElement, or
 *   - a DividerBlockElement
 *   which marks the end of the "At a glance" section.
 *
 * - Once the section ends, we extract product URLs from the collected elements
 *   and attempt to find matching ProductBlockElements elsewhere on the page.
 *
 * - If enough matching products are found, we replace the entire "At a glance"
 *   section with a single ProductCarouselElement.
 *
 * - Otherwise, we fall back to rendering the original "At a glance" elements
 *   unchanged.
 */

const insertSummaryPlaceholder = (
	elements: FEElement[],
	abTestVariant: ABTestVariant,
): FEElement[] => {
	const output: FEElement[] = [];
	let inAtAGlanceSection = false;
	let atAGlanceElements: FEElement[] = [];

	// Iterate through the page, tracking when we enter and exit the "At a glance" section
	for (const element of elements) {
		// Start collecting elements belonging to the "At a glance" section
		if (!inAtAGlanceSection) {
			if (isAtAGlance(element)) {
				inAtAGlanceSection = true;
				atAGlanceElements = [element];
				continue;
			}

			output.push(element);
			continue;
		}

		// Hitting a divider or another subheading means we've reached the end
		// of the current "At a glance" section
		if (isSubheadingOrDivider(element)) {
			inAtAGlanceSection = false;

			const urls = getAtAGlanceUrls(atAGlanceElements);
			const matchedProducts = findMatchingProducts(elements, urls);

			// Decide whether to replace the section with a carousel or keep it as is
			if (shouldRenderSummary(matchedProducts)) {
				output.push({
					_type: 'model.dotcomrendering.pageElements.ProductSummaryElement',
					matchedProducts,
					variant: abTestVariant,
				} as FEElement);
			} else {
				// Not enough products matched, so return original elements
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
	insertSummaryPlaceholder,
	allowedPageIds,
};
