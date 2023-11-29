import { Image } from '@guardian/bridget/Image';
import { getGalleryClient } from '../lib/bridgetApi';
import { generateImageURL } from '../lib/image';
import type { ImageForAppsLightbox } from '../model/appsLightboxImages';

// Gets assigned a value when the component is rendered
let imageStore: ImageForAppsLightbox[];

export const getOnClickHandler = (elementId: string): (() => void) => {
	const currentIndex = imageStore.findIndex(
		(img) => img.elementId === elementId,
	);

	// Don't open the lightbox if the currentIndex couldn't be found
	if (currentIndex == -1) {
		return () => undefined;
	}

	return () => {
		// Handle the case the device is rotated
		const imageWidth = Math.max(window.innerHeight, window.innerWidth);
		const resolution = window.devicePixelRatio >= 2 ? 'high' : 'low';
		void getGalleryClient()
			.launchSlideshow(
				imageStore.map(
					(image) =>
						new Image({
							width: image.width,
							height: image.height,
							url: generateImageURL({
								mainImage: image.masterUrl,
								imageWidth,
								resolution,
							}),
							caption: image.caption,
							credit: image.credit,
						}),
				),
				currentIndex,
				document.title,
			)
			// we don't need to handle this error
			.catch(() => undefined);
	};
};

export const AppsLightboxImageStore = ({
	images,
}: {
	images: ImageForAppsLightbox[];
}) => {
	imageStore = images;
	return null;
};
