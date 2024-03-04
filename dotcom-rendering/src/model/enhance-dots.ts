import type { FEElement } from '../types/content';
import { transformDots } from './transformDots';

export const enhanceDots = (elements: FEElement[]): FEElement[] =>
	// Loop over elements and check if a dot is in the TextBlockElement
	elements.map<FEElement>((element, i) => {
		if (
			element._type ===
				'model.dotcomrendering.pageElements.TextBlockElement' &&
			element.html.includes('•')
		) {
			if (elements.length - 1 === i) {
				return {
					...element,
					html: `<footer>${transformDots(element.html)}</footer>`,
				};
			} else {
				return {
					...element,
					html: transformDots(element.html),
				};
			}
		} else {
			return element;
		}
	});
