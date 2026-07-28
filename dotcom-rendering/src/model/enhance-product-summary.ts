import type {
	FEElement,
	SummaryProduct,
	SummaryProductRef,
} from '../types/content';

const getSummaryProducts = (
	pageElements: FEElement[],
	summaryProducts: SummaryProductRef[],
): SummaryProduct[] =>
	pageElements.reduce<SummaryProduct[]>((acc, element) => {
		if (
			element._type !==
			'model.dotcomrendering.pageElements.ProductBlockElement'
		) {
			return acc;
		}

		const matchingSummaryProduct = summaryProducts.find(
			(summaryProduct) => summaryProduct.productId === element.id,
		);

		if (!matchingSummaryProduct) {
			return acc;
		}

		acc.push({
			productBlock: element,
			ctaIndex: matchingSummaryProduct.ctaIndex,
		});

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
