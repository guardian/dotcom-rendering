/**
 * Find disclaimer position
 *
 * Returns the index of the second paragraph element
 *
 */

import type { FEElement } from '../types/content';

const isTextElement = (e: FEElement): boolean => {
	return e._type === 'model.dotcomrendering.pageElements.TextBlockElement';
};

// Returns index of item to place disclaimer *before*
export const findDisclaimerPosition = (
	elements: FEElement[],
): number | undefined => {
	let paraCount = 0;

	for (let i = 0; i < elements.length; i += 1) {
		const currentElement = elements[i];

		if (currentElement && isTextElement(currentElement)) {
			paraCount += 1;

			if (paraCount === 2) {
				return i;
			}
		}
	}

	return undefined;
};
