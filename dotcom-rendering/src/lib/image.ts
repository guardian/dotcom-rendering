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

/**
 * Generates a URL for calling the Fastly Image Optimiser.
 *
 * @see https://developer.fastly.com/reference/io/
 * @see https://github.com/guardian/fastly-image-service/blob/main/fastly-io_guim_co_uk/src/main/resources/varnish/main.vcl
 *
 */
export const generateImageURL = ({
	master,
	imageWidth,
	resolution,
}: {
	master: string;
	imageWidth: number;
	resolution: 'low' | 'high';
}): string => {
	const url = new URL(master);

	// In CODE, we do not generate optimised replacement images
	if (url.hostname === 's3-eu-west-1.amazonaws.com') return url.href;

	const params = new URLSearchParams({
		width: imageWidth.toString(),
		dpr: String(resolution === 'high' ? 2 : 1),
		s: 'none',
	});

	return `https://i.guim.co.uk/img/${getServiceFromUrl(url)}${
		url.pathname
	}?${params.toString()}`;
};
