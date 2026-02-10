import type { FEElement, ProductBlockElement } from '../types/content';
import type { RenderingTarget } from '../types/renderingTarget';
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
	'thefilter/2025/jan/29/best-sunrise-alarm-clocks',
	'thefilter/2025/dec/28/best-running-watches-tested-uk',
	'thefilter/2025/mar/02/best-air-fryers',
	'thefilter/2024/nov/14/the-8-best-video-doorbells-tried-and-tested',
	'thefilter/2024/nov/26/best-robot-vacuum-mop',
	'thefilter/2025/sep/19/best-led-red-light-therapy-face-masks',
	'thefilter/2024/dec/27/best-electric-blankets-heated-throws',
	'technology/article/2024/jul/08/the-best-apple-iphones-in-2024-tested-reviewed-and-ranked',
	'thefilter/2025/dec/31/best-cross-trainers-ellipticals-uk',
	'thefilter/2026/jan/02/best-concealer-tested-uk',
	'thefilter/2025/jun/10/best-apple-watch',
	'thefilter/2026/jan/15/best-hand-cream-tested-uk',
	'thefilter/2026/jan/21/best-weighted-blanket-uk',
	'thefilter/2024/oct/18/best-heated-clothes-airers-dryer-save-time-money-laundry',
	'thefilter/2026/jan/23/best-duvets-tested-uk',
	'thefilter/2025/jan/23/best-womens-hiking-walking-boots',
	'thefilter/2024/nov/07/the-8-best-electric-heaters-tried-and-tested-from-traditional-stove-style-units-to-modern-smart-models',
	'thefilter/2024/oct/10/best-walking-boots-hiking-men-tried-tested',
	'thefilter-us/2025/dec/27/best-wine-subscriptions-us',
	'thefilter-us/2025/dec/14/best-cordless-leaf-blowers-battery-powered',
	'thefilter-us/2026/jan/07/best-packing-cubes',
	'thefilter-us/2026/jan/09/best-induction-cookware',
	'thefilter/2025/feb/12/best-flower-delivery',
	'thefilter-us/2026/feb/06/best-personal-travel-item-backpacks-us',
	'thefilter/2024/nov/21/best-coffee-machines',
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

const isEndOfAtAGlanceSection = (element: FEElement) =>
	// A subheading, divider, or a product block signals the end of the "At a glance" section
	element._type ===
		'model.dotcomrendering.pageElements.SubheadingBlockElement' ||
	element._type ===
		'model.dotcomrendering.pageElements.DividerBlockElement' ||
	element._type === 'model.dotcomrendering.pageElements.ProductBlockElement';

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
		if (isEndOfAtAGlanceSection(element)) {
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

export const enhanceProductSummary =
	({
		pageId,
		serverSideABTests,
		renderingTarget,
		filterAtAGlanceEnabled,
	}: {
		pageId: string;
		serverSideABTests?: Record<string, string>;
		renderingTarget: RenderingTarget;
		filterAtAGlanceEnabled: boolean;
	}) =>
	(elements: FEElement[]): FEElement[] => {
		const abTestVariant =
			serverSideABTests?.['thefilter-at-a-glance-redesign'];

		// do nothing if article is not on allow list / not in the test / variant is 'control' / renderingTarget is Apps / filterAtAGlance switch is OFF
		if (
			filterAtAGlanceEnabled &&
			abTestVariant &&
			isCarouselOrStacked(abTestVariant) &&
			isEligibleForSummary(pageId) &&
			renderingTarget === 'Web'
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
