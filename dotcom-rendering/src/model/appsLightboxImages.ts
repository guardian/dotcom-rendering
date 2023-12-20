import type { ImageForLightbox } from '../types/content';

export type ImageForAppsLightbox = {
	masterUrl: string;
	width: number;
	height: number;
	credit?: string;
	caption?: string;
	elementId: string;
};

export const appsLightboxImages = (
	lightboxImages: ImageForLightbox[],
): ImageForAppsLightbox[] =>
	lightboxImages.map((li) => ({
		width: li.width,
		height: li.height,
		credit: li.credit,
		caption: li.caption,
		masterUrl: li.masterUrl,
		elementId: li.elementId,
	}));
