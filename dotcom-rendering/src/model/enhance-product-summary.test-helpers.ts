import type {
	EnhancedProductSummaryElement,
	FEElement,
	ProductBlockElement,
	ProductSummaryElement,
	SummaryProductRef,
} from '../types/content';

export const productSummaryElement = (
	summaryProducts: SummaryProductRef[],
): ProductSummaryElement =>
	({
		_type: 'model.dotcomrendering.pageElements.ProductSummaryElement',
		products: summaryProducts,
	}) as ProductSummaryElement;

export const productElement = (
	urls: string[],
	id: string,
): ProductBlockElement =>
	({
		_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
		productCtas: urls.map((url) => ({ url })),
		id,
	}) as ProductBlockElement;

export const findEnhancedProductSummary = (
	elements: FEElement[],
): EnhancedProductSummaryElement | undefined =>
	elements.find(
		(el): el is EnhancedProductSummaryElement =>
			el._type ===
			'model.dotcomrendering.pageElements.EnhancedProductSummaryElement',
	);
