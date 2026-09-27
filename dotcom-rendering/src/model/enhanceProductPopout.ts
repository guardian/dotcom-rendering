import type { Block } from '../types/blocks';
import type {
	FEElement,
	PopoutProduct,
	ProductBlockElement,
	SummaryProduct,
} from '../types/content';

/**
 * Products shown in the product popout, in the order a reader meets them.
 *
 * We prefer the products an editor has curated into a product summary ("At a
 * glance") block, because that list is already ordered and already names the
 * retailer to lead on for each product. Articles that carry product cards
 * without a summary block fall back to every product in the body, so the
 * popout is not limited to articles that happen to have been given a summary.
 */

/** Retailer links carried per product. The rest stay on the in-article card. */
const maxCtasPerProduct = 2;

const toPopoutProduct = (
	productBlock: ProductBlockElement,
	ctaIndex: number,
): PopoutProduct => ({
	elementId: productBlock.elementId,
	anchorId: productBlock.h2Id ?? productBlock.elementId,
	primaryHeadingText: productBlock.primaryHeadingText,
	secondaryHeadingText: productBlock.secondaryHeadingText,
	productName: productBlock.productName,
	image: productBlock.image,
	/**
	 * The editor's chosen retailer leads, then whatever else fits. Slicing here
	 * rather than in the component keeps the unused CTAs out of the page.
	 */
	productCtas: [
		...productBlock.productCtas.slice(ctaIndex, ctaIndex + 1),
		...productBlock.productCtas.filter((_, index) => index !== ctaIndex),
	].slice(0, maxCtasPerProduct),
});

const curatedProducts = (elements: FEElement[]): SummaryProduct[] =>
	elements.flatMap((element) =>
		element._type ===
		'model.dotcomrendering.pageElements.EnhancedProductSummaryElement'
			? element.products
			: [],
	);

const allBodyProducts = (elements: FEElement[]): SummaryProduct[] =>
	elements.flatMap((element) =>
		element._type ===
		'model.dotcomrendering.pageElements.ProductBlockElement'
			? [{ productBlock: element, ctaIndex: 0 }]
			: [],
	);

/**
 * An article can carry more than one summary block, and a product can appear in
 * more than one of them, so we keep the first mention of each product.
 */
const dedupeByProductId = (products: SummaryProduct[]): SummaryProduct[] => {
	const seen = new Set<string>();
	return products.filter(({ productBlock }) => {
		if (seen.has(productBlock.id)) {
			return false;
		}
		seen.add(productBlock.id);
		return true;
	});
};

/** A product with nothing to buy has nowhere for the popout to send a reader. */
const hasCta = ({ productBlock }: SummaryProduct): boolean =>
	productBlock.productCtas.length > 0;

export const enhanceProductPopout = (
	blocks: Block[],
): PopoutProduct[] | undefined => {
	const elements = blocks.flatMap((block) => block.elements);

	const curated = dedupeByProductId(curatedProducts(elements));
	const products = (
		curated.length > 0
			? curated
			: dedupeByProductId(allBodyProducts(elements))
	).filter(hasCta);

	return products.length > 0
		? products.map(({ productBlock, ctaIndex }) =>
				toPopoutProduct(productBlock, ctaIndex),
			)
		: undefined;
};
