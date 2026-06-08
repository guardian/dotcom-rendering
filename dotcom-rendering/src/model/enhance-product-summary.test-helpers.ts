import type {
	EnhancedProductSummaryElement,
	FEElement,
	ProductBlockElement,
	ProductSummaryElement,
} from '../types/content';

export const productSummaryElement = (ids: string[]): ProductSummaryElement =>
	({
		_type: 'model.dotcomrendering.pageElements.ProductSummaryElement',
		products: ids.map((id) => ({ productId: id, ctaIndex: 0 })),
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
