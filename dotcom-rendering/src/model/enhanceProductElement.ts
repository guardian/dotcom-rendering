import type { FEElement, ProductBlockElement } from '../types/content';

type ElementsEnhancer = (elements: FEElement[]) => FEElement[];

const enhanceProductBlockElement = (
	element: ProductBlockElement,
	elementsEnhancer: ElementsEnhancer,
): ProductBlockElement => ({
	...element,
	content: elementsEnhancer(element.content),
});

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
