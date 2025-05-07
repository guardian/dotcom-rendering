import type { FEElement, FilterCarouselElement } from '../types/content';
import { generateId } from './enhance-H2s';

// We only want to insert the carousel in this one specific spot
const isWhyYouShouldTrustMe = (element: FEElement) =>
	element._type ===
		'model.dotcomrendering.pageElements.SubheadingBlockElement' &&
	generateId(element, []) === 'at-a-glance';

export const enhanceFilterCarousel = (elements: FEElement[]): FEElement[] => {
	const placeholder: FilterCarouselElement = {
		_type: 'model.dotcomrendering.pageElements.FilterCarouselElement',
	};

	const elementsWithCarousel = elements.flatMap((element) =>
		isWhyYouShouldTrustMe(element) ? [element, placeholder] : element,
	);

	return elementsWithCarousel;
};
