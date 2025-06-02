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

/**
 * Finds the largest image by width in an array of images
 */
export const getLargestImageSize = (
	images: {
		url: string;
		width: number;
	}[],
): { url: string; width: number } | undefined =>
	[...images].sort((a, b) => a.width - b.width).pop();

const getServiceFromUrl = (url: URL): string => {
	const serviceName = url.hostname.split('.')[0] ?? '';
	switch (serviceName) {
		case 'static':
		case 'static-secure':
			return 'static';
		case 'uploads':
			return 'uploads';
		case 'media':
		default:
			return 'media';
	}
};

const isCodeGridUrl = (url: URL) => url.hostname === 'media.guimcode.co.uk';

/**
 * Generates a URL for calling the Fastly Image Optimiser.
 *
 * @see https://developer.fastly.com/reference/io/
 * @see https://github.com/guardian/fastly-image-service/blob/main/fastly-io_guim_co_uk/src/main/resources/varnish/main.vcl
 *
 */
export const generateImageURL = ({
	mainImage,
	imageWidth,
	resolution,
	aspectRatio = 'none',
	cropOffset,
}: {
	mainImage: string;
	imageWidth: number;
	resolution: 'low' | 'high';
	aspectRatio?: string;
	cropOffset?: { x: number; y: number };
}): string => {
	const url = new URL(mainImage);
	const offset = cropOffset
		? `,offset-x${cropOffset.x},offset-y${cropOffset.y}`
		: ``;
	const crop = `${aspectRatio}${offset}`;

	const params = new URLSearchParams({
		width: imageWidth.toString(),
		dpr: String(resolution === 'high' ? 2 : 1),
		s: 'none',
		crop,
	});

	const domain = isCodeGridUrl(url) ? 'i.guimcode.co.uk' : 'i.guim.co.uk';

	return `https://${domain}/img/${getServiceFromUrl(url)}${
		url.pathname
	}?${params.toString()}`;
};

export const isSupported = (imageUrl: string): boolean => {
	const supportedImages = ['jpg', 'jpeg', 'png', 'gif'];
	return supportedImages.some((extension) =>
		imageUrl.endsWith(`.${extension}`),
	);
};

export const getImage = (images: Image[]): Image | undefined => {
	const image = getMaster(images) ?? getLargest(images);

	if (image?.url === undefined || !isSupported(image.url)) {
		return undefined;
	}

	return image;
};
