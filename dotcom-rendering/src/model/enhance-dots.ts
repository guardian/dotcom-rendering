import type { FEElement } from '../types/content.ts';
import { transformDots } from './transformDots.ts';

const checkForDots = (elements: FEElement[]): FEElement[] =>
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

export const enhanceDots = (blocks: Block[]): Block[] =>
	blocks.map((block: Block) => {
		return {
			...block,
			elements: checkForDots(block.elements),
		};
	});
