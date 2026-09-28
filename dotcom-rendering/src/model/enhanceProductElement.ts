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

const parsePrice = (price: string): number | undefined => {
	const match = price.match(/[\d,.]+/);
	if (!match) return undefined;

	const value = Number.parseFloat(match[0].replace(/,/g, ''));
	return Number.isNaN(value) ? undefined : value;
};

/**
 * Gets the lowest price from an array of product CTAs.
 *
 * Each CTA may contain a price in a localized string format (e.g. "£29.99", "$39.99").
 * Prices are validated upstream in Flexible Content:
 * https://github.com/guardian/flexible-content/blob/4e6097d3d23412432a9d8f50f2415a1ae622dc5b/composer/src/js/prosemirror-setup/elements/product/ProductSpec.tsx#L31
 *
 * Each CTA may also contain a live 'latestPrice' inserted on the server
 * This latest price is retrieved from an external API and will be shown instead of the CTA price
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
	const candidates = ctas.flatMap(({ price, latestPrice }) => {
		const display = latestPrice?.price ?? price;
		const value = parsePrice(display);

		return value === undefined ? [] : [{ value, display }];
	});

	return candidates.reduce<(typeof candidates)[number] | undefined>(
		(lowest, candidate) =>
			lowest === undefined || candidate.value < lowest.value
				? candidate
				: lowest,
		undefined,
	)?.display;
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
