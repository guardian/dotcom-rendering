import type {
	FEElement,
	ProductBlockElement,
	ProductSummaryMap,
} from '../types/content';

const productIsInSummary = (
	product: ProductBlockElement,
	summaryProducts: ProductSummaryMap[],
): boolean => {
	return summaryProducts.some(
		(summaryProduct) => summaryProduct.productId === product.id,
	);
};
const findSummaryProducts = (
	pageElements: FEElement[],
	summaryProducts: ProductSummaryMap[],
): ProductBlockElement[] =>
	pageElements.filter(
		(el): el is ProductBlockElement =>
			el._type ===
				'model.dotcomrendering.pageElements.ProductBlockElement' &&
			productIsInSummary(el, summaryProducts),
	);

export const enhanceProductSummary = (elements: FEElement[]): FEElement[] =>
	elements.map<FEElement>((element) => {
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.ProductSummaryElement': {
				return {
					...element,
					_type: 'model.dotcomrendering.pageElements.EnhancedProductSummaryElement',
					products: findSummaryProducts(elements, element.products),
				};
			}

			default:
				return element;
		}
	});
