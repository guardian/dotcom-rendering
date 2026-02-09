import { JSDOM } from 'jsdom';
import type {
	FEElement,
	ProductBlockElement,
	ProductCta,
} from '../types/content';

type ElementsEnhancer = (elements: FEElement[]) => FEElement[];

const enhanceProductBlockElement = (
	element: ProductBlockElement,
	elementsEnhancer: ElementsEnhancer,
): ProductBlockElement => ({
	...element,
	content: elementsEnhancer(element.content),
	lowestPrice: getLowestPrice(element.productCtas),
	primaryHeadingText: extractHeadingText(element.primaryHeadingHtml),
	secondaryHeadingText: extractHeadingText(element.secondaryHeadingHtml),
});

/**
 * Gets the lowest price from an array of product CTAs.
 *
 * Each CTA may contain a price in a localized string format (e.g. "£29.99", "$39.99").
 * Prices are validated upstream in Flexible Content:
 * https://github.com/guardian/flexible-content/blob/4e6097d3d23412432a9d8f50f2415a1ae622dc5b/composer/src/js/prosemirror-setup/elements/product/ProductSpec.tsx#L31
 *
 * Implementation details:
 * - Extracts the floating-point number from the price string (e.g. "$26.99" → 26.99).
 * - Removes commas to handle formatted prices like "1,299.99".
 * - Converts the cleaned string to a number for comparison.
 * - Skips any CTA where the parsed value is `NaN`.
 *
 * @param {ProductCta[]} ctas - Array of CTA objects containing price strings.
 * @returns {string | undefined} The lowest price string, or `undefined` if no valid prices are found.
 */
const getLowestPrice = (ctas: ProductCta[]): string | undefined => {
	if (ctas.length === 0) {
		return undefined;
	}

	let lowestCta: ProductCta | null = null;
	let lowestPrice: number | null = null;

	for (const cta of ctas) {
		const priceMatch = cta.price.match(/[\d,.]+/);
		if (priceMatch) {
			const priceNumber = parseFloat(priceMatch[0].replace(/,/g, ''));
			if (Number.isNaN(priceNumber)) {
				continue;
			}
			if (lowestPrice === null || priceNumber < lowestPrice) {
				lowestPrice = priceNumber;
				lowestCta = cta;
			}
		}
	}

	return lowestCta?.price;
};

const enhance =
	(elementsEnhancer: ElementsEnhancer) =>
	(element: FEElement): FEElement[] => {
		if (
			element._type ===
			'model.dotcomrendering.pageElements.ProductBlockElement'
		) {
			return [enhanceProductBlockElement(element, elementsEnhancer)];
		}
		return [element];
	};

export const enhanceProductElement =
	(elementsEnhancer: ElementsEnhancer) =>
	(elements: FEElement[]): FEElement[] =>
		elements.flatMap(enhance(elementsEnhancer));

export const extractHeadingText = (headingHtml: string): string => {
	return removeTrailingColon(extractText(headingHtml));
};

const removeTrailingColon = (text: string): string => {
	return text.replace(/\s*:\s*$/, '');
};

const extractText = (html: string): string => {
	return JSDOM.fragment(html).textContent?.trim() ?? '';
};
