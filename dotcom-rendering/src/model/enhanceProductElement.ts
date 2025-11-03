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
});

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
