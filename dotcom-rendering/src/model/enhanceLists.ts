import type { FEElement, ListBlockElement } from '../types/content';
import { isUndefined } from '@guardian/libs';

type ElementsEnhancer = (elements: FEElement[]) => FEElement[];

const constructKeyTakeaway =
	(enhanceElements: ElementsEnhancer) =>
	({ title, elements }: { title?: string; elements: FEElement[] }) => {
		// if the element is missing its title for any reason, we will skip it
		if (!isUndefined(title)) {
			return [
				{
					title,
					body: enhanceElements(elements),
				},
			];
		}
		return [];
	};

const constructQAndAExplainer =
	(enhanceElements: ElementsEnhancer) =>
	({ title, elements }: { title?: string; elements: FEElement[] }) => {
		// if the element is missing its title for any reason, we will skip it
		if (!isUndefined(title)) {
			return [
				{
					title,
					body: enhanceElements(elements),
				},
			];
		}
		return [];
	};

const constructMiniProfile =
	(enhanceElements: ElementsEnhancer) =>
	({
		title,
		elements,
		bio,
		endNote,
	}: {
		title?: string;
		elements: FEElement[];
		bio?: string;
		endNote?: string;
	}) => {
		// if the element is missing its title for any reason, we will skip it
		if (!isUndefined(title) && title !== '') {
			return [
				{
					title,
					bio,
					endNote,
					body: enhanceElements(elements),
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
		case 'MiniProfiles':
			return [
				{
					_type: 'model.dotcomrendering.pageElements.MiniProfilesBlockElement',
					miniProfiles: element.items.flatMap(
						constructMiniProfile(elementsEnhancer),
					),
				},
			];
		/**
		 * If it's an unsupported list element, ignore the structure
		 * and return the body elements.
		 */
		default:
			return element.items.flatMap((item) => item.elements);
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
