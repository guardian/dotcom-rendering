import type { ImageBlockElement } from '../types/content';

const getMobileAdPositions = (images: ImageBlockElement[]): number[] => {
	const adPositions = images
		.map((image) => images.indexOf(image) + 1)
		.filter((position) => position % 4 === 0);
	return adPositions;
};

const getDesktopAdPositions = (images: ImageBlockElement[]): number[] => {
	const adPositions = images
		.map((image) => images.indexOf(image) + 1)
		.filter((position) => position % 4 === 0);
	return adPositions;
};

export { getDesktopAdPositions, getMobileAdPositions };
