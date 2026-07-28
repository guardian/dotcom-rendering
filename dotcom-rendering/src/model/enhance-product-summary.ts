import type {
	FEElement,
	SummaryProduct,
	SummaryProductRef,
} from '../types/content';

const getSummaryProducts = (
	pageElements: FEElement[],
	summaryProducts: SummaryProductRef[],
): SummaryProduct[] =>
	summaryProducts.reduce<SummaryProduct[]>((acc, summaryProduct) => {
		const matchingPageElement = pageElements.find(
			(pageElement) =>
				pageElement._type ===
					'model.dotcomrendering.pageElements.ProductBlockElement' &&
				summaryProduct.productId === pageElement.id,
		);
		if (
			matchingPageElement?._type ===
			'model.dotcomrendering.pageElements.ProductBlockElement'
		) {
			acc.push({
				productBlock: matchingPageElement,
				ctaIndex: summaryProduct.ctaIndex,
			});
		}
		return acc;
	}, []);

export const enhanceProductSummary = (elements: FEElement[]): FEElement[] =>
	elements.map<FEElement>((element) => {
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.ProductSummaryBlockElement': {
				return {
					...element,
					_type: 'model.dotcomrendering.pageElements.EnhancedProductSummaryElement',
					products: getSummaryProducts(elements, element.products),
				};
			}

			default:
				return element;
		}
	});
