import type { FEElement } from '../types/content';

export const enhanceFilterProductDetails = (
	elements: FEElement[],
): FEElement[] =>
	// Loop over elements and check if a block contains product details
	elements.map<FEElement>((element) => {
		if (
			element._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			(element.html.includes('<strong>Dimensions:') ||
				element.html.includes('<strong>Maximum') ||
				element.html.includes('<strong>Footprint'))
		) {
			return {
				...element,
				_type: 'model.dotcomrendering.pageElements.FilterProductDetails',
			};
		} else {
			return element;
		}
	});
