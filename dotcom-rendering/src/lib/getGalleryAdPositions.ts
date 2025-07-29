import type { ImageBlockElement } from '../types/content';

/**
 * @param images - An array of ImageBlockElement objects representing the images in the gallery.
 * @description This function calculates the positions in the gallery where ads should be placed.
 * The ad position will be the same for all breakpoints, after every 4 images will have an ad slot.
 * What make the difference between mobile and desktop slot ids are in GalleryAdSlots.tsx and AdSlot.web.tsx.
 * @returns An array of numbers representing the positions where ads should be placed.
 */
const getAdPositions = (images: ImageBlockElement[]): number[] => {
	const adPositions = images
		.map((image) => images.indexOf(image) + 1)
		.filter((position) => position % 4 === 0);
	return adPositions;
};

export { getAdPositions };
