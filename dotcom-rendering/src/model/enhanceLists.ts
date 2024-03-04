import type { FEElement, ListBlockElement } from '../types/content';

type ElementsEnhancer = (elements: FEElement[]) => FEElement[];

const constructKeyTakeaway =
	(enhanceElements: ElementsEnhancer) =>
	({ title, list }) => {
		if (title !== undefined) {
			return [
				{
					title,
					body: enhanceElements(list),
				},
			];
		}
		return [];
	};

const constructQAndAExplainer =
	(enhanceElements: ElementsEnhancer) =>
	({ title, list }) => {
		if (title !== undefined) {
			return [
				{
					title,
					body: enhanceElements(list),
				},
			];
		}
		return [];
	};

const enhanceListBlockElement = (
	element: ListBlockElement,
	elementsEnhancer: ElementsEnhancer,
): FEElement[] => {
	switch (element.listElementType) {
		case 'KeyTakeaways':
			return [
				{
					_type: 'model.dotcomrendering.pageElements.KeyTakeawaysBlockElement',
					keyTakeaways: element.items.flatMap(
						constructKeyTakeaway(elementsEnhancer),
					),
				},
			];
		case 'QAndAExplainer':
			return [
				{
					_type: 'model.dotcomrendering.pageElements.QAndAExplainerBlockElement',
					qAndAExplainers: element.items.flatMap(
						constructQAndAExplainer(elementsEnhancer),
					),
				},
			];
		/**
		 * If it's an unsupported list element, ignore the structure
		 * and return the body elements.
		 */
		default:
			return element.items.flatMap((item) => item.list);
	}
};

const enhance =
	(elementsEnhancer: ElementsEnhancer) =>
	(element: FEElement): FEElement[] => {
		switch (element._type) {
			case 'model.dotcomrendering.pageElements.ListBlockElement': {
				return enhanceListBlockElement(element, elementsEnhancer);
			}
			default:
				return [element];
		}
	};

export const enhanceLists =
	(elementsEnhancer: ElementsEnhancer) =>
	(elements: FEElement[]): FEElement[] =>
		elements.flatMap(enhance(elementsEnhancer));
