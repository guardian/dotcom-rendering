import type { Image } from '../types/content.ts';

/** Used to determine if a lightbox can be created */
const THRESHOLD = 620;

/** has a width above the threshold */
export const isWideEnough = ({ fields: { width } }: Image): boolean =>
	parseInt(width, 10) > THRESHOLD;

/** Has a height above the threshold */
export const isHighEnough = ({ fields: { height } }: Image): boolean =>
	parseInt(height, 10) > THRESHOLD;
