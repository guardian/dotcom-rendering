import type { FEElement } from '../types/content';
import type { DCRArticle } from '../types/frontend';

/**
 * This function adds the position property to each image
 * element.
 *
 * This value is used to add an id which means we can add a hash to
 * the url, such as #img-2, letting us navigate to that image.
 *
 * We also use this id to open lightbox when the page is loaded
 * with an image hash present on the url
 *
 */
export const addImageIDs = (
	data: DCRArticle,
): { mainMediaElements: FEElement[]; blocks: Block[] } => {
	// position needs to be defined outside the addPosition function otherwise
	// it will get reset to 1 each time
	let position = 0;
	const addPosition = (elements: FEElement[]): FEElement[] =>
		elements.map<FEElement>((thisElement) => {
			if (
				thisElement._type ===
				'model.dotcomrendering.pageElements.ImageBlockElement'
			) {
				position += 1;
				return {
					...thisElement,
					position,
				};
			} else if (
				thisElement._type ===
				'model.dotcomrendering.pageElements.CartoonBlockElement'
			) {
				position += 1;
				return {
					...thisElement,
					position,
				};
			} else {
				return thisElement;
			}
		});

	return {
		mainMediaElements: addPosition(data.mainMediaElements),
		blocks: data.blocks.map((block: Block) => {
			return {
				...block,
				elements: addPosition(block.elements),
			};
		}),
	};
};
