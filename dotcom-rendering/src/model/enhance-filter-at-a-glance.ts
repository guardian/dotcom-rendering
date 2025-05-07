import type { FEElement } from '../types/content';

export const enhanceFilterAtAGlance = (elements: FEElement[]): FEElement[] =>
	// Loop over elements and check if a block contains product details
	elements.map<FEElement>((element) => {
		if (
			element._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			(element.html.includes('Best overall') ||
				element.html.includes('overall:'))
		) {
			return {
				...element,
				_type: 'model.dotcomrendering.pageElements.FilterAtAGlance',
			};
		} else {
			return element;
		}
	});
