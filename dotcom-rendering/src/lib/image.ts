import { type Image } from '../types/content';

const descendingByWidthComparator = (a: Image, b: Image) => {
	return parseInt(b.fields.width, 10) - parseInt(a.fields.width, 10);
};

export const getMaster = (images: Image[]): Image | undefined => {
	return images.find((image) => image.fields.isMaster);
};

export const getLargest = (images: Image[]): Image | undefined => {
	return images.slice().sort(descendingByWidthComparator)[0];
};
