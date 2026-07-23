import type {
	EnhancedProductSummaryElement,
	FEElement,
	ProductBlockElement,
	ProductSummaryBlockElement,
	SummaryProductRef,
} from '../types/content';

export const productSummaryElement = (
	summaryProducts: SummaryProductRef[],
): ProductSummaryBlockElement =>
	({
		_type: 'model.dotcomrendering.pageElements.ProductSummaryBlockElement',
		products: summaryProducts,
	}) as ProductSummaryBlockElement;

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
