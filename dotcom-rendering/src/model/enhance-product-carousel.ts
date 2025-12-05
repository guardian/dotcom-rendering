import type { FEElement, ProductCarouselElement } from '../types/content';
import { generateId } from './enhance-H2s';

// We only want to insert the carousel in this one specific spot
const isAtAGlance = (element: FEElement) =>
	element._type ===
		'model.dotcomrendering.pageElements.SubheadingBlockElement' &&
	generateId(element.elementId, element.html, []) === 'at-a-glance';

const isSubheadingOrDivider = (element: FEElement) =>
	// if an element is one of these then we're likely leaving the 'At a glance' section
	element._type ===
		'model.dotcomrendering.pageElements.SubheadingBlockElement' ||
	element._type === 'model.dotcomrendering.pageElements.DividerBlockElement';

const allowedPageIds = ['thefilter/2025/mar/02/best-air-fryers'];

const isEligibleForCarousel = (pageId: string) =>
	allowedPageIds.includes(pageId);

const placeholderCarousel: ProductCarouselElement = {
	_type: 'model.dotcomrendering.pageElements.ProductCarouselElement',
};

type ReducerAccumulator = {
	elements: FEElement[];
	inAtAGlanceSection: boolean;
};

const insertCarouselPlaceholder = (elements: FEElement[]): FEElement[] => {
	const elementsWithReducerContext = elements.reduce(
		(
			prev: ReducerAccumulator,
			currentElement: FEElement,
		): ReducerAccumulator => {
			let inAtAGlance = prev.inAtAGlanceSection;
			const elementsToReturn = prev.elements;

			if (!inAtAGlance) {
				if (isAtAGlance(currentElement)) {
					inAtAGlance = true;
				}
				elementsToReturn.push(currentElement);
			} else {
				if (isSubheadingOrDivider(currentElement)) {
					inAtAGlance = false;
					elementsToReturn.push(placeholderCarousel, currentElement);
				}

				// TODO - here we could maybe build a list of the products mentioned in the at a glance section
				// by appending the current element to a different list which then gets passed into the carousel
			}

			return {
				elements: elementsToReturn,
				inAtAGlanceSection: inAtAGlance,
			};
		},
		// Initial value for reducer function
		{
			elements: [],
			inAtAGlanceSection: false,
		},
	);

	return elementsWithReducerContext.elements;
};

export const enhanceProductCarousel =
	(pageId: string) =>
	(elements: FEElement[]): FEElement[] => {
		// do nothing if article is not on allow list
		if (isEligibleForCarousel(pageId)) {
			return insertCarouselPlaceholder(elements);
		}

		return elements;
	};
