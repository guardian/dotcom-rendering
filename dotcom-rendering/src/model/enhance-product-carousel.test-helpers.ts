import type { FEElement, ProductBlockElement } from '../types/content';

export const linkElement = (url: string, label: string): FEElement =>
	({
		_type: 'model.dotcomrendering.pageElements.LinkBlockElement',
		url,
		label,
	}) as FEElement;

export const productElement = (urls: string[]): ProductBlockElement =>
	({
		_type: 'model.dotcomrendering.pageElements.ProductBlockElement',
		productCtas: urls.map((url) => ({ url })),
	}) as ProductBlockElement;

export const atAGlanceHeading = (): FEElement =>
	({
		_type: 'model.dotcomrendering.pageElements.SubheadingBlockElement',
		text: 'At a glance',
		html: 'At a glance',
		elementId: 'at-a-glance',
	}) as FEElement;

export const dividerElement = (): FEElement =>
	({
		_type: 'model.dotcomrendering.pageElements.DividerBlockElement',
		elementId: 'divider',
	}) as FEElement;

export const textElement = (html: string): FEElement =>
	({
		_type: 'model.dotcomrendering.pageElements.TextBlockElement',
		html,
		elementId: '4',
	}) as FEElement;

export type ProductCarouselTestElement = FEElement & {
	_type: 'model.dotcomrendering.pageElements.ProductCarouselElement';
	matchedProducts: ProductBlockElement[];
};

export const findCarousel = (
	elements: FEElement[],
): ProductCarouselTestElement | undefined =>
	elements.find(
		(el): el is ProductCarouselTestElement =>
			el._type ===
			'model.dotcomrendering.pageElements.ProductCarouselElement',
	);
