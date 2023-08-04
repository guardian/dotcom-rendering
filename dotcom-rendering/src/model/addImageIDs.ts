import type { FEElement } from '../types/content.ts';
import type { FEArticleType } from '../types/frontend.ts';

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
	data: FEArticleType,
): { mainMediaElements: FEElement[]; blocks: Block[] } => {
	// position needs to be defined outside the addPosition function otherwise
	// it will get reset to 1 each time
	let position = 1;
	const addPosition = (elements: FEElement[]): FEElement[] => {
		const withPosition: FEElement[] = [];
		elements.forEach((thisElement) => {
			if (
				thisElement._type ===
				'model.dotcomrendering.pageElements.ImageBlockElement'
			) {
				withPosition.push({
					...thisElement,
					position,
				});
				position += 1;
			} else {
				withPosition.push(thisElement);
			}
		});
		return withPosition;
	};

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
