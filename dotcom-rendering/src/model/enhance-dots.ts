import type { CAPIElement } from '../types/content';
import { transformDots } from './transformDots';

const checkForDots = (elements: CAPIElement[]): CAPIElement[] => {
	// Loop over elements and check if a dot is in the TextBlockElement
	const enhanced: CAPIElement[] = [];
	elements.forEach((element, i) => {
		if (
			element._type === 'model.dotcomrendering.pageElements.TextBlockElement' &&
			element.html.includes('•')
		) {
			if (elements.length - 1 === i) {
				enhanced.push({
					...element,
					html: `<footer>${transformDots(element.html)}</footer>`,
				});
			} else {
				enhanced.push({
					...element,
					html: transformDots(element.html),
				});
			}
		} else {
			enhanced.push(element);
		}
	});
	return enhanced;
};

export const enhanceDots = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) => {
		return {
			...block,
			elements: checkForDots(block.elements),
		};
	});
